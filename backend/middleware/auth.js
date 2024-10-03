const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret_key'; // Use environment variables for security

// Authentication Middleware
const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    console.log('Auth Header:', authHeader); // Log the authorization header
    console.log('Token:', token); // Log the token

    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Token Verification Error:', err); // Log token verification errors
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }
        req.user = decoded;
        console.log('Decoded Token:', decoded); // Log the decoded token
        next();
    });
};

// Authorization Middleware
const authorize = (roles = []) => {
    if (typeof roles === 'string') roles = [roles];

    return (req, res, next) => {
        console.log('User Role:', req.user?.role); // Log the user's role
        if (!roles.includes(req.user?.role)) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        next();
    };
};

module.exports = { authenticate, authorize };
