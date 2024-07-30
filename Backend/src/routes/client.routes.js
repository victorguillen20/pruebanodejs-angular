import {Router} from 'express';
import { registerClient, 
    getClient,
    registerContract,
    updateContract, 
    getAllClients,
    updateClient,
    getAllContracts
} from '../controllers/client.controller.js'

const router = Router();


router.post("/client/register", registerClient);
router.post("/client/update", updateClient);
router.post("/client/profile", getClient);
router.post("/client/allprofiles", getAllClients);
router.post("/client/contract/register", registerContract);
router.post("/client/contract/update", updateContract);
router.post("/client/contract/allcontracts", getAllContracts);

export default router;