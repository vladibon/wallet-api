const express = require('express');
const { auth, checkTestUser, validation, ctrlWrapper, upload } = require('../../middlewares');
const { subscriptionJoiSchema, nameJoiSchema, emailJoiSchema } = require('../../models/user');
const { users: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));

router.post('/category', [auth, checkTestUser], ctrlWrapper(ctrl.addCategory));

router.patch(
  '/name',
  [auth, checkTestUser, validation(nameJoiSchema)],
  ctrlWrapper(ctrl.updateName),
);

router.patch(
  '/email',
  [auth, checkTestUser, validation(emailJoiSchema)],
  ctrlWrapper(ctrl.updateEmail),
);

router.patch(
  '/subscription',
  [auth, validation(subscriptionJoiSchema)],
  ctrlWrapper(ctrl.updateSubscription),
);

router.patch(
  '/avatars',
  [auth, checkTestUser, upload.single('avatar')],
  ctrlWrapper(ctrl.updateAvatar),
);

router.delete('/delete', [auth, checkTestUser], ctrlWrapper(ctrl.deleteUser));

module.exports = router;
