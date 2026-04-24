import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import studentRoutes from './routes/studentRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import { setupSwagger } from './config/swagger.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', studentRoutes);
app.use('/api', noteRoutes);

// Swagger Documentation
setupSwagger(app);

const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
      console.log(`[swagger]: Documentation available at http://localhost:${port}/api-docs`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

startServer();
