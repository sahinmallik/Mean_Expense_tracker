import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import "dotenv/config.js";
import connectDB from "./db/db.js";
import userRoutes from "./routes/user.routes.js";
import expenseRoutes from "./routes/expense.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/users", userRoutes);
app.use("/expenses", expenseRoutes);

connectDB();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server at http://localhost:${PORT}`);
});
