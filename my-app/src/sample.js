'use strict';

const yelp = require('yelp-fusion');

// Place holders for Yelp Fusion's OAuth 2.0 credentials. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const clientId = '-TEl59_tdP6IVt5oFziseA';
const clientSecret = 'UiRibnj9ucjfMQU54nNc0IF3Ad2CqW8m7L7XXq3nfZhgbPpzoLJw1XslfRPpWUFH';

const searchRequest = {
  term:'Meesum',
  location: 'seattle, wa'
};

yelp.accessToken(clientId, clientSecret).then(response => {
  const client = yelp.client(response.jsonBody.access_token);
  console.log("Access token: " + JSON.stringify(client));

  client.search(searchRequest).then(response => {
    const firstResult = response.jsonBody.businesses[0];
    const prettyJson = JSON.stringify(firstResult, null, 4);
    console.log(prettyJson);
  });
}).catch(e => {
  console.log(e);
});