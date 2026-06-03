const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const xlsx = require("xlsx");

const Agent = require("../models/AgentModel");
const Record = require("../models/RecordModel");
const DistributionHistory = require("../models/DistributionHistoryModel");

const normalizeHeader = (key) => String(key).trim().toLowerCase();

const validateRows = (rows) => {
    if (!rows || rows.length === 0) {
        return "File is empty";
    }

    const sampleKeys = Object.keys(rows[0]).map(normalizeHeader);
    const required = ["firstname", "phone", "notes"];

    const hasAllColumns = required.every((col) => sampleKeys.includes(col));

    if (!hasAllColumns) {
        return "Invalid file format. Required columns: FirstName, Phone, Notes";
    }

    return null;
};

const parseCsvFile = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", () => resolve(results))
            .on("error", (err) => reject(err));
    });
};

const parseExcelFile = (filePath) => {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet, { defval: "" });
    return jsonData;
};

const uploadAndDistribute = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a file",
            });
        }

        const fileExt = path.extname(req.file.originalname).toLowerCase();

        let rows = [];
        if (fileExt === ".csv") {
            rows = await parseCsvFile(req.file.path);
        } else if (fileExt === ".xls" || fileExt === ".xlsx") {
            rows = parseExcelFile(req.file.path);
        } else {
            return res.status(400).json({
                success: false,
                message: "Only CSV, XLS, and XLSX files are allowed",
            });
        }

        const validationError = validateRows(rows);
        if (validationError) {
            fs.unlinkSync(req.file.path);
            return res.status(400).json({
                success: false,
                message: validationError,
            });
        }

        const agents = await Agent.find().sort({ createdAt: 1 });

        if (agents.length < 5) {
            fs.unlinkSync(req.file.path);
            return res.status(400).json({
                success: false,
                message: "At least 5 agents are required for distribution",
            });
        }

        const selectedAgents = agents.slice(0, 5);

        const history = await DistributionHistory.create({
            fileName: req.file.originalname,
            totalRecords: rows.length,
            totalAgents: 5,
            uploadedBy: req.userId,
            assignedAgents: selectedAgents.map((agent) => ({
                agentId: agent._id,
                agentName: agent.name,
                recordsCount: 0,
            })),
        });

        const recordsToInsert = [];
        const agentRecordCounts = [0, 0, 0, 0, 0];

        rows.forEach((row, index) => {
            const agentIndex = index % 5;
            const assignedAgent = selectedAgents[agentIndex];

            const firstName = row.FirstName || row.firstname || "";
            const phone = row.Phone || row.phone || "";
            const notes = row.Notes || row.notes || "";

            if (!firstName || !phone) {
                return;
            }

            recordsToInsert.push({
                firstName: String(firstName).trim(),
                phone: String(phone).trim(),
                notes: String(notes).trim(),
                assignedAgent: assignedAgent._id,
                batchId: history._id,
            });

            agentRecordCounts[agentIndex] += 1;
        });

        const insertedRecords = await Record.insertMany(recordsToInsert);

        history.assignedAgents = selectedAgents.map((agent, index) => ({
            agentId: agent._id,
            agentName: agent.name,
            recordsCount: agentRecordCounts[index],
        }));

        await history.save();

        const groupedData = selectedAgents.map((agent, index) => ({
            agentId: agent._id,
            agentName: agent.name,
            recordsCount: agentRecordCounts[index],
        }));

        return res.status(201).json({
            success: true,
            message: "File uploaded and distributed successfully",
            data: {
                batch: history,
                insertedCount: insertedRecords.length,
                agents: groupedData,
            },
        });
    }

    catch (error) {
        if (req.file?.path && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAgentWiseRecords = async (req, res) => {
    try {
        const batchId = req.params.batchId;

        const records = await Record.find({ batchId })
            .populate("assignedAgent", "name email mobileNumber")
            .sort({ createdAt: 1 });

        const grouped = {};

        records.forEach((record) => {
            const agentId = record.assignedAgent._id.toString();

            if (!grouped[agentId]) {
                grouped[agentId] = {
                    agentId: record.assignedAgent._id,
                    agentName: record.assignedAgent.name,
                    email: record.assignedAgent.email,
                    mobileNumber: record.assignedAgent.mobileNumber,
                    records: [],
                };
            }

            grouped[agentId].records.push(record);
        });

        return res.status(200).json({
            success: true,
            data: Object.values(grouped),
        });
    }

    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getDistributionHistory = async (req, res) => {
    try {
        const history = await DistributionHistory.find()
            .populate("uploadedBy", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: history.length,
            data: history,
        });
    }

    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAgentAssignedRecords = async (req, res) => {
    try {
        const { agentId } = req.params;

        const agent = await Agent.findById(agentId).select("-password");

        if (!agent) {
            return res.status(404).json({
                success: false,
                message: "Agent not found",
            });
        }

        const records = await Record.find({
            assignedAgent: agentId,
        });

        res.status(200).json({
            success: true,
            agent,
            totalRecords: records.length,
            records,
        });
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = { uploadAndDistribute, getAgentWiseRecords, getDistributionHistory, getAgentAssignedRecords };