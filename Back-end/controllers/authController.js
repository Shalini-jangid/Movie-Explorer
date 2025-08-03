const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// generates a JWT token for the user
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};


//cookie options for JWT
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    sameSite: 'Lax'
};


//signup fucntion
const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ error: "User already exists" });

        //Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hashedPassword });

        const token = generateToken(user._id);
        res.cookie('token', token, cookieOptions).status(201).json({ message: "Signup successful" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



//login function
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password)))
            return res.status(401).json({ error: "Invalid credentials" });

        const token = generateToken(user._id);
        res.cookie('token', token, cookieOptions).json({ message: "Login successful" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


//getProfile function
const getProfile = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email
        });
    } catch (err) {
        res.status(500).json({ error: "Unable to fetch profile" });
    }
};


//logout function
const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'Strict',
        secure: process.env.NODE_ENV === 'production'
    });
    return res.status(200).json({ message: 'Logged out successfully' });
};


module.exports = {
    signup, login, getProfile, logout
}
