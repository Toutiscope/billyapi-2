const db = require("../models");
const Customer = db.customers;
const Address = db.addresses;
const Op = db.Sequelize.Op;

// Create and Save a new Customer
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Customer
  // const customer = {
  //   lastname: req.body.lastname,
  //   firstname: req.body.firstname,
  //   company: req.body.company,
  //   status: req.body.status,
  //   note: req.body.note,
  // };

  // Create an Address
  // const address = {
  //   mail: req.body.mail,
  //   tel: req.body.tel,
  //   street: req.body.street,
  //   complement: req.body.complement,
  //   zipCode: req.body.zipCode,
  //   city: req.body.city,
  // };

  const customer = {
    lastname: "Du Brésil",
    firstname: "Michel",
    company: "UneEntreprise",
    status: "Professionnel",
    note: "RAS",
  };

  const address = {
    mail: "user@mail.fr",
    tel: "0607060606",
    street: "41 rue de la Street",
    complement: "RAS",
    zipCode: "44200",
    city: "NANTES",
  };

  // Save Customer in the database
  const newCustomer = await Customer.create(customer);
  const newAddress = await Address.create(address);
  await newCustomer.addAddress(newAddress);
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  // Get all customers and all their associations
  // Customer.findAll({ include: { all: true } })
  //   .then((data) => {
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while retrieving customers.",
  //     });
  //   });

  // Get all customers and all addresses associated
  Customer.findAll({
    include: [
      {
        model: db.addresses,
        through: {
          attributes: ["addressId"],
        },
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers.",
      });
    });
};

// Find a single Customer with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Customer.findByPk(id, {
    include: [
      {
        model: db.addresses,
        attributes: { exclude: ['companyId'] }
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Company with id=" + id,
      });
    });
};

// Update a Customer by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Customer.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Customer was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Customer with id=" + id,
      });
    });
};

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Customer.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Customer was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Customer with id=" + id,
      });
    });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
  Customer.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Customers were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers.",
      });
    });
};

// Find all pro Customers
exports.findAllProfessionals = (req, res) => {
  Customer.findAll({ where: { status: "professional" } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers.",
      });
    });
};
