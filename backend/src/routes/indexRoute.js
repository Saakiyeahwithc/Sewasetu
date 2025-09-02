import express from "express";
import userRoute from "./userRoute.js";
import jobRoute from "./jobRoute.js";
import authRoute from "./authRoute.js";

const Router = express.Router();

Router.use("/auth", authRoute);
Router.use("/user", userRoute);
Router.use("/job", jobRoute);

export default Router;
