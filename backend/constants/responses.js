const responses = {
  AUTH_RESPONSES: {
    SIGNUP_SUCCESS: "Signed up successfully.",
    LOGIN_SUCCESS: "Logged in successfully.",
  },
  USERS_RESPONSES: {
    CREATE_SUCCESS: "Users created successfully.",
    UPDATE_SUCCESS: "Users updated successfully.",
    DELETE_SUCCESS: "Users deleted successfully.",
    NOT_FOUND: "Users not found."
  },
  CHAT_RESPONSES: {
    CREATE_SUCCESS: "Chat created successfully.",
    UPDATE_SUCCESS: "Chat updated successfully.",
    DELETE_SUCCESS: "Chat deleted successfully.",
    NOT_FOUND: "Chat not found."
  },
  ERROR_RESPONSES: {
    INVALID_REQUEST: "Request invalid.",
    TOKEN_NOT_PROVIDED: "Token not provided.",
    INVALID_AUTHORIZATION_HEADER_FORMAT: "Invalid authorization header format",
    INVALID_TOKEN: "Token invalid or expired.",
    UNAUTHORIZED: "User is not authorized to perform this task.",
    INVALID_OTP: "Invalid OTP.",
    OTP_EXPIRED: "OTP has expired.",
    EMAIL_ALREADY_EXISTS: "Email already exists.",
    INCORRECT_CREDENTIALS: "Invalid credentials.",
    INCORRECT_OLD_PASSWORD: "Old Password does not match.",
    CREATE_UNSUCCESSFUL: "Could not create new record.",
    UPDATE_UNSUCCESSFUL: "Could not update record.",
    DELETE_UNSUCCESSFUL: "Could not delete record.",
  },
};

module.exports = responses;
