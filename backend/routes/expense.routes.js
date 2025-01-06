import express from "express";
import { body } from "express-validator";
import * as expenseController from "../controllers/expense.controller.js";
import * as authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/add",
  authMiddleware.authUser,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("amount").not().isEmpty().withMessage("Amount is required"),
    body("type").not().isEmpty().withMessage("Type is required"),
    body("date").not().isEmpty().withMessage("Date is required"),
  ],
  expenseController.addExpense
);

router.get("/list", authMiddleware.authUser, expenseController.getExpenses);

export default router;
