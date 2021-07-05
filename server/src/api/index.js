const express = require('express');

const git = require('./git');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/git', git);

module.exports = router;
