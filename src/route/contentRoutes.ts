import express from "express";
import allContents from "../controller/contentController";
import protectRoute from "../middleware/protect";

const contentRoutes = express.Router();

contentRoutes.get("/all", protectRoute, allContents);

export default contentRoutes;
