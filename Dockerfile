# syntax=docker/dockerfile:1

##########################################
# Stage 1: Dependencies
##########################################
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
# Use npm ci when a lockfile is present, fall back to npm install otherwise
RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm install --omit=dev; fi

##########################################
# Stage 2: Build / test dependencies
##########################################
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi
COPY . .
RUN npm test -- --ci

##########################################
# Stage 3: Production runtime
##########################################
FROM node:20-alpine AS production

# Metadata
LABEL org.opencontainers.image.title="github-actions-capstone" \
      org.opencontainers.image.description="Day 48 GitHub Actions CI/CD Capstone" \
      org.opencontainers.image.licenses="MIT"

ENV NODE_ENV=production \
    PORT=3000

WORKDIR /app

# Run as a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=deps /app/node_modules ./node_modules
COPY src ./src
COPY package.json ./

USER appuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:3000/health', r => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

CMD ["node", "src/server.js"]
