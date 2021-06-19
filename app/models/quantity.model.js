module.exports = (sequelize, Sequelize) => {
  const Quantity = sequelize.define("quantity", {
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        isNumeric: true,
      },
    },
  });

  return Quantity;
};
