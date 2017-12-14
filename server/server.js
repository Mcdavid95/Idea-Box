import express from 'express';
import mongoose from 'mongoose';
import logger from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import colors from 'colors';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import path from 'path';
import routes from './routes/routes';
import devConfig from '../webpack.config';
import prodConfig from '../webpack.config.prod';

const option = {
  server: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000
    }
  },
  replset: {
    socketOptions: {
      keepAlive: 300000,
      connectTimeoutMS: 30000
    }
  }
};

dotenv.config();
// database config
const configDB = require('./config/database');

let compiler;

if (process.env.NODE_ENV === 'production') {
  mongoose.connect(configDB.url_production, option); // connect to our production database
  compiler = webpack(prodConfig);
  console.log(compiler);
} else if (process.env.NODE_ENV === 'test') {
  mongoose.connect(configDB.url_test); // connect to our test database
  compiler = webpack(devConfig);
} else {
  mongoose.createConnection(configDB.url);
  compiler = webpack(devConfig);
}

mongoose.connect(configDB.url);
compiler = webpack(devConfig);
const port = parseInt(process.env.PORT, 10) || 8000;

// Set up the express app
const app = express();
app.use(logger('dev'));

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: prodConfig.output.publicPath,
    open: false
  }));
} else {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: devConfig.output.publicPath,
    open: false
  }));
}

app.use(webpackHotMiddleware(compiler));

app.use('/api/v1', routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/app', 'index.html'));
});

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

app.listen(port, (err) => {
  if (err) {
    console.log(err, 'but stuff works');
  } else {
    console.log(colors.red(`Server runnin on port ${port}...`));
  }
});

export default app;
