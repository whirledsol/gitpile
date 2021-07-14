const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
require('dotenv').config();



const middlewares = require('./middlewares');

const app = express();

global.appRoot = path.resolve(__dirname);
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

const api = require('./api');
const git = require('./api/git');

app.use('/api/v1', api);
app.use('/api/v1/git', git);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
