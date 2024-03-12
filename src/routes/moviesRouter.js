import moviesController from "../controllers/moviesController.js";
import { Router } from "express";
const moviesRouter = Router();

moviesRouter.get('/', moviesController.getMovies);

export default moviesRouter;
