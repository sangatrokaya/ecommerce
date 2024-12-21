import express from "express";
import {
  getUserProfile,
  getUsers,
  login,
  logout,
  signUp,
  updateUserProfile,
} from "../controllers/user.controller.js";
import { checkAuth, checkAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.get("/", checkAuth, checkAdmin, getUsers);
router.get("/profile", checkAuth, getUserProfile);
router.put("/profile", checkAuth, updateUserProfile);

export default router;
