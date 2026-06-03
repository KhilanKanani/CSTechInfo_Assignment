const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },

        mobileNumber: {
            type: String,
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
        },

        role: {
            type: String,
            enum: ["admin", "agent"],
            default: "agent",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Agent", agentSchema);