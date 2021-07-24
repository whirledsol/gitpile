const fs = require('fs');
const path = require('path');
const { CONFIG_PATH } = process.env;

const getConfig = () => {
	const FULL_CONFIG_PATH = path.join(global.appRoot, CONFIG_PATH);
	var config = JSON.parse(fs.readFileSync(FULL_CONFIG_PATH, 'utf8'));
	return config;
};
const getRepoInfo = (req, config = null) => {
	config = config ?? getConfig();
	const { projectKey, repoKey } = req.params;
	const project = config.projects[projectKey];
	return project[repoKey];
};
const orderBy = (list, itemFunc, desc = false) => {
	const sortFunc = (a, b) => {
		const aVal = itemFunc(a);
		const bVal = itemFunc(b);
		const pos = (aVal > bVal) ? 1 : -1;
		return desc ? -pos : pos;
	}
	list.sort(sortFunc);
	return list;
};

module.exports = {
	getConfig: getConfig,
	getRepoInfo: getRepoInfo,
	orderBy: orderBy
}