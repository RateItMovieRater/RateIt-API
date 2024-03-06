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

export default {
    createUser
}
