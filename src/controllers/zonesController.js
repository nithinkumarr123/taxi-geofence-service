const express = require('express');
const router = express.Router();
const geofenceService = require('../services/geofenceService');
const { validateZone } = require('../middleware/validation');

router.get('/', (req, res) => {
  const zones = geofenceService.getAllZones();
  res.status(200).json({
    status: 'success',
    data: zones
  });
});


router.post('/', validateZone, (req, res, next) => {
  try {
    const zoneData = req.body;
    const zone = geofenceService.addZone(zoneData);
    
    req.logger.info('New zone created', { zoneId: zone.zoneId });
    
    res.status(201).json({
      status: 'success',
      data: zone
    });
  } catch (error) {
    next(error);
  }
});


router.get('/:zoneId', (req, res, next) => {
  try {
    const { zoneId } = req.params;
    const zone = geofenceService.getZone(zoneId);
    
    if (!zone) {
      return res.status(404).json({
        status: 'error',
        message: 'Zone not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: zone
    });
  } catch (error) {
    next(error);
  }
});


router.delete('/:zoneId', (req, res, next) => {
  try {
    const { zoneId } = req.params;
    const deleted = geofenceService.deleteZone(zoneId);
    
    if (!deleted) {
      return res.status(404).json({
        status: 'error',
        message: 'Zone not found'
      });
    }

    req.logger.info('Zone deleted', { zoneId });
    
    res.status(200).json({
      status: 'success',
      message: 'Zone deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;