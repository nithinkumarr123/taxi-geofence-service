const axios = require('axios');

const API_BASE = 'http://localhost:8000';

class TaxiGeofenceClient {
  constructor(baseURL = API_BASE) {
    this.client = axios.create({ baseURL });
  }

  async sendLocationEvent(vehicleId, lat, lng) {
    const event = {
      vehicleId,
      timestamp: new Date().toISOString(),
      location: { lat, lng }
    };

    try {
      const response = await this.client.post('/events/location', event);
      console.log('Event processed:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error sending event:', error.response?.data || error.message);
      throw error;
    }
  }

  async getVehicleStatus(vehicleId) {
    try {
      const response = await this.client.get(`/vehicles/${vehicleId}/status`);
      return response.data;
    } catch (error) {
      console.error('Error getting status:', error.response?.data || error.message);
      throw error;
    }
  }
}


async function demo() {
  const client = new TaxiGeofenceClient();

  console.log('Sending location events...');
  
  await client.sendLocationEvent('taxi_123', 40.7495, -73.9944); // Outside downtown
  await client.sendLocationEvent('taxi_123', 40.7515, -73.9900); // Inside downtown
  await client.sendLocationEvent('taxi_123', 40.6400, -73.7800); // Outside all zones

  const status = await client.getVehicleStatus('taxi_123');
  console.log('Final vehicle status:', status);
}

if (require.main === module) {
  demo().catch(console.error);
}

module.exports = TaxiGeofenceClient;