module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    mail: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        isEmail: {
          msg: "L'email est incorrect",
        },
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        min: 8,
      },
    },
  });
  return User;
};
