const express = require('express');
const fs = require('fs');
const router = express.Router();
const {CONFIG_PATH} = process.env;

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.get('/getConfig', (req, res) => {
  var config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  res.json(config);
});



module.exports = router;
