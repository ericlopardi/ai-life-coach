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

router.put("/:firebaseUid/new-mood-entry", verifyFirebaseToken, async (req, res) => {
    const userId = req.params.firebaseUid;
    const moodEntry = req.body;

    try {

        if (!userId) {
            logError("No Firebase UID found");
            return res.status(constants.STATUS_CODE.HTTP_BAD_REQUEST).send({
                message: "No Firebase UID found",
                statusCode: constants.STATUS_CODE.HTTP_BAD_REQUEST
            })
        }

        if (req.user.uid !== userId) {
            logError("Firebase User ID sent from Client does not match the User ID specified for modification");
            return res.status(constants.STATUS_CODE.HTTP_FORBIDDEN).send({
                message: "Forbidden - Cannot modify other user's data",
                statusCode: constants.STATUS_CODE.HTTP_FORBIDDEN
            });
        }


        if (!moodEntry) {
            logError("No user input found for new mood entry");
            return res.status(constants.STATUS_CODE.HTTP_BAD_REQUEST).send({
                message: "No Mood Entry found",
                statusCode: constants.STATUS_CODE.HTTP_BAD_REQUEST
            })
        }

        const user = await userService.insertNewMoodEntry(userId, moodEntry)

        if (!user) {
            logError("No user found when attempting to insert new mood entry");
            return res.status(constants.STATUS_CODE.HTTP_NOT_FOUND).send({
                message: "User not found",
                statusCode: constants.STATUS_CODE.HTTP_NOT_FOUND
            })
        }

        return res.status(constants.STATUS_CODE.HTTP_OK).send({
            message: "Mood Entry inserted successfully",
            statusCode: constants.STATUS_CODE.HTTP_OK,
            data: user
        })
    } catch (error) {
        logError("Internal Server Error: " + error.message);
        return res.status(constants.STATUS_CODE.HTTP_INTERNAL_SERVER_ERROR).send({
            message: "Internal Server Error",
            statusCode: constants.STATUS_CODE.HTTP_INTERNAL_SERVER_ERROR,
            error: error.message
        })
    }
})

module.exports = router;