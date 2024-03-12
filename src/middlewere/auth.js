import { handleError } from "../utils/errorUtils.js";

async function authenticate(req, res, next){
    const sessionCookie = req.signedCookies.sessionId;
    const serverSessionId = req.session.sessionId;

    try {
        if (!sessionCookie || sessionCookie != serverSessionId) {
            throw new Error('You are not logged in');
        } else {
            next();
        }
    } catch (error) {
        handleError(res, error);
    }
}

async function authAdmin(req, res, next){
    const loggedUser = req.session.user;

    try {
        if (loggedUser.isAdmin) {
            next();
        } else {
            throw new Error(`You dont't have the required privilleges to perform this action.`);
        }
    } catch (error) {
        handleError(res, error);
    }
}

export {
    authenticate,
    authAdmin
}
