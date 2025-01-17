import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { setupRoutes } from './routes.js';
import { initDb } from './database.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/thumbnails', express.static(process.env.THUMBNAIL_DIR || 'thumbnails'));

// Setup routes
setupRoutes(app);

// Start server
const PORT = process.env.PORT || 3001;

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});