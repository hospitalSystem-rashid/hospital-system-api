const jew = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

module.exports = (req, resp, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return resp.status(403).send("No token provided");
    }
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        return resp.status(401).send("Invalid or Expired Token....");
    }
};
