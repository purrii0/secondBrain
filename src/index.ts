import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

app.post("/api/v1/signup", (req, res) => {});

app.post("/api/v1/signin", (req, res) => {});

app.get("/api/v1/content", (req, res) => {});

app.delete("/api/v1/content", (req, res) => {});

app.post("/api/v1/brain/share", (req, res) => {});

app.post("/api/v1/brain/:sharelink", (req, res) => {});
