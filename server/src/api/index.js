const express = require('express');
const { getConfig } = require('../util');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.get('/getConfig', (req, res) => {
  res.json(getConfig());
});



module.exports = router;
