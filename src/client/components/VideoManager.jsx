import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VideoManager.css';

const VideoManager = () => {
  const [videos, setVideos] = useState([]);
  const [newVideoUrl, setNewVideoUrl] = useState('');

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/videos`);
      setVideos(response.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const addVideo = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/videos`, { url: newVideoUrl });
      setNewVideoUrl('');
      fetchVideos();
    } catch (error) {
      console.error('Error adding video:', error);
    }
  };

  const deleteVideo = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/videos/${id}`);
      fetchVideos();
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  const getEmbeddedUrl = (url) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('youtube.com')) {
        const videoId = urlObj.searchParams.get('v');
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
      }
      return url;
    } catch (error) {
      console.error('Invalid URL:', error);
      return url;
    }
  };

  return (
    <div className="container modern-layout">
      <header className="header-modern">
        <h1>🎬 Video Manager</h1>
        <div className="input-container modern-input">
          <input
            type="text"
            placeholder="Enter video URL"
            value={newVideoUrl}
            onChange={(e) => setNewVideoUrl(e.target.value)}
          />
          <button className="modern-button" onClick={addVideo}>
            Add Video
          </button>
        </div>
      </header>

      <section className="video-list modern-video-list content-flex">
        {videos.length === 0 ? (
          <p>No videos present, upload a video.</p>
        ) : (
          videos.map((video) => (
            <div key={video.id} className="video-card modern-card">
              <div className="video-frame-container modern-frame">
                {video.isEmbedded ? (
                  <iframe
                    className="responsive-iframe modern-iframe"
                    src={getEmbeddedUrl(video.url)}
                    title={`Video-${video.id}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video width="100%" controls>
                    <source src={`/videos/${video.id}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
              <h3>{video.title || 'Untitled Video'}</h3>
              <p>Duration: {video.duration || 'Unknown'}</p>
              {video.isEmbedded && (
                <span className="external-badge modern-badge">Embedded from external source</span>
              )}
              <div className="action-buttons modern-actions">
                <button className="modern-btn delete-btn" onClick={() => deleteVideo(video.id)}>
                  Delete
                </button>
                <button className="modern-btn edit-btn">Edit</button>
              </div>
            </div>
          ))
        )}
      </section>

      <footer className="modern-footer anchored-footer">
        <p>📝 <strong>Legal Notice:</strong> This application may only be used with content that complies with fair use or Creative Commons licensing. The owners are not responsible for content or data integrity accessed or stored on this application or its servers.</p>
        <p>🇪🇺 <strong>GDPR Notice:</strong> By using this service, you consent to the logging of IP addresses and database transaction numbers for compliance purposes.</p>
      </footer>
    </div>
  );
};

export default VideoManager;
