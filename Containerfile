# ✅ **Updated Containerfile: Backend on Port 5000, Frontend on Port 3001 (Fixed Dist Directory Issue and Port Conflict)**

# Base image with Node.js for React application
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# ✅ Copy .env file into the container
COPY .env .env

# ✅ Ensure CORS package is installed for backend handling
RUN npm install cors

# ✅ Build the frontend before starting servers to ensure /dist exists
RUN npm run build

# Expose ports for React development server and backend
EXPOSE 3001 5000

# ✅ Start backend on port 5000 and serve built frontend with proper concurrency handling
CMD ["sh", "-c", "npm run dev:server -- --port 5000 & sleep 5 && npm run preview -- --host 0.0.0.0 --port 3001"]
