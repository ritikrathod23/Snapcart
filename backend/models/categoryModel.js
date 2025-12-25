const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    cName: {
      type: String,
      require: true,
    },
    cDescription: {
      type: String,
    },
    cImage: {
      type: String,
    },
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("categories", categorySchema )
module.exports = categoryModel;