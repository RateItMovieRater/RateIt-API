import { v4 as uuidv4 } from 'uuid';
import userServices from '../services/userServices.js';
import { handleError } from '../utils/errorUtils.js';

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
        handleError(res, error);
    }
}

async function login(req, res){
    const { login, password } = req.body;

    try {
        if(!login || !password){
            throw new Error('Please, send user login and password.');
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
        handleError(res, error);
    }
}

async function logout(req, res){
    try {
        req.session.destroy();

        res.clearCookie('sessionId');
        res.status(200).send({
            success: true,
            message: 'Logged out successfully.'
        });
    } catch (error) {
        handleError(res, error);
    }
}

async function getLoggedUser(req, res){
    try {
        const loggedUser = req.session.user;
        const userData = await userServices.getUserData(loggedUser.id);

        res.status(200).send({
            success: true,
            userData: userData
        })
    } catch (error) {
        handleError(res, error);
    }
}

async function deleteUser(req, res){
    const userId = req.params.id;

    try {
        await userServices.eradicateUser(userId, req.session.user);

        res.status(200).send({
            success: true,
            message: 'User deleted successfully.'
        })
    } catch (error) {
        handleError(res, error);
    }
}

export default {
    postUser,
    login,
    logout,
    getLoggedUser,
    deleteUser
}
