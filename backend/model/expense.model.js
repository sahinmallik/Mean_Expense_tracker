import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  title: {
    // Title
    type: String,
    required: true,
  },
  amount: {
    // Amount
    type: Number,
    required: true,
  },
  type: {
    // Type
    type: String,
    required: true,
  },
  date: {
    // Date
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
