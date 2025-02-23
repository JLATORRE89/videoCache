import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function initDb() {
  const db = await open({ filename: './database.db', driver: sqlite3.Database });
  await db.exec(`
    CREATE TABLE IF NOT EXISTS videos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT NOT NULL,
      title TEXT,
      description TEXT,
      thumbnail TEXT,
      duration TEXT,
      isEmbedded INTEGER DEFAULT 0
    );
  `);
  return db;
}

export async function addVideo(url, title, description, thumbnail, duration, isEmbedded) {
  const db = await initDb();
  const result = await db.run(
    'INSERT INTO videos (url, title, description, thumbnail, duration, isEmbedded) VALUES (?, ?, ?, ?, ?, ?)',
    [url, title, description, thumbnail, duration, isEmbedded ? 1 : 0]
  );
  return { id: result.lastID, url, title, description, thumbnail, duration, isEmbedded };
}

export async function getAllVideos() {
  const db = await initDb();
  return db.all('SELECT * FROM videos');
}

export async function deleteVideo(id) {
  const db = await initDb();
  const result = await db.run('DELETE FROM videos WHERE id = ?', [id]);
  return result.changes > 0; // Returns true if a row was deleted
}