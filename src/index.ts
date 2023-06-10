import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
mongoose.set("strictQuery", false);
import app from "./app";

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Started server on port", process.env.PORT));
mongoose
  .connect(`${process.env.MONGO_URL!}`)
  .then(async () => {
    console.log("Connected to Database!");
  })
  .catch((err) => console.error("Error connecting to database!", err));

export default app;
