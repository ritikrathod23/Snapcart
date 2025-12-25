const express = require("express");
const productsModel = require("../models/productsModel");
const categoryModel = require("../models/categoryModel");
const router = express.Router();
const upload = require("../helper/imageUpload");
const cloudinary = require("../helper/cloudinaryConfig");

// Get All Products
router.get("/products", async (req, res) => {
  const { category, page = 1, limit } = req.query;
  console.log("limit",req.headers);


  try {
    let query = {};

    if (category) {
      const myCategory = await categoryModel.findOne({ cName: category });

      // console.log("myCategory", myCategory)
      if (!myCategory) {
        return res
          .status(404)
          .json({ success: "false", message: "category not found" });
      }

      query.pCategory = myCategory._id;
      // console.log("query", query);
    }

    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * pageSize;

    const [getAllData, totalProducts] = await Promise.all([
      productsModel
        .find(query)
        .populate("pCategory")
        .skip(skip)
        .limit(pageSize),
      productsModel.countDocuments(query),
    ]);

    res.status(200).json({
      getAllData,
      message: "Products fetched successfully",
      pagination: {
        total: totalProducts,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(totalProducts / pageSize),
      },
    });
  } catch (error) {
    console.log("can not get products", error.message);
    res.status(400).json({ message: "can not get products" });
  }
});

//Get Product by Id
router.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getProduct = await productsModel.findById(id);
    res.status(200).json(getProduct);
  } catch (error) {
    console.log("can not get product", error.message);
    res.status(400).json({ message: "can not get product" });
  }
});

// Add Products
router.post("/products", upload.single("file"), async (req, res) => {
  console.log("req.body", req.body);
  const {
    pName,
    pImage,
    pDescription,
    pPrice,
    pColor,
    pBrand,
    pCategory,
    pQuantity,
    pOffer,
    pSize,
    pStatus,
  } = req.body;

  if (
    !pName ||
    !pImage ||
    !pDescription ||
    !pPrice ||
    !pCategory ||
    !pQuantity ||
    !pOffer ||
    !pStatus
  ) {
    return res.status(400).json({ error: "All field required" });
  }

  const myCategory = await categoryModel.findOne({ cName: pCategory });

  if (!myCategory) {
    return res.status(404).json({ error: "Category not found" });
  }

  // if (!req.file) return res.status(404).json({ message: "image required " });

  try {
    const addData = await productsModel.create({
      pName,
      pImage,
      pDescription,
      pPrice,
      pQuantity,
      pCategory: myCategory._id,
      pOffer,
      pColor,
      pBrand,
      pSize,
      pStatus,
    });
    res.status(201).json({ message: "New Product Created", image: req.file });
  } catch (error) {
    console.log("error in creating product", error.message);
    res.status(500).json({ message: "can not create a new product" });
  }
});

//Delete Products
router.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  function extractPublicId(url) {
    // Example: https://res.cloudinary.com/demo/image/upload/v123456789/products/my-image.jpg
    const parts = url.split("/");
    const fileName = parts[parts.length - 1]; // my-image.jpg
    const folder = parts[parts.length - 2]; // products
    const publicId = `${folder}/${fileName.split(".")[0]}`; // products/my-image
    return publicId;
  }

  try {
    if (!id) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const product = await productsModel.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Extract publicId from image URL
    if (product.pImage) {
      const publicId = extractPublicId(product.pImage);
      if (publicId) {
        const cloudRes = await cloudinary.uploader.destroy(publicId);
        console.log("Cloudinary Delete:", cloudRes);
      }
    }

    // Use correct deletion method
    await productsModel.findByIdAndDelete(id);

    return res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    console.error("Cannot delete product:", error.message);
    return res.status(500).json({ error: "Cannot delete product" });
  }
});

//Update or Edit Product
router.put("/products/:id", async (req, res) => {
  const {
    pName,
    pImage,
    pDescription,
    pPrice,
    pQuantity,
    pCategory,
    pOffer,
    pStatus,
  } = req.body;
  const { id } = req.params;
  if (
    !pName ||
    !pImage ||
    !pDescription ||
    !pPrice ||
    !pCategory ||
    !pQuantity ||
    !pOffer ||
    !pStatus
  ) {
    return res.status(400).json({ error: "All field required" });
  }
  try {
    const updateProduct = await productsModel.findByIdAndUpdate(
      id,
      {
        pName,
        pImage,
        pDescription,
        pPrice,
        pQuantity,
        pCategory,
        pOffer,
        pStatus,
      },
      { new: true }
    );
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.log("can not update product", error.message);
    res.json({ message: "can not update product" });
  }
});

// upload image
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    res.json(req.file);
    console.log(req.file.path);
    // const myfile = await cloudinary.uploader.upload(req.file.path)
    // console.log("cloudinary", myfile)
    // const getAllData = await productsModel.find();
    // res.status(200).json("hello");
  } catch (error) {
    console.log("can not get products", error.message);
    res.status(400).json({ message: "can not get products" });
  }
});

router.get("/filters", async (req, res) => {
  try {
    const category = req.query.category;

    const pCategory = await categoryModel.findOne({ cName: category });

    const match = pCategory ? { pCategory } : {};

    const brands = await productsModel.distinct("pBrand", match);
    const colors = await productsModel.distinct("pColor", match);
    const sizes = await productsModel.distinct("pSize", match);

    res.json({
      brands,
      colors,
      sizes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const APIFeatures = require("../utils/filterFeature");

router.get("/getProducts", async (req, res) => {
  try {
    console.log("req.query in getProducts", req.query);
    let categoryFilter = {};
    const category = req.query.category;
    if (category) {
      const pCategory = await categoryModel.findOne({ cName: category });
      if (pCategory) {
        categoryFilter = { pCategory: pCategory._id };
        console.log("category in getProducts", categoryFilter);
      }
    }


    const features = new APIFeatures(productsModel.find(categoryFilter), req.query).filter();
    const products = await features.query;
    res.json({
      getAllData: products,
      message: "Products fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
