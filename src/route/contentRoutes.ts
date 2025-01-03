import express from "express";
import { allContents, addContent } from "../controller/contentController";
import protectRoute from "../middleware/protect";

const contentRoutes = express.Router();

contentRoutes.post("/add", protectRoute, addContent);
contentRoutes.get("/all", protectRoute, allContents);

export default contentRoutes;
