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
  let id = req.params.id;
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
  // let product = await Product.create({ ...req.body, user: req.user._id });
  let product = await Product.create({
    user: req.user._id,
    name: "Sample Product",
    description: "Sample Description",
    image: "/images/sample.jpg",
    price: 100,
    brand: "Sample Brand",
    category: "Sample Category",
  });
  res.send({ message: "Product created successfully!", product });
});

// @desc update product by admin
// @route /api/v1/products/:id
// @access private/admin
const updateProduct = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let product = await Product.findById(id);
  if (!product) {
    throw new apiError(404, "Product not found!");
  }
  product.name = req.body.name || product.name;
  product.description = req.body.description || product.description;
  product.category = req.body.category || product.category;
  product.brand = req.body.brand || product.brand;
  product.price = req.body.price || product.price;
  product.countInStock = req.body.countInStock || product.countInStock;
  product.image = req.body.image || product.image;
  let updatedProduct = await product.save();
  res.send({
    message: "Product updated successfully!",
    product: updatedProduct,
  });
});

// @desc delete product by admin
// @route /api/v1/products/:id
// @access private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  let id = req.params.id;
  let product = await Product.findById(id);
  if (!product) {
    throw new apiError(404, "Product Not Found!");
  }
  await Product.findByIdAndDelete(id);
  res.send({ message: "Product deleted successfully!" });
});

// @desc get top rated products
// @route /api/v1/products/topproducts/:limit
// @access public
const getTopProducts = asyncHandler(async (req, res) => {
  let limit = Number(req.params.limit);
  let products = await Product.find({}).sort({ rating: -1 }).limit(limit);
  res.send(products);
});

const addUserReview = asyncHandler(async (req, res) => {
  let productId = req.params.id;
  let { rating, comment } = req.body;

  // Check if the current user is an admin
  if (req.user.isAdmin) {
    throw new apiError(403, "Admins are not allowed to add reviews.");
  }

  // Fetch the product by id
  let product = await Product.findById(productId);
  if (!product) {
    throw new apiError(404, "Product Not Found!");
  }

  // Check if the user has already reviewed the product
  const existingReview = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );

  if (existingReview) {
    // Update the existing review
    existingReview.rating = rating;
    existingReview.comment = comment;
  } else {
    // Add a new review if the user had not review before
    product.reviews.push({
      name: req.user.name,
      rating,
      comment,
      user: req.user._id,
    });
  }
  // Update the number of reviews
  product.numReviews = product.reviews.length;

  // Recalculate the product's average rating
  product.rating =
    product.reviews.reduce((acc, review) => acc + review.rating, 0) /
    product.reviews.length;

  // Save the product
  await product.save();

  res.send({ message: "Review added successfully!" });
});

export {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getTopProducts,
  addUserReview,
};
