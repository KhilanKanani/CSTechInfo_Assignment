const express = require("express");
const router = express.Router();
const upload = require("../middleware/UploadMiddleware");
const protect = require("../middleware/AuthMiddleware");
const { uploadAndDistribute, getAgentWiseRecords, getDistributionHistory, getAgentAssignedRecords, } = require("../controllers/UploadController");

router.post("/upload", protect, upload.single("file"), uploadAndDistribute);
router.get("/history", protect, getDistributionHistory);
router.get("/agent/:agentId", protect, getAgentAssignedRecords);
router.get("/batch/:batchId", protect, getAgentWiseRecords);

module.exports = router;