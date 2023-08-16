const express = require('express');

const authcontroller  = require('../controller/auth');

const router = express.Router();

router.post('/register', authcontroller.register)

router.post('/login', authcontroller.login)

router.get('/logout', authcontroller.logout)

router.post('/order', authcontroller.order)

module.exports = router;