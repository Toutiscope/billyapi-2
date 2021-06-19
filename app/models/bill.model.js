module.exports = (sequelize, Sequelize) => {
  const Bill = sequelize.define("bill", {
    numero: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        isNumeric: true,
      },
    },
    isPaid: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
  });

  return Bill;
};
