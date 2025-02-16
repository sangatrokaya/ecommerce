import Order from "../models/order.model.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";

const addOrder = asyncHandler(async (req, res) => {
  let { orderItems, itemPrice, shippingCharge, totalPrice, shippingAddress } =
    req.body;
  let order = await Order.create({
    user: req.user._id,
    orderItems: orderItems.map((item) => ({
      ...item,
      product: item._id,
      _id: undefined,
    })),
    itemPrice,
    shippingCharge,
    totalPrice,
    shippingAddress,
  });
  res.send({
    message: "Order Placed With ID " + order._id,
    orderId: order._id,
  });
});

const getOrders = asyncHandler(async (req, res) => {
  let orders = await Order.find({}).populate("user", "-_id name email");
  res.send(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
  let { id } = req.params;
  let orderById = await Order.findById(id).populate("user", "-_id name email");
  res.send(orderById);
});

const getMyOrders = asyncHandler(async (req, res) => {
  let orders = await Order.find({ user: req.user._id });
  res.send(orders);
});

export { addOrder, getOrders, getOrderById, getMyOrders };
