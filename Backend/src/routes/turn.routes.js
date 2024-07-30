import {Router} from 'express';
import { getTotalTurns, 
    getTotalTurnsByGestor, 
    TurnRegister,
    getAllTurns
 } from '../controllers/turn.controller.js';

const router = Router();


router.post("/turn/generate", TurnRegister);
router.post("/turn/admin/total", getTotalTurns);
router.post("/turn/total", getTotalTurnsByGestor);
router.post("/turn/all", getAllTurns)


export default router;