import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios";

const Navigation = ({ isLoggedIn, setLogin }) => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleLogOut = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.get("/users/logout", {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setLogin(false); // Update app-level login state
      navigate("/login"); // Redirect to login page
    } catch (err) {
      console.error(err.response?.data || "Failed to log out");
      alert(err.response?.data?.message || "Failed to log out");
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) {
      setUserName(user.name);
    }
  }, [isLoggedIn]); // Run when `isLoggedIn` changes

  return (
    <nav className="p-4 bg-gray-800">
      <div className="container flex items-center justify-between mx-auto">
        <div className="text-xl font-bold text-white">Expense Tracker</div>
        <div className="flex items-center">
          {isLoggedIn && (
            <span className="mr-4 text-white">Hello, {userName}</span>
          )}
          {isLoggedIn ? (
            <button
              onClick={handleLogOut}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              Log out
            </button>
          ) : (
            <Link to="/login">
              <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
