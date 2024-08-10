// tour verisinin backennde yönetimi içimi schema ve model bu dosyada tanımlanıcak

const { Schema, model } = require("mongoose");
const validator = require("validator");

// veritbanına kaydedilecek olan verilerin kısıtlamalarını yazıcaz
const tourSchema = new Schema(
  {
    name: {
      type: String,
      unique: [true, "İsim değeri benzersiz olmalı"],
      required: [true, "Tur isim değerine sahip olmalı"],
      minLength: [5, "Tur ismi en az 5 karakter olmalu"],
      maxLength: [40, "Tur ismi 40 karakterden fazla olamaz"],
      validate: [
        validator.isAlpha, // validator kütüphaneisinde geldi
        "İsimde sadece alfabetik karaketerler olmalı.",
      ],
    },
    duration: {
      type: Number,
      required: [true, "Tur süre değerine sahip olmalıdır"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "Tur maksimum kişi sayısı değerine sahip omalı"],
    },
    difficulty: {
      type: String,
      required: [true, "Tur zorluk değerine sahip omalı"],
      enum: ["easy", "medium", "hard", "difficult"],
    },

    ratingsAverage: {
      type: Number,
      min: [1, "Rating 1'den küçük olamaz"],
      max: [5, "Rating 5'den büyük olamaz"],
      default: 4.0,
    },

    ratingsQuantity: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      required: [true, "Tur fiyat değerine sahip olmalı"],
    },

    priceDiscount: {
      type: Number,
      //* custom validator (kendi yazdığımız kontrolcüler)
      // doğrulama fonksiyonu false return ederse bu doğrulamadan geçmedi ve veri veritabanına kaydedilemez anlamına gelir true return ederse verinin kaydedilmesinin önünce bir engel omadığı anlamına gelir
      // indirim değeri asıl fiyattan büyükse false değilse true döndürmeli
      validate: {
        validator: function (value) {
          return value < this.price;
        },
        message: "İndirim fiyatı asıl fiyattan büyük olamaz",
      },
    },

    summary: {
      type: String,
      maxLength: [200, "Özet alanı 200 karakteri geçemez"],
      trim: true,
      required: [true, "Tur özet değerine sahip olmalı"],
    },

    description: {
      type: String,
      maxLength: [1000, "Açıklama alanı 1000 karakteri geçemez"],
      trim: true,
      required: [true, "Tur açıklama değerine sahip olmalı"],
    },

    imageCover: {
      type: String,
      required: [true, "Tur resim değerine sahip olmalı"],
    },

    images: {
      type: [String],
    },

    startDates: {
      type: [Date],
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },

    hour: Number,

    // başlangıç noktası
    startLocation: {
      type: { type: String, default: "Point", enum: "Point" },
      description: String,
      adress: String,
      coordinates: [Number],
    },

    // Embedding
    // Turun ziyaret noktaları
    locations: [
      {
        type: { type: String, default: "Point", enum: "Point" },
        description: String,
        coordinates: [Number],
        day: Number,
      },
    ],

    // Parent Refferance
    // Turun rehberleri
    guides: [
      {
        type: Schema.ObjectId, // referans tanımında tip herzaman ObjectId'dir
        ref: "User", // id'lerin hangi kolleksiyona ait ait olduğunu söyledik.
      },
    ],
  },
  // şema ayarları
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);



// ! Virtual Populate
// Normalde yorumları child refferance ile sadece yorum dökümanında hangi tura atıldıklarının bilgisini tuttuk. Şuan 1 turun verisi alındığında o tura ait olan yorumları göremiyoruz çünkü parent refferance tercih etmedik. Bu tarz durumlarda virtual populate yöntemi ile child refferance ile tanımlanan yorumları client'a turun verileri ile birlikte göndermemiz mümkün
tourSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "tour", // bu dökümanındaki _id alanının yorum dökümanındaki karşılığını yazıyoruz
  localField: "_id", // yorum dökümanındaki tour alanının bu dökümandaki karşılığını yazıyoruz
});

// ! Virtual Property
// Örn: Frontend ekibi bizden urlde kullanabilmek için tur isminin slug verisyonunu istesin.
// İstenen: The City Wanderer > the-city-wanderer
// Bu tarz durumlarda: Veritbanında tutmamıza değmeyecek ama client tarafından istenilen özellikler var ise bunları veritabanında tutmak yerine verileri veritabanında alıp client'a göndermeden hemen önce hesaplayıp virtual property olarak ekleriz.
tourSchema.virtual("slug").get(function () {
  return this.name.toLowerCase().replace(/ /g, "-");
});

// Örn: Client sayfada kullanmak üzere turun dolar fiyatından ziyade bizden tl fiyatınıda istedi. TL fiyatı zaten dolar fiyatı üzerinden yapılacak hesaplamalar sonucu elde edilebilceği için TL fiyatını veritbanında tutmak çok mantıksız olucaktır. Bunun yerine verileri client'a göndermden hemen önce tl fiyatını hesaplayıp virtual property olarak gönderebiliriz.
tourSchema.virtual("turkishPrice").get(function () {
  return this.price * 33;
});

//! Document Middleware
// Middleware, iki olay arasında çalışan yapı
// Client'tan gelen turun veritbanına kaydedilmeden hemen önce kaç saat sürdüğünü hesapla ve veritabanına bu veriyi kaydet
tourSchema.pre("save", function (next) {
  // vertibanına hour özelliğini hesaplayıp kaydeder
  this.hour = this.duration * 24;

  // sonraki adıma geçiş izni
  next();
});

//* pre() işlemden önce post() işlemden sonra middleware'i çalıştırmaya yarar
tourSchema.post("updateOne", function (doc, next) {
  // örn: post kullanıcı yeni bir hesap oluşturduktan hemen sonra mail göndermek için kullanılabilir.
  // örn: post ile güncelleme işleminden sonra kullanıvya bilgilendirme mail/sms'i gönderilebilir.
  console.log("sorgu işleminden hemen sonra çalıştı");
  next();
});

//! Query Middleware
// Sorgu işlemlerinden önce veya sonra çalıştırılan middleware'lere verilen isim
tourSchema.pre("find", function (next) {
  // bundan sonraki aşamada çalışıcak sorguyu güncelle (premium olmayanları al)
  this.find({ premium: { $ne: true } });

  next();
});

//! Aggregate Middleware
// Raporlama işlemlerinden önce veya sonra çalıştırılan middleware'lere verilen isim
tourSchema.pre("aggregate", function (next) {
  // premium olanların rapora dahil edilmemesi için aggregation pipeline'a başlangıç adımı olarak premium'ları çıkaran bir adım ekliyecez
  this.pipeline().unshift({ $match: { premium: { $ne: true } } });

  next();
});

//! Kullanıcı veritabanından alınmaya çalışıldığında:
// * Referanslar olarak tanıtılmış alanları populate ile gerçek verilerle doldur
tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: "guides", // tur nesnesi içerisnde doldurulması gereken alanın ismi
    // veri kayıtlarını dolduruken istenmeyen field names
    select:
      "-password -__v -passResetToken -passResetExpires -passChangedAt",
  });

  next();
});

//! Index
// Kolleksiyonların belirli alanlarına göre sıralanmış bir kopyasını tutar.
// Avantaj: Sıraladığım alana göre yapılan filtreleme ve sıralama isteklerine daha hızlı cevap.
// Dezavantaj: Ekstra Maaliyet / Yazma İsteklerinde yavaşlama
tourSchema.index({ price: 1, ratingsAverage: -1 });

// model oluştur (veritbanındaki tur verisni yönetmek için kullanıcaz)
const Tour = model("Tour", tourSchema);

module.exports = Tour;
