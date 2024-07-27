// filtrelenicek nesneyi
// ve nesnede izin veridğimiz alanları gönderiyoruz
// ve bu method ise nesden sadece izin verdiğimiz alanları alarak yeni bir nesne oluşturucak
const filterObject = (obj, ...allowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach((key) => {
    if (allowedFields.includes(key)) {
      newObj[key] = obj[key];
    }
  });

  return newObj;
};

module.exports = filterObject;
