const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://smullock:<password>@cluster0.zvkwjl0.mongodb.net/googlebooks');

module.exports = mongoose.connection;
