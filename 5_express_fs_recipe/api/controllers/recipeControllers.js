const getData = require("../utils/getData");

const data = getData();

exports.getAllRecipes = (req, res) => {
  // tariflerin bir kopyasını oluştur
  let recipes = [...data];

  // aratılan terim (küçük harfle)
  const search = req.query?.search?.toLowerCase();

  // eğer search parametresi eklendiyse filtrele
  if (search) {
    recipes = data.filter((recipe) =>
      recipe.recipeName.toLowerCase().includes(search)
    );
  }

  // eğerki order parametresi eklendiyse sırala
  if (req.query.order) {
    recipes.sort((a, b) =>
      req.query.order === "asc"
        ? a.recipeTime - b.recipeTime
        : b.recipeTime - a.recipeTime
    );
  }

  res.status(200).json({
    message: "Bütün Tarifler Alındı",
    results: recipes.length,
    recipes: recipes,
  });
};

exports.getRecipe = (req, res) => {
  res.status(200).json({
    message: "Bir Tarif Alındı",
  });
};

exports.deleteRecipe = (req, res) => {
  res.status(200).json({
    message: "Bir tarif silindi",
  });
};

exports.createRecipe = (req, res) => {
  res.status(200).json({
    message: "Yeni Tarif oluşturuldu",
  });
};
