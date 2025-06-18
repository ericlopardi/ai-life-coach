const express = require("express");
const router = express.Router();
const openAIService = require("../service/openAIService.js");
const constants = require("../utility/constants.js");
const { verifyFirebaseToken } = require("../middleware/auth.js");

router.post("/generate-response", verifyFirebaseToken, async (req, res) => {
    try {
        if (req.body.userInput.trim() === '' || !req.body.userInput) {
            return res.status(constants.STATUS_CODE.HTTP_BAD_REQUEST).send({
                message: 'Bad Request - User Input is required',
                statusCode: constants.STATUS_CODE.HTTP_BAD_REQUEST
            })
        }

        const aiResponse = await openAIService.createMoodResponse(req);

        const aiResponseText = aiResponse.data.output[0].content[0].text;

        return res.status(constants.STATUS_CODE.HTTP_CREATED).send({
            message: 'AI Response generated successfully',
            statusCode: constants.STATUS_CODE.HTTP_CREATED,
            data: {
                aiResponse: aiResponseText
            }
        })
    } catch (error) {
        return res.status(constants.STATUS_CODE.HTTP_INTERNAL_SERVER_ERROR).send({
            message: 'Internal Server Error',
            statusCode: constants.STATUS_CODE.HTTP_INTERNAL_SERVER_ERROR,
            error: error.message
        })
    }
})

module.exports = router;