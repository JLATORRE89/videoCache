import React, { useState } from 'react';

const VideoList = ({ videos, onDelete, onUpdate }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const getEmbedUrl = (url) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtu.be') 
        ? url.split('/').pop()
        : new URLSearchParams(new URL(url).search).get('v');
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-full max-w-3xl">
            <iframe
              src={getEmbedUrl(selectedVideo.url)}
              className="w-full aspect-video mb-4"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
            <button
              onClick={() => setSelectedVideo(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {videos.map(video => (
        <div key={video.id} className="border rounded p-4">
          <div 
            onClick={() => setSelectedVideo(video)}
            className="cursor-pointer"
          >
            <img 
              src={video.thumbnailPath} 
              alt={video.title}
              className="w-full h-48 object-cover mb-2"
            />
            <h3 className="font-bold">{video.title}</h3>
            <p className="text-sm text-gray-600">{video.description}</p>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => onDelete(video.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
            <button
              onClick={() => onUpdate(video.id, video)}
              className="bg-gray-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoList;