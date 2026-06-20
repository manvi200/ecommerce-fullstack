const { ObjectId } = require("mongodb");
const { getDb } = require("../config/db");

const userCollections = () => {
  return getDb().collection("users");
};

const createUser = async (user) => {
  return await userCollections().insertOne(user);
};

const getAllUsers = async () => {
  return await userCollections().find().toArray();
};

const getUserById = async (id) => {
  return await userCollections().findOne({ _id: new ObjectId(id) });
};

const updateUser = async (id, user) => {
  return await userCollections().updateOne(
    { _id: new ObjectId(id) },
    { $set: user },
  );
};

const deleteUser = async (id) => {
  return await userCollections().deleteOne({ _id: new ObjectId(id) });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
