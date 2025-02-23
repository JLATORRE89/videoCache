import React from 'react';

const VideoTable = ({ videos, onDelete, onPlay }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b">ID</th>
            <th className="px-6 py-3 border-b">Title</th>
            <th className="px-6 py-3 border-b">Description</th>
            <th className="px-6 py-3 border-b">Duration</th>
            <th className="px-6 py-3 border-b">Source</th>
            <th className="px-6 py-3 border-b">Preview</th>
            <th className="px-6 py-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id} className="text-center border-t">
              <td className="px-4 py-2">{video.id}</td>
              <td className="px-4 py-2">{video.title}</td>
              <td className="px-4 py-2">{video.description}</td>
              <td className="px-4 py-2">{video.duration}</td>
              <td className="px-4 py-2">
                {video.isEmbedded ? (
                  <span className="text-yellow-500 font-semibold">External Embed</span>
                ) : (
                  <span className="text-green-500 font-semibold">Local</span>
                )}
              </td>
              <td className="px-4 py-2">
                <video width="150" controls className="rounded">
                  {video.isEmbedded ? (
                    <source src={video.url} type="video/mp4" />
                  ) : (
                    <source src={`/videos/${video.id}`} type="video/mp4" />
                  )}
                  Your browser does not support the video tag.
                </video>
              </td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => onPlay(video)}
                  className="bg-blue-500 text-white px-3 py-1 rounded shadow hover:bg-blue-600"
                >
                  Play
                </button>
                <button
                  onClick={() => onDelete(video.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VideoTable;