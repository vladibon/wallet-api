const authRouter = require('./auth');
const usersRouter = require('./users');
const categoriesRouter = require('./categories');
const transactionsRouter = require('./transactions');

module.exports = { authRouter, usersRouter, categoriesRouter, transactionsRouter };
