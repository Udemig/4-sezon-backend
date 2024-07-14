const express = require("express");
const userController = require("../controllers/userController");
const authContoller = require("../controllers/authContoller");

const router = express.Router();

router.route("/signup").post(authContoller.signUp);

router.route("/login").post(authContoller.login);

router.route("/logout").post(authContoller.logout);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
