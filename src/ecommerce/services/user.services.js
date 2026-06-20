const userModel = require("../models/user.model");

const createUser = async (userData) => {
  if (!userData.name) {
    throw new Error("Name is required");
  }
  return await userModel.createUser(userData);
};

const getAllUsers = async () => {
  return await userModel.getAllUsers();
};

const getUserById = async (id) => {
  return await userModel.getUserById(id);
};

const updateUser = async (id, data) => {
  return await userModel.updateUser(id, data);
};

const deleteUser = async (id) => {
  return await userModel.deleteUser(id);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
