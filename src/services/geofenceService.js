const { pointInPolygon } = require('../utils/geometry');

class GeofenceService {
  constructor() {
    this.zones = new Map();
    this.initializeSampleZones();
  }

  initializeSampleZones() {
    const downtownZone = {
      zoneId: 'downtown',
      name: 'Downtown Core',
      vertices: [
        { lat: 40.7505, lng: -73.9934 },
        { lat: 40.7505, lng: -73.9800 },
        { lat: 40.7580, lng: -73.9800 },
        { lat: 40.7580, lng: -73.9934 }
      ]
    };

    const airportZone = {
      zoneId: 'airport',
      name: 'International Airport',
      vertices: [
        { lat: 40.6413, lng: -73.7781 },
        { lat: 40.6453, lng: -73.7761 },
        { lat: 40.6433, lng: -73.7821 }
      ]
    };

    this.addZone(downtownZone);
    this.addZone(airportZone);
  }

  addZone(zoneData) {
    const errors = this.validateZone(zoneData);
    if (errors.length > 0) {
      throw new Error(`Invalid zone data: ${errors.join(', ')}`);
    }

    this.zones.set(zoneData.zoneId, zoneData);
    return zoneData;
  }

  validateZone(zoneData) {
    const errors = [];
    
    if (!zoneData.zoneId || typeof zoneData.zoneId !== 'string') {
      errors.push('Zone ID is required');
    }
    
    if (!zoneData.vertices || !Array.isArray(zoneData.vertices) || zoneData.vertices.length < 3) {
      errors.push('Zone must have at least 3 vertices');
    }
    
    return errors;
  }

  findZoneForLocation(location) {
    for (const [zoneId, zone] of this.zones) {
      if (pointInPolygon(location, zone.vertices)) {
        return zoneId;
      }
    }
    return null;
  }

  getAllZones() {
    return Array.from(this.zones.values());
  }

  getZone(zoneId) {
    return this.zones.get(zoneId);
  }

  deleteZone(zoneId) {
    return this.zones.delete(zoneId);
  }
}

module.exports = new GeofenceService();