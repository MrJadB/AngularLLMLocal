# Use Node.js for building the frontend
FROM node:20.16.0-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY . /usr/src/app

# Install dependencies
RUN npm install -g @angular/cli

# Build the Angular application
RUN npm install --legacy-peer-deps

# Expose port 4200
EXPOSE 4200

# Start nginx
CMD ["ng", "serve"]
