const express = require('express');
const { auth, validation, ctrlWrapper } = require('../../middlewares');
const { signupJoiSchema, loginJoiSchema } = require('../../models/user');
const { users: ctrl } = require('../../controllers');

const router = express.Router();

router.post('/signup', validation(signupJoiSchema), ctrlWrapper(ctrl.signup));
router.post('/login', validation(loginJoiSchema), ctrlWrapper(ctrl.login));
router.get('/logout', auth, ctrlWrapper(ctrl.logout));

module.exports = router;
