const { JWT_SECRET } = require("../../secrets/secretToken");
const JWT = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header["authorization"];
    if (token) {
      JWT.verify(token, JWT_SECRET, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: "token geçersizdir" });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      });
    } else {
      res.status(401).json({ message: "token gereklidir" });
    }
  } catch (error) {
    next(error);
  }
  /*
    EKLEYİN

    1- Authorization headerında geçerli token varsa, sıradakini çağırın.

    2- Authorization headerında token yoksa,
      response body şu mesajı içermelidir: "token gereklidir".

    3- Authorization headerında geçersiz veya timeout olmuş token varsa,
	  response body şu mesajı içermelidir: "token geçersizdir".
  */
};
