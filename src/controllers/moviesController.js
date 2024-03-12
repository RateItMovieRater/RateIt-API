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

async function postMovie(req, res){
    const movieData = req.body;

    try {
        if (!movieData) {
            throw new Error('Please provide movie data.');
        }

        const newMovie = await moviesServices.createMovie(movieData);

        res.status(200).send({
            success: true,
            message: 'Movie posted successfully.',
            movie: newMovie
        });
    } catch (error) {
        handleError(res, error);
    }
}

export default {
    getMovies,
    postMovie
}
