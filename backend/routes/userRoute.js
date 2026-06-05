const express = require('express');

const { loginController, registerController, updateProfileController } = require('../controllers/userController');
const authMiddleware = require("../middlewares/authMiddleware");


//router object
const router = express.Router();

//router
//login
router.post('/login',loginController);
//register
router.post('/register',registerController)
//update-profile
router.put("/update-profile", authMiddleware, updateProfileController);

module.exports = router;