import { handleError } from "../utils/errorUtils.js";

async function authentication(req, res, next){
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

export default authentication;
