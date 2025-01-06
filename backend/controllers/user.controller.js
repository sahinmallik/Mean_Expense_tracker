import { validationResult } from "express-validator";
import { createUser } from "../services/user.service.js"; // Import createUser function
import User from "../model/user.model.js";
import BlacklistToken from "../model/token.model.js";

export const signup = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // Use createUser function from user.service.js
    const user = await createUser({ name, email, password });
    const token = await user.generateToken();
    delete user._doc.password;
    res.status(201).json({ user, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    console.log(user);
    delete user._doc.password;
    return res.status(200).json({ user: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  // console.log(email, password);

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }
    // console.log(user.password);
    const isMatch = user.comparePassword(password);
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid email or password" });
    }
    const token = await user.generateToken();
    delete user._doc.password;
    res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    BlacklistToken.create({ token });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
