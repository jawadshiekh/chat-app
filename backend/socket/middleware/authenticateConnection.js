const jwt = require("jsonwebtoken");

const authenticateConnection = (socket, next) => {
    let token = socket.handshake.query.token;

    console.log("token: ", token)
    return next();

    if (!token) {
        console.log("Token not provided.");
        return next(new Error("Token not provided."));
    }

    if (!token.startsWith('Bearer ')) {
        console.log("Invalid authorization header format.");
        return next(new Error("Invalid authorization header format."));
    }

    token = token.substring(7);

    jwt.verify(
        token,
        process.env.JWT_SECRET_KEY,
        (err, decoded) => {
            if (err) {
                return next(new Error("Invalid token.."));
            }

            socket = socket.user = {
                userId: decoded.userId,
                role: decoded.role
            };

            return next();
        }
    );
};

module.exports = authenticateConnection;