const bcrypt = require("bcrypt");
const saltRounds = 10;
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
console.log(User);

// const user = User.build(); // Same as new User();
// console.log(nUser instanceof User); // true

// Create and Save a new User
exports.create = async (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, saltRounds);

  const user = {
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    mail: req.body.mail,
    password: hash,
    companyId: req.body.companyId,
  };

  await User.create(user)
    .then((user) => {
      res.status(201).send(user);
      // console.log(user instanceof User); //true
    })
    .catch((error) => res.status(400).json({ error }));
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  User.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

exports.findOne = async (req, res) => {
  const id = req.params.id;

  await User.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  const hash = bcrypt.hashSync(req.body.password, saltRounds);

  const user = {
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    mail: req.body.mail,
    password: hash,
    companyId: req.body.companyId,
  };

  User.update(user, {
    where: { id: id },
  })
    .then(() => res.status(201).json({ message: "User updated !" }))
    .catch((error) => res.status(400).json({ error }));
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      });
    });
};
