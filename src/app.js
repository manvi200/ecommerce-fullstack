const express = require("express");
const userRoutes = require("./router/user.route");
const productRoutes = require("./router/product.router");
const orderRoutes = require("./router/order.router");

const app = express();
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

module.exports = app;
