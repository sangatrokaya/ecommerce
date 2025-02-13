import express from "express";
import notFoundHandler from "./middlewares/notFound.Middleware.js";
import errorHandler from "./middlewares/error.middleware.js";
import logger from "./middlewares/logger.middleware.js";
import cookieParser from "cookie-parser";

// process.load_env

// routers import
import userRouter from "./routes/user.router.js";
import productRouter from "./routes/product.router.js";
import orderRouter from "./routes/order.router.js";

// Initialize express app
const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(logger);

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export { app };
