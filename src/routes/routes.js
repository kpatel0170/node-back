const express = require("express");
const authRoute = require("./auth");
const userRoute = require("./user");
const docsRoute = require("./docs");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute
  },
  {
    path: "/user",
    route: userRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

const devRoutes = [
  // routes available only in development mode
  {
    // Path: server\src\routes\routes.js
    // Compare this snippet from server\src\routes\docs.route.js:

    path: "/docs",
    route: docsRoute
  }
];

devRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
