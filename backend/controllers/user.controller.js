import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/token.util.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";

// @desc register new user
// @route /api/v1/users/signup
// @access public
const signUp = asyncHandler(async (req, res, next) => {
  let { email, password } = req.body;
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

export { signUp, login, logout, getUsers, getUserProfile };
