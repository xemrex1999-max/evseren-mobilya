require('dotenv').config(); // .env dosyasini yukle
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI;

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'user' },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function resetAdmin() {
  console.log('MongoDB URI:', MONGODB_URI ? MONGODB_URI.substring(0, 30) + '...' : 'BULUNAMADI!');
  
  if (!MONGODB_URI) {
    console.error('\nHata: MONGODB_URI bulunamadi!');
    console.log('Lutfen .env veya .env.example dosyanizda MONGODB_URI tanimli oldugundan emin olun.');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI, { bufferCommands: false });
    console.log('Veritabani baglantisi basarili!\n');

    const hashedPass = await bcrypt.hash('evseren123', 10);

    const result = await User.findOneAndUpdate(
      { email: 'xemrex1999@hotmail.com' },
      { 
        name: 'Emre Balci',
        email: 'xemrex1999@hotmail.com',
        password: hashedPass,
        role: 'admin'
      },
      { upsert: true, new: true }
    );

    console.log('Islem basarili!');
    console.log('Kullanici:', result.email);
    console.log('Rol:', result.role);
    console.log('\nGiris bilgileriniz:');
    console.log('E-posta: xemrex1999@hotmail.com');
    console.log('Sifre  : evseren123');
    process.exit(0);
  } catch (err) {
    console.error('Hata:', err.message);
    process.exit(1);
  }
}

resetAdmin();
