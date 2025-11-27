const request = require('supertest');
const app = require('../server');

describe('Geofence Service API', () => {
  test('POST /events/location processes valid event', async () => {
    const event = {
      vehicleId: 'test_vehicle_1',
      timestamp: new Date().toISOString(),
      location: { lat: 40.7515, lng: -73.9900 }
    };

    const response = await request(app)
      .post('/events/location')
      .send(event)
      .expect(200);

    expect(response.body.status).toBe('success');
    expect(response.body.data.vehicleId).toBe(event.vehicleId);
  });

  test('GET /vehicles/:id/status returns vehicle status', async () => {
    const response = await request(app)
      .get('/vehicles/test_vehicle_1/status')
      .expect(200);

    expect(response.body.status).toBe('success');
    expect(response.body.data.vehicleId).toBe('test_vehicle_1');
  });

  test('GET /health returns service status', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);

    expect(response.body.status).toBe('healthy');
  });
});