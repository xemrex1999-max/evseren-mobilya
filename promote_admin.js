require('dotenv').config();
const dbConnect = require('./api/utils/db');
const User = require('./api/models/User');

const emailToPromote = 'xemrex1999@hotmail.com';

async function promote() {
    try {
        console.log('Veritabanına bağlanılıyor...');
        await dbConnect();
        
        console.log(`${emailToPromote} kullanıcısı aranıyor...`);
        const user = await User.findOne({ email: emailToPromote });
        
        if (!user) {
            console.log('Hata: Kullanıcı bulunamadı. Lütfen önce kayıt olun.');
            process.exit(1);
        }
        
        console.log('Kullanıcı bulundu. Rol güncelleniyor: user -> admin');
        user.role = 'admin';
        await user.save();
        
        console.log('Başarılı! Hesabınız artık "admin" yetkisine sahip.');
        process.exit(0);
    } catch (error) {
        console.error('İşlem sırasında bir hata oluştu:', error);
        process.exit(1);
    }
}

promote();
