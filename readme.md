# Video Metadata Extractor & Player

A Single Page Application (SPA) that extracts metadata from video URLs, generates thumbnails, and plays embedded videos. Built with React and Node.js.

## Features

- 📥 Extract video metadata (title, description)
- 🖼️ Generate thumbnails automatically
- ▶️ Play embedded videos in modal window
- 🎥 Support for YouTube URLs (expandable to other platforms)
- 💾 SQLite database storage
- 📱 Responsive grid layout

## Tech Stack

- Frontend: React, Tailwind CSS
- Backend: Node.js, Express
- Database: SQLite
- Video Processing: fluent-ffmpeg

## Installation Options

### Option 1: Docker (Recommended)

All prerequisites are included in the Docker image. You only need:
- Docker installed on your system

```bash
# Build image
docker build -t video-extractor .

# Run container
docker run -p 3001:3001 -v $(pwd)/thumbnails:/app/thumbnails video-extractor
```

### Option 2: Manual Setup

Prerequisites for manual setup:
- Node.js 18+
- ffmpeg installed on your system

```bash
# Install ffmpeg - Ubuntu/Debian
sudo apt update && sudo apt install ffmpeg

# Install ffmpeg - macOS
brew install ffmpeg

# Install ffmpeg - Windows
# Download and install from https://www.ffmpeg.org/download.html

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Create thumbnails directory
mkdir thumbnails
```

## Project Structure

```
.
|   .env.example
|   .gitignore
|   Dockerfile
|   package.json
|   tailwind.config.js
|
+---src
|   +---client
|   |   |   api.js
|   |   |   App.jsx
|   |   |   index.css
|   |   |   index.js
|   |   |
|   |   \---components
|   |           VideoForm.jsx
|   |           VideoList.jsx
|   |
|   \---server
|           database.js
|           index.js
|           routes.js
|           thumbnailGenerator.js
|           videoExtractor.js
|
\---thumbnails
```

## Development

Start the backend development server:
```bash
npm run dev:server
```

Start the frontend development server:
```bash
npm run dev:client
```

## API Endpoints

- `GET /api/videos` - List all videos
- `POST /api/videos` - Add new video
- `PUT /api/videos/:id` - Update video
- `DELETE /api/videos/:id` - Delete video

## Environment Variables

- `PORT` - Server port (default: 3001)
- `DB_PATH` - SQLite database path
- `THUMBNAIL_DIR` - Thumbnail storage directory
- `REACT_APP_API_BASE` - API base URL for frontend

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details