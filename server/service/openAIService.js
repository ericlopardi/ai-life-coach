const { logInfo, logError } = require("../utility/logger.js")
const constants = require("../utility/constants.js")
const openAIClient = require("../client/openAIClient.js");

const createMoodResponse = async (req) => {
    logInfo("Entered Service Layer: createMoodResponse")

    try {
        const requestPayload = {
            model: constants.OPENAI_CONFIG.OPENAI_MODEL,
            input: req.body.moodDescription,
            temperature: 0.7,
            instructions: constants.OPENAI_CONFIG.OPENAI_INSTRUCTIONS
        }
        return openAIClient.executeMoodResponseClient(requestPayload);
    } catch (error) {
        logError("Error creating OpenAI API request: ", error.message);
        throw error;
    }
}

module.exports = { createMoodResponse }