const express = require("express");
const userHandler = require("../handlers/user.handler");
const productHandler = require("../handlers/product.handler");

const router = express.Router();

router.post("/users", userHandler.createUser);
router.get("/users", userHandler.getAllUsers);
router.get("/users/:id", userHandler.getUserById);
router.put("/users/:id", userHandler.updateUser);
router.delete("/users/:id", userHandler.deleteUser);

router.post("/products", productHandler.createProduct);
router.get("/products", productHandler.getAllProducts);
router.get("/products/:id", productHandler.getProductById);
router.put("/products/:id", productHandler.updateProduct);
router.delete("/products/:id", productHandler.deleteProduct);

module.exports = router;
