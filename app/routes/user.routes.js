module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  const auth = require("../middleware/auth.js");

  // Create a new User
  router.post("/", auth, users.create);

  // Retrieve all users
  router.get("/", auth, users.findAll);

  // Retrieve a single User with id
  router.get("/:id", auth, users.findOne);

  // Update a User with id
  router.put("/:id", auth, users.update);

  // Delete a User with id
  router.delete("/:id", auth, users.delete);

  // Delete all users
  // router.delete("/", users.deleteAll);

  app.use("/api/users", router);
};
