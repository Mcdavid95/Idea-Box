import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  url: 'mongodb://127.0.0.1:27017/ideabox',
  url_production: process.env.MONGODB_URI,
  url_test: process.env.DB_URL
};
