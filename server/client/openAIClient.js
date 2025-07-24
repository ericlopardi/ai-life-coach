const { logInfo, logError } = require("../utility/logger")
const axios = require("axios");

const executeOpenAIResponseClient = async (requestPayload, entryType) => {
    logInfo(`Entered Client Layer: executeOpenAIResponseClient for ${entryType}`);

    try {
        const response = await axios.post(
            process.env.OPENAI_RESPONSES_API_URL,
            requestPayload,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response;
    } catch (error) {
        logError(`OpenAI Responses API error for ${entryType}: `, error);
        throw error;
    }
};

module.exports = { executeOpenAIResponseClient }