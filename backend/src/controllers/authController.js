import { hash, compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
const { sign } = jwt
const register = async (req, res) => {
    try {
        const { username, password, role } = req.body
        const hashedPassword = await hash(password, 10)
        const user = new User({ username, password: hashedPassword, role })
        await user.save()
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        })
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        const isMatch = await compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }
        const token = sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                role: user.role
            }
        })
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message })
    }
}




export default { register, login }
