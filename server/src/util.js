const fs = require('fs');
const path = require('path');
const { CONFIG_PATH } = process.env;

module.exports = {
	getConfig: () => {
		const FULL_CONFIG_PATH = path.join(global.appRoot, CONFIG_PATH);
		var config = JSON.parse(fs.readFileSync(FULL_CONFIG_PATH, 'utf8'));
		return config;
	},
	orderBy: (list,itemFunc, desc = false)=>{
		const sortFunc = (a, b) => {
			const aVal = itemFunc(a);
			const bVal = itemFunc(b);
			const pos = (aVal >bVal) ? 1 : -1;
			return desc ? -pos : pos;
		}
		list.sort(sortFunc);
		return list;
	}
}