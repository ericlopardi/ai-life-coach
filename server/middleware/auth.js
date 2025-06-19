const admin = require('firebase-admin');
const constants = require('../utility/constants');
const { logError, logInfo } = require('../utility/logger')

const serviceAccount = require("../docs/" + process.env.FIREBASE_SAKEY_FILE)

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    })
}

const verifyFirebaseToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(constants.STATUS_CODE.HTTP_UNAUTHORIZED).send({
                message: "Unauthorized - No token provided",
                statusCode: constants.STATUS_CODE.HTTP_UNAUTHORIZED
            });
        }

        const token = authHeader.split(' ')[1];

        const decodedToken = await admin.auth().verifyIdToken(token);

        req.user = {
            uid: decodedToken.uid,
            email: decodedToken.email
        };

        logInfo(`Authenticated user: ${decodedToken.uid}`);
        next()
    } catch (error) {
        logError('Token verification failed:', error.message);
        return res.status(constants.STATUS_CODE.HTTP_UNAUTHORIZED).send({
            message: "Unauthorized - Invalid token",
            statusCode: constants.STATUS_CODE.HTTP_UNAUTHORIZED
        });
    }
};

module.exports = { verifyFirebaseToken }