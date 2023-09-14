require("dotenv").config();
const http = require('http');
const socket = require('socket.io');

const app = require('./app');

const server = http.createServer(app);

global.io = socket(server); // setting "io" in global to access anywhere

require("./socket/index"); // initializing socket

server.listen(process.env.PORT, () => {
    console.log(`listening for requests on port ${process.env.PORT}`);
});