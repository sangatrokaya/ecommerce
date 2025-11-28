import express from "express";
import {
  deleteUserByAdmin,
  getUserProfile,
  getUsers,
  login,
  logout,
  signUp,
  updateUserByAdmin,
  updateUserProfile,
} from "../controllers/user.controller.js";
import { checkAuth, checkAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.get("/", checkAuth, checkAdmin, getUsers);
router.get("/profile", checkAuth, getUserProfile);
router.put("/profile", checkAuth, updateUserProfile);
router.put("/:id", checkAuth, checkAdmin, updateUserByAdmin);
router.delete("/:id", checkAuth, checkAdmin, deleteUserByAdmin);

export default router;
