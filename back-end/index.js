import express from 'express';
import dotenv from 'dotenv';
import conn from './connection.js';
import userRoutes from './routes/userRoutes.js';
import classRoutes from './routes/classRoutes.js';
import enrollmentRoutes from './routes/enrollmentRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import dropRoutes from './routes/dropRoutes.js';
import { protect } from './utils/authMiddleware.js'; 

dotenv.config(); 

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3030;

app.use('/api', userRoutes);
app.use('/api', classRoutes);
app.use('/api', enrollmentRoutes);
app.use('/api', fileRoutes);
app.use('/api', dropRoutes);

async function startServer() {
  try {
    await conn();
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
}

startServer();
