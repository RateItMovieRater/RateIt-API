import { v4 as uuidv4 } from 'uuid';
import userServices from '../services/userServices.js';

async function postUser(req, res){
    const { name, login, password, password_confirmation } = req.body;

    try {
        if(!name || !login || !password || !password_confirmation){
            throw new Error('Please, send all the required data.');
        }

        const newUser = {
            name: name,
            login: login,
            password: password,
            password_confirmation: password_confirmation
        }

        // await keyword is needed, once postUser uses a async function under the hood
        const createdUser = await userServices.createUser(newUser);

        res.status(201).send({
            sucess: true,
            data: createdUser.rows[0],
            message: 'Account created sucessfully.'
        });
    } catch (error) {
        res.status(400).send({
            success:  false,
            message: error.message
        });
    }
}

async function login(req, res){
    const { login, password } = req.body;

    try {
        if(!login || !password){
            throw new Error('Please, send user login and password.');
        }

        if (req.signedCookies.sessionId) {
            throw new Error('Already logged in.');
        }

        const user = { login, password };

        const returnedUser = await userServices.logUser(user);

        const sessionId = uuidv4();
        req.session.sessionId = sessionId;
        req.session.user = {
            id: returnedUser.id,
            name: returnedUser.name,
            isAdmin: returnedUser.is_admin
        }
    
        res.cookie('sessionId', sessionId, { signed: true, httpOnly: true });
        res.status(200).send({
            sucess: true,
            message: 'User logged in successfully.'
        });
    } catch (error) {
        res.status(400).send({
            success:  false,
            message: error.message
        });
    }
}

async function logout(req, res){
    try {
        if (!req.signedCookies.sessionId) {
            throw new Error('No user logged in.');
        }

        req.session.destroy();

        res.clearCookie('sessionId');
        res.status(200).send({
            success: true,
            message: 'Logged out successfully.'
        });
    } catch (error) {
        res.status(400).send({
            success:  false,
            message: error.message
        });
    }
}

async function deleteUser(req, res){
    const userId = req.params.id;

    try {
        const deletedUser = await userServices.eradicateUser(userId, req.session.user);

        res.status(200).send({
            success: true,
            message: 'User deleted successfully.'
        })
    } catch (error) {
        res.status(400).send({
            success:  false,
            message: error.message
        });
    }
}

export default {
    postUser,
    login,
    logout,
    deleteUser
}
