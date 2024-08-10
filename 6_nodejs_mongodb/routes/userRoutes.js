const express = require("express");
const userController = require("../controllers/userController");
const authContoller = require("../controllers/authContoller");
const formatQuery = require("../middleware/formatQuery");

const router = express.Router();

router.post("/signup", authContoller.signUp);

router.post("/login", authContoller.login);

router.post("/logout", authContoller.logout);

router.post("/forgot-password", authContoller.forgotPassword);

router.patch("/reset-password/:token", authContoller.resetPassword);

// bu kod satırının devamındaki bütün endpointlerde protect mw çalışsın
router.use(authContoller.protect);

router.patch("/update-password", authContoller.updatePassword);

router.patch("/update-me", userController.updateMe);

router.delete("/delete-me", userController.deleteMe);

router
  .route("/")
  .get(formatQuery, userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
