import userController from "../controllers/userController.js";
import { Router } from "express";
const userRouter = Router();

userRouter.post('/', userController.postUser);
userRouter.post('/login', userController.login);

export default userRouter;
