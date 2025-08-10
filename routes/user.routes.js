import express from 'express';
import { createUser, deleteAllUser, getAllUser, loginUser } from '../controller/user.controller.js';

const router = express.Router();

// Routes
router.get('/getAll', getAllUser);
router.post('/signup', createUser);
router.post('/login', loginUser);
router.delete('/delete/:id', deleteAllUser);

export default router;
