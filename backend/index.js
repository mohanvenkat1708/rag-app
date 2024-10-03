const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken'); // Add this line at the top

// Import routes
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messages'); // Adjust the path as needed
const reportRoutes = require('./routes/reportRoutes'); // Adjust the path as needed
const fileUploadRoutes = require('./routes/uploadRoutes'); // Adjust the path as needed
const reportingRoutes = require('./routes/reporting');
dotenv.config(); // Load environment variables

const app = express();

// Middleware setup
app.use(cors()); // Enable cross-origin resource sharing if needed
app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Static file serving for uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve files from the 'uploads' directory

// Authentication Middleware
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]; // Bearer token
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      
        if (err) return res.sendStatus(403);
        
        req.user = user;
        next();
    });
};

// Authorization Middleware
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access Denied' });
        }
        next();
    };
};

// Use authentication routes
app.use('/api/', authRoutes);

// Protected route example
app.get('/api/protected', authenticateToken, authorizeRoles('admin', 'teacher'), (req, res) => {
    res.json({ message: 'This is a protected route accessible only to admins and teachers' });
});

// Routes setup
app.use('/api/messages', authenticateToken, messageRoutes); // Protect routes with token authentication
app.use('/api/reports', authenticateToken, reportRoutes); // Protect routes with token authentication
app.use('/api/upload', authenticateToken, fileUploadRoutes); // Protect routes with token authentication
app.use('/api', reportingRoutes);
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
