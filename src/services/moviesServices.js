import moviesDataAcess from "../data_acess/moviesDataAcess.js";

async function getAllMovies(){
    const allMovies = await moviesDataAcess.fetchMovies();

    return allMovies;
}

async function createMovie(movie){
    let newMovie = await moviesDataAcess.insertMovie(movie);

    return newMovie;
}

export default {
    getAllMovies,
    createMovie
}
