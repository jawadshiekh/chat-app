const express = require("express");
const multer = require("multer");

const { userStorage } = require("../config/multer.config");

const verifyToken = require("../middleware/verifyToken.middleware");

const {
    getAllUsers,
    getSingleUser,
    registerUser,
    verifyUser,
    updateUser,
    logoutUser,
} = require("../controllers/users.controllers");

const router = express.Router();

const upload_U = multer({ storage: userStorage });

router.get("/", verifyToken, getAllUsers);
router.get("/profile/:userId", verifyToken, getSingleUser);
router.post("/register", registerUser);
router.post("/verify", verifyUser);
router.patch("/profile/:userId", verifyToken, upload_U.single("avatar"), updateUser);
router.post("/logout", verifyToken, logoutUser);

module.exports = router;
