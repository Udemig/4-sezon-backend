# HTTP Server ve Express Farklı

1. Routing:

- HTTP Modülü: Yolları manuel olarak kontrol ederiz. `req.url`!i koşullar içisnde kontrol ederek endpoint tanımı yaparız. Küçük projelderde biryere kadar idare etsek bile orta ölçekli bir projeyi bu yötem ile geliştirmek kod karmaşıklığına / tekrarına yol açar.

- Express: `app.get(/)` veya `app.post(/todos)` gibi methodlar ile rotaları / endpointleri çok daha kolay tanımlayabiliyoruz

2. Middleware (Arayazılım):

- HTTP Modülü: ara yazılım benzeri bir işlevselliği manuel olarak kendimiz oluşturmamaız geerekir.

- Expreess.js: Entregre bir arayazılım sistemine sahiptir ve uygulamada günlükleme, kimlik doğrulama vb. olayları yöntemek daha kolaydır

## Örnek

/ adreisne yapılan bir get isteğine ve
/new adresine yapılan bir post isteğine sahip olan serverı
hem http hemde express ile tanımlıycaz

# EndPoints

- GET `/api/v1/cars` > Bütün Arabaları Al
- POST `/api/v1/cars` > Yeni Araba Ekle

- GET `/api/v1/cars/ID` > Id'si alınan araç veirsini al
- PATCH `/api/v1/cars/ID` > Id'si alınan aracı güncelle
- DELETE `/api/v1/cars/ID` > Id'si alınan aracı sil
