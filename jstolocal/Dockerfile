# Use Node.js as the base image
FROM node:20.16.0-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY /package*.json ./

#Install curl
RUN apk --no-cache add curl

#install python 
RUN apk add --no-cache python3 py3-pip \&& ln -sf python3 /usr/bin/python

#Install jq
RUN apk add --no-cache curl jq bash

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the application code
COPY / .

# Expose the backend port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
