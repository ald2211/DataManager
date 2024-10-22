import express from "express";
import {
  uploadSheet,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "api/uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Upload pdf route
router.post("/upload", upload.single("file"), uploadSheet);
router.get("/", getProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
