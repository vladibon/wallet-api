const express = require('express');
const { auth, ctrlWrapper } = require('../../middlewares');
const { users: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/current', auth, ctrlWrapper(ctrl.getCurrent));
router.post('/category', auth, ctrlWrapper(ctrl.addCategory));

module.exports = router;
