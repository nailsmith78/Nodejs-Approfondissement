class NotAdminError extends Error {
    status = 403;
    constructor(message = "Access denied: admin only") {
        super(message);
    }
}

module.exports = NotAdminError;
