import moviesDataAcess from "../data_acess/moviesDataAcess.js";

async function getAllMovies(){
    const allMovies = await moviesDataAcess.fetchMovies();

    return allMovies;
}

async function getMovie(id){
    let movie = await moviesDataAcess.fetchSingleMovie(id);

    if (!movie) {
        throw new Error('There is no movie with this id.');
    }

    return movie;
}

async function createMovie(movie){
    let newMovie = await moviesDataAcess.insertMovie(movie);

    return newMovie;
}

export default {
    getAllMovies,
    getMovie,
    createMovie
}
