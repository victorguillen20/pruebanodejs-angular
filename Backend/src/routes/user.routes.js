import {Router} from 'express';
import { createUser, getidbyUsername, getUserbyUsername, getUsersUnAproval } from '../controllers/user.controller.js'

const router = Router();


router.post("/user/register", createUser);
router.post("/user/profile", getUserbyUsername);
router.post("/user/getid", getidbyUsername);
router.post("/user/unaproval", getUsersUnAproval);


export default router;