const express = require("express");

const router = express.Router();

const orderHandler = require("../handlers/order.handler");

router.post("/orders", orderHandler.createOrder);

router.get("/orders", orderHandler.getAllOrders);

router.get("/orders/:id", orderHandler.getOrderById);

router.put("/orders/:id", orderHandler.updateOrder);

router.delete("/orders/:id", orderHandler.deleteOrder);

module.exports = router;
