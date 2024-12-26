import express from "express";
import {
  addProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { checkAdmin, checkAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(checkAuth, checkAdmin, addProduct);
router.get("/:id", getProductById);
router.put("/:id", checkAuth, checkAdmin, updateProduct);

export default router;
