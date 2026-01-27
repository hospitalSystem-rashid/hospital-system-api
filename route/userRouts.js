const express = require("express");
const router = express.Router();

const {
    registerUSer,
    loginUser,
    getUsers,
    getUser,
    updateUSer,
    updateRole,
    deleteUser,
    generateResetToken,
    resetPassword
} = require("../controller/UserController");
const {Router} = require("express");


router.post("/register", registerUSer);
router.post("/login", loginUser);

router.get("/users", getUsers);
router.get("/users/:id", getUser);

router.put("users/:id", updateUSer);
router.put("users/:id/role", updateRole);

router.delete("/:id", deleteUser);


router.post("/reset-password", generateResetToken);
router.post("/reset-password/:token", resetPassword);

module.exports = router;

