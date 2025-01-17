import React, { useState, useEffect } from 'react';
import VideoForm from './components/VideoForm';
import VideoList from './components/VideoList';
import { fetchVideos, addVideo, deleteVideo, updateVideo } from './api';

const App = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const data = await fetchVideos();
      setVideos(data);
    } catch (err) {
      setError('Failed to load videos');
    }
  };

  const handleAddVideo = async (url) => {
    try {
      const newVideo = await addVideo(url);
      setVideos([...videos, newVideo]);
    } catch (err) {
      setError('Failed to add video');
    }
  };

  const handleDeleteVideo = async (id) => {
    try {
      await deleteVideo(id);
      setVideos(videos.filter(v => v.id !== id));
    } catch (err) {
      setError('Failed to delete video');
    }
  };

  const handleUpdateVideo = async (id, data) => {
    try {
      const updated = await updateVideo(id, data);
      setVideos(videos.map(v => v.id === id ? updated : v));
    } catch (err) {
      setError('Failed to update video');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Video Manager</h1>
      {error && <div className="bg-red-100 p-4 mb-4 rounded">{error}</div>}
      <VideoForm onSubmit={handleAddVideo} />
      <VideoList 
        videos={videos} 
        onDelete={handleDeleteVideo}
        onUpdate={handleUpdateVideo}
      />
    </div>
  );
};

export default App;