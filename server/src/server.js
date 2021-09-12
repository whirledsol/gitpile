const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');


const server = _=>{
	const envPath = path.join(path.resolve(__dirname),'../.env');
	console.log('looking for .env',envPath);
	require('dotenv').config({path:envPath});
	const {API_VERSION} = process.env;


	const middlewares = require('./middlewares');

	const app = express();

	global.appRoot = path.resolve(__dirname);
	app.use(morgan('dev'));
	app.use(helmet());
	app.use(cors());
	app.use(express.json());

	const route_api = require('./api');
	const route_git = require('./api/git');
	const route_interface = require('./api/interface');
	app.use(`/api/${API_VERSION}`, route_api);
	app.use(`/api/${API_VERSION}/git`, route_git);
	app.use(`/api/${API_VERSION}/interface`, route_interface);

	app.use(middlewares.notFound);
	app.use(middlewares.errorHandler);


	const port = process.env.PORT || 5000;
	app.listen(port, () => {
		/* eslint-disable no-console */
		console.log(`Listening: http://localhost:${port}`);
		/* eslint-enable no-console */
	});

	return app;
};

module.exports = server;
