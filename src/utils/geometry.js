/**
 * Ray casting algorithm to determine if point is inside polygon
 * @param {Object} point - { lat, lng }
 * @param {Array} polygon - Array of { lat, lng }
 * @returns {boolean}
 */
function pointInPolygon(point, polygon) {
  if (!point || !polygon || polygon.length < 3) {
    return false;
  }

  const x = point.lng;
  const y = point.lat;
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lng;
    const yi = polygon[i].lat;
    const xj = polygon[j].lng;
    const yj = polygon[j].lat;

    if (xi === x && yi === y) return true;
    if (xj === x && yj === y) return true;

    if (yi === yj && yi === y && x > Math.min(xi, xj) && x < Math.max(xi, xj)) {
      return true;
    }

    if (xi === xj && xi === x && y > Math.min(yi, yj) && y < Math.max(yi, yj)) {
      return true;
    }

    const intersect = ((yi > y) !== (yj > y)) &&
      (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    
    if (intersect) inside = !inside;
  }

  return inside;
}


function calculateDistance(point1, point2) {
  const R = 6371000; // Earth's radius in meters
  const dLat = (point2.lat - point1.lat) * Math.PI / 180;
  const dLng = (point2.lng - point1.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

module.exports = {
  pointInPolygon,
  calculateDistance
};