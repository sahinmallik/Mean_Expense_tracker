import React, { useState, useEffect } from "react";
import axios from "../config/axios";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [expenses, setExpenses] = useState([]);

  // Toggle Modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Add Expense
  const addExpense = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const type = event.target.type.value; // Get type from the form
    const newExpense = {
      title,
      amount: parseFloat(amount),
      type,
      date,
    };

    try {
      const res = await axios.post("/expenses/add", newExpense, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      const addedExpense = res.data.expense;

      // Refetch the expenses after adding a new one
      fetchExpenses();

      // Reset form fields
      setTitle("");
      setAmount(0);
      setDate("");

      // Close modal
      toggleModal();
    } catch (err) {
      console.error(err.message);
    }
  };

  // Fetch Expenses and Calculate Total
  const fetchExpenses = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("/expenses/list", {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      const fetchedExpenses = res.data.expenses;

      setExpenses(fetchedExpenses);

      // Calculate total amount
      const total = fetchedExpenses.reduce((acc, expense) => {
        return expense.type === "credit"
          ? acc - expense.amount
          : acc + expense.amount;
      }, 0);
      setTotalAmount(total);
    } catch (err) {
      console.error(err.response?.data || "An unknown error occurred");
    }
  };

  // Fetch expenses initially on component mount
  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-900">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="mb-6 text-2xl font-bold text-center text-white">
              Add Expense
            </h2>
            <form onSubmit={addExpense}>
              <div className="mb-4">
                <label className="block mb-2 text-gray-400" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full p-3 text-white bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter title"
                  required
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-400" htmlFor="amount">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  className="w-full p-3 text-white bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                  required
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-400" htmlFor="type">
                  Type
                </label>
                <select
                  id="type"
                  className="w-full p-3 text-white bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="debit" className="text-white bg-gray-700">
                    Debit
                  </option>
                  <option value="credit" className="text-white bg-gray-700">
                    Credit
                  </option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-gray-400" htmlFor="date">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="w-full p-3 text-white bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full p-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save
              </button>
              <button
                type="button"
                className="w-full p-3 mt-4 font-bold text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={toggleModal}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Expenses */}
      <div className="flex mt-0">
        <div className="w-1/2 p-4">
          <h2 className="mb-4 text-xl font-bold text-white">Expenses</h2>
          <div className="p-2 space-y-2 overflow-y-scroll bg-gray-800 rounded h-96">
            {expenses.length === 0 ? (
              <p className="text-center text-white">No expense is there</p>
            ) : (
              <ul>
                {expenses.map((expense, index) => (
                  <li
                    key={index}
                    className="p-4 mb-2 text-white bg-gray-700 rounded hover:bg-gray-600"
                  >
                    <div className="flex justify-between">
                      <span>{expense.title}</span>
                      <span
                        className={
                          expense.type !== "credit"
                            ? "text-red-500"
                            : "text-green-500"
                        }
                      >
                        {expense.amount} /-
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{expense.type}</span>
                      <span>{expense.date.split("T")[0]}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="w-1/2 p-4">
          <h2 className="mb-4 text-xl font-bold text-white">Total Amount</h2>
          <div className="p-4 text-5xl text-white">{totalAmount} /-</div>
          <button
            className="flex items-center p-3 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={toggleModal}
          >
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
