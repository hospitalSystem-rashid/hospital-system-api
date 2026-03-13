module.exports = (req, res, next) => {
    if (!req.user) {
        return res.status(404).send('Not Found');
    }

    if (req.user.role !== "admin") {
        return res.status(403).send('Access denied, Admin only');
    }

    next();
};