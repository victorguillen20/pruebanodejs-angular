import {Router} from 'express';
import { registerClient, 
    getClient,
    registerContract,
    updateContract, 
    getAllClients,
    updateClient,
    getAllContracts
} from '../controllers/client.controller.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = Router();


router.post("/client/register", authMiddleware, registerClient);
router.post("/client/update", authMiddleware, updateClient);
router.post("/client/profile", authMiddleware, getClient);
router.post("/client/allprofiles", authMiddleware, getAllClients);
router.post("/client/contract/register", authMiddleware, registerContract);
router.post("/client/contract/update", authMiddleware, updateContract);
router.post("/client/contract/allcontracts", authMiddleware, getAllContracts);

export default router;