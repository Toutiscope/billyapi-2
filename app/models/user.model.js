const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
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
    },
    // {
    //   hooks: {
    //     beforeCreate: async (user) => {
    //       if (user.password) {
    //         const salt = await bcrypt.genSaltSync(10, "a");
    //         user.password = bcrypt.hashSync(user.password, salt);
    //       }
    //     },
    //     beforeUpdate: async (user) => {
    //       if (user.password) {
    //         const salt = await bcrypt.genSaltSync(10, "a");
    //         user.password = bcrypt.hashSync(user.password, salt);
    //       }
    //     },
    //   },
    //   instanceMethods: {
    //     validPassword: (password) => {
    //       return bcrypt.compareSync(password, this.password);
    //     },
    //   },
    // }
  );
  // User.prototype.validPassword = async (password, hash) => {
  //   return await bcrypt.compareSync(password, hash);
  // };
  return User;
};
