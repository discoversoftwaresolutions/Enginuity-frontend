# Base image
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json (skip package-lock.json)
COPY package.json ./

# Install dependencies with legacy peer deps handling
RUN npm install --legacy-peer-deps

# Copy all other source files
COPY . .

# Build the React app
RUN npm run build

# Final stage: serving via lightweight web server
FROM node:18-alpine as production
WORKDIR /app

# Install static file server
RUN npm install -g serve

# Copy built app from previous stage
COPY --from=build /app/build ./build

# Expose port for Railway
EXPOSE 3000

# Start the server
CMD ["serve", "-s", "build", "-l", "3000"]
