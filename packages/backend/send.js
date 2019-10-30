const secrets = require('./SRSLY/DO_NOT_OPEN');
const client = require('twilio')(secrets.sid, secrets.token);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+16264657420',
     to: '+15108170536'
   })
  .then(message => console.log(message.sid));
