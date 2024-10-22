import { errorHandler } from "../utils/customError.js";
import * as XLSX from "xlsx";
import fs from "fs";
import path from "path";
import Product from "../models/products.model.js";

const __dirname = path.resolve();

export const uploadSheet = async (req, res, next) => {
  try {
    if (!req.file) {
      return errorHandler(400, "No file uploaded.");
    }

    const filePath = path.join(__dirname, req.file.path);

    // Read the file buffer using fs
    const fileBuffer = fs.readFileSync(filePath);

    // Use XLSX.read instead of XLSX.readFile
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Store each row in the MongoDB database
    const products = sheetData.map((row) => ({
      name: row.Name,
      description: row.Description,
      modelNumber: row["Model Number"],
      price: row.Price,
    }));

    await Product.insertMany(products);
    res.status(201).json({ message: "Products added successfully", products });
  } catch (error) {
    console.error("Error during upload:", error.message);
    next(errorHandler(500, `Server error: ${error.message}`));
  }
};

export const getProducts = async (req, res, next) => {
  const data = await Product.find({});
  res.json(data);
};
export const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, modelNumber, price } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, modelNumber, price },
      { new: true }
    );
    res.json({ message: "update saved successfully", updatedProduct });
  } catch (error) {
    res.status(400).json({ message: "Error updating product", error });
  }
};
export const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting product", error });
  }
};
