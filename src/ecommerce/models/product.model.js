const { ObjectId } = require("mongodb");
const { getDb } = require("../../config/db");

const productCollection = () => {
  return getDb().collection("products");
};

const createProduct = async (product) => {
  return await productCollection().insertOne(product);
};

const getAllProducts = async () => {
  return await productCollection().find().toArray();
};

const getProductById = async (id) => {
  return await productCollection().findOne({ _id: new ObjectId(id) });
};

const updateProduct = async (id, product) => {
  return await productCollection().updateOne(
    { _id: new ObjectId(id) },
    { $set: product },
  );
};

const deleteProduct = async (id) => {
  return await productCollection().deleteOne({ _id: new ObjectId(id) });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
