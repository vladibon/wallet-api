const express = require('express');

const { auth, validation, ctrlWrapper } = require('../../middlewares');
// const { joiSchema, emailJoiSchema } = require('../../models/user');
const { signupJoiSchema, loginJoiSchema } = require('../../models/user');
const { users: ctrl } = require('../../controllers');

const router = express.Router();

router.post('/signup', validation(signupJoiSchema), ctrlWrapper(ctrl.signup));
router.post('/login', validation(loginJoiSchema), ctrlWrapper(ctrl.login));
// router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verify));
// router.get(
//   '/verify',
//   validation(emailJoiSchema),
//   ctrlWrapper(ctrl.repeatVerify),
// );
router.get('/logout', auth, ctrlWrapper(ctrl.logout));

module.exports = router;
