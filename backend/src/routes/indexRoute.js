import express from "express";
import userRoute from "./userRoute.js";
import jobRoute from "./jobRoute.js";
import authRoute from "./authRoute.js";
import applicationRoute from "./applicationRoute.js";
import savedJobRoute from "./savedJobRoute.js";
import analyticsRoute from "./analyticsRoute.js"
const Router = express.Router();

Router.use("/auth", authRoute);
Router.use("/user", userRoute);
Router.use("/job", jobRoute);
Router.use("/application", applicationRoute);
Router.use("/savedJob", savedJobRoute);      
Router.use("/analytics", analyticsRoute);      

export default Router;
