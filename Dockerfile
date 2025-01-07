# Use Node.js base image
FROM node:18-alpine

# Install dependencies
RUN apk add --no-cache \
  ffmpeg \
  python3 \
  py3-pip \
  curl

# Install pipx and yt-dlp using pipx (or alternatively, use a virtual environment)
RUN pip install --no-cache-dir pipx
RUN pipx install yt-dlp

# Create and set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose the port dynamically
EXPOSE $PORT

# Start the Next.js app
CMD ["npm", "run", "start"]
