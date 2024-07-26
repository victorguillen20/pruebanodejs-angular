import {Router} from 'express';
import { createUser, userAproved } from '../controllers/admin.controller.js'

const router = Router();


router.post("/admin/register", createUser);
router.post("/admin/aprove", userAproved);


export default router;