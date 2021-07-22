const { addresses, company } = require("../models");
const db = require("../models");
const Company = db.company;
const Address = db.addresses;

// Create and Save a new Company
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create an Company
  const company = {
    name: req.body.name,
    ceo: req.body.ceo,
    logo: req.body.logo,
    siret: req.body.siret,
    website: req.body.website,
    status: req.body.status,
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

  // Save Company in the database
  Company.findAll()
    .then((data) => {
      if (data.length < 1) {
        const newCompany = Company.create(company);
        const newAddress = Address.create(address);
        newCompany.addAddress(newAddress).then(() => {
          res.send({ message: "Company created ! " });
        });
      } else {
        () => res.send({ message: "Cannot insert a new Company." });
      }
    })
    .then(() => {
      res.send({ message: "Company already exists" });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving companies.",
      });
    });
};

// Retrieve all Companys from the database.
exports.findAll = (req, res) => {
  // const id = req.query.id;
  // var condition = mail ? { mail: { [Op.like]: `%${mail}%` } } : null;

  Company.findAll({
    include: [
      {
        model: db.addresses, // will create a left join
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving companies.",
      });
    });
};

// Find a single Company with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Company.findByPk(id, {
    include: [
      {
        model: db.addresses,
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

// Update a Company by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  const company = {
    // name: "QB MAKER Updated",
    // ceo: "Quentin Boubou",
    // logo: "/",
    // siret: "09234567891011",
    // website: "https://qbmaker.com",
    status: "SARL",
  };

  Company.update(company, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Company was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Company with id=${id}. Maybe Company was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Company with id=" + id,
      });
    });
};

// Delete a Company with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id;

//   Company.destroy({
//     where: { id: id },
//   })
//     .then((num) => {
//       if (num == 1) {
//         res.send({
//           message: "Company was deleted successfully!",
//         });
//       } else {
//         res.send({
//           message: `Cannot delete Company with id=${id}. Maybe Company was not found!`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Could not delete Company with id=" + id,
//       });
//     });
// };

// Delete all Companys from the database.
exports.deleteAll = (req, res) => {
  Company.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Companys were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all companies.",
      });
    });
};
