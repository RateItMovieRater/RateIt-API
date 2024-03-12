import moviesDataAcess from "../data_acess/moviesDataAcess.js";

async function getAllMovies(){
    const allMovies = await moviesDataAcess.fetchMovies();

    return allMovies;
}

export default {
    getAllMovies
}
