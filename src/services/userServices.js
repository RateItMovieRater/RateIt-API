import userDataAcess from '../data_acess/userDataAcess.js';
import passwordUtils from '../utils/passwordUtils.js';

async function createUser(user){
    try {
        const hashedPassword = passwordUtils.confirmPassword(user.password, user.password_confirmation);

        user.hashedPassword = hashedPassword;

        return await userDataAcess.insertNewUser(user);
    } catch (error) {
        throw new Error(error);
    }
}

async function logUser(user){
    const dbQuery = await userDataAcess.findUserByLogin(user.login);
    const findedUser = dbQuery.rows[0];

    if(!findedUser){
        throw new Error('user not found');
    }

    await passwordUtils.comparePasswords(user.password, findedUser.password);

    return findedUser;
}

export default {
    createUser,
    logUser
}
