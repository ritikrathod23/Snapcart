function handleError(err, req, res, next) {
    console.error(err);

    // ✅ If response was already sent, don't try to send again
    if (res.headersSent) {
        return next(err);
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: "The user is not authorized" });
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message || "Validation failed" });
    }

    return res.status(500).json({ message: err.message || "Internal Server Error" });
}

module.exports = handleError;
