import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connect(process.env.MONGO_DB).then(() => {
    console.log("MongoDB connected");
  });
};

export default connectDB;
