// review > string
// rating > sayı
// user > kullanıcı referansı
// tour > tur referansı

const mongoose = require("mongoose");

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

module.exports = mongoose.model("Review", reviewSchema);
