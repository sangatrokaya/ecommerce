import express from "express";
import {
  addOrder,
  getMyOrders,
  getOrderById,
  getOrders,
} from "../controllers/order.controller.js";
import { checkAdmin, checkAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/addorder", checkAuth, addOrder);
router.get("/", checkAuth, checkAdmin, getOrders);
router.get("/myorders", checkAuth, getMyOrders);
router.get("/:id", checkAuth, getOrderById);

export default router;
