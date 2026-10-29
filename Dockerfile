# Build Stage
FROM node:22-slim AS builder
WORKDIR /app

# Upgrade npm to latest stable to avoid Arborist dependency tree bugs
RUN npm install -g npm@latest

# Copy package files (now includes universal package-lock.json with ARM64 bindings)
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Build application
COPY . .
RUN npm run build

# Production Stage with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
