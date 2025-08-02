const dcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const hashedPassword = await dcrypt.hash(password, 10);

        const user = new User({ username, password: hashedPassword, role });
        await user.save();
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }


};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }   
        const isMatch = await dcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }   

    // const { username, password } = req.body;
}

module.exports = {
    register,
    login
};

