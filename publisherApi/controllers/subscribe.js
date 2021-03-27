
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const { Subscribers, ValidateSubscription } = require("../models/subscribers");

router.post('/:topic', async (req, res) => {

    const { error: validationError } = ValidateSubscription(req.body);
    if (validationError)
      return res.status(400).json(validationError);

    const subscriber = new Subscribers({
        _id: new mongoose.Types.ObjectId(),
        topic: req.params.topic,
        url: req.body.url
    });

    Subscribers.findOne({ url: req.body.url.toLowerCase() })
        .lean()
        .then(async (response) => {
            if (response)
                return res.status(400).json('Subscription already exist for the provided URL');
            
            await subscriber.save()
                .then(() => {
                    return res.status(201).json('Subscription Created Successfully');
                })
                .catch(() => {
                    return res.status(500).json('An Error Occured While Saving Topic Data, Please Try Again');
                })
        })
        .catch(() => res.status(500).json('An error occured while creating subscription, please try again.'));
})

module.exports = router;
