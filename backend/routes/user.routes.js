import express from "express";
import { body, check } from "express-validator";
import * as userController from "../controllers/user.controller.js";
import * as authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Email must be valid email address"),
    body("password")
      .isLength({ min: 3 })
      .withMessage("Password must be at least 3 character long"),
  ],
  userController.signup
);

router.get("/profile", authMiddleware.authUser, userController.getProfile);

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Email is invalid"),
    check("password").not().isEmpty().withMessage("Password is required"),
  ],
  userController.login
);

router.get("/logout", authMiddleware.authUser, userController.logout);

export default router;
