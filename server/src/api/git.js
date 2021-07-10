const express = require('express');
const SimpleGit = require('simple-git');
const router = express.Router();
const fs = require('fs');
const { asyncRoute } = require('../middlewares');
const { CONFIG_PATH } = process.env;

const getRepoInfo = (req) => {
  var config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  const { projectKey, repoKey } = req.params;
  const project = config.projects[projectKey];
  return project[repoKey];
}

router.get('/status/:projectKey/:repoKey', asyncRoute(async (req, res) => {
  const { path } = getRepoInfo(req);

  try {
    const simpleGit = SimpleGit(path);
    const status = await simpleGit.status();
    res.json(status);
  }
  catch (ex) {
    res.json({ isGit: false });
  }

}));

router.get('/log/:projectKey/:repoKey', asyncRoute(async (req, res) => {

  const { path } = getRepoInfo(req);
  const {limit=1} = req.query;
  try {
    const simpleGit = SimpleGit(path);
    const logs = await simpleGit.log({'--max-count':limit});
    res.json(logs);
  }
  catch (ex) {
    res.json({ isGit: false });
  }

}));

module.exports = router;
