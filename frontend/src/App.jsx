import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Navigation from "./Pages/Navigation";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/login" />;
};

const App = () => {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLogin(!!token); // Dynamically set login based on token presence
  }, []); // Only check on initial render

  return (
    <BrowserRouter>
      <Navigation isLoggedIn={login} setLogin={setLogin} />
      <Routes>
        {/* Protected Route for Home */}
        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={login}>
              <Home />
            </ProtectedRoute>
          }
        />
        {/* Login Route */}
        <Route
          path="/login"
          element={login ? <Navigate to="/" /> : <Login setLogin={setLogin} />}
        />
        {/* Signup Route */}
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
