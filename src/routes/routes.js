import userRouter from "./userRoutes.js";
import moviesRouter from "./moviesRouter.js";
import { Router } from "express";
const routes = Router();

routes.use('/user', userRouter);
routes.use('/movies', moviesRouter);

export default routes;
