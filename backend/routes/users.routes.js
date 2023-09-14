const express = require("express");

const {
    getAllUsers,
    getSingleUser,
    registerUser,
    loginUser
} = require("../controllers/users.controllers");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/profile/:userId", getSingleUser);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
