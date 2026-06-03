const mongoose = require("mongoose");

const distributionHistorySchema = new mongoose.Schema(
    {
        fileName: {
            type: String,
            required: true,
            trim: true,
        },
       
        totalRecords: {
            type: Number,
            required: true,
        },
       
        totalAgents: {
            type: Number,
            required: true,
            default: 5,
        },
       
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Agent",
            required: true,
        },
       
        assignedAgents: [
            {
                agentId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Agent",
                    required: true,
                },
                agentName: {
                    type: String,
                    required: true,
                },
                recordsCount: {
                    type: Number,
                    required: true,
                    default: 0,
                },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("DistributionHistory", distributionHistorySchema);