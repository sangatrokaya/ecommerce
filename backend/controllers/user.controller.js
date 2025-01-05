import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/token.util.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import apiError from "../utils/apiError.util.js";
import { isEmail } from "../utils/validator.util.js";

// @desc register new user
// @route /api/v1/users/signup
// @access public
const signUp = asyncHandler(async (req, res, next) => {
  let { email, password } = req.body;
  if (!isEmail(email)) {
    throw new apiError(400, "Invalid Email!");
  }
  let userExists = await User.findOne({ email });
  if (userExists) {
    let err = new Error(`User with email ${email} already exists!`);
    err.status = 400; // 400 refers to bad request
    throw err;
  }
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, salt);
  let user = await User.create({ ...req.body, password: hashedPassword });
  createToken(res, user._id);
  res.send({
    message: "User Registered Successfully!",
    user: {
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
  });
});

// @desc login user
// @route /api/v1/users/login
// @access public
const login = asyncHandler(async (req, res, next) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    let err = new Error(`${email} not registered!`);
    err.status = 400;
    throw err;
  }
  if (await user.matchPassword(password)) {
    createToken(res, user._id);
    res.send({ message: "Login Success!" });
  } else {
    let err = new Error("Invalid Password!");
    err.status = 400;
    throw err;
  }
});

// @desc logout user
// @route /api/v1/users/logout
// @access private
const logout = asyncHandler((req, res, next) => {
  res.clearCookie("jwt");
  res.send({ message: "Logout Successful!" });
});

// @desc get all the users
// @route /api/v1/users
// @access private (logged in + admin user only)
const getUsers = asyncHandler(async (req, res) => {
  let users = await User.find({}).select("-password");
  res.send(users);
});

// @desc get the logged in user profile
// @route /api/v1/users/profile
// @access private (only logged in user)
const getUserProfile = asyncHandler(async (req, res) => {
  res.send(req.user);
});

// @desc update the user profile who is logged in
// @route /api/v1/users/profile
// @access private (only logged in user)
const updateUserProfile = asyncHandler(async (req, res) => {
  let id = req.user._id;
  let user = await User.findById(id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      let salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }
    let updatedUser = await user.save();
    res.send({ message: "User updated successfully!", user: updatedUser });
  } else {
    throw new apiError(404, "user not found!");
  }
});

// @desc update the user profile by admin
// @route /api/v1/users/:id
// @access private (only admin user)
const updateUserByAdmin = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let user = await User.findById(id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);
    let updatedUser = await user.save();
    res.send({ message: "user updated successfully!", user: updatedUser });
  } else {
    throw new apiError(404, "user not found!");
  }
});

// @desc delete user profile by admin but should not be able to delete admin profile
// @route /api/v1/users/:id
// @access private (only admin user)
const deleteUserByAdmin = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let user = await User.findById(id);
  if (!user) {
    throw new apiError(404, "User not found!");
  }
  if (user.isAdmin) {
    throw new apiError(400, "You cannot delete an admin user!");
  }
  await User.findByIdAndDelete(id);
  res.send({ message: "User deleted successfully!" });
});

export {
  signUp,
  login,
  logout,
  getUsers,
  getUserProfile,
  updateUserProfile,
  updateUserByAdmin,
  deleteUserByAdmin,
};
