import express from "express"
import {signin, signup} from "../controller/userController";

const userRoutes = express.Router();

userRoutes.post("/signup", signup);

userRoutes.post("/login", signin)

export default userRoutes;