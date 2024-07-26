import {Router} from 'express';
import { registerClient, 
    loginClient, 
    getClient } from '../controllers/client.controller.js'

const router = Router();


router.post("/client/register", registerClient);
router.post("/client/login", loginClient);
router.post("/client/profile", getClient);

export default router;