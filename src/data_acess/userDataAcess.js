import pool from "../config/dbConfig.js";

async function insertNewUser(user){
    let newUser = await pool.query('INSERT INTO users (name, login, password, is_admin) VALUES ($1, $2, $3, $4) RETURNING *;',
        [user.name, user.login, user.hashedPassword, false]);

    return newUser;
}

export default {
    insertNewUser
}
