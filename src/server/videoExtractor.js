import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import util from 'util';

const execPromise = util.promisify(exec);

export const extractVideoInfo = async (url) => {
  const timestamp = Date.now();
  const outputPath = `/app/videos/${timestamp}.mp4`;
  let isEmbedded = false;

  try {
    console.log(`📥 Attempting to download video: ${url}`);
    const { stdout, stderr } = await execPromise(`yt-dlp -o "${outputPath}" "${url}"`);
    console.log(`✅ Download output: ${stdout}`);
    if (stderr) console.error(`⚠ Download warnings: ${stderr}`);

    if (!fs.existsSync(outputPath)) {
      throw new Error(`Downloaded file not found at ${outputPath}`);
    }

    console.log(`📝 Extracting metadata from ${outputPath}`);
    const ffmpeg = (await import('fluent-ffmpeg')).default;

    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(outputPath, (err, metadata) => {
        if (err) {
          console.error(`❌ ffprobe error: ${err.message}`);
          return reject('Failed to extract video information.');
        }
        resolve({
          title: path.basename(outputPath),
          description: '',
          duration: metadata.format.duration,
          filePath: outputPath,
          isEmbedded
        });
      });
    });
  } catch (err) {
    console.warn(`⚡ Download failed, storing as embedded video: ${err.message}`);
    isEmbedded = true;
    return {
      title: `External Video - ${url}`,
      description: 'Embedded from external source.',
      duration: 'Unknown',
      filePath: url,
      isEmbedded
    };
  }
};