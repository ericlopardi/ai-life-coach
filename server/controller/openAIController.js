const express = require("express");
const router = express.Router();
const openAIService = require("../service/openAIService.js");
const constants = require("../utility/constants.js");
const { verifyFirebaseToken } = require("../middleware/auth.js");
const { logError, logInfo } = require("../utility/logger.js");

router.post("/generate-response", verifyFirebaseToken, async (req, res) => {
    const { userInput, entryType } = req.body;

    logInfo("Entered Contoller: /generate-response");
    logInfo("Received body: ", req.body);
    
    if (!userInput || userInput.trim() === '') {
        logError("No user input found in Client request");
        return res.status(constants.STATUS_CODE.HTTP_BAD_REQUEST).send({
            message: 'Bad Request - User Input is required',
            statusCode: constants.STATUS_CODE.HTTP_BAD_REQUEST
        });
    }

    const validEntryTypes = ['mood', 'journal'];
    const normalizedEntryType = entryType.trim().toLowerCase();

    if (!validEntryTypes.includes(normalizedEntryType)) {
        logError("Invalid or missing entryType");
        return res.status(constants.STATUS_CODE.HTTP_BAD_REQUEST).send({
            message: 'Bad Request - entryType must be either "mood" or "journal"',
            statusCode: constants.STATUS_CODE.HTTP_BAD_REQUEST
        })
    }

    try {
        const aiResponse = await openAIService.createAIResponse(req, normalizedEntryType);
        const aiResponseText = aiResponse.data.output[0].content[0].text;

        return res.status(constants.STATUS_CODE.HTTP_CREATED).send({
            message: `AI ${entryType} response generated successfully`,
            statusCode: constants.STATUS_CODE.HTTP_CREATED,
            data: { aiResponse: aiResponseText }
        });
    } catch (error) {
        logError("Internal Server Error: " + error.message);
        return res.status(constants.STATUS_CODE.HTTP_INTERNAL_SERVER_ERROR).send({
            message: 'Internal Server Error',
            statusCode: constants.STATUS_CODE.HTTP_INTERNAL_SERVER_ERROR,
            error: error.message
        })
    }
})

module.exports = router;