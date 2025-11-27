const VehicleStatus = require('../models/VehicleStatus');
const geofenceService = require('./geofenceService');

class EventProcessingService {
  constructor() {
    this.vehicleStatuses = new Map();
  }

  processLocationEvent(eventData) {
    const validationErrors = this.validateEvent(eventData);
    if (validationErrors.length > 0) {
      throw new Error(`Invalid event data: ${validationErrors.join(', ')}`);
    }

    const event = {
      vehicleId: eventData.vehicleId,
      timestamp: new Date(eventData.timestamp),
      location: eventData.location,
      eventId: require('uuid').v4()
    };

    const currentZone = geofenceService.findZoneForLocation(event.location);

    let vehicleStatus = this.vehicleStatuses.get(event.vehicleId);
    if (!vehicleStatus) {
      vehicleStatus = new VehicleStatus(event.vehicleId);
      this.vehicleStatuses.set(event.vehicleId, vehicleStatus);
    }

    const previousZone = vehicleStatus.currentZone;

    vehicleStatus.updateStatus(event, currentZone);

    const transitionDetected = previousZone !== currentZone;

    return {
      eventId: event.eventId,
      vehicleId: event.vehicleId,
      currentZone,
      previousZone,
      transitionDetected,
      timestamp: event.timestamp
    };
  }

  validateEvent(eventData) {
    const errors = [];
    
    if (!eventData.vehicleId || typeof eventData.vehicleId !== 'string') {
      errors.push('Vehicle ID is required and must be a string');
    }
    
    if (!eventData.timestamp || isNaN(new Date(eventData.timestamp).getTime())) {
      errors.push('Valid timestamp is required');
    }
    
    if (!eventData.location || typeof eventData.location !== 'object') {
      errors.push('Location object is required');
    } else {
      const { lat, lng } = eventData.location;
      if (typeof lat !== 'number' || lat < -90 || lat > 90) {
        errors.push('Latitude must be a number between -90 and 90');
      }
      if (typeof lng !== 'number' || lng < -180 || lng > 180) {
        errors.push('Longitude must be a number between -180 and 180');
      }
    }
    
    return errors;
  }

  getVehicleStatus(vehicleId) {
    return this.vehicleStatuses.get(vehicleId);
  }

  getAllVehicleStatuses() {
    return Array.from(this.vehicleStatuses.values());
  }

  getVehicleTransitionHistory(vehicleId, limit = 10) {
    const status = this.vehicleStatuses.get(vehicleId);
    return status ? status.getRecentTransitions(limit) : [];
  }
}

module.exports = new EventProcessingService();