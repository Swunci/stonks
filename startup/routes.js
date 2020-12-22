const express = require('express');
const stocksRouter = require('../server/routes/stock');
const portfolioRouter = require('../server/routes/portfolio');
const userRouter = require('../server/routes/user');
const authRouter = require('../server/routes/auth');

module.exports = (app) => {
  app.use(express.json());
  app.use('/api/stocks', stocksRouter);
  app.use('/api/users', userRouter);
  app.use('/api/auth', authRouter);
}