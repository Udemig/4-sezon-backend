const express = require("express");
const userController = require("../controllers/userController");
const authContoller = require("../controllers/authContoller");

const router = express.Router();

router.post("/signup", authContoller.signUp);

router.post("/login", authContoller.login);

router.post("/logout", authContoller.logout);

router.post("/forgot-password", authContoller.forgotPassword);

router.post("/reset-password/:token", authContoller.resetPassword);

router.route("/").get(userController.getAllUsers).post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
