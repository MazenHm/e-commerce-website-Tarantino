var jwt = require("jsonwebtoken");

const createToken = (user) => {
  var token = jwt.sign({ id: user._id }, "mazen");
  return token;
};
const isAuth = async (req, res, next) => {
  try {
    const token = req.header("x-auth");

    const decoded = jwt.verify(token, "mazen");
    console.log(decoded)

    if (decoded.id) {
        req.id =decoded.id
      next();
    }else{
        res.status(401).send({ error: "Invalid Token!" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Please authenticate!" });
  }
};

module.exports = {
  createToken,
  isAuth,
};
