const dbConnect = require('../../utils/db');
const Order = require('../../models/Order');

module.exports = async (req, res) => {
  // Ödeal'dan gelen Callback/Webhook URL'si.
  // URL üzerinden gelen orderId Parametresini alıyoruz. (Veya Body'den)
  
  try {
    const orderId = req.query.orderId || (req.body && req.body.orderId);
    
    // Genelde Ödeal başarı durumu `status` veya `paymentStatus` gibi bir değerle döner.
    // Başarılı ödeme (SUCCESS), Başarısız (FAIL/DECLINE).
    const paymentStatus = req.body && req.body.status ? req.body.status : (req.query.status || 'SUCCESS'); 

    if (!orderId) {
        return res.redirect('/checkout.html?status=error&msg=missing_id');
    }

    await dbConnect();
    const order = await Order.findById(orderId);
    
    if (!order) {
        return res.redirect('/checkout.html?status=error&msg=order_not_found');
    }

    if (paymentStatus === 'SUCCESS' || paymentStatus === 'success' || paymentStatus === '1') {
        // Ödeme Başarılı
        order.status = 'paid';
        order.paymentId = (req.body && req.body.transactionId) || 'odeal_txn_' + Date.now();
        await order.save();
        res.redirect('/checkout.html?status=success&orderId=' + orderId);
    } else {
        // Ödeme Başarısız
        order.status = 'failed';
        await order.save();
        res.redirect('/checkout.html?status=failed');
    }

  } catch (error) {
    res.redirect('/checkout.html?status=error');
  }
};
