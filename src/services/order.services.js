const orderModel = require("../models/order.model");

const createOrder = async (orderData) => {
  return await orderModel.createOrder(orderData);
};

const getAllOrders = async () => {
  return await orderModel.getAllOrders();
};

const getOrderById = async (id) => {
  return await orderModel.getOrderById(id);
};

const updateOrder = async (id, data) => {
  return await orderModel.updateOrder(id, data);
};

const deleteOrder = async (id) => {
  return await orderModel.deleteOrder(id);
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
