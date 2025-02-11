const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }
    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ error: "Invalid token" });
    }
};

const authenticateAdmin = (req, res, next) => {
    const apiKey = req.header("x-api-key");
    if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
        return res.status(403).json({ error: "Forbidden: Invalid API Key" });
    }
    next();
};

module.exports = { authenticateUser, authenticateAdmin };
