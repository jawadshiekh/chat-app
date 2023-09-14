const express = require("express");
const multer = require("multer");

const { userStorage } = require("../config/multer.config");

const {
    getAllUsers,
    getSingleUser,
    registerUser,
    updateUser,
    loginUser
} = require("../controllers/users.controllers");
const verifyToken = require("../middleware/verifyToken.middleware");


const router = express.Router();

const upload = multer({ storage: userStorage });

router.get("/", verifyToken, getAllUsers);
router.get("/profile/:userId", verifyToken, getSingleUser);
router.post("/register", upload.single("profile"), registerUser);
router.patch("/profile/:userId", verifyToken, upload.single("profile"), updateUser);
router.post("/login", loginUser);

module.exports = router;
