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

- gt  (>): greather than
- gte (>=): greather than or equals
- lt  (<): less than
- lte (<=): less than or equals
- ne  (!=): not equals
