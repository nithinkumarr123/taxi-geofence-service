function errorHandler(err, req, res, next) {
  req.logger.error('Unhandled error', {
    error: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method
  });

  let statusCode = 500;
  let message = 'Internal server error';

  if (err.message.includes('Invalid event data') || 
      err.message.includes('Invalid zone data')) {
    statusCode = 400;
    message = err.message;
  }

  res.status(statusCode).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}

module.exports = errorHandler;