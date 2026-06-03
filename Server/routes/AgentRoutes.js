const express = require("express");
const router = express.Router();
const { createAgent, getAgents, getAgentById, deleteAgent, updateAgent, } = require("../controllers/AgentController");

router.post("/create", createAgent);
router.get("/all", getAgents);
router.get("/:id", getAgentById);
router.delete("/delete/:id", deleteAgent);

module.exports = router;