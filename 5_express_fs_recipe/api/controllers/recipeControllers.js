const getData = require("../utils/getData");
const crypto = require("crypto");
const setData = require("../utils/setData");

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

exports.createRecipe = (req, res) => {
  // 1) isteğin body bölümünde gelen veriye eriş
  const newRecipe = req.body;

  // 2) verinin bütün değerleri tanımlanmışmı kontrol et
  if (
    !newRecipe.recipeName ||
    !newRecipe.recipeTime ||
    !newRecipe.category ||
    !newRecipe.ingredients ||
    !newRecipe.instructions ||
    !newRecipe.image
  ) {
    return res
      .status(400)
      .json({ message: "Lütfen bütün değerler tanımlayın" });
  }

  // 3) veriye id ekle
  newRecipe.id = crypto.randomUUID();

  // 4) tarif verisini diziye ekle
  data.push(newRecipe);

  // 5) güncel diziyi json dosyasına aktar
  setData(data);

  // 6) cevap gönder
  res.status(200).json({
    message: "Yeni Tarif oluşturuldu",
    newRecipe,
  });
};

exports.getRecipe = (req, res) => {
  // dizide param ile gelen id'li tarifi ara
  const found = data.find((i) => i.id === req.params.id);

  // tarif bulunamazsa hata gönder
  if (!found)
    return res
      .status(404)
      .json({ message: "Aradığınız id'li eleman bulunamadu" });

  // cevab gönder
  res.status(200).json({
    message: "Aranan tarif bulundu",
    recipe: found,
  });
};

exports.deleteRecipe = (req, res) => {
  // silincek elemanın sırasını bul
  const index = data.findIndex((i) => i.id === req.params.id);

  // elemanı diziden kaldır
  data.splice(index, 1);

  // json dosyasını gücellee
  setData(data);

  // cevap gönder
  res.status(204).json({
    message: "Bir tarif silindi",
  });
};
