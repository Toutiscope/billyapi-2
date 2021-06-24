module.exports = app => {
    const customers = require("../controllers/customer.controller.js");
  
    var router = require("express").Router();

    const auth = require("../middleware/auth.js");
  
    // Create a new Customer
    router.post("/", auth, customers.create);
  
    // Retrieve all customers
    router.get("/", auth, customers.findAll);
  
    // Retrieve a single Customer with id
    router.get("/:id", auth, customers.findOne);
  
    // Update a Customer with id
    router.put("/:id", auth, customers.update);
  
    // Delete a Customer with id
    router.delete("/:id", auth, customers.delete);
  
    // Delete all customers NEVER USE IT
    // router.delete("/", auth, customers.deleteAll);
  
    app.use('/api/customers', router);
  };