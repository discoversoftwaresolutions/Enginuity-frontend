# Stage 1: Build React app
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Build app with env variables embedded at build time
RUN npm run build

# Stage 2: Use Nginx to serve optimized build
FROM nginx:stable-alpine

# Remove default nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy built React app
COPY --from=build /app/build /usr/share/nginx/html

# Expose default http port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
