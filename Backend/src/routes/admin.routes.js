import {Router} from 'express';
import { cashValues, createUser, getUnapprovedUsers, UpdateUsers, userAproved, UserdatasForAdmin } from '../controllers/admin.controller.js'
import { getMarcadores } from '../controllers/marcadores.controller.js';

const router = Router();


router.post("/admin/register", createUser);
router.post("/admin/aprove", userAproved);
router.post("/admin/marcadores", getMarcadores);
router.post("/admin/cash", cashValues);
router.post("/admin/profiles", UserdatasForAdmin);
router.post("/admin/update", UpdateUsers);
router.post("/admin/usersforapproval", getUnapprovedUsers);

export default router;