// Constants for the server
const LOCALHOST = 'http://localhost';

const OPENAI_CONFIG = {
    OPENAI_MODEL: "gpt-3.5-turbo",
    OPENAI_INSTRUCTIONS: "Provide a final and complete answer the following mood description. Do not ask any questions or invite further dialogue."
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