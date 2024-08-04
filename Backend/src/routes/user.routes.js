import {Router} from 'express';
import { createUser, getidbyUsername, getUserbyUsername, getUsersUnAproval, recoverPassword, userExistandEmail } from '../controllers/user.controller.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
const router = Router();


router.post("/user/register", authMiddleware, createUser);
router.post("/user/profile", authMiddleware, getUserbyUsername);
router.post("/user/getid", authMiddleware, getidbyUsername);
router.post("/user/unaproval", authMiddleware, getUsersUnAproval);
router.post("/user/recover", authMiddleware, recoverPassword);
router.post("/user/useremailexist", authMiddleware, userExistandEmail);


export default router;