const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;

// Sign Up
exports.signup = (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, saltRounds);

  const user = {
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    mail: req.body.mail,
    password: hash,
    companyId: req.body.companyId,
  };
  User.create(user)
    .then(() => res.status(201).json({ message: "User created !" }))
    .catch((error) => res.status(400).json({ error }));
};

// Login
exports.login = (req, res) => {
  User.findOne({ where: { mail: req.body.mail } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      const validPassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(401).json({ message: "Mot de passe incorrect !" });
      }
      res.status(200).json({
        userId: user._id,
        token: jwt.sign(req.body, "RANDOM_TOKEN_SECRET", {
          expiresIn: "24h",
        }),
      });
    })
    .catch((error) => res.status(500).json({ error: "catch" }));
};
