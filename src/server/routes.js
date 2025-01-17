import { getDb } from './database.js';
import { extractVideoInfo } from './videoExtractor.js';
import { generateThumbnail } from './thumbnailGenerator.js';

export const setupRoutes = (app) => {
  app.get('/api/videos', async (req, res) => {
    try {
      const db = getDb();
      const videos = await db.all('SELECT * FROM videos ORDER BY createdAt DESC');
      res.json(videos);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch videos' });
    }
  });

  app.post('/api/videos', async (req, res) => {
    try {
      const { url } = req.body;
      const db = getDb();
      
      // Extract video metadata
      const videoInfo = await extractVideoInfo(url);
      
      // Insert into database
      const result = await db.run(
        'INSERT INTO videos (url, title, description) VALUES (?, ?, ?)',
        [url, videoInfo.title, videoInfo.description]
      );
      
      // Generate thumbnail
      const thumbnailPath = await generateThumbnail(url, result.lastID);
      
      // Update thumbnail path
      await db.run(
        'UPDATE videos SET thumbnailPath = ? WHERE id = ?',
        [thumbnailPath, result.lastID]
      );
      
      const video = await db.get('SELECT * FROM videos WHERE id = ?', result.lastID);
      res.status(201).json(video);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add video' });
    }
  });

  app.put('/api/videos/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const db = getDb();
      
      await db.run(
        'UPDATE videos SET title = ?, description = ? WHERE id = ?',
        [title, description, id]
      );
      
      const video = await db.get('SELECT * FROM videos WHERE id = ?', id);
      res.json(video);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update video' });
    }
  });

  app.delete('/api/videos/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const db = getDb();
      await db.run('DELETE FROM videos WHERE id = ?', id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete video' });
    }
  });
};