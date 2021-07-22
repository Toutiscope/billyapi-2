module.exports = (app) => {
  const auth = require("../controllers/auth.controller.js");

  var router = require("express").Router();

  router.post("/signup", auth.signup);

  router.post("/login", auth.login);

  // router.post("/logout", auth.logout);

  app.use("/api/", router);
};
