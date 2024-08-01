import {Router} from 'express';
import { createUser, getidbyUsername, getUserbyUsername, getUsersUnAproval, recoverPassword, userExistandEmail } from '../controllers/user.controller.js'

const router = Router();


router.post("/user/register", createUser);
router.post("/user/profile", getUserbyUsername);
router.post("/user/getid", getidbyUsername);
router.post("/user/unaproval", getUsersUnAproval);
router.post("/user/recover", recoverPassword);
router.post("/user/useremailexist", userExistandEmail);


export default router;