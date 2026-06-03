const jwt = require("jsonwebtoken");
const User = require("../models/AgentModel");

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d", });
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Email not registered in the system",
            });
        }

        if (password !== user.password) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password",
            });
        }

        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            user,
        });
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token");

        res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        res.status(200).json({
            success: true,
            user,
        });
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = { loginUser, logoutUser, getMe, };