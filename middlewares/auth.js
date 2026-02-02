const UnauthorizedError = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../config");
const usersService = require("../api/users/users.service");

module.exports = async (req, res, next) => {
  try {
    console.log("🔥 auth middleware appelé");
    const token = req.headers["x-access-token"];
    if (!token) {
      throw "not token";
    }
    console.log("Token reçu :", token);

    const decoded = jwt.verify(token, config.secretJwtToken);
    console.log("AUTH SECRET:", config.secretJwtToken);

    const user = await usersService.get(decoded.userId);
    if (!user) {
      throw new NotFoundError();
    }
    console.log("Utilisateur récupéré :", user);
    console.log("Utilisateur decoded :", decoded);
    req.user = user;
    next();
  } catch (message) {
    next(new UnauthorizedError(message));
  }
};
