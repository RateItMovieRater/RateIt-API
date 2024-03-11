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
        throw new Error('User not found.');
    }

    await passwordUtils.comparePasswords(user.password, findedUser.password);

    return findedUser;
}

async function eradicateUser(targetId, loggedUser){
    const returnedUser =  await userDataAcess.findUserById(targetId);

    if(!returnedUser.rows[0]){
        throw new Error('User not found.');
    }

    if(loggedUser.isAdmin && loggedUser.id == targetId){
        throw new Error('Cannot delete admin user');
    }

    if (loggedUser.isAdmin || loggedUser.id == targetId) {
        await userDataAcess.deleteUserById(targetId);
    } else {
        throw new Error(`You don't have privilleges to perform this opperation.`);
    }
}

export default {
    createUser,
    logUser,
    eradicateUser
}
