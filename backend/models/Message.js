const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    user: { type: String, required: true },
    username: { type: String, required: true }, // Add this field
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    sessionId: { type: String, required: true } // Add this field for session-based display
});

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
