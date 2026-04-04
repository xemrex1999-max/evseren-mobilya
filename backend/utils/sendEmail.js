const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: `Evseren Mobilya <${process.env.EMAIL_USER}>`,
        to: options.to,
        subject: options.subject,
        html: options.html
    };

    await transporter.sendMail(mailOptions);
};

const sendOrderEmail = async (order, user) => {
    try {
        const productRows = order.products.map(p => `
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${p.name}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${p.quantity}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₺${p.price.toLocaleString()}</td>
            </tr>
        `).join('');

        const getHtml = (isForAdmin) => `
            <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden;">
                <div style="background: #1A1A1A; padding: 30px; text-align: center; color: white;">
                    <h1 style="margin: 0; font-size: 24px;">${isForAdmin ? 'Yeni Sipariş Alındı! 🎉' : 'Siparişiniz Alındı! ✅'}</h1>
                    <p style="margin: 10px 0 0; opacity: 0.8;">Sipariş No: ${order.orderCode}</p>
                </div>
                <div style="padding: 30px;">
                    <p>${isForAdmin ? 'Yönetici Paneline yeni bir sipariş düştü. Detaylar aşağıdadır:' : 'Sayın ' + user.name + ', siparişiniz başarıyla alınmıştır. En kısa sürede hazırlıklara başlayacağız.'}</p>
                    <h3 style="color: #B8860B;">Sipariş Özeti</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #f9fafb;">
                                <th style="padding: 10px; text-align: left;">Ürün</th>
                                <th style="padding: 10px; text-align: center;">Adet</th>
                                <th style="padding: 10px; text-align: right;">Fiyat</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${productRows}
                        </tbody>
                    </table>
                    <div style="margin-top: 20px; text-align: right;">
                        <span style="font-size: 18px; font-weight: bold; color: #1A1A1A;">Toplam: ₺${order.totalPrice.toLocaleString()}</span>
                    </div>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                    <h3 style="color: #B8860B;">Teslimat Bilgileri</h3>
                    <p><strong>Ad Soyad:</strong> ${user.name}</p>
                    <p><strong>E-posta:</strong> ${user.email}</p>
                    <p><strong>Telefon:</strong> ${user.phone || 'Girilmedi'}</p>
                    <p><strong>Adres:</strong> ${user.address || 'Girilmedi'}</p>
                </div>
                <div style="background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6B7280;">
                    ${isForAdmin ? 'Bu e-posta Evseren Mobilya sistemi tarafından otomatik olarak gönderilmiştir.' : 'Bizi tercih ettiğiniz için teşekkür ederiz! Sorularınız için bu e-postayı yanıtlayabilirsiniz.'}
                </div>
            </div>
        `;

        // 1. Yöneticiye Gönder
        await sendEmail({
            to: process.env.EMAIL_USER,
            subject: `[YENİ SİPARİŞ] ${order.orderCode} - ${user.name}`,
            html: getHtml(true)
        });

        // 2. Müşteriye Gönder (Eğer e-posta adresi geçerliyse)
        if (user.email && user.email.includes('@')) {
            await sendEmail({
                to: user.email,
                subject: `Siparişiniz Onaylandı: ${order.orderCode} - Evseren Mobilya`,
                html: getHtml(false)
            });
        }

        console.log(`Email successfully sent to Manager and Customer for order ${order.orderCode}`);
    } catch (error) {
        console.error("Email sending failed:", error);
    }
};

module.exports = { sendOrderEmail };
