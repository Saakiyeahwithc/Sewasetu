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
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

//Routes
app.get("/health", (req, res) => {
  res.json({
    status: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api", Router);

//database connection
dbConnection()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is listening at port: http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });
