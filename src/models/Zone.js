class GeofenceZone {
  constructor(zoneId, name, vertices) {
    this.zoneId = zoneId;
    this.name = name;
    this.vertices = vertices; 
    this.createdAt = new Date();
  }

  validate() {
    const errors = [];
    
    if (!this.zoneId || typeof this.zoneId !== 'string') {
      errors.push('Zone ID is required and must be a string');
    }
    
    if (!this.name || typeof this.name !== 'string') {
      errors.push('Zone name is required and must be a string');
    }
    
    if (!Array.isArray(this.vertices) || this.vertices.length < 3) {
      errors.push('Zone must have at least 3 vertices');
    } else {
      this.vertices.forEach((vertex, index) => {
        if (typeof vertex.lat !== 'number' || vertex.lat < -90 || vertex.lat > 90) {
          errors.push(`Vertex ${index}: Latitude must be a number between -90 and 90`);
        }
        if (typeof vertex.lng !== 'number' || vertex.lng < -180 || vertex.lng > 180) {
          errors.push(`Vertex ${index}: Longitude must be a number between -180 and 180`);
        }
      });
    }
    
    return errors;
  }
}

module.exports = GeofenceZone;