const express = require('express');
const router = express.Router();
const Report = require('../models/reportModel'); // Import the Report model

// Route to handle posting a report
router.post('/reporting', async (req, res) => {
    try {
        const { messageId, userId, reportText } = req.body;

        // Create a new report
        const newReport = new Report({
            messageId,
            userId,
            reportText,
            createdAt: new Date()
        });

        // Save the report to the database
        await newReport.save();

        res.status(201).json({ message: 'Report submitted successfully' });
    } catch (error) {
        console.error('Error submitting report:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
