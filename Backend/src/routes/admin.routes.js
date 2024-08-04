import {Router} from 'express';
import { cashValues, createUser, getUnapprovedUsers, UpdateUsers, userAproved, UserdatasForAdmin } from '../controllers/admin.controller.js'
import { getMarcadores } from '../controllers/marcadores.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = Router();


router.post("/admin/register", authMiddleware, createUser);
router.post("/admin/aprove", authMiddleware, userAproved);
router.post("/admin/marcadores", authMiddleware, getMarcadores);
router.post("/admin/cash", authMiddleware, cashValues);
router.post("/admin/profiles", authMiddleware, UserdatasForAdmin);
router.post("/admin/update", authMiddleware, UpdateUsers);
router.post("/admin/usersforapproval", authMiddleware, getUnapprovedUsers);

export default router;