const express = require('express');
const SimpleGit = require('simple-git');
const router = express.Router();
const { asyncRoute } = require('../middlewares');
const { orderBy, getConfig } = require('../util');




const getRepoInfo = (req, config = null) => {
  config = config ?? getConfig();
  const { projectKey, repoKey } = req.params;
  const project = config.projects[projectKey];
  return project[repoKey];
}

router.get('/isGit/:projectKey/:repoKey', asyncRoute(async (req, res) => {
  try {
    const { path } = getRepoInfo(req);

    const simpleGit = SimpleGit(path);
    const isGit = await simpleGit.checkIsRepo();
    res.json(isGit);
    return;
  }
  catch (ex) {
    res.json(false);
  }
}));

router.get('/status/:projectKey/:repoKey', asyncRoute(async (req, res) => {
 
  try {
    const config = getConfig();
    const { path, compareBranch, mainBranch, remote = 'origin'} = getRepoInfo(req, config);
  
    const simpleGit = SimpleGit(path);

    await simpleGit.fetch();
    const status = await simpleGit.status();

    //get some more info
    status.diff = (await simpleGit.diffSummary()).files || [];
    status.diff.forEach(x => x.changes = x.changes ?? (x.after - x.before) / 1000.0);
    status.diff = orderBy(status.diff, x => Math.abs(x.changes), true);

    //comparebranch
    status.compareBranch = compareBranch ?? mainBranch ?? config.global.mainBranch ?? 'main';
    const compareBranchResults = await simpleGit.raw(['rev-list','--left-right','--count',`${status.current}...${remote}/${status.compareBranch}`]);
    const [compare_behind,compare_ahead] = compareBranchResults.replace('\n','').split('\t');
    status.compare_behind = compare_behind;
    status.compare_ahead = compare_ahead;
    
    res.json(status);
  }
  catch (ex) {
    res.json({ severity: 7, message: 'Could not get status.', data: ex.toString() });
  }

}));


router.get('/log/:projectKey/:repoKey', asyncRoute(async (req, res) => {
 
  try {
    const { path } = getRepoInfo(req);
    const { limit = 1 } = req.query;

    const simpleGit = SimpleGit(path);
    const logs = await simpleGit.log({ '--max-count': limit });
    res.json(logs);
  }
  catch (ex) {
    res.json({ severity: 7, message: 'Could not get log.', data: ex.toString() });
  }

}));


router.post('/pull/:projectKey/:repoKey', asyncRoute(async (req, res) => {
 
  try {
    const { path, remote = 'origin' } = getRepoInfo(req);

    const simpleGit = SimpleGit(path);
    
    await simpleGit.fetch();

    const { current } = await simpleGit.status();
    await simpleGit.pull(remote, current);

    res.json({ severity: 0, message: `Completed pull from ${remote} ${current}.` });
  }
  catch (ex) {
    res.json({ severity: 7, message: 'Could not pull.', data: ex.toString() });
  }

}));


router.post('/commit/:projectKey/:repoKey', asyncRoute(async (req, res) => {

  let tasks = [];

  try {
    const { path, remote = 'origin' } = getRepoInfo(req);
    const { message } = req.body;

    if ((message ?? '').trim() === '') {
      throw 'message not supplied.';
    }
    const simpleGit = SimpleGit(path);

    //check that we are tracking
    const { current, tracking } = await simpleGit.status();
    if (current && !tracking) {
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
