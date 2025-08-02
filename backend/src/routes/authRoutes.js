import { Router } from 'express';
const  router = Router();
import auth from '../controllers/authController.js';

router.post("/register", auth.register);
router.post("/login", auth.login);

export default router;
