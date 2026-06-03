const express = require("express");
const router = express.Router();
const { loginUser, logoutUser, getMe, } = require("../controllers/AuthController");
const protect = require("../middleware/AuthMiddleware");

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", protect, getMe);

module.exports = router;