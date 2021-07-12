module.exports = {
  notFound: (req, res, next) => {
    res.status(404);
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
  },
  errorHandler: (err, req, res, next) => {
    /* eslint-enable no-unused-vars */
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
  },
  asyncRoute: (fn) => (req, res, next) => {
    //allows for proper express handling, especially with errors
    return Promise
        .resolve(fn(req, res, next))
        .catch(next);
  
  }
};
