const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./api-doc.json');
require('dotenv').config();

const { authRouter, usersRouter, transactionsRouter, currencyRouter } = require('./routes/api');
const { errorHandler } = require('./middlewares');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/currency', currencyRouter);
app.use(errorHandler);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
