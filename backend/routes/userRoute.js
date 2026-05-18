const express = require('express');

const { loginController, registerController } = require('../controllers/userController');

//router object
const router = express.Router();

//router
//login
router.post('/login',loginController);
//register
router.post('/register',registerController)

module.exports = router;