# Use official Node.js runtime
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json (skip package-lock.json if missing)
COPY package.json ./

# Install dependencies (this will generate package-lock.json)
RUN npm install --legacy-peer-deps


# Expose frontend port
EXPOSE 3000


CMD ["serve", "build", "3000"]
