const express = require('express');

// const { auth, validation, ctrlWrapper } = require('../../middlewares');
const { ctrlWrapper } = require('../../middlewares');
// const { joiSchema, emailJoiSchema } = require('../../models/user');
// const { signupJoiSchema, loginJoiSchema } = require('../../models/user');
const { categories: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAllCategories));

module.exports = router;
