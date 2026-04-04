const API_URL = 'http://localhost:5000/api';
let cart = JSON.parse(localStorage.getItem('mobilya_cart')) || [];
let currentStep = 1;
let discount = 0;
let expressShipping = false;
let selectedInstallment = 1;

// ILCE VERISI (Ornek Liste - Proje buyudukce JSON'a tasiyabiliriz)
const cityDistrictData = {
    "İstanbul": ["Adalar", "Arnavutköy", "Ataşehir", "Avcılar", "Bağcılar", "Bahçelievler", "Bakırköy", "Başakşehir", "Bayrampaşa", "Beşiktaş", "Beykoz", "Beylikdüzü", "Beyoğlu", "Büyükçekmece", "Çatalca", "Çekmeköy", "Esenler", "Esenyurt", "Eyüpsultan", "Fatih", "Gaziosmanpaşa", "Güngören", "Kadıköy", "Kağıthane", "Kartal", "Küçükçekmece", "Maltepe", "Pendik", "Sancaktepe", "Sarıyer", "Silivri", "Sultanbeyli", "Sultangazi", "Şile", "Şişli", "Tuzla", "Ümraniye", "Üsküdar", "Zeytinburnu"],
    "Ankara": ["Akyurt", "Altındağ", "Ayaş", "Bala", "Beypazarı", "Çamlıdere", "Çankaya", "Çubuk", "Elmadağ", "Etimesgut", "Evren", "Gölbaşı", "Güdül", "Haymana", "Kahramankazan", "Kalecik", "Keçiören", "Kızılcahamam", "Mamak", "Nallıhan", "Polatlı", "Pursaklar", "Sincan", "Şereflikoçhisar", "Yenimahalle"],
    "İzmir": ["Aliağa", "Balçova", "Bayındır", "Bayraklı", "Bergama", "Beydağ", "Bornova", "Buca", "Çeşme", "Çiğli", "Dikili", "Foça", "Gaziemir", "Güzelbahçe", "Karabağlar", "Karaburun", "Karşıyaka", "Kemalpaşa", "Kınık", "Kiraz", "Konak", "Menderes", "Menemen", "Narlıdere", "Ödemiş", "Seferihisar", "Selçuk", "Tire", "Torbalı", "Urla"],
    "Bursa": ["Büyükorhan", "Gemlik", "Gürsu", "Harmancık", "İnegöl", "İznik", "Karacabey", "Keles", "Kestel", "Mudanya", "Mustafakemalpaşa", "Nilüfer", "Orhaneli", "Orhangazi", "Osmangazi", "Yenişehir", "Yıldırım"],
    "Antalya": ["Akseki", "Aksu", "Alanya", "Demre", "Döşemealtı", "Elmalı", "Finike", "Gazipaşa", "Gündoğmuş", "İbradı", "Kaş", "Kemer", "Kepez", "Konyaaltı", "Korkuteli", "Kumluca", "Manavgat", "Muratpaşa", "Serik"],
    "Konya": ["Ahırlı", "Akören", "Akşehir", "Altınekin", "Beyşehir", "Bozkır", "Cihanbeyli", "Çeltik", "Çumra", "Derbent", "Derebucak", "Doğanhisar", "Emirgazi", "Ereğli", "Güneysınır", "Hadim", "Halkapınar", "Hüyük", "Ilgın", "Kadınhanı", "Karapınar", "Karatay", "Kulu", "Meram", "Sarayönü", "Selçuklu", "Seydişehir", "Taşkent", "Tuzlukçu", "Yalıhüyük", "Yunak"],
    "Adana": ["Aladağ", "Ceyhan", "Çukurova", "Feke", "İmamoğlu", "Karaisalı", "Karataş", "Kozan", "Pozantı", "Saimbeyli", "Sarıçam", "Seyhan", "Tufanbeyli", "Yumurtalık", "Yüreğir"]
    // Diger sehirler ihtiyaca gore eklenebilir veya default liste atanabilir.
};

// YARDIMCILAR (script.js'den gelmezse diye yedek)
const formatPrice = window.formatPrice || function(val) {
    return '\u20BA' + val.toLocaleString('tr-TR');
};

function saveCart() {
    localStorage.setItem('mobilya_cart', JSON.stringify(cart));
}

/* ---- ADIM GECISI ---- */
function goToStep(step) {
    document.querySelectorAll('.co-panel').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(`co-step-${step}`);
    if (target) target.classList.add('active');

    for (let i = 1; i <= 4; i++) {
        const ind = document.getElementById(`step-indicator-${i}`);
        if (!ind) continue;
        ind.classList.remove('active', 'done');
        if (i < step) ind.classList.add('done');
        if (i === step) ind.classList.add('active');
    }

    document.querySelectorAll('.co-step-line').forEach((line, idx) => {
        line.classList.toggle('done', idx < step - 1);
    });

    currentStep = step;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // HARITA GUNCELLEME (Fix for grey tiles when initial hidden)
    if (step === 2 && typeof map !== 'undefined' && map) {
        setTimeout(() => {
            map.invalidateSize();
        }, 300);
    }
}

/* ---- SEPET OZETI RENDER (sağ panel) ---- */
function renderSummary() {
    const container = document.getElementById('co-summary-items');
    if (!container) return;

    if (!cart || cart.length === 0) {
        container.innerHTML = '<p style="color:#a49a91;font-size:0.85rem;padding:10px 0">Sepet bos</p>';
    } else {
        container.innerHTML = cart.map(item => {
            const itemPrice = item.price || 0;
            const itemOldPrice = item.oldPrice || itemPrice;
            return `
      <div class="co-summary-item">
        <img src="${item.img}" alt="${item.name}" />
        <div style="flex:1">
          <div class="co-summary-item-name">${item.name}</div>
          <div class="co-summary-item-qty">${item.qty} adet</div>
        </div>
        <div class="co-summary-item-price">
          ${formatPrice(itemPrice * item.qty)}
          ${item.oldPrice ? `<div style="text-decoration:line-through;color:#a49a91;font-size:0.75rem;font-weight:400">${formatPrice(itemOldPrice * item.qty)}</div>` : ''}
        </div>
      </div>
    `;
        }).join('');
    }
    updateTotals();
}

/* ---- SEPET ITEMLARI RENDER (step 1 sol) ---- */
function renderCartItems() {
    const container = document.getElementById('co-cart-items');
    const emptyEl = document.getElementById('co-empty-cart');
    const goBtn = document.getElementById('goToStep2');
    if (!container) return;

    if (!cart || cart.length === 0) {
        container.style.display = 'none';
        if (emptyEl) emptyEl.style.display = 'block';
        if (goBtn) goBtn.disabled = true;
        return;
    }

    if (emptyEl) emptyEl.style.display = 'none';
    container.style.display = 'block';
    if (goBtn) goBtn.disabled = false;

    container.innerHTML = cart.map(item => {
        const itemPrice = item.price || 0;
        const itemOldPrice = item.oldPrice || itemPrice;
        return `
    <div class="co-cart-item" id="coitem-${item.id}">
      <img src="${item.img}" alt="${item.name}" />
      <div class="co-cart-item-info">
        <div class="co-cart-item-name">${item.name}</div>
        <div class="co-cart-item-cat">${window.getCatName ? window.getCatName(item.cat || '') : ''}</div>
        <div class="co-qty-row">
          <button class="co-qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
          <span class="co-qty-val">${item.qty}</span>
          <button class="co-qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <div style="text-align:right">
        <div class="co-cart-item-price">${formatPrice(itemPrice * item.qty)}</div>
        ${item.oldPrice ? `<div style="text-decoration:line-through;color:#a49a91;font-size:0.8rem">${formatPrice(itemOldPrice * item.qty)}</div>` : ''}
      </div>
      <button class="co-cart-item-remove" onclick="removeFromCartCO(${item.id})" title="Kaldir">
        <i class="fas fa-times"></i>
      </button>
    </div>
    `;
    }).join('');
}

function changeQty(id, delta) {
    const item = cart.find(x => x.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        cart = cart.filter(x => x.id !== id);
    }
    saveCart();
    renderCartItems();
    renderSummary();
    if (window.updateCartUI) window.updateCartUI();
}

function removeFromCartCO(id) {
    cart = cart.filter(x => x.id !== id);
    saveCart();
    renderCartItems();
    renderSummary();
    if (window.updateCartUI) window.updateCartUI();
    if (cart.length === 0) {
        const btn = document.getElementById('goToStep2');
        if (btn) btn.disabled = true;
    }
}

/* ---- TOPLAM HESAPLA ---- */
function updateTotals() {
    const originalSubtotal = (cart || []).reduce((s, x) => s + ((x.oldPrice || x.price) * x.qty), 0);
    const currentSubtotal = (cart || []).reduce((s, x) => s + (x.price * x.qty), 0);
    const expressExtra = expressShipping ? 499 : 0;
    
    // Toplam Indirim (oldPrice'dan gelen + kupon indirimi)
    const totalSavings = originalSubtotal - currentSubtotal + discount;
    const total = Math.max(0, originalSubtotal - totalSavings + expressExtra);

    document.getElementById('sum-subtotal').textContent = formatPrice(originalSubtotal);
    document.getElementById('sum-total').textContent = formatPrice(total);

    const discRow = document.getElementById('sum-discount-row');
    const discEl = document.getElementById('sum-discount');
    if (discRow && discEl) {
        if (totalSavings > 0) {
            discRow.style.display = 'flex';
            discEl.textContent = '- ' + formatPrice(totalSavings);
        } else {
            discRow.style.display = 'none';
        }
    }

    const expRow = document.getElementById('sum-express-row');
    if (expRow) expRow.style.display = expressShipping ? 'flex' : 'none';

    const instElements = {
        'inst-1': total,
        'inst-2': Math.ceil(total / 2),
        'inst-3': Math.ceil(total / 3),
        'inst-4': Math.ceil(total / 4),
        'inst-5': Math.ceil(total / 5),
        'inst-6': Math.ceil(total / 6)
    };

    for (let id in instElements) {
        const el = document.getElementById(id);
        if (el) el.textContent = formatPrice(instElements[id]) + (id === 'inst-1' ? '' : '/ay');
    }
}

/* ---- KUPON ---- */
const coupons = { 'MOBILYA10': 0.10, 'DUGUN15': 0.15, 'YENI5': 0.05, 'INEGOL20': 0.20, 'EVSEREN10': 0.10 };
document.getElementById('applyCoupon')?.addEventListener('click', () => {
    const code = document.getElementById('couponInput').value.trim().toUpperCase();
    const msg = document.getElementById('couponMsg');
    const subtotal = cart.reduce((s, x) => s + x.price * x.qty, 0);
    if (!code) { msg.textContent = 'Lutfen kod girin.'; msg.className = 'coupon-msg error'; return; }
    if (coupons[code]) {
        discount = Math.round(subtotal * coupons[code]);
        msg.textContent = `Basarili! %${coupons[code]*100} indirim.`;
        msg.className = 'coupon-msg success';
        updateTotals();
        renderSummary();
    } else {
        msg.textContent = 'Gecersiz kod.';
        msg.className = 'coupon-msg error';
    }
});

/* ---- TESLIMAT SECEGI ---- */
document.querySelectorAll('input[name="delivery"]').forEach(radio => {
    radio?.addEventListener('change', () => {
        expressShipping = radio.value === 'express';
        updateTotals();
    });
});

/* ---- TAKSIT SECEGI ---- */
document.querySelectorAll('input[name="installment"]').forEach(radio => {
    radio?.addEventListener('change', function() {
        document.querySelectorAll('.installment-option').forEach(opt => opt.classList.remove('selected'));
        this.closest('.installment-option')?.classList.add('selected');
        selectedInstallment = parseInt(this.value);
    });
});

/* ---- KART ONIZLEME ---- */
document.getElementById('cardNumber')?.addEventListener('input', function () {
    let val = this.value.replace(/\D/g, '').substring(0, 16);
    val = val.replace(/(.{4})/g, '$1 ').trim();
    this.value = val;
    const preview = document.getElementById('previewNumber');
    if (preview) preview.textContent = val || '•••• •••• •••• ••••';
});

/* ---- ODEME TAB ---- */
document.querySelectorAll('.co-pay-tab').forEach(tab => {
    tab?.addEventListener('click', () => {
        document.querySelectorAll('.co-pay-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.co-pay-section').forEach(s => s.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(`pay-${tab.dataset.method}`)?.classList.add('active');
    });
});

/* ---- HARITA & ILCE MANTIGI ---- */
let map, marker, isMapUpdating = false;

function initMap() {
    const mapEl = document.getElementById('addressMap');
    if (!mapEl) return;

    map = L.map('addressMap', {
        zoomSnap: 1,
        zoomDelta: 1
    }).setView([39.9334, 32.8597], 6);

    // Yandex Benzeri Net ve Detaylı Harita (Google/Yandex kalitesinde)
    L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        attribution: '© Google Maps',
        maxZoom: 20
    }).addTo(map);

    marker = L.marker([39.9334, 32.8597], { draggable: true }).addTo(map);

    map.on('click', function (e) {
        const { lat, lng } = e.latlng;
        isMapUpdating = true;
        marker.setLatLng([lat, lng]);
        reverseGeocode(lat, lng);
        map.setView([lat, lng], 16);
        setTimeout(() => { isMapUpdating = false; }, 2000);
    });

    marker.on('dragend', function (e) {
        const { lat, lng } = marker.getLatLng();
        isMapUpdating = true;
        reverseGeocode(lat, lng);
        map.setView([lat, lng], 16);
        setTimeout(() => { isMapUpdating = false; }, 2000);
    });

    setTimeout(() => { map.invalidateSize(); }, 500);
}

// SEHIR/ILCE DEGISTIGINDE HARITAYI ORAYA KAYDIR
async function zoomToCity(city, district = '') {
    if (isMapUpdating) return; // Harita tıklamasından geliyorsa ekranı kaydırma!

    try {
        const query = district ? `${district}, ${city}, Turkey` : `${city}, Turkey`;
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`);
        const data = await res.json();
        if (data && data.length > 0) {
            const { lat, lon } = data[0];
            const newPos = [parseFloat(lat), parseFloat(lon)];
            map.setView(newPos, district ? 15 : 11);
            marker.setLatLng(newPos);
        }
    } catch (e) {}
}

async function reverseGeocode(lat, lng) {
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
        const data = await res.json();
        if (data && data.address) {
            const addr = data.address;
            const city = addr.province || addr.city || addr.state || "";
            const cleanCity = city.replace(" İli", "").replace(" Province", "");
            const district = addr.town || addr.borough || addr.district || addr.suburb || addr.county || "";
            
            const neighborhood = addr.neighbourhood || addr.suburb || addr.village || "";
            const road = addr.road || "";
            const houseNum = addr.house_number || "";
            
            updateAddressFields(cleanCity, district, `${neighborhood} ${road} No:${houseNum}`.trim());
        }
    } catch (err) {}
}

function updateAddressFields(city, district, fullAddr) {
    const cityEl = document.getElementById('d-city');
    const distEl = document.getElementById('d-district');
    const addrEl = document.getElementById('d-address');

    if (cityEl) {
        for (let opt of cityEl.options) {
            if (opt.text.toLowerCase().includes(city.toLowerCase())) {
                cityEl.value = opt.value;
                // Ilceleri yukle ama haritayi merkeze atma (isMapUpdating sayesinde)
                const event = new Event('change');
                cityEl.dispatchEvent(event); 
                break;
            }
        }
    }

    setTimeout(() => {
        if (distEl) {
            let found = false;
            for (let opt of distEl.options) {
                if (opt.text.toLowerCase().includes(district.toLowerCase())) {
                    distEl.value = opt.value;
                    found = true;
                    break;
                }
            }
            if (!found && district) {
                const newOpt = new Option(district, district);
                distEl.add(newOpt);
                distEl.value = district;
            }
        }
    }, 100);

    if (addrEl && fullAddr) addrEl.value = fullAddr;
}

// SEHIR DEGISTIGINDE ILCE LISTESINI VE HARITAYI GUNCELLE
document.getElementById('d-city')?.addEventListener('change', function() {
    const city = this.value;
    const distEl = document.getElementById('d-district');
    if (!distEl) return;

    distEl.innerHTML = '<option value="" disabled selected>İlçe Seçin</option>';
    const districts = cityDistrictData[city] || [];
    districts.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d; opt.textContent = d;
        distEl.appendChild(opt);
    });

    if (!isMapUpdating) zoomToCity(city);
});

document.getElementById('d-district')?.addEventListener('change', function() {
    if (!isMapUpdating) {
        const city = document.getElementById('d-city').value;
        zoomToCity(city, this.value);
    }
});

/* ---- LEGAL CHECKBOX LOGIC ---- */
document.getElementById('acceptTerms')?.addEventListener('change', (e) => {
    const btn = document.getElementById('placeOrder');
    if (btn) btn.disabled = !e.target.checked;
});

/* ---- SIPARIS TAMAMLA ---- */
document.getElementById('placeOrder')?.addEventListener('click', async () => {
    if (!document.getElementById('acceptTerms').checked) {
        return alert('Lütfen Mesafeli Satış Sözleşmesi\'ni onaylayın.');
    }
    
    const btn = document.getElementById('placeOrder');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> İşleniyor...';
    btn.disabled = true;

    const cart = JSON.parse(localStorage.getItem('mobilya_cart')) || [];
    if (cart.length === 0) return alert('Sepetiniz boş!');

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const orderData = {
        products: cart.map(item => ({
            productId: item.id.length > 10 ? item.id : undefined, // Check if it's a mongo ID
            name: item.name, // Fallback for original site items
            quantity: item.qty,
            price: item.price
        })),
        totalPrice: totalPrice,
        customerInfo: {
            name: document.getElementById('d-firstName').value + ' ' + document.getElementById('d-lastName').value,
            phone: document.getElementById('d-phone').value,
            address: document.getElementById('d-address').value,
            city: document.getElementById('d-city').value
        }
    };

    try {
        const res = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        const data = await res.json();
        
        if (res.ok && data.order) {
            // SUCCESS!
            const order = data.order;
            const customerName = document.getElementById('d-firstName').value + ' ' + document.getElementById('d-lastName').value;
            const customerPhone = document.getElementById('d-phone').value;
            const customerAddr = (document.getElementById('d-city').value + ', ' + document.getElementById('d-district').value + ', ' + document.getElementById('d-address').value);
            
            localStorage.setItem('mobilya_cart', '[]'); // Clear cart
            document.getElementById('orderNumber').textContent = order.orderCode;
            document.getElementById('orderDate').textContent = new Date().toLocaleDateString('tr-TR');
            document.getElementById('orderTotal').textContent = formatPrice(totalPrice);
            
            // Prepare Print View
            document.getElementById('r-orderNo').textContent = order.orderCode;
            document.getElementById('r-date').textContent = new Date().toLocaleDateString('tr-TR');
            document.getElementById('r-customer').textContent = customerName;
            document.getElementById('r-items').innerHTML = cart.map(item => `
                <div class="receipt-item">
                    <span>${item.name} (x${item.qty})</span>
                    <span>${formatPrice(item.price * item.qty)}</span>
                </div>
            `).join('');
            document.getElementById('r-total').textContent = formatPrice(totalPrice);

            // WhatsApp Logic (Automatic Trigger)
            const sendWA = () => {
                const text = `🛋️ *Evseren Mobilya - Yeni Sipariş*\n` +
                             `-----------------------------\n` +
                             `📦 *Sipariş No:* ${order.orderCode}\n` +
                             `👤 *Müşteri:* ${customerName}\n` +
                             `📞 *Tel:* ${customerPhone}\n` +
                             `📍 *Adres:* ${customerAddr}\n` +
                             `-----------------------------\n` +
                             `🛒 *Ürünler:*\n` +
                             cart.map(i => `- ${i.name} (x${i.qty}) - ${formatPrice(i.price*i.qty)}`).join('\n') +
                             `\n-----------------------------\n` +
                             `💰 *Toplam:* ${formatPrice(totalPrice)}\n` +
                             `✨ _Bilgilerimi teyit ediyorum._`;
                window.open(`https://wa.me/905314602597?text=${encodeURIComponent(text)}`, '_blank');
            };

            // Buttons still exist for manual retry
            document.getElementById('whatsappNotify').onclick = sendWA;
            document.getElementById('printBtn').onclick = () => window.print();

            // AUTOMATIC TRIGGERS
            goToStep(4);
            if (window.updateCartUI) window.updateCartUI();
            
            // Give a tiny moment for the UI to update before printing/opening WA
            setTimeout(() => {
                window.print(); // Open Print Dialog
                sendWA();      // Open WhatsApp (Note: Browsers may block popups)
            }, 1000);
        } else {
            alert('Sipariş oluşturulamadı: ' + (data.message || 'Hata'));
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    } catch (err) {
        console.error(err);
        alert('Bağlantı hatası: Sunucu kapalı olabilir.');
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
});

document.getElementById('goToStep2')?.addEventListener('click', () => goToStep(2));
document.getElementById('backToStep1')?.addEventListener('click', () => goToStep(1));
document.getElementById('goToStep3')?.addEventListener('click', () => goToStep(3));
document.getElementById('backToStep2')?.addEventListener('click', () => goToStep(2));

/* ---- INIT ---- */
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const orderId = urlParams.get('orderId');

    if (status === 'success') {
        cart = [];
        localStorage.setItem('mobilya_cart', JSON.stringify([]));
        document.getElementById('orderNumber').textContent = orderId ? ('#MD-' + orderId.slice(-6)) : ('#MD-' + Math.floor(100000 + Math.random() * 900000));
        goToStep(4);
    } else if (status === 'failed' || status === 'error') {
        alert('Ödeme tamamlanamadı. Lütfen tekrar deneyin.');
        goToStep(3);
    }

    if (typeof cart === 'undefined' || !cart || cart.length === 0) {
        cart = JSON.parse(localStorage.getItem('mobilya_cart')) || [];
    }
    renderCartItems();
    renderSummary();
    updateTotals();
    initMap();
});
