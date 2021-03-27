const express = require('express');
const CreateSubscription = require('./controllers/subscribe');
const PublishTopic = require('./controllers/publish');

module.exports = function(app) {
  app.use(express.json());
  app.use('/subscribe', CreateSubscription);
  app.use('/publish', PublishTopic);
  app.use((err, req, res, next) => {
    return res.status(500).json(err.message || 'An error occured while processing your request');
  });
  
}
