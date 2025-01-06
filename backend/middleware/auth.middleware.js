import BlacklistedToken from "../model/token.model.js";
import jwt from "jsonwebtoken";
export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Please authenticate" });
    }

    // Check if token is blacklisted
    const isBlacklisted = await BlacklistedToken.findOne({ token });
    if (isBlacklisted) {
      res.cookie("token", "");
      return res.status(401).json({ message: "Please authenticate" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
