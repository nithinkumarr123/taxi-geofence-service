class LocationEvent {
  constructor(vehicleId, timestamp, location) {
    this.vehicleId = vehicleId;
    this.timestamp = timestamp;
    this.location = location; // { lat, lng }
    this.eventId = require('uuid').v4();
  }

  validate() {
    const errors = [];
    
    if (!this.vehicleId || typeof this.vehicleId !== 'string') {
      errors.push('Vehicle ID is required and must be a string');
    }
    
    if (!this.timestamp || isNaN(new Date(this.timestamp).getTime())) {
      errors.push('Valid timestamp is required');
    }
    
    if (!this.location || typeof this.location !== 'object') {
      errors.push('Location object is required');
    } else {
      const { lat, lng } = this.location;
      if (typeof lat !== 'number' || lat < -90 || lat > 90) {
        errors.push('Latitude must be a number between -90 and 90');
      }
      if (typeof lng !== 'number' || lng < -180 || lng > 180) {
        errors.push('Longitude must be a number between -180 and 180');
      }
    }
    
    return errors;
  }
}

module.exports = LocationEvent;