const multer = require('multer');

const userStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/users');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileName = 'image-' + uniqueSuffix + '.' + file.originalname.split('.').pop();

        req.images = {};
        req.images.profile = fileName;

        cb(null, fileName);
    },
});

const groupStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/group');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileName = 'image-' + uniqueSuffix + '.' + file.originalname.split('.').pop();

        req.generatedFileName = fileName;
        cb(null, fileName);
    },
});

const chatStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/chat');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileName = 'image-' + uniqueSuffix + '.' + file.originalname.split('.').pop();

        req.generatedFileName = fileName;
        cb(null, fileName);
    },
});

module.exports = {
    userStorage,
    groupStorage,
    chatStorage
};