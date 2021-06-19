
module.exports = (sequelize, Sequelize) => {
  const company = require("./company.model.js")(sequelize, Sequelize);
  const Address = sequelize.define("address", {
    mail: {
      type: Sequelize.STRING,
      validate: {
        isEmail: {
          msg: "L'email est incorrect",
        },
      },
    },
    tel: {
      type: Sequelize.STRING(10),
      validate: {
        isNumeric: true,
        len: 10,
      },
    },
    street: {
      type: Sequelize.STRING,
    },
    complement: {
      type: Sequelize.STRING,
    },
    zipCode: {
      type: Sequelize.STRING(5),
      validate: {
        isNumeric: true,
        len: 5,
      },
    },
    city: {
      type: Sequelize.STRING,
    },
  });

  return Address;
};