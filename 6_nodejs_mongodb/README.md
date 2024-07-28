- MERN - Stack
- Mongodb - Express.js - React - Node.js

# Mongoose

- Node.js ortamında MongoDB veratabanıyla çalışmamızı sağlayan bir kütüphanedir.
- Mongoose, MongoDb ile etkileşime geçerken javascript nesne ve fonksiyonlarıanı kullanrak veritabanı işlemlerini gerçekleştirmemize olanak tanır

## Mongoose Temel Özellikleri

1. Şema Tanımlama: Veritabanı kolleksiyonları için şema tanımlamamıza izin verir. Bu şema verilerin yapısını ve özelliklerini önceden belirlemememizi sağlar.

2. Modelleme: Mongoose şemalara dayalı modeller oluşturur. Bu modeller bir kolleksiyonla ilişkili veritabanı işlemleri (okuma,yazma,güncelleme,silme) geçekleştirmek için kullanılır.

3. Doğrulama (Validation): Verilerin belirli kırallara uymasını sağlamak için çeşitli doğrulama seçenekleri sunar.

# Enviroment Variables

- Ortam / Çevre Değişkenleri
- Githuba gönderip herkesle paylaşmak istemeyeceğimiz değerler birer env variable olarak saklarız.
- gitIgnore dosyasına env dosyasını eklersek bud eğişkenler localimizde erişlebilir olurken githuba gönderilmez.
- Genelde hassas bilgiler veritabanı admin bilgileri vb. durumlarda kullanırız

# Operatörler

- gt (>): greather than
- gte (>=): greather than or equals
- lt (<): less than
- lte (<=): less than or equals
- ne (!=): not equals

# Authentication (Kimlik Doğrulama)

- Bir kullanıcnın kimliğini doğrulama sürecidir.
- Örn: eposta - şifre | google hesabı | parmak izi
- Kimlik doğrulama bir kullanıcının sisteme erişim talebini gerçekleştiren ilk adımdır.

# Authorization (Yetkilendirme)

- Bir kullancının sistemin belirli kaynaklarına erişimini kontrol etme sürecidir.
- Yetkilendirme kimlik doğrulama sürecinden sonra yaptığımız işlemdir.
- Kimliğini doğruladığımız kullanıcnın hangi eylemleri yapıp yapamayacığını belirleriz
- Örn
- - user role: sadece okuma yapabilir
- - guide / lead-guide: sadece kendi oluşturdukları turlarda CRUD işlemi yapabilir
- - admin role: hem bütün turlarda hemde kullancıı hespalarında CRUD işlemi yapabilir ve adminlere özel rapor route'larına erişebilir.

# Hash

- Hash fonksiyonları bir veriyi (örneğin parola) alarak benzer bir diziye dönüştüren matematiksel algoritmalardır

* "benim şifrem" > "2345421sdfsadgk25467mvcmspü346"
* "benim şifrem" > "2345421sdfsadgk25467mvcmspü346"
* "senin şifrem" > "12492035ujghnffdjh285658743hdf"

- Farklı girdiler farklı hash değerleri üretir. Aynı girdiler aynı hash değerini üretir.
- Kullanıcıların parolaralarının hashlenmesi parolanın depolanması sırasında güvenliği arttırır. Böylece depolama alanına erişen kötü amaçlı kişiler gerçek şifreleri doğrudan elde edemez

# Salt

- Parola tabanlı hash fonksiyonları aynı girdiler için aynı sonuçları üretrikleri için saltlama kullanarak güvenliği arrttırırız. Saltlama kullanıcının parolası için rastgele bir değer oluşturur ve bu değeri parolanın kendisiyle birleştiriyor. Sonra bu salt'lanmmış parolana hashing algoritmasından geçiyor bu satede şifre aynı olsa bile hashande sonraki çiktı farklı oluyor.

* "benim şifrem" > "dsfnl235benim şifrem123jds" > "123190rınfvjng489t645y\*090w2"
* "benim şifrem" > "199sf9benim şifrem456fofsd" > "sdfskdlgj30945891\*ıkfkdsgjı9"

# JWT - Json Web Token

- İki taraf arasında güvenli bir şekilde bilgi alışverişi yapmak için kullanılan bir yöntemdir.

- Örn frontende sisteme kaydolan kullanıncın blgilerini göndericez bunu açıktan yapmak yeirne jwt token içerisnde göndermek daha güvenlidir. Daha sonrasında frontend bunu local storage vb. yapılarda saklar ve backkennden veri alırken bu tokeni gönderir backend tarafında ise kullanıcının kimliğini bu sayede doğrularız ve rolüne göre sisteme erişmesine izin veririz.

## JWT'nin Yapısı

- JWT 3 ana bileşenden oluşur ve bu bileşenler (.) birbirinden ayrılır.
- Header (Başlık)
- Payload (Yük)
- Signature (İmza)

* Header:
* - Algoritma: Tokenin imzalanmasında kullanılan algoritmayı belirtir (örn: HMAC, SHA256, RSA)
* - Tip: Tokenin türü belirtilir (JWT)

* Payload:
* - Payload token içerisinde taşınacak bilgileri içerir. Bu bilgiler genellikle kullanıcnın kimli bilgileri veya yetkilendirme detayları olur (role).
* - Bizim girdiğimiz değerler dışarısında payload böülümde iss ve exp değerleride bulunur.

* Signature:
* - Header ve payload'ın doğruluğunu ve bütünlüğünü sağlama kiçin kullanılır.
* - İmza header ve payload'ın birleştirilmesiyle oluşan string'in bir algoritma ve bir gizli anahtar kullanılarak şifrelenmesiyle elde edilir.

---

# Saldırı Türleri

## Kompromize Saldırı

- Güçlü bir şekilde hashleme ve salt
- Güçlü bir şekilde şifrelenmiş şifre sıfırlama tokenleri
- Kullanıcıların güçlü şifreler yazmasını sağlama

## Brute Force Saldırıları

- Kullanıcıların güçlü şifreler yazmasını sağlama
- İstek Hızını Sınırlandırma
- Captcha Kullanımı
- Parola deneme sınırı ekle

## Cross Site Scripting (XSS)

- JWT tokeninin sadece HTTPS üzerinden seyahat etmesi ve çerezler aracılığı ile gönderilmesi
- Özel HTTP header'ları ekle

## Hizmet Engelleme (DoS)

- Rate limit uygula (bir IP adresinden belirli süre içerisinde gelen isteği sınırla)

## Kod Enjeksiyonu

- Mongoose kullan
- Kullanıcı girdilerinin tamamını kısıtla (URL'deki parametreler ve inputtan alınan veriler)

## Genel Önlemler

- Her zaman HTTPS kullanılmalı
- Tokenlerin geçerlilik süresi belirlenmeli
- Hataları detaylı şekilde frontend'e gönderme
- Siteler arası saldırıları önlemek için CSRF tokenleri kullan
- Önemli işlemlerin öncesinde doğrulama iste
- Bazı JWT tokenleri için kara liste oluşturulabilir
- Hesap oluşturmadan önce e-posta adresini doğrula
- Çift faktörlü doğrulama (2FA) kullanımı

# Güvenlik Kütüphaneleri

- `express-rate-limit`: aynı ip adresinden gelene istekleri sınırla
- `helmet`: güvenlik headerları ekle
- `express-mongo-sanitize`: body/param/query/header ile enjekte edilmeye çalılılan kodları bozar
- `json(limit)`: body bölümünden gelebilcek max veri boyutunu belirledik
- `hpp`: parametre kirliliğini önler.

# Data Modeling

Data modeling, veri yapılarının, kısıtlamalarını, ilişkilerini ve diğer unusrları tanımladığımız sürece verilen isimdir. Bu süreç projenin ihityaçlarını karşılama adına veritabnın tasarımını planlamak için kullanılır. Amaç, karmaşık veri setlerinin daha anlaşılabilir, düzenli, erişilebilir bir şekilde organize edilmesini sağlama.

## Veri Modelleme Süreci

1. Gereksinimleri Belirle

2. Mantıksal Belirleme

3. Fiziksel Veri Modeli

## Veriler Arasında Kurulan İlişkiler

1. Refferencing (Refereans) / Normalization:

- Referans, belirli belgelerdeki veriler bir başka belgeye referanslar (id) kullanrak ilişkilendirmeye yarar. Yani iki belge arasında ilişki vardır ancak geçerk veri bir belegede saklanırken diğeri belgede sadece gerçek verinin referansı bulunur

2. Embedding (Gömme) / Denormalization:

- belirli blegenin içerisindeki verileri diğer belegelere doğradana gömülü olarak tanımlamay yarar

---

`user document` = {
id:455,
name:"ahmet",
surname:"yıldız",
phone: 35234645650498
}

## Referans İle Yorum Dökümanı Oluşturulum

`comment document` = {
id:46534,
text:"Bu video çok iyiydi",
createdAt:24.10.2019,
user:455 > sadece id
}

## Embedding İle Yorum Dökümanı Oluşturulum

`comment document` = {
id:46534,
text:"Bu video çok iyiydi",
createdAt:24.10.2019,
user:{
  id:455,
  name:"ahmet",
  surname:"yıldız",
  phone: 35234645650498
}
}
