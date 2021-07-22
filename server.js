const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
const serverless = require("serverless-http");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Call database connection
const db = require("./app/models");

// Development mode : Model synchronization -> This checks what is the current state of the table and then performs the necessary changes in the table to make it match the model
// db.sequelize.sync({ alter: true }).then(() => {
//   console.log("Check and re-sync db.");
// });
// Production mode : comment previous code and uncomment the following
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});

require("./app/routes/user.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/customer.routes")(app);
require("./app/routes/address.routes")(app);
require("./app/routes/company.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
module.exports.handler = serverless(app);
