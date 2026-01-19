const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB verbunden');
  } catch (error) {
    console.error('MongoDB Verbindungsfehler:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
