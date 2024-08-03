import express from "express";
import Users from "../models/userModel.js";

const router = express.Router();

router.post("/add-user", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = new Users({
      name,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
