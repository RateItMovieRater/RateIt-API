import pool from "../config/dbConfig.js";

async function postUser(user){
    const newUser = await pool.query('INSERT INTO users (name, login, password, is_admin) VALUES ($1, $2, $3, $4) RETURNING *;',
        [user.name, user.login, user.password, false]);

    return newUser;
}

export default {
    postUser
}
