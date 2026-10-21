const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes
exports.protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1]; // Expecting "Bearer <token>"
    
    if (!token) {
        return res.status(401).json({ message: "No token provided, authorization denied" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password"); 
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token, authorization denied" });
    }
}