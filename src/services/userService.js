import pool from "../config/dbConfig.js";
import passwordUtils from '../utils/passwordUtils.js';

async function postUser(user){
    const hashedPassword = passwordUtils.confirmPassword(user.password, user.password_confirmation);

    const newUser = await pool.query('INSERT INTO users (name, login, password, is_admin) VALUES ($1, $2, $3, $4) RETURNING *;',
        [user.name, user.login, hashedPassword, false]);

    return newUser;
}

export default {
    postUser
}
