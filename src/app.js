require("dotenv").config();
const express = require("express");
const cors = require("cors");
// eslint-disable-next-line import/no-extraneous-dependencies
const helmet = require("helmet");
// eslint-disable-next-line import/no-extraneous-dependencies
const morgan = require("morgan");
const passport = require("passport");
const bodyParser = require("body-parser");
const session = require("express-session");
const routes = require("./routes/routes");

const app = express();
const jwtSecret = process.env.JWT_SECRET || "secret";

// parse json request body
app.use(express.json());
app.use(session({ secret: jwtSecret, saveUninitialized: true, resave: true }));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// log HTTP requests
app.use(morgan("combined"));

// enable cors
app.use(cors());
const corsOpts = {
  origin: "*",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"]
};
app.use(cors(corsOpts));

// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// parse application/json
app.use(bodyParser.json());

// secure apps by setting various HTTP headers
app.use(helmet());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport/googleStrategy")(passport);
require("./config/passport/jwtStrategy")(passport);

// routes
app.use("/api", routes);

// simple route
app.get("/ping", (req, res) => {
  res.json({
    message: "Server is up"
  });
});

const BASE_URL = "/api/v1";
// app.use(BASE_URL, require('./routes/routes'));

module.exports = app;
