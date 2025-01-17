const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3001/api';

export const fetchVideos = async () => {
  const response = await fetch(`${API_BASE}/videos`);
  if (!response.ok) throw new Error('Failed to fetch videos');
  return response.json();
};

export const addVideo = async (url) => {
  const response = await fetch(`${API_BASE}/videos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  });
  if (!response.ok) throw new Error('Failed to add video');
  return response.json();
};

export const deleteVideo = async (id) => {
  const response = await fetch(`${API_BASE}/videos/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete video');
};

export const updateVideo = async (id, data) => {
  const response = await fetch(`${API_BASE}/videos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Failed to update video');
  return response.json();
};