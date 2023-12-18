/* eslint-disable import/no-extraneous-dependencies */
import "express-async-errors";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import passport from "passport";
import session from "express-session";
import morgan from "morgan";
import config from "#config";
import routes from "#routes/routes";
import googleStrategy from "../config/passport/googleStrategy";
import jwtStrategy from "../config/passport/jwtStrategy";

const app = express();
const jwtSecret = config.JWT_SECRET || "secret";

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

// Passport strategy setup
googleStrategy(passport);
jwtStrategy(passport);

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

export default app;
