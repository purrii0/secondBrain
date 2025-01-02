import express from "express";
import dotenv from "dotenv";
import signup from "./signup";
import connecttoDB from "./connectToDB";
import { sign } from "crypto";
dotenv.config();

const app = express();
connecttoDB();

app.use(express.json());

console.log("signup:", signup());
app.post("/api/v1/signup", signup());

app.post("/api/v1/signin", (req, res) => {});

app.get("/api/v1/content", (req, res) => {});

app.delete("/api/v1/content", (req, res) => {});

app.post("/api/v1/brain/share", (req, res) => {});

app.post("/api/v1/brain/:sharelink", (req, res) => {});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
