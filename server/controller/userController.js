const express = require("express");
const router = express.Router();
const userService = require("../service/userService.js");
const statusCode = require("../utility/constants.js");

router.post("/", async (req, res) => {

    try {
        const user = await userService.createUser(req);

        const userResponse = user.toObject();
        delete userResponse.__v; // This removes the MongoDB Document Versioning Key from the API Response

        return res.status(201).send({
            message: "User Created Successfully",
            statusCode: statusCode.STATUS_CODE.HTTP_OK,
            data: userResponse
        })
    } catch (error) {
        return res.status(500).send({
            message: "Internal Server Error",
            statusCode: statusCode.STATUS_CODE.HTTP_INTERNAL_SERVER_ERROR,
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
                statusCode: statusCode.STATUS_CODE.HTTP_NOT_FOUND
            })
        }

        return res.status(200).send({
            message: "User found",
            statusCode: statusCode.STATUS_CODE.HTTP_OK,
            data: user
        });
    } catch (error) {
        return res.status(500).send({
            message: "Internal Server Error",
            statusCode: statusCode.STATUS_CODE.HTTP_INTERNAL_SERVER_ERROR,
            error: error.message
        });
    } 
});

module.exports = router;