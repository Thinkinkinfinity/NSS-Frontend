# Use an official Node.js runtime as a parent image
FROM node:14-alpine
# Set the working directory to /app
WORKDIR /app
# Copy the package.json and package-lock.json files to the container
COPY package*.json ./
# Install the dependencies
RUN npm install

RUN npm install -g serve

# Copy the rest of the application code to the container
COPY . .

# Build the production-ready application
RUN npm run build

# Expose port 3000
EXPOSE 80

# Start the application
# CMD ["npm", "start"]
CMD ["serve", "-s", "build", "-l", "80"]