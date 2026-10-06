# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies for both workspaces
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/
RUN npm install

# Build frontend
COPY . .
ARG VITE_APP_VERSION
ENV VITE_APP_VERSION=$VITE_APP_VERSION
RUN npm run build:frontend

# Serve Stage
FROM node:20-alpine
WORKDIR /app

# Copy production dependencies and built code
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/
RUN npm install --production

# Copy built frontend and backend code
COPY --from=builder /app/frontend/dist ./frontend/dist
COPY --from=builder /app/backend ./backend

EXPOSE 3000
ENV NODE_ENV=production
ENV PORT=3000

CMD ["npm", "run", "start:backend"]
