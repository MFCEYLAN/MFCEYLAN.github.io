# Mustafa Furkan Ceylan Akademik Site Yönetim Rehberi

Bu site, sayfa kodlarına dokunmadan `content` klasöründeki JSON dosyaları üzerinden yönetilir. GitHub üzerinde bir dosyayı açıp kalem simgesine basarak düzenleyebilir ve **Commit changes** ile kaydedebilirsiniz. Her kayıt sonrasında site, İngilizce CV ve Türkçe CV otomatik olarak yeniden oluşturulur.

## Hangi bilgi nerede?

| Dosya | İçerik |
|---|---|
| `content/profile.json` | İsim, unvan, hakkımda metni, sosyal bağlantılar, üyelikler |
| `content/timeline.json` | Eğitim, akademik görev, sektör ve uluslararası deneyim |
| `content/research.json` | Araştırma alanları ve teknik yetkinlikler |
| `content/projects.json` | Fonlanan ve seçili projeler |
| `content/publications.json` | Elle doğrulanan yayınlar ve öne çıkan yayın seçimi |
| `content/publications.auto.json` | ORCID, OpenAlex ve Crossref tarafından otomatik yönetilen yayınlar |
| `content/videos.json` | Öne çıkan YouTube videoları |
| `content/teaching.json` | Dersler ve AISC mentorluk faaliyetleri |
| `content/talks.json` | Sunumlar, seminerler ve akademik etkinlikler |
| `content/services.json` | İş birliği yapılabilecek alanlar |
| `content/news.json` | Ana sayfadaki son gelişmeler ve LinkedIn bağlantıları |
| `content/settings.json` | E-posta, site adresi, Google Form ve Google Analytics ayarları |

## Profil fotoğrafını değiştirme

Web sitesindeki fotoğraf `public/profile.webp`, CV'deki küçük fotoğraf ise `assets/profile-cv.jpg` dosyasıdır. Yeni fotoğrafı aynı dosya adlarıyla yüklediğinizde bir sonraki yayınlamada site ve CV birlikte güncellenir.

## Yeni YouTube videosu ekleme

`content/videos.json` dosyasına şu biçimde bir kayıt ekleyin:

```json
{
  "id": "YOUTUBE_VIDEO_ID",
  "title": {
    "en": "English video title",
    "tr": "Türkçe video başlığı"
  },
  "category": {
    "en": "Artificial Intelligence",
    "tr": "Yapay Zeka"
  }
}
```

Video kimliği, YouTube bağlantısında `watch?v=` sonrasındaki bölümdür. Kısa bağlantılarda `youtu.be/` sonrasında yer alır. Kapak görseli otomatik alınır.

## Yeni yayın ekleme

`content/publications.json` dosyasındaki listenin içine şu biçimde kayıt ekleyin:

```json
{
  "title": "Publication title",
  "authors": ["Author One", "Mustafa Furkan Ceylan"],
  "year": 2027,
  "venue": "Journal or Conference Name",
  "type": "journal",
  "doi": "10.xxxx/xxxxx",
  "selected": true
}
```

`selected: true` yayını ana seçili listede gösterir. `false` olan kayıt yalnızca tüm yayınlar açıldığında görünür. DOI değeri `https://doi.org/` eklenmeden yazılmalıdır.

## Yeni proje ekleme

`content/projects.json` dosyasında mevcut bir kayıt kopyalanıp başlık, rol, dönem, açıklama ve etiketler değiştirilir. İngilizce ve Türkçe alanların ikisini de doldurun.

## Yeni haber veya LinkedIn paylaşımı ekleme

`content/news.json` dosyasına şu biçimde kayıt ekleyin:

```json
{
  "date": "2027-01-15",
  "type": "publication",
  "title": {
    "en": "New paper published",
    "tr": "Yeni makale yayımlandı"
  },
  "url": "https://www.linkedin.com/posts/..."
}
```

Ana sayfada dosyadaki ilk üç kayıt gösterilir. En yeni kayıtları üstte tutun.

## Google Form ekleme

Google Form oluşturulduktan sonra paylaşım bağlantısını `content/settings.json` içindeki `googleFormUrl` alanına yazın:

```json
"googleFormUrl": "https://docs.google.com/forms/d/e/.../viewform"
```

Alan boş bırakılırsa form butonu gösterilmez ve yalnızca e-posta iletişimi kullanılır.

## Google Analytics ekleme

Google Analytics 4 ölçüm kimliğini `content/settings.json` içindeki alana ekleyin:

```json
"googleAnalyticsId": "G-XXXXXXXXXX"
```

Alan boşken ziyaretçi takibi yapılmaz. Kimlik eklendiğinde CV, e-posta, YouTube, Scholar, GitHub ve form tıklamaları yalnızca Google Analytics hesabınızda görüntülenebilir.

## Yayınların otomatik güncellenmesi

GitHub Actions her pazar ORCID, OpenAlex ve Crossref üzerinde yeni kayıt kontrolü yapar. Bulunan ve elle yönetilen listede olmayan çalışmalar `content/publications.auto.json` dosyasına eklenir. Yanlış bir kayıt gelirse bu dosyadan kaldırabilir veya doğru kaydı `content/publications.json` içine taşıyabilirsiniz.

## CV güncellemesi

İngilizce ve Türkçe PDF CV dosyaları aynı JSON verilerinden otomatik üretilir. Proje, deneyim, araştırma alanı veya öne çıkan yayın değiştiğinde CV de sonraki yayınlamada güncellenir.

## Güvenli düzenleme kontrolü

- JSON içindeki çift tırnakları silmeyin.
- Kayıtların arasına virgül koyun; son kayıttan sonra virgül koymayın.
- Ev adresi, telefon, parola veya özel proje verisi eklemeyin.
- Otomatik dosyalarda beklenmeyen değişiklikleri yayımlamadan önce kontrol edin.
- GitHub, değişiklik sonrasında kırmızı hata gösterirse son düzenlemedeki virgül ve tırnakları kontrol edin.
