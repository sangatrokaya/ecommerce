import express from "express";
import multer from "multer";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import apiError from "../utils/apiError.util.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    let fn = Date.now() + "-" + file.originalname;
    cb(null, fn);
  },
});

const fileFilter = (req, file, cb) => {
  let imagePattern = /\.(jpg|jpeg|png|webp)$/;
  let isMatch = file.originalname.match(imagePattern);
  if (isMatch) cb(null, true);
  else cb(new apiError("Upload Only Image File!"), false);
};

const upload = multer({
  storage,
  fileFilter,
});

router.post(
  "/upload",
  upload.single("image"),
  asyncHandler(async (req, res) => {
    res.send({
      message: "Image Uploaded Successfully!",
      path: `/${req.file.path}`,
    });
  })
);

export default router;
