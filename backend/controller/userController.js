const User = require("../models/userModel");

const allUsers = async (req, res) => {
  console.log("Fetching all users");
  try {
    const allUser = await User.find();
    return res.status(200).json(allUser);
  } catch (error) {
    console.error(error, "cant fetch user");
  }
};

const userDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { allUsers, userDetails };
