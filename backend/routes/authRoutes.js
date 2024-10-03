const express = require('express');
const User = require('../models/User'); // Adjust the path as needed
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Check if JWT_SECRET is defined
if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined in environment variables');
    process.exit(1);
}

// Registration Route
router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log('User already exists:', email);
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed Password:', hashedPassword); // Log the hashed password
        const newUser = new User({ username, email, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Registration Error:', err); // Log server errors
        res.status(500).json({ message: 'Server error' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login Request:', { email, password }); // Log login request data

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User Not Found');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log('Database Hashed Password:', user.password); // Log the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password Match:', isMatch); // Log the result of the password comparison
        if (!isMatch) {
            console.log('Password Mismatch');
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        console.log(user._id);
        const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        console.log('Generated Token:', token); // Log the generated token
        res.json({ token });
    } catch (err) {
        console.error('Server Error:', err); // Log server errors
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
