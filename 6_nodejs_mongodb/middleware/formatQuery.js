module.exports = (req, res, next) => {
  //*  urlden gelen parametre     > { duration: { lte: '10' },  price:{ gte: "300" } }
  //*  mongodbnin istediği format > { duration: { $lte: '10' }, price:{ $gte: "300" } }
  // Yapılması gereken urlden alınan parametrelerde eğerki bir mongodb operatörü varsa başına "$" koy

  // 1) istek ile gelen parametrelere eriş
  const queryObj = { ...req.query };

  // filtrelemeye tabi tutulmayacak olan parametreleri (sort,fields,page,limit) query nesnesi içerisnden kaldır
  const fields = ["sort", "fields", "page", "limit"];
  fields.forEach((el) => delete queryObj[el]);

  // 2) replace kullanbilmek için nesneyi stringe çevir
  let queryStr = JSON.stringify(queryObj);

  // 3) bütün operatörlerin başına $ ekle
  queryStr = queryStr.replace(
    /\b(gt|gte|lte|lt|ne)\b/g,
    (found) => `$${found}`
  );

  // 4) request nesnesine formatlanmış queryi ekliyoruz (orjinal querynin üzerine yazmak yerine yeni bir isimle ekledik)
  req.formattedQuery = JSON.parse(queryStr);

  // 5) sonraki fonksiyonun çalışmasına izin ver
  next();
};
