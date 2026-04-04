require('dotenv').config();
const dbConnect = require('./api/utils/db');
const Product = require('./api/models/Product');

const products = [
  { name: "Ayça Yatak Odası", price: 75600, category: "yatak", image: "images/yatak_odasi.png", description: "Ayça Serisi - 2026 Model Premium Yatak Odası Takımı. Konfor ve şıklığı bir arada sunar." },
  { name: "Ayça Yemek Odası", price: 71400, category: "yemek", image: "images/yemek_odasi.png", description: "Ayça Serisi - Modern ve estetik yemek odası takımı. Sevdiklerinizle en güzel anlar için." },
  { name: "Buğlem Yatak Odası", price: 78400, category: "yatak", image: "images/yatak_odasi.png", description: "Buğlem Serisi - Zarafetin ve kalitenin buluşma noktası." },
  { name: "Buğlem Yemek Odası", price: 72800, category: "yemek", image: "images/yemek_odasi.png", description: "Buğlem Serisi - Şık tasarımıyla salonunuza renk katacak yemek odası takımı." },
  { name: "Tokyo Yatak Odası", price: 77000, category: "yatak", image: "images/yatak_odasi.png", description: "Tokyo Serisi - Modern çizgileri ve fonksiyonel yapısıyla yeni nesil yatak odası." },
  { name: "Tokyo Yemek Odası", price: 60900, category: "yemek", image: "images/yemek_odasi.png", description: "Tokyo Serisi - Sade ve şık tasarımıyla huzurlu yemekler için ideal seçim." },
  { name: "İnci Yatak Odası", price: 70000, category: "yatak", image: "images/yatak_odasi.png", description: "İnci Serisi - Klasik ve modernin mükemmel uyumu." },
  { name: "İnci Yemek Odası", price: 58800, category: "yemek", image: "images/yemek_odasi.png", description: "İnci Serisi - Estetik ve dayanıklılığı bir araya getiren yemek odası takımı." }
];

async function seed() {
  try {
    console.log('Veritabanına bağlanılıyor...');
    await dbConnect();
    
    console.log('Mevcut ürünler temizleniyor...');
    await Product.deleteMany({});
    
    console.log('Yeni ürünler ekleniyor...');
    await Product.insertMany(products);
    
    console.log('İşlem başarıyla tamamlandı!');
    process.exit(0);
  } catch (error) {
    console.error('Hata oluştu:', error);
    process.exit(1);
  }
}

seed();
