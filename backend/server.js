import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();
const port = process.env.PORT || 8000;

//middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["https://quizzie-six-three.vercel.app","http://localhost:3000"],
    credentials: true,
  })
);

// mongodb connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDb connection succeeded!");
  })
  .catch((err) => {
    console.log("Error connecting to Mongo" + err);
  });

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected!");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/user", userRoutes);

// Error handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
