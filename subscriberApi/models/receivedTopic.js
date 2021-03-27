const Joi = require('joi');
const mongoose = require('mongoose');

const receivedTopicSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    data: { 
        type: Object,
        required: true
    },
    topic:  {
        type: String,
        lowercase: true,
        required: true
    },
    recievedBy: { type: String }
})

function validateTopic(topic) {
  const schema = Joi.object({
    topic: Joi.string().required().label('Topic'),
    data: Joi.object().required().label('Data')
  });

  return schema.validate(topic, { abortEarly: false });
}

exports.ValidateTopic = validateTopic;
exports.ReceivedTopics = mongoose.model('ReceivedTopics', receivedTopicSchema);
