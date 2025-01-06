import Expense from "../model/expense.model.js";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
// Add Expense Controller
export const addExpense = async (req, res) => {
  try {
    const { title, amount, type, date } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const email = decodedToken.email;
    // Fetch the user ID from the email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    // Create a new expense
    const newExpense = new Expense({
      title,
      amount,
      type,
      date,
      user: req.user._id,
    });

    // Save the expense to the database
    await newExpense.save();

    res
      .status(201)
      .json({ message: "Expense added successfully", expense: newExpense });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add expense", error: error.message });
  }
};

// Get Expenses Controller
export const getExpenses = async (req, res) => {
  try {
    // Fetch all expenses from the database
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const email = decodedToken.email;
    // Fetch the user ID from the email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    const expenses = await Expense.find(req.user ? { user: req.user._id } : {});

    res.status(200).json({ expenses });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch expenses", error: error.message });
  }
};
