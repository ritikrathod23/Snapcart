const express = require("express");
const categoryModel = require("../models/categoryModel");
const upload = require("../helper/imageUpload");
router = express.Router();


//Add Categories
router.post("/categories", upload.single("file"), async (req, res) => {
  const { cName, cDescription } = req.body;

  if (!cName || !cDescription || !req.file) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const category = new categoryModel({
      cName,
      cDescription,
      cImage: req.file.path,
    });
    const saveCategories = await category.save();
    res.status(200).json({ message: "new Category is created successfully" });

  } catch (error) {
    console.log("Can not create Category");
    res.status(400).json({ message: "Can not create Category" });
  }
});


//Get All Categories
router.get("/categories",async (req, res) => {
    try {
        const allCategories = await categoryModel.find()
        if(!allCategories) return res.status(404).json({message: "No categories found"});
        res.status(200).json(allCategories)
    } catch (error) {
        console.log("Can not get all categories")
        res.status(400).json({message: "Can not get all categories"})
    }
})


//Delete Category
router.delete("/categories", async (req, res) => {
    const {cid} = req.body
    if(!cid){
        return res.status(400).json({message: "All fields are required"})
    }
    try {
        await categoryModel.findByIdAndDelete(cid)
        res.status(200).json({message: "Category deleted successfully"})
    } catch (error) {
        console.log("Can not delete category")
        res.status(400).json({message: "Can not delete category"})
    }
})

//Edit Category
router.put("/categories/:cid", async (req,res) => {
  const {cid} = req.params;
  const { cName, cDescription, cImage } = req.body;

  if(!cid) return res.status(404).json({message: "category Id not found"})

  if (!cName || !cDescription || !cImage) {
  return res.status(400).json({ message: "All fields required" });
  }

  try {
    let category = await categoryModel.findByIdAndUpdate(cid,{
      cName,
      cDescription,
      cImage,
    },
    {new : true}
  )
  res.status(200).json({message: "category updated successfully"})
  } catch (error) {
    console.log("Unable to update category")
    res.status("500").json({message: "Unable to update category"})
  }
})

module.exports = router;