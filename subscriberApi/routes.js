const express = require('express');

const ReceiveTopic = require('./controllers/controller');

module.exports = function(app) {
  app.use(express.json());
  app.use('/test1', ReceiveTopic);
  app.use('/test2', ReceiveTopic);
  app.use('/test3', ReceiveTopic);
  app.use('/test4', ReceiveTopic);
  app.use((err, req, res, next) => {
    return res.status(500).json(err.message || 'An error occured while processing your request');
  });
  
}

