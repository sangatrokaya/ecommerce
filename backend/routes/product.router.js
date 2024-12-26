import express from "express";
import {
  addProduct,
  addUserReview,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { checkAdmin, checkAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(checkAuth, checkAdmin, addProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(checkAuth, checkAdmin, updateProduct)
  .delete(checkAuth, checkAdmin, deleteProduct);
// router.get("/:id", getProductById);
// router.put("/:id", checkAuth, checkAdmin, updateProduct);
// router.delete("/:id", checkAuth, checkAdmin, deleteProduct);
router.get("/topproducts/:limit", getTopProducts);
router.put("/:id/addreview", checkAuth, addUserReview);

export default router;
