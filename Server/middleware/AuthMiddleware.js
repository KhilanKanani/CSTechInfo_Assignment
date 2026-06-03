const jwt = require("jsonwebtoken");

const AuthMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(500).json({
                success: false,
                message: "Not authorized, no token",
            });
        }

        const verify = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = verify.userId;

        next();
    }

    catch (err) {
        console.log("FindUser Error :", err.message);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = AuthMiddleware