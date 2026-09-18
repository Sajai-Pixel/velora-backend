import express from 'express'
import { registerUser, loginUser, updatePassword, getAllUsers } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/update-password', authMiddleware, updatePassword)
userRouter.get('/', getAllUsers)

export default userRouter;