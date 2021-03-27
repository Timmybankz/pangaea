const Joi = require('joi');
const mongoose = require('mongoose');

const subscribersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    topic:  {
        type: String,
        lowercase: true,
        required: true
    },
    url:  {
        type: String,
        required: true
    },
    dateSubscribed: {
        type: Date,
        default: Date.now,
        required: true
    }
})

function validateSubscription(subscriber) {
  const schema = Joi.object({
    url: Joi.string().required()
  });

  return schema.validate(subscriber, { abortEarly: false });
}

exports.ValidateSubscription = validateSubscription;
exports.Subscribers = mongoose.model('Subscribers', subscribersSchema);
