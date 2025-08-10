import express from 'express';
import { postBook, getAllBooks, deleteBook, getSingleBooks, updateBook, requestBook, updateBookStatus } from '../controller/book.controller.js';
import AuthMiddleware from '../middleware/auth.middleware.js';
import upload from '../middleware/upload.middleware.js';
import authorizeRoles from '../middleware/role.middleware.js';

const router = express.Router();

// Routes

router.get('/getAll', AuthMiddleware, authorizeRoles("user", "librarian"), getAllBooks);
router.get('/getSingle/:id', AuthMiddleware, authorizeRoles("librarian"), getSingleBooks);
router.post('/post', AuthMiddleware, authorizeRoles("librarian"), upload.single("image"), postBook);
router.put('/update/:id', AuthMiddleware, authorizeRoles("librarian"), upload.single("image"), updateBook);
router.patch('/request/:id', AuthMiddleware, authorizeRoles("user"), requestBook);
router.patch('/updateStatus/:id', AuthMiddleware, authorizeRoles("librarian"), updateBookStatus);
router.delete('/delete/:id', AuthMiddleware, authorizeRoles("librarian"), deleteBook);

export default router;
