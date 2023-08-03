const express = require('express');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const routes = require('./routes/routes');

const app = express();
const jwt_secret = process.env.JWT_SECRET;

// parse json request body
app.use(express.json());
app.use(session({ secret: jwt_secret, saveUninitialized: true, resave: true }));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
const corsOpts = {
  origin: '*',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
};
app.use(cors(corsOpts));

// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// parse application/json
app.use(bodyParser.json());

// routes
app.use('/api', routes);

module.exports = app;
