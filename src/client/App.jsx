import React, { useState, useEffect } from 'react';
import VideoForm from './components/VideoForm';
import VideoList from './components/VideoList';
import { fetchVideos, addVideo, deleteVideo, updateVideo } from './api';

const App = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const data = await fetchVideos();
      setVideos(data);
      if (data.length === 0) setError("No videos present, upload a video.");
      else setError(null);
    } catch (err) {
      setError(`⚠️ Error loading videos: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVideo = async (url) => {
    try {
      const newVideo = await addVideo(url);
      setVideos([...videos, newVideo]);
      setError(null);
    } catch (err) {
      setError(`⚠️ Failed to add video: ${err.message}`);
    }
  };

  const handleDeleteVideo = async (id) => {
    try {
      await deleteVideo(id);
      const updatedVideos = videos.filter(v => v.id !== id);
      setVideos(updatedVideos);
      if (updatedVideos.length === 0) setError("No videos present, upload a video.");
    } catch (err) {
      setError(`⚠️ Failed to delete video: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🎥 Video Manager</h1>
      {loading && <div className="p-4 mb-4 bg-yellow-100 rounded">Loading videos...</div>}
      {!loading && error && (
        <div className="bg-red-100 p-4 mb-4 rounded">{error}</div>
      )}
      <VideoForm onSubmit={handleAddVideo} />
      <VideoList 
        videos={videos} 
        onDelete={handleDeleteVideo}
      />
      <footer className="p-4 bg-gray-100 text-center text-sm mt-auto">
        <p>
          📜 <strong>Legal Notice:</strong> This application may only be used with content that complies with fair use or Creative Commons licensing.
          The owners are not responsible for content or data integrity accessed or stored on this application or its servers.
        </p>
        <p>
          🇪🇺 <strong>GDPR Notice:</strong> By using this service, you consent to the logging of IP addresses and database transaction numbers for compliance
          purposes.
        </p>
      </footer>
    </div>
  );
};

export default App;
