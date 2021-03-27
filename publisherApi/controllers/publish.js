
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const { Subscribers } = require("../models/subscribers");
const { PublishTopic, ValidatePublish } = require("../models/publish");
const { sendToSubscriber } = require('../service/http');


router.post('/:topic', async (req, res, next) => {

    const { error: validationError } = ValidatePublish(req.body);
    if (validationError)
      return res.status(400).json(validationError);

    const topic = req.params.topic;
    const data = req.body.data;

    const publishTopic = new PublishTopic({
        _id: new mongoose.Types.ObjectId(),
        topic,
        data
    });

    await Subscribers.find({ topic })
        .select(['-_id', '-dateSubscribed', '-__v'])
        .lean()
        .then(results => {
            if (results.length < 1)
                return saveTopic(res, publishTopic);
            
            let errors = [];
            results.forEach(result => {
                sendToSubscriber(result.url, topic, data)
                    .then(() => {})
                    .catch((err) => {
                        errors.push(result.url);
                    })
            });
            if (errors.length < 1)
                return saveTopic(res, publishTopic);
            return res.status(500).json('An Error Occured While Sending Topic To Subscribers, Please Try Again');
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json('An Error Occured While Sending Topic To Subscribers');
        })
    
});

async function saveTopic(res, publishTopic) {
    await publishTopic.save()
            .then(result => {
                return res.status(201).json('Topic Successfully Sent to Subscribers');
            })
            .catch(err => {
                return res.status(500).json('An Error Occured While Saving Topic');
            })
}

module.exports = router;
