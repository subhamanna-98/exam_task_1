
const express = require('express');
const authSubController = require('../controller/authSubController');

const router = express.Router();

router.post('/register',authSubController.register)
router.post('/login',authSubController.login)


module.exports = router