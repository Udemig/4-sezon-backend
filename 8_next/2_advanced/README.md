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
