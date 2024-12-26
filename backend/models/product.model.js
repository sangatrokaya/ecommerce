import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: String,
  comments: String,
  rating: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: String,
    description: String,
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      //   enum: ["Electronics", "Clothing", "Stationery"]
    },
    price: {
      type: Number,
      required: true,
    },
    countInStock: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
