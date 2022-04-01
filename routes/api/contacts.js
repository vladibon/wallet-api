const express = require('express');

const { auth, validation, ctrlWrapper } = require('../../middlewares');
const { joiSchema, statusJoiSchema } = require('../../models/contact');
const { contacts: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', auth, ctrlWrapper(ctrl.listContacts));

router.post('/', [auth, validation(joiSchema)], ctrlWrapper(ctrl.addContact));

router.get('/:contactId', auth, ctrlWrapper(ctrl.getContactById));

router.delete('/:contactId', auth, ctrlWrapper(ctrl.removeContact));

router.put('/:contactId', [auth, validation(joiSchema)], ctrlWrapper(ctrl.updateContact));

router.patch(
  '/:contactId/favorite',
  [auth, validation(statusJoiSchema)],
  ctrlWrapper(ctrl.updateStatusContact),
);

module.exports = router;
