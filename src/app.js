const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
const corsOpts = {
  origin: '*',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
};
app.use(cors(corsOpts));

// routes
app.use('/api', routes);

module.exports = app;
