import userService from '../services/userService.js';

async function createUser(req, res){
    try {
        const { name, login, password, password_confirmation } = req.body;

        if(!name || !login || !password || !password_confirmation){
            throw new Error('Please, send all the required data');
        }

        const newUser = {
            name: name,
            login: login,
            password: password,
            password_confirmation: password_confirmation
        }

        // await keyword is needed, once postUser uses a async function under the hood
        const createdUser = await userService.postUser(newUser);

        res.status(201).send({
            sucess: true,
            data: createdUser.rows[0],
            message: 'Account created sucessfully.'
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export default {
    createUser
}
