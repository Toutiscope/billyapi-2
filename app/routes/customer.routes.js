module.exports = app => {
    const customers = require("../controllers/customer.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Customer
    router.post("/", customers.create);
  
    // Retrieve all customers
    router.get("/", customers.findAll);
  
    // Retrieve all customers pro
    router.get("/status", customers.findAllProfessionals);
  
    // Retrieve a single Customer with id
    router.get("/:id", customers.findOne);
  
    // Update a Customer with id
    router.put("/:id", customers.update);
  
    // Delete a Customer with id
    router.delete("/:id", customers.delete);
  
    // Delete all customers
    router.delete("/", customers.deleteAll);
  
    app.use('/api/customers', router);
  };