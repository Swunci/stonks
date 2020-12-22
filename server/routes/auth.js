const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/token')
  .post(authController.authenticate, authController.generateToken, authController.respondJWT);

module.exports = router;