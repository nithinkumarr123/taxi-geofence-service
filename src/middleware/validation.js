const Joi = require('joi');

const eventSchema = Joi.object({
  vehicleId: Joi.string().required().min(1).max(100),
  timestamp: Joi.date().iso().required(),
  location: Joi.object({
    lat: Joi.number().min(-90).max(90).required(),
    lng: Joi.number().min(-180).max(180).required()
  }).required()
});

const zoneSchema = Joi.object({
  zoneId: Joi.string().required().min(1).max(100),
  name: Joi.string().required().min(1).max(255),
  vertices: Joi.array().items(
    Joi.object({
      lat: Joi.number().min(-90).max(90).required(),
      lng: Joi.number().min(-180).max(180).required()
    })
  ).min(3).required()
});

const validateEvent = (req, res, next) => {
  const { error } = eventSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid event data',
      details: error.details.map(detail => detail.message)
    });
  }
  
  next();
};

const validateZone = (req, res, next) => {
  const { error } = zoneSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid zone data',
      details: error.details.map(detail => detail.message)
    });
  }
  
  next();
};

module.exports = {
  validateEvent,
  validateZone
};