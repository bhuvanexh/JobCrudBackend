import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./service/db.js";
import jobRoutes from "./routes/jobRoutes.js"
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/jobs", jobRoutes);


app.get("/", (req, res) => {
    res.send("Job Board API is running...");
});

app.all('/{*any}', notFound);

app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
