const Cart = require("../models/cartModel");

// Add product to cart
const addToCart = async (req, res) => {
  try {
    const { products } = req.body; // array: [{ productId, quantity }]
    // console.log(products)
    const userId = req.auth.userid;

    if (!products || !products.length) {
      return res.status(400).json({ message: "Products are required" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Loop through products and add/update items
    for (const { productId, quantity } of products) {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity; // update quantity
      } else {
        cart.items.push({ product: productId, quantity }); // add new item
      }
    }

    await cart.save();

    res.status(200).json({ message: "Products added to cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get cart for logged-in user
const getCart = async (req, res) => {
  try {
    const userId = req.auth.userid;

    // Find cart for user and populate product details
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "items.product",
      model: "Products",
      select: "pName pPrice pImage", // select fields you want
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    const total = cart?.items?.reduce((sum, item) => {
      return sum + item?.product?.pPrice * item?.quantity;
    }, 0);

    res.status(200).json({ message: "Cart fetched successfully", cart, total });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteCartItems = async (req, res) => {
  try {
    // console.log(req.body);
    const { itemId } = req.body;
    const { userid } = req.auth;
    console.log(userid);
    console.log(itemId);

    const cart = await Cart.findOneAndUpdate(
      { user: userid },
      { $pull: { items: { _id: itemId } } },
      {new: true}
    );

    res.status(200).json({ "success": true, "message": "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Unable to delete item" });
    console.log("unable to delete item", error.message);
  }
};

module.exports = { addToCart, getCart, deleteCartItems };
