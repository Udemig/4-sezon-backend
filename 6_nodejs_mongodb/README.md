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