import fluent_ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const THUMBNAIL_DIR = process.env.THUMBNAIL_DIR || path.join(__dirname, '../../thumbnails');

export const generateThumbnail = (videoUrl, videoId) =>
  new Promise((resolve, reject) => {
    try {
      fluent_ffmpeg(videoUrl)
        .screenshots({
          count: 1,
          folder: THUMBNAIL_DIR,
          filename: `${videoId}.jpg`,
          size: '320x240'
        })
        .on('end', () => resolve(`/thumbnails/${videoId}.jpg`))
        .on('error', (err) => {
          console.error(`❌ Thumbnail generation error: ${err.message}`);
          reject('Failed to generate thumbnail.');
        });
    } catch (err) {
      console.error(`❌ Unexpected error in generateThumbnail: ${err.message}`);
      reject('Unexpected error during thumbnail generation.');
    }
  });