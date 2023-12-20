const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const passport = require("passport");
const bodyParser = require("body-parser");
const session = require("express-session");
// const multer = require("multer");
// const path = require("path");
const compression = require("compression");
const path = require("path");
const routes = require("./routes/api");
const { errorHandler } = require("./middleware/error");
const config = require("./config/config");
const ApiError = require("./utils/ApiError");
const enums = require("./json/enums.json");

// const upload = multer({ dest: 'uploads/' });
// const upload = multer({ dest: path.join(__dirname, 'uploads') });

const app = express();

// parse json request body
app.use(express.json());
app.use(
  session({ secret: config.jwt.secret, saveUninitialized: true, resave: true })
);

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

// gzip compression
app.use(compression());

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

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(enums.HTTP_CODES.NOT_FOUND, "Not found"));
});

// error handler, send stacktrace only during development
app.use(errorHandler);

const BASE_URL = "/api/v1";
// app.use(BASE_URL, require('./routes/routes'));

module.exports = app;
