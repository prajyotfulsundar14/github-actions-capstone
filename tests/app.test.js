'use strict';

const request = require('supertest');
const app = require('../src/app');

describe('GET /', () => {
  it('returns 200 and a welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('service', 'github-actions-capstone');
    expect(res.body).toHaveProperty('message');
  });
});

describe('GET /health', () => {
  it('returns 200 and status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('uptime');
    expect(res.body).toHaveProperty('timestamp');
  });

  it('returns a valid ISO timestamp', async () => {
    const res = await request(app).get('/health');
    expect(() => new Date(res.body.timestamp).toISOString()).not.toThrow();
  });
});

describe('GET /api/v1/info', () => {
  it('returns service metadata', async () => {
    const res = await request(app).get('/api/v1/info');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name', 'github-actions-capstone');
    expect(res.body).toHaveProperty('node');
  });
});

describe('Unknown routes', () => {
  it('returns 404 for an undefined route', async () => {
    const res = await request(app).get('/this-route-does-not-exist');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error', 'Not Found');
  });
});
