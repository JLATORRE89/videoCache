import fluent_ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const THUMBNAIL_DIR = process.env.THUMBNAIL_DIR || path.join(__dirname, '../../thumbnails');

export const generateThumbnail = async (videoUrl, videoId) => {
  const thumbnailPath = path.join(THUMBNAIL_DIR, `${videoId}.jpg`);
  
  return new Promise((resolve, reject) => {
    fluent_ffmpeg(videoUrl)
      .screenshots({
        count: 1,
        folder: THUMBNAIL_DIR,
        filename: `${videoId}.jpg`,
        size: '320x240'
      })
      .on('end', () => resolve(thumbnailPath))
      .on('error', reject);
  });
};