import express from "express";
import dotenv from "dotenv";
import connecttoDB from "./db/mongo";
import userRoutes from "./route/userRoutes";
import protectRoute from "./middleware/protect";
import contentRoutes from "./route/contentRoutes";
dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/v1/user", userRoutes);

app.use("/api/v1/content", contentRoutes);

app.delete("/api/v1/content", (req, res) => {});

app.post("/api/v1/brain/share", (req, res) => {});

app.post("/api/v1/brain/:sharelink", (req, res) => {});

app.listen(3000, () => {
  connecttoDB();
  console.log("Server is running on port 3000");
});
