const { logInfo, logError } = require("../utility/logger.js")
const constants = require("../utility/constants.js")
const openAIClient = require("../client/openAIClient.js");

const createAIResponse = async (req, entryType) => {
    logInfo(`Entered Service Layer: createAIResponse for ${entryType}`);
    
    try {
        const requestPayload = {
            model: constants.OPENAI_CONFIG.OPENAI_MODEL,
            input: req.body.userInput,
            temperature: 0.7,
            instructions: constants.OPENAI_CONFIG.OPENAI_INSTRUCTIONS
        };
        
            return await openAIClient.executeOpenAIResponseClient(requestPayload, entryType);
        } catch (error) {
            logError(`Error creating OpenAI API request for ${entryType}: `, error.message);
            throw error;
    }
}

module.exports = { createAIResponse }