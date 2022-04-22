const express = require('express');
const { auth, checkDemoUser, validation, ctrlWrapper, upload } = require('../../middlewares');
const { subscriptionJoiSchema, nameJoiSchema, emailJoiSchema } = require('../../models/user');
const { users: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

router.post('/category', [auth, checkDemoUser], ctrlWrapper(ctrl.addCategory));

router.patch(
  '/name',
  [auth, checkDemoUser, validation(nameJoiSchema)],
  ctrlWrapper(ctrl.updateName),
);

router.patch(
  '/email',
  [auth, checkDemoUser, validation(emailJoiSchema)],
  ctrlWrapper(ctrl.updateEmail),
);

router.patch(
  '/subscription',
  [auth, validation(subscriptionJoiSchema)],
  ctrlWrapper(ctrl.updateSubscription),
);

router.patch(
  '/avatars',
  [auth, checkDemoUser, upload.single('avatar')],
  ctrlWrapper(ctrl.updateAvatar),
);

router.delete('/delete', [auth, checkDemoUser], ctrlWrapper(ctrl.deleteUser));

module.exports = router;
