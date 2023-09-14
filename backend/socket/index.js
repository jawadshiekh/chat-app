const authenticateConnection = require("./middleware/authenticateConnection");

const abcHandler = require("./handlers/abcHandler");
const xyzHandler = require("./handlers/xyzHandler");

global.io.use(authenticateConnection);

global.io.on('connection', (socket) => {
    console.log('made a socket connection', socket.id);

    socket.on("abc", abcHandler);
    socket.on("xyz", xyzHandler);
});