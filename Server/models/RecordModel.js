const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
       
        phone: {
            type: String,
            required: true,
            trim: true,
        },
       
        notes: {
            type: String,
            default: "",
            trim: true,
        },
       
        assignedAgent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Agent",
            required: true,
        },
       
        batchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DistributionHistory",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Record", recordSchema);