import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.middleware.js";
import User from "../models/user.model.js";

const checkAuth = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;
  if (!token) {
    let err = new Error("You must be logged in!");
    err.status = 401;
    throw err;
  }
  try {
    let { userId } = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findById(userId);
    req.user = {
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    next();
  } catch (e) {
    console.log(e.message);
    let err = new Error("Invalid token!");
    err.status = 401;
    throw err;
  }
});

const checkAdmin = asyncHandler(async (req, res, next) => {
  let isAdmin = req.user?.isAdmin;
  if (isAdmin) next();
  else {
    let err = new Error("You are not authorized to perform this operation!");
    err.status = 403;
    throw err;
  }
});

export { checkAuth, checkAdmin };
