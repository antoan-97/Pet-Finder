const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const newUser = new User({ email, password });
        await newUser.save();

        console.log("JWT_SECRET:", process.env.JWT_SECRET); // Debugging
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ 
            message: 'User registered successfully!', 
            token,
            userId: newUser._id
        });
    } catch (error) {
        res.status(500).json({ message: error.message, error });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        console.log("JWT_SECRET:", process.env.JWT_SECRET); // Debugging
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ 
            token, 
            message: 'Login successful',
            userId: user._id
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

const logout = async (req, res) => {
    // You can handle any server-side logout logic here, if needed.

    res.status(204).send();
};


module.exports = { register, login, logout };