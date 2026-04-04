const dbConnect = require('../../utils/db');
const Order = require('../../models/Order');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  try {
    await dbConnect();
    const { items, shippingAddress, billingAddress, buyer } = req.body;
    
    // Auth Validation (Optional for Guest Checkout)
    let userId = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        try {
            const tokenHeader = authHeader.split(' ')[1];
            const decoded = jwt.verify(tokenHeader, process.env.JWT_SECRET || 'secretKey');
            userId = decoded.id;
        } catch (authError) {
            console.log("Auth error (proceeding as guest):", authError.message);
        }
    }

    // Totals
    let total = 0;
    items.forEach(item => {
      total += item.price * item.qty;
    });

    const conversationId = Date.now().toString();

    // Create Order in "pending" status
    const order = await Order.create({
      user: userId,
      items: items.map(i => ({ product: i.id, name: i.name, quantity: i.qty, price: i.price })),
      totalAmount: total,
      status: 'pending',
      conversationId: conversationId,
      shippingAddress,
      billingAddress
    });

    // ============================================
    // ÖDEAL API ENTEGRASYONU (Sanal POS - Checkout)
    // ============================================

    // 1. Ödeal Token Alma İşlemi
    const odealClientId = process.env.ODEAL_CLIENT_ID;
    const odealClientSecret = process.env.ODEAL_CLIENT_SECRET;
    
    if (!odealClientId || !odealClientSecret || odealClientId.includes('buraya')) {
        // Eğitim / Geliştirme modu - Canlı kilitli ise hata döndür
        return res.status(500).json({ 
            message: 'Sistem Hatası: Lütfen .env dosyanızdan Ödeal API (clientId / clientSecret) bilgilerinizi doldurun.' 
        });
    }

    try {
        const authRes = await fetch('https://auth.odeal.com/api/v1/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                clientId: odealClientId,
                clientSecret: odealClientSecret
            })
        });

        if (!authRes.ok) {
           return res.status(400).json({ message: 'Ödeal Yetkilendirme Hatası. Lütfen API şifrelerinizi kontrol edin.' });
        }
        
        const authData = await authRes.json();
        const accessToken = authData.access_token || authData.token;

        // 2. Ödeal Ödeme Linki (Pay by Link veya 3D Checkout) Yaratma
        // Not: Aşağıdaki URL yapısı ve JSON gövdesi Ödeal API dokümantasyonuna göre özelleştirilmelidir.
        // Genellikle /pos/checkout veya /v1/payment/link tarzı bir endpoint kullanılır.
        const callbackUrl = `${process.env.APP_URL || 'http://localhost:3000'}/api/payment/callback?orderId=${order._id}`;

        const paymentRes = await fetch('https://api.odeal.com/v1/checkout', {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: total,
                currency: "TRY",
                orderId: order._id.toString(),
                callbackUrl: callbackUrl,
                successUrl: `${process.env.APP_URL || 'http://localhost:3000'}/checkout.html?status=success&orderId=${order._id}`,
                failUrl: `${process.env.APP_URL || 'http://localhost:3000'}/checkout.html?status=failed`,
                customer: {
                    name: buyer.name,
                    surname: buyer.surname,
                    email: buyer.email,
                    phone: buyer.phone
                }
            })
        });

        const paymentData = await paymentRes.json();

        // Ödeal'dan dönen Checkout (Ödeme Sayfası) linkini sisteme aktarıyoruz
        if (paymentData && paymentData.paymentUrl) {
            return res.status(200).json({ paymentPageUrl: paymentData.paymentUrl });
        } else {
            return res.status(400).json({ message: 'Ödeal Checkout Linki alınamadı.', data: paymentData });
        }

    } catch (err) {
        return res.status(500).json({ message: 'Ödeal Sunucu İletişim Hatası', error: err.message });
    }

  } catch (error) {
    res.status(500).json({ message: 'Sistem Hatası', error: error.message });
  }
};
