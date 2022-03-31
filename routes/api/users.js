const express = require('express');
const path = require('path');

const { auth, upload, validation, ctrlWrapper } = require('../../middlewares');
const { subscriptionJoiSchema } = require('../../models/user');
const { users: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));
router.patch(
  '/',
  [auth, validation(subscriptionJoiSchema)],
  ctrlWrapper(ctrl.updateSubscription),
);
router.patch(
  '/avatars',
  [auth, upload.single('avatar')],
  ctrlWrapper(ctrl.updateAvatar),
);
router.use('/avatars', auth, express.static(path.resolve('./public/avatars')));

module.exports = router;
