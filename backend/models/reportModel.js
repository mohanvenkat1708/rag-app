// models/reportModel.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    messageId: String,
    userId: String,
    reportText: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);
