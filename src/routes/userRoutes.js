import userController from "../controllers/userController.js";
import { authenticate } from '../middlewere/auth.js';
import { Router } from "express";
const userRouter = Router();

userRouter.get('/', authenticate, userController.getLoggedUser);
userRouter.post('/', userController.postUser);
userRouter.post('/login', userController.login);
userRouter.post('/logout', authenticate, userController.logout);
userRouter.delete('/:id', authenticate, userController.deleteUser);

export default userRouter;
