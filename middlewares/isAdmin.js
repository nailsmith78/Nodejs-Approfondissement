const UnauthorizedError = require("../errors/unauthorized");
const notAdminError = require("../errors/not-admin");

module.exports = (req, res, next) => {
    if (!req.user) {
        return next(new UnauthorizedError());
    }

    if (req.user.role !== "admin") {
        return next(new notAdminError());
    }
    console.log("controle isAdmin OK: ");
    next();
};