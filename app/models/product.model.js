module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    label: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    weight: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    printDuration: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    manPower: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
  });

  return Product;
};
