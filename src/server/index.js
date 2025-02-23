import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { setupRoutes } from './routes.js';
import { initDb } from './database.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.json());
app.use('/videos', express.static(path.join(__dirname, '../../videos')));
app.use('/thumbnails', express.static(process.env.THUMBNAIL_DIR || 'thumbnails'));

setupRoutes(app);

app.use(express.static(path.join(__dirname, '../../dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

const args = process.argv.slice(2);
const portArgIndex = args.indexOf('--port');
const PORT = portArgIndex !== -1 ? args[portArgIndex + 1] : process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});