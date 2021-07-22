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
  const customer = {
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    company: req.body.company,
    status: req.body.status,
    note: req.body.note,
  };

  // Create an Address
  const address = {
    mail: req.body.mail,
    tel: req.body.tel,
    street: req.body.street,
    complement: req.body.complement,
    zipCode: req.body.zipCode,
    city: req.body.city,
  };

  // Save Customer in the database
  const newCustomer = await Customer.create(customer).then((data) => {
    res.status(201).send(data);
  });
  const newAddress = await Address.create(address);
  await newCustomer
    .addAddress(newAddress)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating address and customer.",
      });
    });
};

// Get all customers without any association
exports.findAll = (req, res) => {
  Customer.findAll()
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
        attributes: { exclude: ["companyId"] },
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

  const customer = {
    lastname: "Hurel",
  };

  Customer.update(customer, {
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
  // Find if his address is associated with another customer
  Address.findAll({
    include: [
      {
        model: db.customers,
        where: { id: id },
      },
    ],
  })
    .then((data) => {
      console.log(data.length);
      if (data.length < 2) {
        // console.log("DELETE" + id);
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
      } else {
        res.send(
          "Cannot delete this customer because his address is also associated to other customers"
        );
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Customer with id=" + id,
      });
    });
};

// assoLength = data.customers.length;
// console.log(data.customers.length);
// if (assoLength < 1) {
//   console.log("DELETE" + id);
//   Customer.destroy({
//     where: { id: id },
//   })
//     .then((num) => {
//       if (num == 1) {
//         res.send({
//           message: "Customer was deleted successfully!",
//         });
//       } else {
//         res.send({
//           message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Could not delete Customer with id=" + id,
//       });
//     });
// }

// Delete all Customers from the database.
// exports.deleteAll = (req, res) => {
//   Customer.destroy({
//     where: {},
//     truncate: false,
//   })
//     .then((nums) => {
//       res.send({ message: `${nums} Customers were deleted successfully!` });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all customers.",
//       });
//     });
// };
