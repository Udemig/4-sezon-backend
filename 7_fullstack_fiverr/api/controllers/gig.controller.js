import Gig from "../models/gig.model.js";
import error from "../utils/error.js";

// filtreleme ayarlarını oluşturan method
const buildFilters = (query) => {
  // filtreleme
  const filters = {};

  if (query.userId) {
    filters.user = query.userId;
  }

  if (query.category) {
    filters.category = query.category;
  }

  if (query.min || query.max) {
    filters.price = {};

    if (query.min) {
      filters.price.$gte = query.min;
    }

    if (query.max) {
      filters.price.$lte = query.max;
    }
  }

  if (query.search) {
    filters.title = { $regex: query.search, $options: "i" };
  }

  // fonksiyonun çağrıldığı yere nesneyi döndür
  return filters;
};

export const getAllGigs = async (req, res, next) => {
  const filters = buildFilters(req.query);

  try {
    const gigs = await Gig.find(filters).populate({
      path: "user",
      select: "username photo",
    });

    if (gigs.length === 0) {
      return next(
        error(404, "Aranılan kriterlere uygun hizmet bulunamadı")
      );
    }

    res
      .status(200)
      .json({ message: "Hizmetler bulundu", results: gigs.length, gigs });
  } catch (err) {
    next(error(400, err.message));
  }
};

export const createGig = async (req, res, next) => {
  //1) isteği atan kullanıcının hesabı seller değilse hata gönder
  if (!req.isSeller)
    return next(
      error(423, "Sadece 'seller' hesaplar hizmet oluşturabilir")
    );
  //TODO FORMDATA Headerı eklendiğinde body'e erişilemiyor
  //TODO Browser'daki çerezleri backend'e gönderemiyoruz
  console.log(req.body);

  try {
    //2) yeni hizmet oluştur / kaydet
    const savedGig = await Gig.create({ ...req.body, user: req.userId });

    //3) client'a başarılı cevap gönder
    res
      .status(201)
      .json({ message: "Hizmet başarıyla oluşturuldu", gig: savedGig });
  } catch (err) {
    next(error(400, err.message));
  }
};

export const getGig = async (req, res, next) => {
  try {
    // url'e param olarak eklenen id'den yola çıkaraj hizmeti al
    const gig = await Gig.findById(req.params.id).populate("user");
    // todo user password

    res.status(200).json({ message: "Hizmet bulundu", gig });
  } catch (err) {
    next(error(500, "Aranılan hizmet bulunamadı"));
  }
};

export const deleteGig = async (req, res, next) => {
  try {
    //1) hizmet detaylarını al
    const gig = await Gig.findById(req.params.id);

    //2) hizmeti oluşturan ve silmek isteyen kişiler aynı değilse hata gönder
    if (gig.user != req.userId) {
      return next(
        error(403, "Sadece kendi oluşturduğunuz hizmetleri silebilirsiniz")
      );
    }

    //3) hizmeti sil
    await Gig.findByIdAndDelete(req.params.id);

    //4) client'a cevap gönder
    res.status(200).json({ message: "Hizmet silindi" });
  } catch (err) {
    next(error(500, "Hizmet silinirken bir sorun oluştu"));
  }
};
