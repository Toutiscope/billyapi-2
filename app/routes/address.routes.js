module.exports = (app) => {
  const addresses = require("../controllers/address.controller.js");

  var router = require("express").Router();

  const auth = require("../middleware/auth.js");

  // Create a new address
  router.post("/", auth, addresses.create);

  // Retrieve all addresses
  router.get("/", auth, addresses.findAll);

  // Retrieve a single address with id
  router.get("/:id", auth, addresses.findOne);

  // Update a address with id
  router.put("/:id", auth, addresses.update);

  // // Delete a address with id
  // router.delete("/:id", auth, addresses.delete);

  // // Delete all addresses
  // router.delete("/", auth, addresses.deleteAll);

  app.use("/api/addresses", router);
};
