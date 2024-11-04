import { verify } from "crypto";
import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide username."],
        unique: [true, "Username must be unique."]
    },
    email: {
        type: String,
        required: [true, "Please provide email."],
        unique: [true, "Email must be unique"]
    },
    password: {
        type: String,
        required: [true, "Please provide password."]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'subscriber'
    },
    forgotPasswrodToken: String,
    forgotPasswrodTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
}, {
    timestamps: true
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;