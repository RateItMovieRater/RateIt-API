import moviesController from "../controllers/moviesController.js";
import { authenticate, authAdmin } from '../middlewere/auth.js';
import { Router } from "express";
const moviesRouter = Router();

moviesRouter.get('/', moviesController.getMovies);
moviesRouter.get('/:id', moviesController.getSingleMovie);
moviesRouter.post('/', authenticate, authAdmin, moviesController.postMovie);
// Edit movie
moviesRouter.delete('/:id', authenticate, authAdmin, moviesController.deleteMovie);

export default moviesRouter;
