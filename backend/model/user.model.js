import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    select: false,
  },
});

// Hash the password
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

// Compare provided password with hashed password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate a JWT token for the user instance
userSchema.methods.generateToken = async function () {
  return jwt.sign({ email: this.email }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

const User = mongoose.model("User", userSchema);

export default User;
