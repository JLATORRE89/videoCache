import { getAllVideos, addVideo, deleteVideo } from './database.js';
import { generateThumbnail } from './thumbnailGenerator.js';
import { extractVideoInfo } from './videoExtractor.js';

export function setupRoutes(app) {
  app.get('/api/videos', async (req, res) => {
    try {
      const videos = await getAllVideos();
      res.json(videos);
    } catch (err) {
      console.error(`❌ Retrieve error: ${err.message}`);
      res.status(500).json({ error: 'Failed to retrieve videos.' });
    }
  });

  app.post('/api/videos', async (req, res) => {
    try {
      const { url } = req.body;
      if (!url) return res.status(400).json({ error: 'URL is required.' });

      const { title, description, duration, filePath, isEmbedded } = await extractVideoInfo(url);
      const thumbnail = isEmbedded ? '' : await generateThumbnail(filePath, Date.now());
      const video = await addVideo(url, title, description, thumbnail, duration, isEmbedded);
      res.json(video);
    } catch (err) {
      console.error(`❌ Add video error: ${err.message}`);
      res.status(500).json({ error: 'Failed to add video.' });
    }
  });
}