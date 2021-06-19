require('dotenv').config()
const dbConfig = require("../config/config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

// Test the connection
try {
  sequelize.authenticate();
  console.log('Connecté à la base de données MySQL!');
} catch (error) {
  console.error('Impossible de se connecter, erreur suivante :', error);
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Require the models
db.customers = require("./customer.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.company = require("./company.model.js")(sequelize, Sequelize);
db.addresses = require("./address.model.js")(sequelize, Sequelize);
db.estimations = require("./estimation.model.js")(sequelize, Sequelize);
db.quantities = require("./quantity.model.js")(sequelize, Sequelize);
db.bills = require("./bill.model.js")(sequelize, Sequelize);
db.products = require("./product.model.js")(sequelize, Sequelize);
db.materials = require("./material.model.js")(sequelize, Sequelize);


// ASSOCIATIONS 

// Company -> Address : OneToMany
db.company.hasMany(db.addresses);
db.addresses.belongsTo(db.company);

// Customer -> Address : ManyToMany
db.customers.belongsToMany(db.addresses, { through: 'customerAddresses' });
db.addresses.belongsToMany(db.customers, { through: 'customerAddresses' });

// Company -> User : OneToMany
db.company.hasMany(db.addresses);
db.addresses.belongsTo(db.company);

// Estimation -> Users : ManyToMany
db.estimations.belongsToMany(db.users, { through: 'estimationUsers' });
db.users.belongsToMany(db.estimations, { through: 'estimationUsers' });

// Customer -> Estimation : OneToMany
db.customers.hasMany(db.estimations);
db.estimations.belongsTo(db.customers);

// Estimation -> Bill : OneToOne
db.estimations.hasOne(db.bills);
db.bills.belongsTo(db.estimations);

// Estimation -> Quantity : ManyToMany
// MISS IT BUT HAVE TO RESOLVE THE ALGORITHM PB BEFORE

// Product -> Quantity : ManyToMany
db.products.belongsToMany(db.quantities, { through: 'quantityProducts' });
db.quantities.belongsToMany(db.products, { through: 'quantityProducts' });

// Material -> Product : OneToMany
db.materials.hasMany(db.products);
db.products.belongsTo(db.materials);


module.exports = db;