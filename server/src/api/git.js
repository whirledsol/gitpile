const express = require('express');
const SimpleGit = require('simple-git');
const router = express.Router();
const fs = require('fs');
const { asyncRoute } = require('../middlewares');
const { orderBy } = require('../util');
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

    //get some more info
    status.diff = (await simpleGit.diffSummary()).files || [];
    status.diff.forEach(x=>x.changes = x.changes ?? (x.after-x.before)/1000.0);
    status.diff = orderBy(status.diff,x=>Math.abs(x.changes), true);

    res.json(status);
  }
  catch (ex) {
    res.json({ isGit: false });
  }

}));


router.get('/log/:projectKey/:repoKey', asyncRoute(async (req, res) => {

  const { path } = getRepoInfo(req);
  const { limit = 1 } = req.query;
  try {
    const simpleGit = SimpleGit(path);
    const logs = await simpleGit.log({ '--max-count': limit });
    res.json(logs);
  }
  catch (ex) {
    res.json({ isGit: false });
  }

}));


router.post('pu/ll/:projectKey/:repoKey', asyncRoute(async (req, res) => {

  const { path, remote = 'origin' } = getRepoInfo(req);
  const { branch } = req.params;
  try {
    const simpleGit = SimpleGit(path);
    await simpleGit.pull(origin, branch);
    res.json({ severity: 0, message: `Completed pull from ${remote} ${branch}.` });
  }
  catch (ex) {
    res.json({ severity: 7, message: 'Could not commit.', data: ex.toString() });
  }

}));


router.post('/commit/:projectKey/:repoKey', asyncRoute(async (req, res) => {

  const { path, remote = 'origin' } = getRepoInfo(req);
  const { message } = req.params;
  let tasks = [];

  try {
    if ((message ?? '').trim() === '') {
      throw 'message not supplied.';
    }
    const simpleGit = SimpleGit(path);

    //check that we are tracking
    const { current, tracking } = await simpleGit.status();
    if (current && !status.tracking) {
      await simpleGit.branch('--set-upstream-to', `${remote}/${current}`)
      tasks.push('set-upstream-to')
    }

    //do the big 3 tasks
    await simpleGit.add('.');
    tasks.push('add');
    await simpleGit.commit(message);
    tasks.push('commit');
    await simpleGit.push();
    tasks.push('push');

    //return
    res.json({ severity: 0, message: `Completed ${tasks.join(', ')} to ${remote} ${current}.` });
  }
  catch (ex) {
    res.json({ severity: 7, message: `Completed ${(tasks.length ? tasks.join(', ') + ' only' : 'no tasks')} because of exception.`, data: ex.toString() });
  }

}));

module.exports = router;
