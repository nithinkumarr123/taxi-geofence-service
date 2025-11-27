const express = require('express');
const router = express.Router();
const eventProcessingService = require('../services/eventProcessingService');
const { validateEvent } = require('../middleware/validation');

router.post('/location', validateEvent, async (req, res, next) => {
  try {
    const eventData = req.body;
    
    const result = eventProcessingService.processLocationEvent(eventData);
    
    if (result.transitionDetected) {
      req.logger.info('Zone transition detected', {
        vehicleId: result.vehicleId,
        fromZone: result.previousZone,
        toZone: result.currentZone,
        eventId: result.eventId
      });
    }

    res.status(200).json({
      status: 'success',
      data: result
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;