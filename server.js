var express = require('express');
const mongoose = require('mongoose');

let publisherApp = express();
let subscriberApp = express();

const cors = require('cors');
require('dotenv').config();

publisherApp.use(cors());
subscriberApp.use(cors());

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_ATLAS_USERNAME}:${process.env.MONGO_ATLAS_PW}@cluster0-qhysx.mongodb.net/pangaea?retryWrites=true&w=majority` ,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }
  )
  .then(res => {
    console.log('Mongoose DB Connection successful');
  })
  .catch(err => {
    console.log('Mongoose DB connectionn failed', err);
});

const publisherRouter = require('./publisherApi/routes');
publisherRouter(publisherApp);

const subscriberRouter = require('./subscriberApi/routes');
subscriberRouter(subscriberApp);


const pubPort = process.env.PUBLISHER_PORT;
const subPort = process.env.SUBSCRIBER_PORT;

publisherApp.listen(pubPort, () => {
  console.log(`Started Publisher Server on ${pubPort}`);
});

subscriberApp.listen(subPort, () => {
  console.log(`Started Subscriber Server on ${subPort}`);   
});
