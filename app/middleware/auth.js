const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      console.log(token);
      throw "Invalid user ID";
    } else {
      console.log(token);
      next();
    }
  } catch {
    console.log("NEIN");
    console.log(req.headers);
    res.status(401).json({
      message: "Invalid request!",
      error: new Error("Invalid request!"),
    });
  }
};
