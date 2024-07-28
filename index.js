import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/AuthRoutes.js";
import connectDb from "./config/databaseConfig.js";
import messageRouter from "./routes/MessageRoutes.js";


const app = express();
const PORT = process.env.PORT || 5000;


dotenv.config();
app.use(express.json());

app.use("/api/auth",authRouter);
app.use("/api/messages",messageRouter);

app.listen(PORT,()=>{
    connectDb();
    console.log("Server is listening on Port",PORT);
})