# Base image
FROM node:18-alpine

# Install ffmpeg
RUN apk add --no-cache ffmpeg

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build frontend
RUN npm run build

# Create directories
RUN mkdir -p thumbnails

# Expose port
EXPOSE 3001

# Start application
CMD ["npm", "start"]
