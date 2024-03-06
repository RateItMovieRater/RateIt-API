import userController from "../controllers/userController.js";
import { Router } from "express";
const userRouter = Router();

userRouter.post('/', userController.createUser);

export default userRouter;
