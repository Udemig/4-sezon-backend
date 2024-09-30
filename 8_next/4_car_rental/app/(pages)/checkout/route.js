// frontend satın alınacak ürünnü bilgileriyle buraya istek atıcak

// TODO: ÜRÜNÜN FİYATI DEPĞİŞTİRİLDİYSE
export const POST = async (req) => {
  //1) isteğin body kısmında gelen satın alınacak araç verisini al
  const car = await req.json();

  //2) stripe catalog'una kaydedilmiş ürünleri al

  //3) satın alınacak ürün catalog'da var mı kontrol et

  //4) catalog'da yok ise satın alınacak ürünü cataloga ekle

  //5) ürünün stripe tarafından oluşturulan id'sini ve satın alınacak ürün miktaırnı bir nesne haline getir

  //6) ödeme oturumu (url) oluştur

  //7) satın alım url'ini client'a döndür
};
