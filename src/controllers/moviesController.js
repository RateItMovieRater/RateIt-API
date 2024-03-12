import moviesServices from "../services/moviesServices.js";
import { handleError } from "../utils/errorUtils.js";

async function getMovies(req, res){
    try {
        const movies =  await moviesServices.getAllMovies();

        res.status(200).send({
            success: true,
            movies: movies
        });
    } catch (error) {
        handleError(res, error);
    }
}

export default {
    getMovies
}
