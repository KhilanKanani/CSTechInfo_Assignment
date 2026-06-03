const Agent = require("../models/AgentModel");

const createAgent = async (req, res) => {
    try {
        const { name, email, mobileNumber, password, role } = req.body;

        if (!name || !email || !mobileNumber || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (name.trim().length < 2) {
            return res.status(400).json({
                success: false,
                message: "Name must be at least 2 characters",
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address",
            });
        }

        const mobileRegex = /^\+\d{10,15}$/;
        if (!mobileRegex.test(mobileNumber)) {
            return res.status(400).json({
                success: false,
                message: "Mobile number must include country code, for example +919876543210",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }

        const existingAgent = await Agent.findOne({ email });
        if (existingAgent) {
            return res.status(400).json({
                success: false,
                message: "Agent already exists",
            });
        }

        const agent = await Agent.create({
            name,
            email,
            mobileNumber,
            password,
            role,
        });

        res.status(201).json({
            success: true,
            message: "Agent created successfully",
            data: {
                _id: agent._id,
                name: agent.name,
                email: agent.email,
                mobileNumber: agent.mobileNumber,
                role: agent.role,
                createdAt: agent.createdAt,
                updatedAt: agent.updatedAt,
            },
        });
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAgents = async (req, res) => {
    try {
        const agents = await Agent.find().select("-password");

        res.status(200).json({
            success: true,
            count: agents.length,
            data: agents,
        });
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAgentById = async (req, res) => {
    try {
        const agent = await Agent.findById(req.params.id).select("-password");

        if (!agent) {
            return res.status(404).json({
                success: false,
                message: "Agent not found",
            });
        }

        res.status(200).json({
            success: true,
            data: agent,
        });
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteAgent = async (req, res) => {
    try {
        const agent = await Agent.findById(req.params.id);

        if (!agent) {
            return res.status(404).json({
                success: false,
                message: "Agent not found",
            });
        }

        await agent.deleteOne();

        res.status(200).json({
            success: true,
            message: "Agent deleted successfully",
        });
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = { createAgent, getAgents, getAgentById, deleteAgent, };