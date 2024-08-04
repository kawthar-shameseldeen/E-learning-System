import express from "express";
import conn from "./connection.js";
import userRoutes from "./routes/userRoutes.js";
import classRoutes from './routes/classRoutes.js';
import enrollmentRoutes from './routes/enrollmentRoutes.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3030;

app.use("/api", userRoutes);
app.use('/api', classRoutes);
app.use('/api', enrollmentRoutes);

async function startServer() {
  try {
    await conn();
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

startServer();
