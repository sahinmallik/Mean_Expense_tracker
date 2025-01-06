import React, { useContext, useState } from "react";
import axios from "../config/axios";
import { UserContext } from "../context/user.context";
import { useNavigate } from "react-router-dom";

const Login = ({ setLogin }) => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return alert("Email and Password are required.");
    }

    await axios
      .post("/users/login", { email, password })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        setLogin(true); // Set login state to true
        navigate("/"); // Redirect to home page
      })
      .catch((err) => {
        console.error(err.response?.data || "An unknown error occurred");
        alert(err.response?.data?.message || "Login failed");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-white">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-400" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              className="w-full p-3 text-white bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-gray-400" htmlFor="password">
              Password
            </label>
            <input
              value={password}
              type="password"
              id="password"
              className="w-full p-3 text-white bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
