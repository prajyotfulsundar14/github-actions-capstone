'use strict';

const app = require('./app');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server listening on port ${PORT}`);
});

// Graceful shutdown for containers (SIGTERM from Docker/K8s)
const shutdown = (signal) => {
  // eslint-disable-next-line no-console
  console.log(`Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    // eslint-disable-next-line no-console
    console.log('Server closed. Exiting process.');
    process.exit(0);
  });

  // Force-exit if it hangs
  setTimeout(() => process.exit(1), 10000).unref();
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

module.exports = server;
