module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define("customer", {
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    firstname: {
      type: Sequelize.STRING,
    },
    company: {
      type: Sequelize.STRING,
    },
    note: {
      type: Sequelize.TEXT,
    },
    status: {
      type: Sequelize.STRING(30),
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
  });

  return Customer;
};
