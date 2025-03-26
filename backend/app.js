import express from "express";
import notFoundHandler from "./middlewares/notFound.Middleware.js";
import errorHandler from "./middlewares/error.middleware.js";
import logger from "./middlewares/logger.middleware.js";
import cookieParser from "cookie-parser";
import path from "path";

// process.load_env

// routers import
import userRouter from "./routes/user.router.js";
import productRouter from "./routes/product.router.js";
import orderRouter from "./routes/order.router.js";
import uploadRouter from "./routes/upload.router.js";

// Initialize express app
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger);

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/image", uploadRouter);

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export { app };
