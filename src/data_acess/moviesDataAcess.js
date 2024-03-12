import pool from "../config/dbConfig.js";

async function fetchMovies(){
    let movies = await pool.query('SELECT * FROM movies;');

    return movies.rows;
}

export default {
    fetchMovies
}
