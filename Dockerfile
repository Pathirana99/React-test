# Build Stage
FROM node:20-slim AS builder
WORKDIR /app

# Only copy package.json so Linux ARM64/x64 native dependencies resolve properly
COPY package.json ./

# Install dependencies and ensure matching architecture bindings (aarch64 for AWS Graviton / x86_64 for Intel)
RUN npm install --include=optional && \
    if [ "$(uname -m)" = "aarch64" ]; then \
      npm install -D @rolldown/binding-linux-arm64-gnu || true; \
    elif [ "$(uname -m)" = "x86_64" ]; then \
      npm install -D @rolldown/binding-linux-x64-gnu || true; \
    fi

# Build application
COPY . .
RUN npm run build

# Production Stage with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
