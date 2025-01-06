import userModel from "../model/user.model.js";

export const createUser = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error("Name , Email and Password are required");
  }

  const hashPassword = await userModel.hashPassword(password);

  const user = await userModel.create({ name, email, password: hashPassword });

  return user;
};
