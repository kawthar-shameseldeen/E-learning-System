import express from "express";
import mongoose from "mongoose";
import conn from "./connection.js"; // Assuming you have a connection.js file for setting up MongoDB connection
const app = express();

const PORT = process.env.PORT || 3030;

async function startServer() {
  try {
    await conn; 
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1); 
  }
}

startServer();
