const { logInfo, logError } = require("../utility/logger");
const User = require("../model/userModel");

const createUser = async (req) => {
    logInfo("Entered Service Layer: createUser");

    try {
        const userData = {
            _id: req.body.firebaseUid,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            checkIns: [],
            goals: [],
            journalEntries: []
        };

        const user = new User(userData);
        const savedUser = await user.save();
        return savedUser;
    } catch (error) {
        logError("Error creating user: ", error.message);
        throw error;
    }
};

const getUserByFirebaseUid = async (firebaseUid) => {
    logInfo("Entered Service Layer: getUserByFirebaseUid");
    
    try {
       return await User.findById(firebaseUid);
    } catch (error) {
        logError("Error fetching user: ", error);
        throw error;
    }
}

module.exports = { createUser, getUserByFirebaseUid }