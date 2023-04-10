const bcryptjs = require("bcryptjs");
const userModel = require("../users/user-model");

const validateRegisterPayload = (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (username && password) {
      req.body.role_id = 1;
      next();
    } else {
      res.status(400).json({ message: "Username ve password gereklidir" });
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
      res.status(400).json({ message: "Kullanici bulunamadi" });
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
      res.status(400).json({ message: "Password yanlis" });
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
