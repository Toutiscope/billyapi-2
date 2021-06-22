const { addresses } = require("../models");
const db = require("../models");
const Address = db.addresses;
const Company = db.company;
const Customer = db.customers;

// Create and Save a new Address
exports.create = (req, res) => {
  // Validate request
  console.log(req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create an Address
  // const address = {
  //   mail: req.body.mail,
  //   tel: req.body.tel,
  //   street: req.body.street,
  //   complement: req.body.complement,
  //   zipCode: req.body.zipCode,
  //   city: req.body.city,
  // };

  const address = {
    mail: "user@mail.fr",
    tel: "0607060606",
    street: "41 rue de la Street",
    complement: "RAS",
    zipCode: "44200",
    city: "NANTES",
    companyId: 1,
  };

  // Save Address in the database
  Address.create(address)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Address.",
      });
    });
};

// Retrieve all Addresss from the database.
exports.findAll = (req, res) => {
  // const mail = req.query.mail;
  // var condition = mail ? { mail: { [Op.like]: `%${mail}%` } } : null;

  Address.findAll({
    include: [
      {
        model: Company,
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving addresses.",
      });
    });
};

// Find a single Address with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Address.findByPk(id, {
    include: [
      {
        model: Customer,
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Address with id=" + id,
      });
    });
};

// Update a Address by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  const address = {
    mail: "update@mail.fr",
    city: "PANAM",
  };

  Address.update(address, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Address was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Address with id=${id}. Maybe Address was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Address with id=" + id,
      });
    });
};

// Delete a Address with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Address.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Address was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Address with id=${id}. Maybe Address was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Address with id=" + id,
      });
    });
};

// Delete all Addresss from the database.
exports.deleteAll = (req, res) => {
  Address.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Addresss were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all addresses.",
      });
    });
};
