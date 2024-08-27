// routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const Report = require('../models/reportModel');

// Add endpoint to report a message
router.post('/report', async (req, res) => {
    const { messageId, userId, reportText } = req.body;
    try {
        const report = new Report({ messageId, userId, reportText });
        await report.save();
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: 'Failed to report message' });
    }
});

// Add endpoint to get all reports for admin
router.get('/reports', async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reports' });
    }
});

module.exports = router; // Ensure this is correct
