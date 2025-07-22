import express from "express";
import userRoute from "./userRoute.js";
import jobRoute from "./jobRoute.js";

const Router = express.Router();

Router.use("/user", userRoute);
Router.use("/job", jobRoute);

export default Router;
