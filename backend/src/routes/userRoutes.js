// import { Router } from 'express';
// const router = Router();
// import def from '../middlewares/authMiddleware.js';
// const { verifyToken } = def;
// import authrizeRoles from '../middlewares/roleMiddleware.js';

// // user access
// router.get('/user',verifyToken, authrizeRoles("user", "admin", "tester"), (req, res) => {
//     res.status(200).json({ message: 'User access granted' });
// });

// // admin acess
// router.get('/admin',verifyToken, authrizeRoles("admin", "tester"), (req, res) => {
//     res.status(200).json({ message: 'Admin access granted' });
// });

// // tester access
// router.get('/tester',verifyToken, authrizeRoles("tester"), (req, res) => {
//     res.status(200).json({ message: 'Tester access granted' });
// });

// export default router;

import { Router } from 'express';
const router = Router();
import auth from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import {authrizeRoles} from '../middlewares/roleMiddleware.js';
const { verifyToken, verifyRole } = authMiddleware;

// User access
router.get('/user', verifyToken, authrizeRoles('user', 'admin', 'tester'), (req, res) => {
    res.status(200).json({ message: 'User access granted' });
}); 
// Admin access
router.get('/admin', verifyToken, authrizeRoles('admin', 'tester'), (req, res) => {
    res.status(200).json({ message: 'Admin access granted' });
});
// Tester access
router.get('/tester', verifyToken, authrizeRoles('tester'), (req, res) => {
    res.status(200).json({ message: 'Tester access granted' });
});
export default router;