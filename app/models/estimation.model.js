module.exports = (sequelize, Sequelize) => {
  const Estimation = sequelize.define("estimation", {
    numero: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        isNumeric: true,
      },
    },
    total: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    isAccepted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
  });

  return Estimation;
};
