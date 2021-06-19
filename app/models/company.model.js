// "use strict";
module.exports = (sequelize, Sequelize) => {
  // const addresses = require("./address.model.js")(sequelize, Sequelize);
  const Company = sequelize.define("company", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    ceo: {
      type: Sequelize.STRING,
    },
    logo: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    siret: {
      type: Sequelize.STRING(14),
      validate: {
        isNumeric: true,
        len: 14,
      },
    },
    website: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    status: {
      type: Sequelize.STRING(100),
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
  }, {
    // Enforcing the table name to be equal to the model name (no plural)
    freezeTableName: true,
  });

  return Company;
};