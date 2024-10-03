const express = require('express');
const router = express.Router();
const Report = require('../models/reportModel');
const authenticateToken = require('../middleware/authenticateToken');

// Add endpoint to report a message
router.post('/', authenticateToken, async (req, res) => {
    const { messageId, userId, reportText } = req.body;
    console.log('POST /reports endpoint hit'); // Debug statement
    console.log('Request body:', req.body); // Debug statement
    try {
        const report = new Report({ messageId, userId, reportText });
        await report.save();
        res.status(200).json(report);
    } catch (error) {
        console.error('Failed to report message:', error); // Debug statement
        res.status(500).json({ error: 'Failed to report message' });
    }
});

// Add endpoint to get all reports for admin
router.get('/', authenticateToken, async (req, res) => {
    console.log('GET /reports endpoint hit'); // Debug statement
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
    } catch (error) {
        console.error('Failed to fetch reports:', error); // Debug statement
        res.status(500).json({ error: 'Failed to fetch reports' });
    }
});

module.exports = router;
