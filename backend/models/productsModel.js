const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    pName: {
      type: String, 
      require: true,
    },
    pImage: {
      type: String,
      // require: true,
    },
    pDescription: {
      type: String,
      require: true,
    },
    pCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
    // pSubCategory: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "SubCategory",
    //   // required: true,
    // },
    pPrice: {
      type: Number,
      require: true,
    },
    pSize: {
      type: [String],
      enum: ["S", "M", "L", "XL"],
    },
    pQuantity: {
      type: Number,
      default: 0,
    },
    pOffer: {
      type: String,
      default: null,
    },
    pColor: {
      type: String,
      default: null,
    },
    pBrand: {
      type: String,
      default: null,
    },  
    pStatus: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
const Product = mongoose.model("Products", productsSchema);
module.exports = Product;
