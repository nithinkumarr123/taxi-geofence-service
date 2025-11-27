function requestLogger(logger) {
  return (req, res, next) => {
    req.logger = logger;
    
    // Log request
    logger.info('Incoming request', {
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });

    const start = Date.now();
    
    res.on('finish', () => {
      const duration = Date.now() - start;
      logger.info('Request completed', {
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        duration: `${duration}ms`
      });
    });

    next();
  };
}

module.exports = requestLogger;