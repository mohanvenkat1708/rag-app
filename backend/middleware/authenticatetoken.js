const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log('Authorization Header:', authHeader); // Debug statement
    console.log('Token:', token); // Debug statement

    if (token == null) {
        console.log('No token provided');
        return res.sendStatus(401); // No token provided
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log('JWT verification failed:', err); // Debug statement
            return res.sendStatus(403); // Token invalid
        }
        console.log('JWT verified, user:', user); // Debug statement
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
