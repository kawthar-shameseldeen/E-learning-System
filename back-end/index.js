import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import conn from "./connection.js";

const app = express();

app.use(express.json());
app.use(cors());

import userRoutes from "./routes/userRoutes.js";
import classRoutes from "./routes/classRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import dropRoutes from "./routes/dropRoutes.js";

app.use("/api", userRoutes);
app.use("/api", classRoutes);
app.use("/api", enrollmentRoutes);
app.use("/api", fileRoutes);
app.use("/api", dropRoutes);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  conn();
});
