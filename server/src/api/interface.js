const express = require('express');
const { getConfig, getRepoInfo } = require('../util');
const router = express.Router();
const { exec } = require("child_process");

router.get('/cmd/:projectKey/:repoKey', (req, res) => {
  try {
    const config = getConfig();
    const { path } = getRepoInfo(req, config);
    const { consoleOpenCommand } = config.global;
    if (!consoleOpenCommand) {
      throw 'To use this feature, please profile the path to your console app of choice in the config.json file under global.consoleOpenCommand';
    }
    const cmd = consoleOpenCommand.replace(/\{0\}/g, path);
    console.log(cmd);
    exec(cmd, function (err, stdout, stderr) {
      if (err) { throw err; }
    });
    res.json({ severity: 0});
    return;
  }
  catch (ex) {
    res.json({ severity: 7, message: 'Could not open cmd.', data: ex.toString() });
  }
});



module.exports = router;
