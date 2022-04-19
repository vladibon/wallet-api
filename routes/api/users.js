const express = require('express');
const { auth, validation, ctrlWrapper, upload } = require('../../middlewares');
const { subscriptionJoiSchema } = require('../../models/user');
const { users: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));
router.post('/category', auth, ctrlWrapper(ctrl.addCategory));
router.patch(
  '/subscription',
  [auth, validation(subscriptionJoiSchema)],
  ctrlWrapper(ctrl.updateSubscription),
);
router.patch('/avatars', auth, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;
