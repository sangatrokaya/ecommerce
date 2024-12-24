import express from "express";
import {
  addProduct,
  getProductById,
  getProducts,
} from "../controllers/product.controller.js";
import { checkAdmin, checkAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(checkAuth, checkAdmin, addProduct);
router.get("/:id", getProductById);

export default router;
