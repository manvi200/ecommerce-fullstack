const { ObjectId } = require("mongodb");
const { getDb } = require("../../config/db");

const orderCollection = () => {
  return getDb().collection("orders");
};

const createOrder = async (order) => {
  return await orderCollection().insertOne(order);
};

const getAllOrders = async () => {
  return await orderCollection().find().toArray();
};

const getOrderById = async (id) => {
  return await orderCollection().findOne({
    _id: new ObjectId(id),
  });
};

const updateOrder = async (id, order) => {
  return await orderCollection().updateOne(
    { _id: new ObjectId(id) },
    { $set: order },
  );
};

const deleteOrder = async (id) => {
  return await orderCollection().deleteOne({
    _id: new ObjectId(id),
  });
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
