const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth.controller");
const userCtrl = require("../controllers/user.controller");
// const multer = require("../middleware/multer-user");

// auth
router.post("/signup", authCtrl.signUp);
router.post("/login", authCtrl.logIn);
router.get("/logout", authCtrl.logOut);

// user display
router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.userInfo);
router.put("/:id", userCtrl.updateUser);
router.delete("/:id", userCtrl.deleteUser);

module.exports = router;
