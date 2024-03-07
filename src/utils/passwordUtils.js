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

async function comparePasswords(userSentPasswords, dbStoredPassword){
    const validatedPassword = await bcryptjs.compare(userSentPasswords, dbStoredPassword);

    if(!validatedPassword){
        throw new Error('Incorrect password.');
    }
}

export default {
    confirmPassword,
    comparePasswords
}
