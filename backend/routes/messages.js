const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const authenticateToken = require('../middleware/authenticateToken');

// Get all messages (protected route)
router.get('/', authenticateToken, async (req, res) => {
    console.log('GET /messages endpoint hit'); // Debug statement
    try {
        const messages = await Message.find();
        console.log('Messages fetched successfully:', messages); // Debug statement
        res.json(messages);
    } catch (err) {
        console.error('Failed to fetch messages:', err); // Debug statement
        res.status(500).json({ message: err.message });
    }
});

// Post a new message (protected route)
router.post('/', authenticateToken, async (req, res) => {
    console.log('POST /messages endpoint hit'); // Debug statement
    console.log('Request body:', req.body); // Debug statement
    const message = new Message({
        user: req.body.user,
        username: req.body.username,
        message: req.body.message,
        sessionId: req.body.sessionId,
    });

    try {
        const newMessage = await message.save();
        console.log('Message saved successfully:', newMessage); // Debug statement
        res.status(201).json(newMessage);
    } catch (err) {
        console.error('Failed to save message:'+req.body.user+req.body.message, err); // Debug statement
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
