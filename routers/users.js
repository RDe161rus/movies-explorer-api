const router = require('express').Router();
const { getUser, updateUserInfo } = require('../controllers/users');
const { updateUserValid } = require('../utils/validators/validUser');

router.get('/me', getUser);
router.patch('/me', updateUserValid, updateUserInfo);

module.exports = router;
