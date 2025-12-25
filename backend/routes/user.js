const User = require("../models/userModel");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

router.get("/get-users", async (req, res) =>{
    try {
        const allUser = await User.find()
        return res.json(allUser)
        .status(200)

    } catch (error) {
        console.log(error, "cant fetch user")
    }

})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(500).json({ message: "user not found" });

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (isMatch) {
        const token = jwt.sign(
          { 
            email: email,
            userid: user._id,
            isAdmin: User.isAdmin
          },
          process.env.SECRET_KEY
        );
        res
          .cookie("token", token)
          .status(200)
          .json({
            user: {
              _id: user.id,
              name: user.name,
            },
            message: "Login Success full",
            mytToken: token,
          });
      } else {
        console.log("Invalid Password");
        res.status(404).json({ message: "Invalid Credentials" });
      }
    });
  } catch (error) {
    console.log("error in login controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/signup", async (req, res) => {
  console.log("Request Body:", req.body);
  try {
    const {
      name,
      email,
      password,
      isAdmin,
      street,
      city,
      country,
      pincode,
      phone,
    } = req.body;
    const user = await User.findOne({ email });
    if (user) return res.status(500).json("user already exist");

    bcrypt.genSalt(10, async (err, salt) => {
      bcrypt.hash(password, salt, async function (err, hash) {
        const createAccount = await User.create({
          name,
          email,
          password: hash,
          isAdmin,
          street,
          city,
          country,
          pincode,
          phone,
        });

        const token = jwt.sign(
          { email: email, userid: User._id },
          process.env.SECRET_KEY
        );
        res.cookie("token", token).status(200).json({
          massege: "Account created successfully",
          mytoken: token,
        });
      });
    });
  } catch (error) {
    console.log("Error in Signup controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.post("/logout", (req, res) => {
  console.log("Logout route accessed");
    res.clearCookie("token")
    .status(200)
    .json({message: "logout successfully"}) 
})

module.exports = router;
