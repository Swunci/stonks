const express = require('express');
const userController = require('../controllers/userController');
const portfolioRouter = require('./portfolio');
const auth = require('../config/jwt')

const router = express.Router();
router.use('/:username/portfolios', portfolioRouter);

router.route('/')
  .post(userController.createUser);

router.route('/:username')
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.removeUser);

router.param('username', auth);
router.param('username', userController.loadUser);

module.exports = router;
