import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import logger from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import colors from 'colors';

dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const port = parseInt(process.env.PORT, 10) || 8000;

// database config
// mongoose.connect(`mongodb://${dbUser}:${dbPassword}@ds119446.mlab.com:19446/todolist`)
// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// require('./routes')(app);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

// const server = http.createServer(app);

app.listen(port, (err) => {
  if (err) {
    console.log(err, 'but stuff works');
  } else {
    console.log(`Server runnin on port ${port}...`.red);
  }
});

export default app;
