const express = require('express');
const transactionController = require('../controllers/transactionController');
const router = express.Router();

router.route('/')
  .get()
  .post(transactionController.buyStock)
  .put(transactionController.sellStock)

module.exports = router;
