const bcryptjs = require("bcryptjs");
const userModel = require("../users/user-model");

const validateRegisterPayload = (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (username && password) {
      req.body.role_id = 1;
      next();
    } else {
      res.status(400).json({ message: "username ve şifre gereklidir" });
    }
  } catch (error) {
    next(error);
  }
};

const validateUserName = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await userModel.getByName(username);
    if (user) {
      next();
    } else {
      res.status(400).json({ message: "geçersiz kriterler" });
    }
  } catch (error) {
    next(error);
  }
};

const validatePassword = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await userModel.getByName(username);
    const { password } = req.body;
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (validPassword) {
      next();
    } else {
      res.status(400).json({ message: "geçersiz kriterler" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateRegisterPayload,
  validateUserName,
  validatePassword,
  validatePassword,
};
