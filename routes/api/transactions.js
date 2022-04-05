const express = require('express');

const { auth, validation, ctrlWrapper } = require('../../middlewares');
const { schemas } = require('../../models');
const { transactions: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', auth, ctrlWrapper(ctrl.listTransactions));

router.post('/', [auth, validation(schemas.add)], ctrlWrapper(ctrl.addTransaction));

router.post('/stats', auth, ctrlWrapper(ctrl.statsTransactions));

// router.get('/:contactId', auth, ctrlWrapper(ctrl.getContactById));

// router.delete('/:transactionId', auth, ctrlWrapper(ctrl.removeTransaction));

// router.put('/:contactId', [auth, validation(joiSchema)], ctrlWrapper(ctrl.updateContact));

// router.patch(
//   '/:contactId/favorite',
//   [auth, validation(statusJoiSchema)],
//   ctrlWrapper(ctrl.updateStatusContact),
// );

module.exports = router;
