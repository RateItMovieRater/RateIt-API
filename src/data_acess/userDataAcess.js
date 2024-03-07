import pool from "../config/dbConfig.js";

async function insertNewUser(user){
    let newUser = await pool.query('INSERT INTO users (name, login, password, is_admin) VALUES ($1, $2, $3, $4) RETURNING *;',
        [user.name, user.login, user.hashedPassword, false]);

    return newUser;
}

async function findUserByLogin(userLogin){
    let user = await pool.query('SELECT * FROM users WHERE name = $1;', [userLogin]);

    return user;
}

export default {
    insertNewUser,
    findUserByLogin
}
