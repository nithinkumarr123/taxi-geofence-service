const express = require('express');
const router = express.Router();
const eventProcessingService = require('../services/eventProcessingService');

router.get('/:vehicleId/status', (req, res, next) => {
  try {
    const { vehicleId } = req.params;
    const status = eventProcessingService.getVehicleStatus(vehicleId);
    
    if (!status) {
      return res.status(404).json({
        status: 'error',
        message: 'Vehicle not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        vehicleId: status.vehicleId,
        currentZone: status.currentZone,
        lastEventTime: status.lastEventTime,
        lastLocation: status.lastLocation
      }
    });
  } catch (error) {
    next(error);
  }
});


router.get('/:vehicleId/transitions', (req, res, next) => {
  try {
    const { vehicleId } = req.params;
    const limit = parseInt(req.query.limit) || 10;
    
    const transitions = eventProcessingService.getVehicleTransitionHistory(vehicleId, limit);
    
    res.status(200).json({
      status: 'success',
      data: transitions
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;