import express from "express";
import dotenv from "dotenv";
import signup from "./signup";
import connecttoDB from "./connectToDB";
dotenv.config();

const app = express();
connecttoDB();

app.use(express.json());

app.post("/api/v1/signup", signup);

app.post("/api/v1/signin", (req, res) => {});

app.get("/api/v1/content", (req, res) => {});

app.delete("/api/v1/content", (req, res) => {});

app.post("/api/v1/brain/share", (req, res) => {});

app.post("/api/v1/brain/:sharelink", (req, res) => {});
