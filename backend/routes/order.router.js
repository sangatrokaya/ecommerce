import express from "express";
import {
  addOrder,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import { checkAdmin, checkAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", checkAuth, checkAdmin, getOrders);
router.post("/addorder", checkAuth, addOrder);
router.get("/myorders", checkAuth, getMyOrders);
router.put("/:id/updatestatus", checkAuth, checkAdmin, updateOrderStatus);
router.get("/:id", checkAuth, getOrderById);

export default router;
