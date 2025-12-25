const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    category:{
        ref: "categories",
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    cName: {
      type: String,
      require: true,
    },
    cDescription: {
      type: String,
    },
  },
  { timestamps: true }
);

const subCategoryModel = mongoose.model("subcategories", subCategorySchema )
module.exports = subCategoryModel;