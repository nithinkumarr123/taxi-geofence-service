const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const winston = require('winston');

const eventsRoutes = require('./src/controllers/eventsController');
const vehiclesRoutes = require('./src/controllers/vehiclesController');
const zonesRoutes = require('./src/controllers/zonesController');

const errorHandler = require('./src/middleware/errorHandler');
const requestLogger = require('./src/middleware/logging');

const app = express();
const PORT = process.env.PORT || 8000;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests from this IP, please try again later.'
});


app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(requestLogger(logger));

app.use('/events', eventsRoutes);
app.use('/vehicles', vehiclesRoutes);
app.use('/zones', zonesRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Taxi Geofence Service running on port ${PORT}`);
  logger.info(`API Documentation available at http://localhost:${PORT}/health`);
});

module.exports = app; 