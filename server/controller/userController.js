const express = require("express");
const router = express.Router();
const userService = require("../service/userService.js");
const constants = require("../utility/constants.js");
const { verifyFirebaseToken } = require("../middleware/auth.js");

router.post("/", async (req, res) => {
    try {
        const user = await userService.createUser(req);

        const userResponse = user.toObject();
        delete userResponse.__v; // This removes the MongoDB Document Versioning Key from the API Response

        return res.status(201).send({
            message: "User Created Successfully",
            statusCode: constants.STATUS_CODE.HTTP_OK,
            data: userResponse
        })
    } catch (error) {
        return res.status(500).send({
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
            return res.status(404).send({
                message: "User not found",
                statusCode: constants.STATUS_CODE.HTTP_NOT_FOUND
            })
        }

        return res.status(200).send({
            message: "User found",
            statusCode: constants.STATUS_CODE.HTTP_OK,
            data: user
        });
    } catch (error) {
        return res.status(500).send({
            message: "Internal Server Error",
            statusCode: constants.STATUS_CODE.HTTP_INTERNAL_SERVER_ERROR,
            error: error.message
        });
    } 
});

// TODO: need to add authentication middleware here when we find out firebase service account (see the GET function above)
router.put("/:firebaseUid/new-mood-entry", async (req, res) => {
    const userId = req.params.firebaseUid;
    const moodEntry = req.body;

    try {
        // TODO: uncomment below if conditional once middleware is implemented
        // if (req.user.uid !== userId) {
        //     return res.status(403).send({
        //         message: "Forbidden - Cannot modify other user's data",
        //         statusCode: constants.STATUS_CODE.HTTP_FORBIDDEN
        //     });
        // }

        if (!userId) {
            return res.status(400).send({
                message: "No Firebase UID found",
                statusCode: constants.STATUS_CODE.HTTP_BAD_REQUEST
            })
        }

        if (!moodEntry) {
            return res.status(400).send({
                message: "No Mood Entry found",
                statusCode: constants.STATUS_CODE.HTTP_BAD_REQUEST
            })
        }
        const user = await userService.insertNewMoodEntry(userId, moodEntry)

        if (!user) {
            return res.status(404).send({
                message: "User not found",
                statusCode: constants.STATUS_CODE.HTTP_NOT_FOUND
            })
        }

        return res.status(200).send({
            message: "Mood Entry inserted successfully",
            statusCode: constants.STATUS_CODE.HTTP_OK,
            data: user
        })
    } catch (error) {
        return res.status(500).send({
            message: "Internal Server Error",
            statusCode: constants.STATUS_CODE.HTTP_INTERNAL_SERVER_ERROR,
            error: error.message
        })
    }
})

module.exports = router;