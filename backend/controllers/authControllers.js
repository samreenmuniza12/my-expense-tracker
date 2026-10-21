const User = require("../models/User");
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require("google-auth-library"); 

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

// Register user
exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;
    
    // Validation: Check for missing fields
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }
       
        // Create the User
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl: profileImageUrl || null, 
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res
           .status(500)
           .json({ message: "Error registering user", error: err.message });
    }
}

//Login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    // Validation: Check for missing fields
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        })

    } catch (err) {
        res.status(500).json({ message: "Error logging in", error: err.message });
    }
}

// Get userinfo
exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({message: "user not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Error fetching user info", error: err.message });
    }
}

//Google login
exports.googleLogin = async (req, res) => {
    const { credential } = req.body;

    if (!credential) {
        return res.status(400).json({ message: "Google credential is required" });
    }

    try {
        // Verify token with Google
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, picture } = payload;

        // Check if user exists, otherwise create one
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                fullName: name,
                email,
                password: Math.random().toString(36).slice(-8), // dummy password, not used for Google users
                profileImageUrl: picture || null,
            });
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: "Google authentication failed", error: err.message });
    }
}