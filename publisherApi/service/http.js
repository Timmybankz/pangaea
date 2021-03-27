const axios = require('axios');

// Add a request interceptor
axios.interceptors.request.use(function (config) {

  config.headers['Content-Type'] = 'application/json';
  return config;
});

exports.sendToSubscriber = async (url, topic, data) => {
    const postData = { topic, data };
    return await axios.post(url, postData);
}

