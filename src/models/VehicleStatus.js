class VehicleStatus {
  constructor(vehicleId) {
    this.vehicleId = vehicleId;
    this.currentZone = null;
    this.lastEventTime = null;
    this.lastLocation = null;
    this.transitionHistory = [];
  }

  updateStatus(locationEvent, currentZone) {
    const previousZone = this.currentZone;
    
    if (previousZone !== currentZone) {
      this.transitionHistory.push({
        fromZone: previousZone,
        toZone: currentZone,
        timestamp: locationEvent.timestamp,
        location: locationEvent.location,
        eventId: locationEvent.eventId
      });

      if (this.transitionHistory.length > 50) {
        this.transitionHistory = this.transitionHistory.slice(-50);
      }
    }
    
    this.currentZone = currentZone;
    this.lastEventTime = locationEvent.timestamp;
    this.lastLocation = locationEvent.location;
  }

  getRecentTransitions(limit = 10) {
    return this.transitionHistory.slice(-limit);
  }
}

module.exports = VehicleStatus;