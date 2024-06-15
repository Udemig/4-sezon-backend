const express = require("express");
const {
  createRecipe,
  getAllRecipes,
  getRecipe,
  deleteRecipe,
} = require("../controllers/recipeControllers");

// Router > server.js dosyası dışarısında route tanımı yapmamıza olaanka sağlar
const router = express.Router();

// oluşturudğumuz router'ın endpoint/route/yol 'larını ve istek gelince çalışıcak fonksyionları belirle
router.route("/api/recipes").get(getAllRecipes).post(createRecipe);

router.route("/api/recipes/:id").get(getRecipe).delete(deleteRecipe);

// serverde kullanmak için routerı export et
module.exports = router;
