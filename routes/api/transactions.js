const express = require('express');
const { auth, validation, ctrlWrapper } = require('../../middlewares');
const { schemas } = require('../../models');
const { transactions: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', auth, ctrlWrapper(ctrl.listTransactions));
router.post('/', [auth, validation(schemas.add)], ctrlWrapper(ctrl.addTransaction));
router.get('/stats', auth, ctrlWrapper(ctrl.statsTransactions));

module.exports = router;
