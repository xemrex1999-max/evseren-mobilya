const LEGAL_CONFIG = {
  COMPANY_NAME: "Evseren Mobilya",
  TAX_NUMBER: "Gerektiğinde güncellenecektir",
  ADDRESS: "MAHMUDİYE MH.14 MOB. NİL SK. NO:33 İNEGÖL / BURSA",
  PHONE: "+90 531 460 25 97 | +90 507 756 78 87",
  EMAIL: "evserenmobilya@gmail.com",
  WEBSITE: "www.evserenmobilya.com"
};

document.addEventListener("DOMContentLoaded", () => {
   const container = document.getElementById('legal-content');
   if (!container) return;

   const pageType = container.getAttribute('data-type');
   let content = '';

   if (pageType === 'privacy') {
       content = `
       <h1>Gizlilik ve Çerez Politikası</h1>
       <p>Son Güncellenme: 01.04.2026</p>
       <p>İşbu Gizlilik Politikası, <strong>${LEGAL_CONFIG.COMPANY_NAME}</strong> ("Satıcı" veya "Şirket") tarafından işletilmekte olan ${LEGAL_CONFIG.WEBSITE} internet sitesinin ("Site") kullanımı sırasında thu elde edilen kişisel verilerin kullanım koşullarını düzenlemektedir.</p>
       
       <h2>1. Hangi Verileri Topluyoruz?</h2>
       <p>Sitemize üye olurken, sipariş verirken veya iletişim formunu doldururken Ad, Soyad, TCKN, E-posta adresi, Telefon Numarası, Teslimat/Fatura Adresi gibi kişisel bilgilerinizi; sitemizi ziyaretleriniz sırasında IP adresinizi ve tarayıcı çerezlerinizi (cookies) toplamaktayız.</p>
       
       <h2>2. Verilerinizi Nasıl Kullanıyoruz?</h2>
       <ul>
           <li>Siparişlerinizin alınması, işlenmesi ve teslimatının sağlanması,</li>
           <li>Satış sonrası kurulum ve destek hizmetlerinin verilmesi,</li>
           <li>Üyelik sisteminin yönetilmesi ve size özel kampanyaların sunulabilmesi,</li>
           <li>Yasal yükümlülüklerimizin (fatura kesimi vb.) yerine getirilmesi.</li>
       </ul>

       <h2>3. Verilerinizin Paylaşımı</h2>
       <p>Kişisel verileriniz, yalnızca sipariş teslimatınızı gerçekleştirecek lojistik ve kargo şirketleri (Nakliye Ekipleri) ile ödeme işlemlerinizi yürüten aracı kurumlar (Ödeal Sanal POS) ile paylaşılmaktadır. Üçüncü şahıslara ticari amaçla satılmaz veya kiralanmaz.</p>

       <h2>4. İletişim Bilgilerimiz</h2>
       <p>Gizlilik süreçleri hakkında bilgi almak için:</p>
       <ul>
       <li><strong>Şirket Unvanı:</strong> ${LEGAL_CONFIG.COMPANY_NAME}</li>
       <li><strong>Adres:</strong> ${LEGAL_CONFIG.ADDRESS}</li>
       <li><strong>E-Posta:</strong> ${LEGAL_CONFIG.EMAIL}</li>
       </ul>
       `;
   } else if (pageType === 'terms') {
       content = `
       <h1>Kullanım Şartları</h1>
       <p>Siteyi kullanmadan önce lütfen bu şartları okuyunuz.</p>
       <p><strong>${LEGAL_CONFIG.COMPANY_NAME}</strong> web sitesini ziyaret eden tüm kullanıcılar aşağıdaki şartları kesin olarak kabul etmiş sayılır:</p>
       <ol>
           <li>Site içerisindeki resimler, yazılar, ürün tasarımları ve markalar telif hakkı korumasına sahiptir. Kopyalanamaz, izinsiz kullanılamaz.</li>
           <li>Firmamız, web sitesinde listelenen fiyatlarda ve ürün özelliklerinde önceden haber vermeksizin değişiklik yapma hakkını saklı tutar.</li>
           <li>Platform üzerinde oluşan sistemsel veya tipografik fiyatlandırma hatalarından şirketimiz sorumlu değildir ve siparişi iptal etme hakkını saklı tutar.</li>
           <li>Tüm kullanıcılar yasal mevzuat sınırları dâhilinde işlem yapmayı peşinen taahhüt eder.</li>
       </ol>
       <p>Detaylı bilgi ve yasal talepleriniz için <strong>${LEGAL_CONFIG.EMAIL}</strong> adresine yazabilirsiniz.</p>
       `;
   } else if (pageType === 'distance') {
       content = `
       <h1>Mesafeli Satış Sözleşmesi</h1>
       <h2>Madde 1 - Taraflar</h2>
       <p><strong>SATICI:</strong><br>
       Unvanı: ${LEGAL_CONFIG.COMPANY_NAME}<br>
       Adres: ${LEGAL_CONFIG.ADDRESS}<br>
       Telefon: ${LEGAL_CONFIG.PHONE}<br>
       Vergi Numarası: ${LEGAL_CONFIG.TAX_NUMBER}<br>
       Web Sitesi: ${LEGAL_CONFIG.WEBSITE}</p>
       <p><strong>ALICI (TÜKETİCİ):</strong> (İşbu sözleşmenin ayrılmaz bir parçası olan sipariş formundaki kişi bilgileri esas alınır.)</p>
       
       <h2>Madde 2 - Sözleşmenin Konusu</h2>
       <p>İşbu sözleşmenin konusu, ALICI'nın SATICI'ya ait internet sitesinden (\`${LEGAL_CONFIG.WEBSITE}\`) elektronik ortamda siparişini yaptığı, özellikleri ve satış fiyatı belirtilen ürünün satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.</p>
       
       <h2>Madde 3 - Ürün Teslimatı ve Şekli</h2>
       <p>Sözleşme konusu ürün(ler), ALICI'nın belirttiği teslimat adresine, yasal süreyi aşmamak koşuluyla SATICI'nın anlaşmalı olduğu özel teslimat ve kurulum personeli aracılığıyla teslim edilir. Ücretsiz nakliye ve kurulum hizmeti yalnızca Türkiye sınırları içerisinde geçerlidir.</p>
       <p>ALICI, teslim anında ürünleri kontrol etmekle ve taşıma/kurulum esnasında oluşan bir hasar görürse, ürünü teslim almayarak yetkili personele tutanak tutturmakla yükümlüdür.</p>

       <h2>Madde 4 - Cayma Hakkı</h2>
       <p>ALICI, sözleşme konusu ürünün kendisine veya gösterdiği adresteki kişi/kuruluşa tesliminden itibaren on dört (14) gün içinde hiçbir hukuki ve cezai sorumluluk üstlenmeksizin ve hiçbir gerekçe göstermeksizin malı reddederek sözleşmeden cayma hakkına sahiptir.</p>
       `;
   } else if (pageType === 'return') {
       content = `
       <h1>İade ve İptal Koşulları</h1>
       <p><strong>${LEGAL_CONFIG.COMPANY_NAME}</strong> olarak müşteri memnuniyetini en üst düzeyde tutuyoruz. Ancak olası uyumsuzluk durumlarında iade sürecimiz şu şekilde işlemektedir:</p>
       
       <h2>1. İade Şartları</h2>
       <ul>
           <li>Alıcı, Tüketici Kanunu gereği ürünü teslim aldığı tarihten itibaren 14 gün içinde cayma hakkını kullanarak iade edebilir.</li>
           <li>İade edilecek mobilyaların deforme olmamış, çizilmemiş ve tekrar satılabilir özelliğini yitirmemiş olması zorunludur.</li>
           <li><strong>Özel Üretim Ürünler:</strong> Müşterinin özel ölçü, kumaş veya renk talebi ile sıfırdan üretilen ürünlerde cayma hakkı veya iade kullanılamaz.</li>
       </ul>

       <h2>2. İade Süreci</h2>
       <p>İade etmek istediğiniz ürün için öncelikle <strong>${LEGAL_CONFIG.PHONE}</strong> numaralı destek hattımızı arayarak veya <strong>${LEGAL_CONFIG.EMAIL}</strong> adresine mail atarak "İade Talebi" oluşturmanız gerekmektedir. Nakliye ekiplerimiz ile gün belirlenecek ve ürün adresinizden teslim alınacaktır.</p>
       `;
   }

   container.innerHTML = content;
});
