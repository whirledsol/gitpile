const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
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

module.exports = app;
