const User = require("../models/userModel");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const login = async (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (isAdmin !== true) {
      if (user.isAdmin !== isAdmin) {
        return res
          .status(403)
          .json({ message: "Access denied. Admin status mismatch." });
      }
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      {
        email: email,
        userid: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // set true when using https (deployment)
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({
        user: {
          _id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        message: "Login Success full",
        token: token,
      });
  } catch (error) {
    console.error("error in login controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const register = async (req, res) => {
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
          message: "Account created successfully",
          mytoken: token,
        });
      });
    });
  } catch (error) {
    console.error("Error in Signup controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token").status(200).json({ message: "logout successfully" });
};

module.exports = { login, register, logout };
