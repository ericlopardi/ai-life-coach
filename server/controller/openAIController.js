const express = require("express");
const router = express.Router();
const openAIService = require("../service/openAIService.js");
const constants = require("../utility/constants.js")

// TODO: Need to protect route below with auth middleware
router.post("/generate-ai-mood-response", async (req, res) => {
    try {
        if (req.body.moodDescription.trim() === '' || !req.body.moodDescription) {
            return res.status(400).send({
                message: 'Bad Request - Mood Description is required',
                statusCode: constants.STATUS_CODE.HTTP_BAD_REQUEST
            })
        }

        const moodResponse = await openAIService.createMoodResponse(req);

        const aiResponseText = moodResponse.data.output[0].content[0].text;

        return res.status(201).send({
            message: 'AI Response generated successfully',
            statusCode: constants.STATUS_CODE.HTTP_CREATED,
            data: {
                aiResponse: aiResponseText
            }
        })
    } catch (error) {
        return res.status(500).send({
            message: 'Internal Server Error',
            statusCode: constants.STATUS_CODE.HTTP_INTERNAL_SERVER_ERROR,
            error: error.message
        })
    }
})

module.exports = router;