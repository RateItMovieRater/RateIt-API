import bcryptjs from 'bcryptjs';

// This function confirms the password and then hashes it if confirmation succeeds
function confirmPassword(password, passwordConfirmation){
    if(password != passwordConfirmation){
        throw new Error(`Passwords don't match`);
    } else {
        const hashedPassword = hashPassword(password);
        return hashedPassword;
    }
}

function hashPassword(password){
    const salt = bcryptjs.genSaltSync(10);
    return bcryptjs.hashSync(password, salt);
}

export default {
    confirmPassword
}
