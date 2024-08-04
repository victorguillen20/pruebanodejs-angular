import {Router} from 'express';
import { getTotalTurns, 
    getTotalTurnsByGestor, 
    TurnRegister,
    getAllTurns
 } from '../controllers/turn.controller.js';
 import { authMiddleware } from '../middleware/authMiddleware.js'

const router = Router();


router.post("/turn/generate", authMiddleware, TurnRegister);
router.post("/turn/admin/total", authMiddleware, getTotalTurns);
router.post("/turn/total", authMiddleware, getTotalTurnsByGestor);
router.post("/turn/all", authMiddleware, getAllTurns)


export default router;