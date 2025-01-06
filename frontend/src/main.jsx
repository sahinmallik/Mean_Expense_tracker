import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UserProvider } from "./context/user.context.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </UserProvider>
);
