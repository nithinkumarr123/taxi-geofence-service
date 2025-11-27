# Taxi-geofence-service
A real-time geofence tracking system for taxi vehicles that detects when they enter or exit geographic zones based on GPS coordinates.
## Features
-**Real-time GPS Processing** - Instant location event processing
-**Zone Boundary Detection** - Accurate enter/exit detection using ray-casting algorithm
-**Vehicle Status Tracking** - Current zone and location history
-**RESTful API** - Clean, predictable endpoints
-**Production Ready** - Security, logging, error handling, and monitoring

## Folder Structure
```bash
taxi-geofence-service/
├── package.json
├── server.js
├── src/
│   ├── controllers/
│   │   ├── eventsController.js
│   │   ├── vehiclesController.js
│   │   └── zonesController.js
│   ├── models/
│   │   ├── Event.js
│   │   ├── Zone.js
│   │   └── VehicleStatus.js
│   ├── services/
│   │   ├── geofenceService.js
│   │   └── eventProcessingService.js
│   ├── middleware/
│   │   ├── validation.js
│   │   ├── errorHandler.js
│   │   └── logging.js
│   └── utils/
│       └── geometry.js
├── tests/
│   ├── geofence.test.js
│   └── integration.test.js
├── examples/
│   └── client-example.js
└── README.md
```
## API Endpoints
- **POST /events/location** - Submit vehicle location events
-**GET /vehicles/:id/status** - Get current vehicle status
-**GET /vehicles/:id/transitions** - Get zone transition history
-**GET /zones** - List all geofence zones
-**POST /zones** - Create new geofence zone
-**GET /health** - Service health check
##  Setup & Local Development
### 1️⃣ Clone the repository
```bash
git clone https://github.com/nithinkumarr123/taxi-geofence-service.git
cd taxi-geofence-service
```
### 2️⃣ Install dependencies
```bash
npm install
```
### 3️⃣ Run the development server
```bash
npm start
```
### 4️⃣ Run Tests
```bash
npm test
```
## Assumptions
-GPS coordinates are sufficiently accurate for zone detection
-Events are processed in received order
-Zones are non-overlapping for clear transition detection
-Designed to scale to hundreds of vehicles

# Future Improvements
-Persistent storage with Redis/PostgreSQL
-Spatial indexing for faster zone lookups
-Docker containerization
-Advanced zone types (circles, rectangles)
-Webhook notifications for zone transitions
