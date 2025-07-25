// Constants for the server
const LOCALHOST = 'http://localhost';

const OPENAI_CONFIG = {
    OPENAI_MODEL: "gpt-3.5-turbo",
    OPENAI_INSTRUCTIONS: "You are an AI life coach designed to provide supportive, motivational, and reflective guidance for mental health and personal growth. Only respond to topics related to mental wellness, life challenges, self-improvement, and emotional insight. Do not answer questions or engage in any topics outside of this scope. Do not ask any questions or invite further dialogue. Respond with a single, thoughtful message based on the user's input."
}

const STATUS_CODE = {
    HTTP_OK: 200,
    HTTP_CREATED: 201,
    HTTP_BAD_REQUEST: 400,
    HTTP_UNAUTHORIZED: 401,
    HTTP_FORBIDDEN: 403,
    HTTP_NOT_FOUND: 404,
    HTTP_INTERNAL_SERVER_ERROR: 500
}

module.exports = {
    LOCALHOST,
    OPENAI_CONFIG,
    STATUS_CODE
}