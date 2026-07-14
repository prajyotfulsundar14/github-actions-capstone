'use strict';

const express = require('express');

const app = express();

app.use(express.json());

// Basic request logging (kept dependency-free on purpose)
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    // eslint-disable-next-line no-console
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${ms}ms`);
  });
  next();
});

/**
 * GET /
 * Basic welcome route
 */
app.get('/', (req, res) => {
  res.status(200).json({
    service: 'github-actions-capstone',
    message: 'Welcome to the Day 48 CI/CD Capstone API',
  });
});

/**
 * GET /health
 * Health endpoint used by:
 *  - Docker HEALTHCHECK
 *  - docker-compose healthcheck
 *  - health-check.yml scheduled workflow
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
  });
});

/**
 * GET /api/v1/info
 * Simple sample endpoint to prove the app does something beyond health
 */
app.get('/api/v1/info', (req, res) => {
  res.status(200).json({
    name: 'github-actions-capstone',
    env: process.env.NODE_ENV || 'development',
    node: process.version,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Central error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
// test change
// test change
