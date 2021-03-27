const Joi = require('joi');
const mongoose = require('mongoose');

const publishTopicSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    topic:  {
        type: String,
        lowercase: true,
        required: true
    },
    data:  {
        type: Object,
        required: true
    },
    datePublished: {
        type: Date,
        default: Date.now,
        required: true
    }
})

function validatePublish(topic) {
  const schema = Joi.object({
    data: Joi.object().required().label('Data')
  });

  return schema.validate(topic, { abortEarly: false });
}

exports.ValidatePublish = validatePublish;
exports.PublishTopic = mongoose.model('PublishTopic', publishTopicSchema);
