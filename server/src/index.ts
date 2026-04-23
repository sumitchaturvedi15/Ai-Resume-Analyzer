import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { analyzeResume } from "./routes/analyze.js";
const app=express();
app.use(cors());
app.use(express.json());
app.post("/analyze",analyzeResume);
app.listen(5000,()=>{
    console.log(`Server running on Port ${process.env.PORT}`);
})