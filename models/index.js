const mongoose = require('mongoose');   

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/vote', { useNewUrlParser: true, useUnifiedTopology: true } );

module.exports.Poll = require('./polls');
module.exports.User = require('./user');