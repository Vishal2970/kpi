const JWT = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = JWT.verify(token, process.env.SECRET_KEY);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized" });
  }
};
module.exports = authMiddleware;
