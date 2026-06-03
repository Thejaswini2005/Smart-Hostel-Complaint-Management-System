const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        console.log("Header:", authHeader);

        const token = authHeader.split(" ")[1];

        console.log("Token:", token);

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("Decoded:", decoded);

        req.user = decoded;

        next();

    } catch (error) {
        console.log(error.message);

        return res.status(401).json({
            message: "Invalid token"
        });
    }
};

module.exports = authMiddleware;