import Product from "../models/product.model.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import apiError from "../utils/apiError.util.js";

// @desc get all the products
// @route /api/v1/products
// @access public
const getProducts = asyncHandler(async (req, res) => {
  let products = await Product.find({});
  res.send(products);
});

// @desc get product by id
// @route /api/v1/products/:id
// @access public
const getProductById = asyncHandler(async (req, res) => {
  let id = req.params._id;
  let product = await Product.findById(id);
  if (!product) {
    throw new apiError(404, "Product not found!");
  }
  res.send(product);
});

// @desc add new product
// @route /api/v1/products
// @access private /admin
const addProduct = asyncHandler(async (req, res) => {
  let product = await Product.create({ ...req.body, user: req.user._id });
  res.send({ message: "Product created successfully!", product });
});
export { getProducts, getProductById, addProduct };
