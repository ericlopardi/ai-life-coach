const express = require("express");
const router = express.Router();
const userService = require("../service/userService.js");
const constants = require("../utility/constants.js");
const { verifyFirebaseToken } = require("../middleware/auth.js");
const { logInfo, logError} = require("../utility/logger.js");

router.post("/", async (req, res) => {
    try {
        const user = await userService.createUser(req);
        const userResponse = user.toObject();
        delete userResponse.__v; // This removes the MongoDB Document Versioning Key from the API Response

        return res.status(constants.STATUS_CODE.HTTP_OK).send({
            message: "User Created Successfully",
            statusCode: constants.STATUS_CODE.HTTP_OK,
            data: userResponse
        })
    } catch (error) {
        return res.status(constants.STATUS_CODE.HTTP_INTERNAL_SERVER_ERROR).send({
            message: "Internal Server Error",
            statusCode: constants.STATUS_CODE.HTTP_INTERNAL_SERVER_ERROR,
            error: error.message
        })
    }
});

router.get("/:firebaseUid", async (req, res) => {
    try {
        const user = await userService.getUserByFirebaseUid(req.params.firebaseUid);

        if (!user) {
            logError("User not found");
            return res.status(constants.STATUS_CODE.HTTP_NOT_FOUND).send({
                message: "User not found",
                statusCode: constants.STATUS_CODE.HTTP_NOT_FOUND
            })
        }

        return res.status(constants.STATUS_CODE.HTTP_OK).send({
            message: "User found",
            statusCode: constants.STATUS_CODE.HTTP_OK,
            data: user
        });
    } catch (error) {
        logError("Internal Server Error: " + error.message);
        return res.status(constants.STATUS_CODE.HTTP_INTERNAL_SERVER_ERROR).send({
            message: "Internal Server Error",
            statusCode: constants.STATUS_CODE.HTTP_INTERNAL_SERVER_ERROR,
            error: error.message
        });
    } 
});

router.put("/:firebaseUid/new-entry/:entryType", verifyFirebaseToken, async (req, res) => {
    const userId = req.params.firebaseUid;
    const entryTypeParam = req.params.entryType?.trim().toLowerCase();
    const entryData = req.body;

    const validEntryTypes = {
        mood: "checkIns",
        journal: "journalEntries"
    };

    const mappedField = validEntryTypes[entryTypeParam];

    try {
        if (!userId) {
            logError("No Firebase UID found in request");
            return res.status(constants.STATUS_CODE.HTTP_BAD_REQUEST).send({
                message: "No Firebase UID provided",
                statusCode: constants.STATUS_CODE.HTTP_BAD_REQUEST
            });
        }

        if (req.user.uid !== userId) {
            logError("Firebase User ID does not match request user ID");
            return res.status(constants.STATUS_CODE.HTTP_FORBIDDEN).send({
                message: "Forbidden - Cannot modify another user's data",
                statusCode: constants.STATUS_CODE.HTTP_FORBIDDEN
            });
        }

        if (!entryData || Object.keys(entryData).length === 0) {
            logError("Empty request body for new entry");
            return res.status(constants.STATUS_CODE.HTTP_BAD_REQUEST).send({
                message: "No entry data provided",
                statusCode: constants.STATUS_CODE.HTTP_BAD_REQUEST
            });
        }

        if (!mappedField) {
            logError(`Invalid entry type: ${entryTypeParam}`);
            return res.status(constants.STATUS_CODE.HTTP_BAD_REQUEST).send({
                message: "Invalid entry type",
                statusCode: constants.STATUS_CODE.HTTP_BAD_REQUEST
            });
        }

        const updatedUser = await userService.insertNewUserEntry(userId, mappedField, entryData);

        if (!updatedUser) {
            logError("User not found when inserting new entry");
            return res.status(constants.STATUS_CODE.HTTP_NOT_FOUND).send({
                message: "User not found",
                statusCode: constants.STATUS_CODE.HTTP_NOT_FOUND
            });
        }

        return res.status(constants.STATUS_CODE.HTTP_OK).send({
            message: `${entryTypeParam.charAt(0).toUpperCase() + entryTypeParam.slice(1)} entry inserted successfully`,
            statusCode: constants.STATUS_CODE.HTTP_OK,
            data: updatedUser
        });
    } catch (error) {
        logError("Internal Server Error: " + error.message);
        return res.status(constants.STATUS_CODE.HTTP_INTERNAL_SERVER_ERROR).send({
            message: "Internal Server Error",
            statusCode: constants.STATUS_CODE.HTTP_INTERNAL_SERVER_ERROR,
            error: error.message
        });
    }
});

module.exports = router;