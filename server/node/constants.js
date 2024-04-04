const DEFAULT_ERROR_MESSAGE = "Unknown";

// Flags
const SKIP_CORS_HEADER = "X-Skip-Cors";

const SERVERS_TYPE_NAME = {
    USER: "user",
    TEST: "testApi",
};
const SERVER_TYPES = [SERVERS_TYPE_NAME.USER, SERVERS_TYPE_NAME.TEST];

module.exports = {
    DEFAULT_ERROR_MESSAGE,
    SKIP_CORS_HEADER,
    SERVERS_TYPE_NAME,
    SERVER_TYPES,
};
