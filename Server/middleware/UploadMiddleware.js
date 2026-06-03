const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedExt = [".csv", ".xls", ".xlsx"];
    const ext = path.extname(file.originalname).toLowerCase();

    if (!allowedExt.includes(ext)) {
        return cb(new Error("Only CSV, XLS and XLSX files are allowed"));
    }

    cb(null, true);
};

module.exports = multer({ storage, fileFilter, });