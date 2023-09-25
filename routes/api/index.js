const authRouter = require('./auth');
const usersRouter = require('./users');
const transactionsRouter = require('./transactions');
const currencyRouter = require('./currency');

module.exports = { authRouter, usersRouter, transactionsRouter, currencyRouter };
