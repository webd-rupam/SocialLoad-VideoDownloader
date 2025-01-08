# Use Node.js base image
FROM node:18-alpine

# Install dependencies
RUN apk add --no-cache \
  ffmpeg \
  python3 \
  py3-pip \
  curl

# Create a virtual environment
RUN python3 -m venv /venv

# Activate virtual environment and install yt-dlp
RUN /venv/bin/pip install --no-cache-dir yt-dlp

# Create and set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

# Copy cookies.txt into the container at the root directory (same level as the Dockerfile)
COPY cookies.txt /cookies.txt

# Build the Next.js app
RUN npm run build

# Expose the port dynamically
EXPOSE $PORT

# Start the Next.js app in production mode
CMD ["npm", "run", "start"]
