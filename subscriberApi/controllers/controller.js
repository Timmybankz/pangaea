
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const { ReceivedTopics, ValidateTopic } = require("../models/receivedTopic");

router.post('/', async (req, res) => {

    const { error: validationError } = ValidateTopic(req.body);
    if (validationError)
      return res.status(400).json(validationError.details[0].message);

    const receievedBy = req.protocol + '://' + req.get('host') + req.originalUrl;
    const receivedTopic = new ReceivedTopics({
        _id: new mongoose.Types.ObjectId(),
        topic: req.body.topic,
        data: req.body.data,
        receivedBy: receievedBy
    });

    await receivedTopic.save()
        .then(result => res.status(200).send('Data Receieved Successfully'))
        .catch(err => res.status(500).send('An Error Occured While Saving Topic Data, Please Try Again'));
});

module.exports = router;
