const express = require('express');
const cors = require("cors");
const reqResInspector = require('express-req-res-inspector');

const usersRoutes = require("./routes/users.routes");
const chatRoutes = require("./routes/chats.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));
// app.use('/uploads', express.static('uploads'))
// app.use(reqResInspector());

app.use("/api/users", usersRoutes);
app.use("/api/chats", chatRoutes);

module.exports = app;