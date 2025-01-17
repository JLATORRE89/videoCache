export const extractVideoInfo = async (url) => {
  try {
    // Add implementation for different platforms (YouTube, Vimeo, etc.)
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const response = await fetch(`https://noembed.com/embed?url=${url}`);
      const data = await response.json();
      
      return {
        title: data.title,
        description: data.description || ''
      };
    }
    
    throw new Error('Unsupported video platform');
  } catch (error) {
    throw new Error('Failed to extract video information');
  }
};