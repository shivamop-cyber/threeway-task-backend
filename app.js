const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

// Route Imports
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');

// Config
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({ path: 'config/config.env' });
}

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: '*',
  })
);

app.use('/api/v1/user', user);
app.use('/api/v1/order', order);

module.exports = app;
