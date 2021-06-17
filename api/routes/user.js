const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user')



router.get('/signup', UserController.user_get_users);

router.post("/signup", UserController.user_signup);

router.post('/login', UserController.user_login);

router.delete('/:userId', UserController.user_delete);

module.exports = router;
