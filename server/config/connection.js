const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');

// mongoose.connect('mongodb+srv://smullock:1TaP54Gf7jsGbZ0E@cluster0.zvkwjl0.mongodb.net/googlebooks');


module.exports = mongoose.connection;


