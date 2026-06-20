const express = require("express");

const router = express.Router();

const productHandler = require("../handlers/product.handler");

router.post("/products", productHandler.createProduct);

router.get("/products", productHandler.getAllProducts);

router.get("/products/:id", productHandler.getProductById);

router.put("/products/:id", productHandler.updateProduct);

router.delete("/products/:id", productHandler.deleteProduct);

module.exports = router;
