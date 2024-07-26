import {Router} from 'express';
import { registerClient, 
    getClient } from '../controllers/client.controller.js'

const router = Router();


router.post("/client/register", registerClient);
router.post("/client/profile", getClient);

export default router;