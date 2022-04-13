const express = require('express');
const { ctrlWrapper } = require('../../middlewares');
const { categories: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAllCategories));

module.exports = router;
