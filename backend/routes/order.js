const orderItemModel = require("../models/orderItemModel");
const orderModel = require("../models/orderModel");
const User = require("../models/userModel");

//Get total order count
router.get("/order/count", async (req, res) => {
  try {
    const orderCount = await orderModel.countDocuments();
    if (!orderCount) return res.status(404).json({ message: "No count found" });
    res.status(200).json({ totalcount: orderCount });
  } catch (error) {
    console.error("can not get count", error);
    res.status(500).json({ message: "Internal Server" });
  }
});

//Add order
router.post("/order", async (req, res) => {
  try {
    const { user: userId, orderItems: products } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Create orderItems in bulk
    const orderItems = products.map((p) => ({
      quantity: p.quantity,
      product: p.product,
    }));

    const createdOrderItems = await orderItemModel.insertMany(orderItems);
    const orderItemIds = createdOrderItems.map((item) => item._id);

    // Calculate totalAmount in one query using aggregation (instead of looping)
    const populatedItems = await orderItemModel
      .find({
        _id: { $in: orderItemIds },
      })
      .populate("product");
    console.error("populateItems", populatedItems);

    const amount = populatedItems.reduce(
      (acc, item) => acc + item.product.pPrice * item.quantity,
      0
    );

    // Create order
    const order = new orderModel({
      orderItems: orderItemIds,
      user: user._id,
      shippingAddress: {
        street: user.street,
        city: user.city,
        country: user.country,
        pincode: user.pincode,
      },
      amount,
    });

    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//Get All orders
router.get("/order", async (req, res) => {
  try {
    const orderList = await orderModel
      .find()
      .populate("user", "name")
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
          select: "pName pPrice pImage", // choose fields to return
        },
      })
      // .sort({ createdAt: -1 });

    if (!orderList) {
      res.status(404).json({ message: "No orders found" });
    }

    // const formattedOrders = orders.map((order) => ({
    //   ...order.toObject(),
    //   createdAt: moment(order.createdAt).format("DD/MM/YYYY hh:mm a"),
    // }));

    res.status(200).json(orderList);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

//Get single order
router.get("/order/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const orderList = await orderModel
      .findById(id)
      .populate("user", "name")
      .populate({
        path: "orderItems", // Field in Order
        populate: {
          path: "product",
          populate: "pCategory", // Field in OrderItem
        },
      });

    if (!orderList) {
      res.status(404).json({ message: "No orders found" });
    }
    res.json(orderList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});


router.get("/orders/user/:userid", async (req, res) => {
  const { userid } = req.params;
  try {
    // Convert string to ObjectId if necessary
    const userOrderList = await orderModel
      .find({ user: userid })
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
          select: "pName pPrice pImage",
        },
      });

    if (!userOrderList || userOrderList.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json(userOrderList);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

//update order
router.put("/order/:id", async (req, res) => {
  const {
    orderItems,
    shippingAddress1,
    shippingAddress2,
    city,
    country,
    pincode,
    status,
    phone,
    totalPrice,
    user,
  } = req.body;
  const { id } = req.params;

  if (
    !orderItems ||
    !shippingAddress1 ||
    !shippingAddress2 ||
    !city ||
    !country ||
    !pincode ||
    !status ||
    !phone ||
    !totalPrice ||
    !user
  ) {
    return res.status(400).json({ error: "All field requied" });
  }

  try {
    const order = await orderModel.findByIdAndUpdate(id, {
      orderItems,
      shippingAddress1,
      shippingAddress2,
      city,
      country,
      pincode,
      status,
      phone,
      totalPrice,
      user,
    });
    res.status(201).json({ message: "order Updated" });
  } catch (error) {
    console.error("error in updating order", error.message);
    res.status(500).json({ message: "can not update order" });
  }
});

//Delete order
router.delete("/order/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const order = await orderModel.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    // Step 2: Delete all order items associated with this order
    await Promise.all(
      order.orderItems.map(async (orderItemId) => {
        await orderItemModel.findByIdAndDelete(orderItemId);
      })
    );

    await orderModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Can not delete order");
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
