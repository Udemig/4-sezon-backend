# Intercepting Routes (Önizlemeli Route)

- Bir sayfaya yönlendiren linke tıkladığınızda önzelikle bir modal açılı eğer modal açıkken sayfa yenilenirse bu sefer modal yerine sayfanın kendisi gösterilir

- Bu özellik genel olarak ürün/gönderi detay sayflarında, login/ register sayflarında, form alanlarında karşımıza çıkar

# Image

- Nextjs'de optimize edilmiş görüntü yönetimi için kullanılan bir bileşendir.

- Resimleri optimize ederek daha hızlı yüklenmele, performans artışı ve daha iyi kullanıcı deneyimi sağlar.

## Özellikleri

1. Resimleri otomatik olarak sıkıştırır ve optimize eder

2. Lazy loading özelliği sayesinde resimleri ekrana geldiği zaman yükler.

3. Resimleri daha düşük boyutlu olurken yüksek kaliteli gözükmesi için jpeg / png / jpg formatlarından webp formatına dönüştürür.

4. Resimlerde kalite ayarı yapalabilir.

# CSR vs SSR

- Client Side Rendering
- Server Side Rendering

- Client side rendering yöntemi uygulanan bir sayfaya girdiğimizde `js kodu` ve `boş html dosyası` indiririz. İndirilen js kodu çalışır ve html dosyasınını doldurur / içeriğini oluşturur.

- Server side rendering yöntemi uygulanan bir sayfaya girdiğimizde js kodu `sunucu` çalışır ve html `sunucuda` oluştur. Client sunucudan html'i indirip ekrana basar.

## SSR Faydaları

- Js'in bizim bilgisayar / telefonumuzdan çok daha hızlı olan sunucuda çalışması sayfa yüklenme süresini hızlandırır.

- SEO açısından dolu html indirmek daha iyidir aksi takdırde google'ın robotları site içeriğini tanıyamaz ve istenin üst sıralarda olmasının önüne geçer

## NOT

- Next.js'de iki farklı component türü vardır.
- Server Component: İçeriğini server'da render eder.
- Client Component: İçeriğini client'da render render;

- Next.js biz aksini belirtmedikçe oluşturudğumuz bütün componentlar server component olarak oluluşur. Next.js bizden her zaman olabildiğince fazla içeriği server component olarak tanımlamamızı bekler.

- Her component'ı server comp yapamıyoruz. Kullanıcı etkileşimi gerektiren componentlar mecburen client comp olmalı. React hooklarını kullandığımızı comp.lar Client comp olmalır.

# Data Fetching

- Next.js çekilen veriyi belirli bir süre boyunca cache'de tutat ve veriyi çeken fonksiyonu belirli bir süre içerisinde tekrar çağırdığımızda api'dan veriyi tekrar almak yerine önceki sitekden gelen ve cache'de tutulan cevabı döndür.

- Bu sayede:
- - api dan cevap beklemek gerekmez > daha hızlı
- - api'a gereksiz istek gitmez > daha az maliyet

- Cache özelliği sayesinde api'dan gelen bir veriyi birden fazla sayfa veya bileşende kullanmak istiyorsa redux vb. state managment'larına gereke kalmadan bütün bileşenlerde api isteği atarız.

# Next.js Fonksiyonları

## useRouter

- Sadece Client Component'larda kullanılır.

- Proje içerisinde yönlendirme yapmak için kullanılır.

- back() | forward() | refresh() | push() methodları var.

## redirect

- Sadece Server Component'larda kullanılır.

- Proje içerisinde yönlendirme yapmak için kullanılır.

## not-found

- 404 sayfasına yönelndirir

## usePathname

- Sadece Client Component'larda kullanılır
- Kullanıcının bulunduğu yolu alır.

# useSearchParams

- Sadece Client Component'larda kullanılır
- url'deki arama parametrelerini alır
