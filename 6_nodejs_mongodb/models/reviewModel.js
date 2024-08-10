// review > string
// rating > sayı
// user > kullanıcı referansı
// tour > tur referansı

const mongoose = require("mongoose");
const Tour = require("./tourModel");
const reviewSchema = mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Yorum içeriği boş olamaz"],
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    tour: {
      type: mongoose.Schema.ObjectId,
      ref: "Tour",
      required: [true, "Yorumun hangi tur için atıldığını belirtin"],
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Yorumu hangi kullancının attığını belirtin"],
    },
  },
  { timestamps: true } // otomatik olarak createdAt ve updatedAt değerleri ekler
);

// yapılan sorgularda kullanıcların id'leri yerine kullanıcı veirlerini doldur
reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: "name photo" });

  next();
});

// bir tur için turun rating ortalamasını hesaplayan bir fonksiyon yazalım
reviewSchema.statics.calcAverage = async function (tourId) {
  // aggregate ile istatistik hesaplama
  const stats = await this.aggregate([
    // 1) parametre olarak gelen turun id'si ile eşleşen yorumları al
    { $match: { tour: tourId } },
    // 2) toplam yorum sayısı ve yorumların ortalama değerini hesapla
    {
      $group: {
        _id: "$tour",
        nRating: { $sum: 1 }, // toplam yorum sayısı
        avgRating: { $avg: "$rating" }, // rating ortalaması
      },
    },
  ]);

  // eğer tura atılan yorum varsa hesaplanan istatistiklerin sonucunu tur belgesine kaydet
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: stats[0].avgRating,
      ratingsQuantity: stats[0].nRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: 4,
      ratingsQuantity: 0,
    });
  }
};

// Bir kullanıcının aynı tura birden fazla yorum atmasınıı engelledi
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

// her yeni yorum atıldığında rating hesaplama
reviewSchema.post("save", function () {
  // istatisktleri hesapla
  Review.calcAverage(this.tour);
});

// yorum silindiğinde veya güncellendiğinde ratingi tekrar hesapla
reviewSchema.post(/^findOneAnd/, function (doc) {
  Review.calcAverage(doc.tour);
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
