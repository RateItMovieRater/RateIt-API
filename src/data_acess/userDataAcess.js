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

async function findUserById(userId){
    let user = await pool.query('SELECT * FROM users WHERE id = $1;', [userId]);

    return user;
}

async function deleteUserById(userId){
    let dbQuery = await pool.query('DELETE FROM users WHERE id = $1;', [userId]);

    return dbQuery;
}

export default {
    insertNewUser,
    findUserByLogin,
    findUserById,
    deleteUserById
}
