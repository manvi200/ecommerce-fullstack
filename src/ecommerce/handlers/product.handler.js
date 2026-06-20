const productService = require("../services/product.services");

const createProduct = async (req, res) => {
  try {
    const result = await productService.createProduct(req.body);
    res.status(201).json({ status: "success", data: result });
  } catch (error) {
    res.status(400).json({ success: "false", message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const result = await productService.getAllProducts();
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(500).json({ success: "false", message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const result = await productService.getProductById(req.params.id);
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(404).json({ success: "false", message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const result = await productService.updateProduct(req.params.id, req.body);
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(400).json({ success: "false", message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const result = await productService.deleteProduct(req.params.id);
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    res.status(400).json({ success: "false", message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
