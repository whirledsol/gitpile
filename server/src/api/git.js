const express = require('express');
const SimpleGit = require('simple-git');
const router = express.Router();
const fs = require('fs');
const {asyncRoute} = require('../middlewares');
const {CONFIG_PATH} = process.env;

var config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));

router.get('/info/:projectKey/:repoKey', asyncRoute(async (req, res) => {
  const {projectKey,repoKey} = req.params;
  const project = config.projects[projectKey];
  const repo = project[repoKey];
  const {path} = repo;
  console.log('path',path)
  const simpleGit = SimpleGit(path);
  const status = await simpleGit.status();
  console.log('status',status)
  res.json(status);
}));

module.exports = router;
