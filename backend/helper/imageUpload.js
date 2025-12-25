const multer = require("multer");
const cloudinary = require("../helper/cloudinaryConfig");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "products",
      allowed_formats: ["jpg", "jpeg", "png"], // ✅ allow multiple formats
      public_id: file.originalname.split(".")[0], // optional: use original filename
    };
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
