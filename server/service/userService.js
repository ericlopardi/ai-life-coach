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

const insertNewUserEntry = async (userId, entryType, entryData) => {
    logInfo(`Entered Service Layer: insertNewUserEntry for ${entryType}`);

    const allowedEntryTypes = ['checkIns', 'journalEntries'];
    if (!allowedEntryTypes.includes(entryType)) {
        const errorMessage = `Invalid entry type: ${entryType}`;
        logError(errorMessage);
        throw new Error(errorMessage);
    }

    try {
        return await User.findByIdAndUpdate(
            userId,
            { $push: { [entryType]: entryData } },
            { new: true }
        );
    } catch (error) {
        logError(`Error inserting into ${entryType}: `, error.message);
        throw error;
    }
};

const getHistoricalData = async(userId, type, page = 1, limit = 10) => {
    logInfo(`Entered Service Layer: getHistoricalData for ${type}`);
    const typeMapping = {
        mood: "checkIns",
        journal: "journalEntries"
    }
    const field = typeMapping[type];
    const skip = (page - 1) * limit;
    try {
        const result = await User.aggregate([
            { $match: { _id: userId } },
            { $project: { [field]: 1 } },
            { $unwind: `$${field}` },
            { $sort: { [`${field}.createdAt`]: -1 } },
            { $facet: {
                data: [
                    { $skip: skip },
                    { $limit: limit }
                ],
                totalCount: [
                    { $count: "count" }
                ]
            }}
        ]);
        const totalCount = result[0].totalCount[0]?.count || 0;
        const data = result[0].data.map(item => item[field]);
        return {
            data,
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page
        };
    } catch (error) {
        logError(`Error fetching historical data: `, error.message);
        throw error;
    }
}

module.exports = { createUser, getUserByFirebaseUid, insertNewUserEntry, getHistoricalData }