const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const messageRoutes = require('./routes/messages'); // Adjust the path as needed
const reportRoutes = require('./routes/reportRoutes'); // Adjust the path as needed
const fileUploadRoutes = require('./routes/uploadRoutes'); // Import your file upload routes

const app = express();

// Middleware setup
app.use(cors()); // Enable cross-origin resource sharing if needed
app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Static file serving for uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve files from the 'uploads' directory

// Routes
app.use('/api/messages', messageRoutes); // Routes for messages
app.use('/api/reports', reportRoutes); // Routes for reports
app.use('/api/upload', fileUploadRoutes); // Routes for file uploads

// Connect to MongoDB
mongoose.connect('mongodb+srv://mohanvenkat1708:jYysHebg0JWNgOFK@cluster0.apnje.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
