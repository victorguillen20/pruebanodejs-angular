import {Router} from 'express';
import { Authentication } from '../controllers/auth.controller.js';

const router = Router();


router.post("/auth", Authentication);

export default router;