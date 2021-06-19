module.exports = (sequelize, Sequelize) => {
  const Material = sequelize.define("material", {
    label: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    priceKg: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  });

  return Material;
};
