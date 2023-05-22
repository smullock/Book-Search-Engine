const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://smullock:1TaP54Gf7jsGbZ0E@cluster0.zvkwjl0.mongodb.net/googlebooks');

module.exports = mongoose.connection;
