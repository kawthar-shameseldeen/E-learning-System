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

app.use("/api/users", userRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/drops", dropRoutes);


const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  conn();
});
