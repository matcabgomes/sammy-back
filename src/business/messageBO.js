var Promise         = require('promise');
var logger          = require('../config/logger');

module.exports = function(dependencies) {

  return {
    dependencies: dependencies,

    getResponse: function(request) {
      return new Promise(function(resolve, reject) {
        // const projectId = 'sammantha-athena'; //https://dialogflow.com/docs/agents#settings
        // const sessionId = 'quickstart-session-id';
        //const query = queryText;
        //const languageCode = 'pt-BR';

        const dialogflow = require('dialogflow');
        const sessionClient = new dialogflow.SessionsClient();

        // // Define session path
        // const sessionPath = sessionClient.sessionPath(projectId, sessionId);
        // console.log(sessionPath);

        // The text query request.
        // const request = {
        // session: sessionPath,
        // queryInput: {
        //     text: {
        //     text: query,
        //     languageCode: languageCode,
        //     },
        // },
        // };

        // Send request and log result
        sessionClient
        .detectIntent(request)
        .then(responses => {
            console.log(JSON.stringify(responses));
            console.log(responses[0].queryResult)
            console.log(responses[0].fulfillmentMessages)
            console.log('Detected intent');
            const result = responses[0].queryResult;
            console.log(`  Query: ${result.queryText}`);
            resolve(result.fulfillmentText)
            console.log(`  Response: ${result.fulfillmentText}`);
            if (result.intent) {
            console.log(`  Intent: ${result.intent.displayName}`);
            } else {
            console.log(`  No intent matched.`);
            }
        })
        .catch(err => {
            console.error('ERROR:', err);
            reject();
        });
        })
      }
    }   
  };