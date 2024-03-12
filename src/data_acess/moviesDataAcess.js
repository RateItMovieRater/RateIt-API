import pool from "../config/dbConfig.js";

async function fetchMovies(){
    let movies = await pool.query('SELECT * FROM movies;');

    return movies.rows;
}

async function insertMovie(movie){
    const { title, release_date, description, genre, runtime } = movie;

    let newMovie = await pool.query(
        'INSERT INTO movies (title, release_date, description, genre, runtime) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
        [ title, release_date, description, genre, runtime ]
    );

    return newMovie.rows[0];
}

export default {
    fetchMovies,
    insertMovie
}
