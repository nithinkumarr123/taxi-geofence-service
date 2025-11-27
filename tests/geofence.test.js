const { pointInPolygon } = require('../src/utils/geometry');

describe('Geofence Geometry Utilities', () => {
  const squarePolygon = [
    { lat: 0, lng: 0 },
    { lat: 0, lng: 10 },
    { lat: 10, lng: 10 },
    { lat: 10, lng: 0 }
  ];

  test('point inside polygon returns true', () => {
    const point = { lat: 5, lng: 5 };
    expect(pointInPolygon(point, squarePolygon)).toBe(true);
  });

  test('point outside polygon returns false', () => {
    const point = { lat: 15, lng: 5 };
    expect(pointInPolygon(point, squarePolygon)).toBe(false);
  });

  test('point on polygon boundary returns true', () => {
    const point = { lat: 0, lng: 5 };
    expect(pointInPolygon(point, squarePolygon)).toBe(true);
  });

  test('invalid polygon returns false', () => {
    const point = { lat: 5, lng: 5 };
    expect(pointInPolygon(point, [])).toBe(false);
    expect(pointInPolygon(point, [{ lat: 0, lng: 0 }])).toBe(false);
  });
});