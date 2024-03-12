import userController from "../controllers/userController.js";
import authentication from "../middlewere/auth.js";
import { Router } from "express";
const userRouter = Router();

userRouter.get('/', authentication, userController.getUser);
userRouter.post('/', userController.postUser);
userRouter.post('/login', userController.login);
userRouter.post('/logout', authentication, userController.logout);
userRouter.delete('/:id', authentication, userController.deleteUser);

export default userRouter;
