//imports
import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/dbconfig.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import Router from "./routes/indexRoute.js";

//configuring dotenv
dotenv.config();

//declaration of apps and port
const app = express();
const port = process.env.PORT || 5050;

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//Routes

app.use("/api", Router);

//database connection
dbConnection().then(() => {
  app.listen(port, () => {
    console.log(`Server is listening at port: http://localhost:${port}`);
  });
});
