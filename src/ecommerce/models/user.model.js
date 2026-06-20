const { ObjectId } = require("mongodb");
const { getDb } = require("../../config/db");

const userCollection = () => {
  return getDb().collection("users");
};

const createUser = async (user) => {
  return await userCollection().insertOne(user);
};

const getAllUsers = async () => {
  return await userCollection().find().toArray();
};

const getUserById = async (id) => {
  return await userCollection().findOne({ _id: new ObjectId(id) });
};

const updateUser = async (id, user) => {
  return await userCollection().updateOne(
    { _id: new ObjectId(id) },
    { $set: user },
  );
};

const deleteUser = async (id) => {
  return await userCollection().deleteOne({ _id: new ObjectId(id) });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
