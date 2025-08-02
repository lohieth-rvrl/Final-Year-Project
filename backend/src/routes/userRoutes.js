const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const authrizeRoles = require('../middlewares/roleMiddleware');

// user access
router.get('/user',verifyToken, authrizeRoles("user", "admin", "tester"), (req, res) => {
    res.status(200).json({ message: 'User access granted' });
});

// admin acess
router.get('/admin',verifyToken, authrizeRoles("admin", "tester"), (req, res) => {
    res.status(200).json({ message: 'Admin access granted' });
});

// tester access
router.get('/tester',verifyToken, authrizeRoles("tester"), (req, res) => {
    res.status(200).json({ message: 'Tester access granted' });
});

module.exports = router;