module.exports = (app) => {
  const companies = require("../controllers/company.controller.js");

  var router = require("express").Router();

  const auth = require("../middleware/auth.js");

  // Create a new company
  router.post("/", auth, companies.create);

  // Retrieve all companies
  router.get("/", auth, companies.findAll);

  // Retrieve a single company with id
  router.get("/:id", auth, companies.findOne);

  // Update a company with id
  router.put("/:id", auth, companies.update);

  // // Delete a company with id
  // router.delete("/:id", auth, companies.delete);

  // // Delete all companies
  // router.delete("/", auth, companies.deleteAll);

  app.use("/api/companies", router);
};
