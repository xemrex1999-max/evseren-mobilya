const cart_init = () => {
    try { return JSON.parse(localStorage.getItem('mobilya_cart')) || []; } catch(e) { return []; }
};
let cart = cart_init();
let currentStep = 1;
let discount = 0;
let expressShipping = false;
let selectedInstallment = 1;

const cityDistrictData = {
    "İstanbul": ["Adalar", "Arnavutköy", "Ataşehir", "Avcılar", "Bağcılar", "Bahçelievler", "Bakırköy", "Başakşehir", "Bayrampaşa", "Beşiktaş", "Beykoz", "Beylikdüzü", "Beyoğlu", "Büyükçekmece", "Çatalca", "Çekmeköy", "Esenler", "Esenyurt", "Eyüpsultan", "Fatih", "Gaziosmanpaşa", "Güngören", "Kadıköy", "Kağıthane", "Kartal", "Küçükçekmece", "Maltepe", "Pendik", "Sancaktepe", "Sarıyer", "Silivri", "Sultanbeyli", "Sultangazi", "Şile", "Şişli", "Tuzla", "Ümraniye", "Üsküdar", "Zeytinburnu"],
    "Ankara": ["Akyurt", "Altındağ", "Ayaş", "Bala", "Beypazarı", "Çamlıdere", "Çankaya", "Çubuk", "Elmadağ", "Etimesgut", "Evren", "Gölbaşı", "Güdül", "Haymana", "Kahramankazan", "Kalecik", "Keçiören", "Kızılcahamam", "Mamak", "Nallıhan", "Polatlı", "Pursaklar", "Sincan", "Şereflikoçhisar", "Yenimahalle"],
    "İzmir": ["Aliağa", "Balçova", "Bayındır", "Bayraklı", "Bergama", "Beydağ", "Bornova", "Buca", "Çeşme", "Çiğli", "Dikili", "Foça", "Gaziemir", "Güzelbahçe", "Karabağlar", "Karaburun", "Karşıyaka", "Kemalpaşa", "Kınık", "Kiraz", "Konak", "Menderes", "Menemen", "Narlıdere", "Ödemiş", "Seferihisar", "Selçuk", "Tire", "Torbalı", "Urla"],
    "Bursa": ["Büyükorhan", "Gemlik", "Gürsu", "Harmancık", "İnegöl", "İznik", "Karacabey", "Keles", "Kestel", "Mudanya", "Mustafakemalpaşa", "Nilüfer", "Orhaneli", "Orhangazi", "Osmangazi", "Yenişehir", "Yıldırım"],
    "Antalya": ["Akseki", "Aksu", "Alanya", "Demre", "Döşemealtı", "Elmalı", "Finike", "Gazipaşa", "Gündoğmuş", "İbradı", "Kaş", "Kemer", "Kepez", "Konyaaltı", "Korkuteli", "Kumluca", "Manavgat", "Muratpaşa", "Serik"],
    "Konya": ["Ahırlı", "Akören", "Akşehir", "Altınekin", "Beyşehir", "Bozkır", "Cihanbeyli", "Çeltik", "Çumra", "Derbent", "Derebucak", "Doğanhisar", "Emirgazi", "Ereğli", "Güneysınır", "Hadim", "Halkapınar", "Hüyük", "Ilgın", "Kadınhanı", "Karapınar", "Karatay", "Kulu", "Meram", "Sarayönü", "Selçuklu", "Seydişehir", "Taşkent", "Tuzlukçu", "Yalıhüyük", "Yunak"],
    "Adana": ["Aladağ", "Ceyhan", "Çukurova", "Feke", "İmamoğlu", "Karaisalı", "Karataş", "Kozan", "Pozantı", "Saimbeyli", "Sarıçam", "Seyhan", "Tufanbeyli", "Yumurtalık", "Yüreğir"]
};

const formatPrice = window.formatPrice || function(val) {
    return '\u20BA' + Number(val || 0).toLocaleString('tr-TR');
};

function saveCart() {
    localStorage.setItem('mobilya_cart', JSON.stringify(cart));
}

/* ---- ADIM GECISI ---- */
function goToStep(step) {
    if (step === 2 && (!cart || cart.length === 0)) {
        alert('Sepetiniz boş! Lütfen önce sepetinize ürün ekleyin.');
        return;
    }
    if (step === 3) {
        const fn = document.getElementById('d-firstName')?.value.trim();
        const ln = document.getElementById('d-lastName')?.value.trim();
        const ph = document.getElementById('d-phone')?.value.trim();
        const ct = document.getElementById('d-city')?.value;
        const ad = document.getElementById('d-address')?.value.trim();
        if (!fn || !ln || !ph || !ct || !ad) {
            alert('Lütfen teslimat için Ad, Soyad, Telefon, İl ve Açık Adres alanlarını doldurun.');
            return;
        }
    }

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
        container.innerHTML = '<p style="color:#a49a91;font-size:0.85rem;padding:10px 0">Sepetinizde ürün bulunmuyor.</p>';
    } else {
        container.innerHTML = cart.map(item => {
            const itemPrice = Number(item.price) || 0;
            const itemOldPrice = Number(item.oldPrice) || itemPrice;
            const qty = Number(item.qty) || 1;
            const imgSrc = encodeURI(item.img || 'images/hero_living_room.png');
            return `
      <div class="co-summary-item">
        <img src="${imgSrc}" alt="${item.name}" />
        <div style="flex:1">
          <div class="co-summary-item-name">${item.name}</div>
          <div class="co-summary-item-qty">${qty} adet</div>
        </div>
        <div class="co-summary-item-price">
          ${formatPrice(itemPrice * qty)}
          ${itemOldPrice > itemPrice ? `<div style="text-decoration:line-through;color:#a49a91;font-size:0.75rem;font-weight:400">${formatPrice(itemOldPrice * qty)}</div>` : ''}
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
    if (goBtn) {
        goBtn.disabled = false;
        goBtn.removeAttribute('disabled');
    }

    container.innerHTML = cart.map(item => {
        const itemPrice = Number(item.price) || 0;
        const itemOldPrice = Number(item.oldPrice) || itemPrice;
        const qty = Number(item.qty) || 1;
        const imgSrc = encodeURI(item.img || 'images/hero_living_room.png');
        return `
    <div class="co-cart-item" id="coitem-${item.id}">
      <img src="${imgSrc}" alt="${item.name}" />
      <div class="co-cart-item-info">
        <div class="co-cart-item-name">${item.name}</div>
        <div class="co-cart-item-cat">${window.getCatName ? window.getCatName(item.cat || '') : ''}</div>
        <div class="co-qty-row">
          <button type="button" class="co-qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
          <span class="co-qty-val">${qty}</span>
          <button type="button" class="co-qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <div style="text-align:right">
        <div class="co-cart-item-price">${formatPrice(itemPrice * qty)}</div>
        ${itemOldPrice > itemPrice ? `<div style="text-decoration:line-through;color:#a49a91;font-size:0.8rem">${formatPrice(itemOldPrice * qty)}</div>` : ''}
      </div>
      <button type="button" class="co-cart-item-remove" onclick="removeFromCartCO(${item.id})" title="Kaldır">
        <i class="fas fa-times"></i>
      </button>
    </div>
    `;
    }).join('');
}

window.changeQty = function(id, delta) {
    const item = cart.find(x => String(x.id) === String(id));
    if (!item) return;
    item.qty = (Number(item.qty) || 1) + delta;
    if (item.qty <= 0) {
        cart = cart.filter(x => String(x.id) !== String(id));
    }
    saveCart();
    renderCartItems();
    renderSummary();
    if (window.updateCartUI) window.updateCartUI();
};

window.removeFromCartCO = function(id) {
    cart = cart.filter(x => String(x.id) !== String(id));
    saveCart();
    renderCartItems();
    renderSummary();
    if (window.updateCartUI) window.updateCartUI();
    if (cart.length === 0) {
        const btn = document.getElementById('goToStep2');
        if (btn) btn.disabled = true;
    }
};

/* ---- TOPLAM HESAPLA ---- */
function updateTotals() {
    const originalSubtotal = (cart || []).reduce((s, x) => s + ((Number(x.oldPrice) || Number(x.price) || 0) * (Number(x.qty) || 1)), 0);
    const currentSubtotal = (cart || []).reduce((s, x) => s + ((Number(x.price) || 0) * (Number(x.qty) || 1)), 0);
    const expressExtra = expressShipping ? 499 : 0;
    
    const totalSavings = (originalSubtotal - currentSubtotal) + discount;
    const total = Math.max(0, originalSubtotal - totalSavings + expressExtra);

    const subEl = document.getElementById('sum-subtotal');
    const totEl = document.getElementById('sum-total');
    if (subEl) subEl.textContent = formatPrice(originalSubtotal);
    if (totEl) totEl.textContent = formatPrice(total);

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
document.getElementById('applyCoupon')?.addEventListener('click', (e) => {
    e.preventDefault();
    const code = (document.getElementById('couponInput')?.value || '').trim().toUpperCase();
    const msg = document.getElementById('couponMsg');
    const subtotal = (cart || []).reduce((s, x) => s + (Number(x.price) || 0) * (Number(x.qty) || 1), 0);
    if (!code) {
        if (msg) { msg.textContent = 'Lütfen bir kupon kodu girin (Örn: EVSEREN10).'; msg.className = 'coupon-msg error'; }
        return;
    }
    if (coupons[code]) {
        discount = Math.round(subtotal * coupons[code]);
        if (msg) {
            msg.textContent = `Tebrikler! %${coupons[code]*100} kupon indirimi (${formatPrice(discount)}) uygulandı.`;
            msg.className = 'coupon-msg success';
        }
        updateTotals();
        renderSummary();
    } else {
        if (msg) {
            msg.textContent = 'Geçersiz kupon kodu. (Geçerli kodlar: EVSEREN10, DUGUN15)';
            msg.className = 'coupon-msg error';
        }
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

document.getElementById('cardHolder')?.addEventListener('input', function () {
    const preview = document.getElementById('previewHolder');
    if (preview) preview.textContent = (this.value || 'AD SOYAD').toUpperCase();
});

document.getElementById('cardExpiry')?.addEventListener('input', function () {
    let val = this.value.replace(/\D/g, '').substring(0, 4);
    if (val.length >= 3) val = val.slice(0, 2) + '/' + val.slice(2);
    this.value = val;
    const preview = document.getElementById('previewExpiry');
    if (preview) preview.textContent = val || 'MM/YY';
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
    if (!mapEl || typeof L === 'undefined') return;

    try {
        map = L.map('addressMap', { zoomSnap: 1, zoomDelta: 1 }).setView([39.9334, 32.8597], 6);
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

        marker.on('dragend', function () {
            const { lat, lng } = marker.getLatLng();
            isMapUpdating = true;
            reverseGeocode(lat, lng);
            map.setView([lat, lng], 16);
            setTimeout(() => { isMapUpdating = false; }, 2000);
        });

        setTimeout(() => { map.invalidateSize(); }, 500);
    } catch (e) {}
}

async function zoomToCity(city, district = '') {
    if (isMapUpdating || !map) return;
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
                cityEl.dispatchEvent(new Event('change'));
                break;
            }
        }
    }

    setTimeout(() => {
        if (distEl && district) {
            let found = false;
            for (let opt of distEl.options) {
                if (opt.text.toLowerCase().includes(district.toLowerCase())) {
                    distEl.value = opt.value;
                    found = true;
                    break;
                }
            }
            if (!found) {
                const newOpt = new Option(district, district);
                distEl.add(newOpt);
                distEl.value = district;
            }
        }
    }, 100);

    if (addrEl && fullAddr) addrEl.value = fullAddr;
}

document.getElementById('d-city')?.addEventListener('change', function() {
    const city = this.value;
    const distEl = document.getElementById('d-district');
    if (!distEl) return;

    distEl.innerHTML = '<option value="" disabled selected>İlçe Seçin</option>';
    const districts = cityDistrictData[city] || ['Merkez'];
    districts.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d;
        opt.textContent = d;
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
    if (!document.getElementById('acceptTerms')?.checked) {
        return alert('Lütfen Mesafeli Satış Sözleşmesi\'ni onaylayın.');
    }
    
    const btn = document.getElementById('placeOrder');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> İşleniyor...';
    btn.disabled = true;

    const currentCart = JSON.parse(localStorage.getItem('mobilya_cart')) || cart || [];
    if (currentCart.length === 0) {
        btn.innerHTML = originalText;
        btn.disabled = false;
        return alert('Sepetiniz boş!');
    }

    const subtotal = currentCart.reduce((sum, item) => sum + ((Number(item.price) || 0) * (Number(item.qty) || 1)), 0);
    const totalPrice = Math.max(0, subtotal - discount + (expressShipping ? 499 : 0));
    const firstName = document.getElementById('d-firstName')?.value || '';
    const lastName = document.getElementById('d-lastName')?.value || '';
    const customerName = (firstName + ' ' + lastName).trim() || 'Değerli Müşterimiz';
    const customerPhone = document.getElementById('d-phone')?.value || '';
    const customerEmail = document.getElementById('d-email')?.value || '';
    const customerCity = document.getElementById('d-city')?.value || '';
    const customerDistrict = document.getElementById('d-district')?.value || '';
    const customerAddress = document.getElementById('d-address')?.value || '';
    const customerAddrFull = [customerCity, customerDistrict, customerAddress].filter(Boolean).join(', ');

    const generatedCode = 'EVS-' + Math.floor(100000 + Math.random() * 900000);
    const currentUser = JSON.parse(localStorage.getItem('user') || 'null');

    const newOrder = {
        _id: 'ord_' + Date.now(),
        orderCode: generatedCode,
        userEmail: currentUser?.email || customerEmail || '',
        products: currentCart.map(item => ({
            productId: item.id,
            name: item.name,
            quantity: item.qty || 1,
            price: item.price,
            img: item.img
        })),
        totalPrice: totalPrice,
        status: 'Onaylandı',
        createdAt: new Date().toISOString(),
        customerInfo: {
            name: customerName,
            phone: customerPhone,
            email: customerEmail,
            address: customerAddrFull,
            city: customerCity
        }
    };

    try {
        const existingOrders = JSON.parse(localStorage.getItem('evseren_orders') || '[]');
        existingOrders.unshift(newOrder);
        localStorage.setItem('evseren_orders', JSON.stringify(existingOrders));
    } catch (e) {}

    try {
        fetch('https://formsubmit.co/ajax/evserenmobilya@gmail.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                _subject: 'Yeni Sipariş (' + generatedCode + ') - Evseren Mobilya',
                Siparis_No: generatedCode,
                Musteri_Adi: customerName,
                Telefon: customerPhone,
                Eposta: customerEmail,
                Adres: customerAddrFull,
                Urunler: currentCart.map(i => i.name + ' (x' + (i.qty || 1) + ')').join(', '),
                Toplam_Tutar: formatPrice(totalPrice),
                Tarih: new Date().toLocaleString('tr-TR')
            })
        }).catch(() => {});
    } catch (e) {}

    cart = [];
    localStorage.setItem('mobilya_cart', '[]');
    if (document.getElementById('orderNumber')) document.getElementById('orderNumber').textContent = newOrder.orderCode;
    if (document.getElementById('orderDate')) document.getElementById('orderDate').textContent = new Date().toLocaleDateString('tr-TR');
    if (document.getElementById('orderTotal')) document.getElementById('orderTotal').textContent = formatPrice(totalPrice);
    
    if (document.getElementById('r-orderNo')) document.getElementById('r-orderNo').textContent = newOrder.orderCode;
    if (document.getElementById('r-date')) document.getElementById('r-date').textContent = new Date().toLocaleDateString('tr-TR');
    if (document.getElementById('r-customer')) document.getElementById('r-customer').textContent = customerName;
    if (document.getElementById('r-items')) {
        document.getElementById('r-items').innerHTML = currentCart.map(item => `
            <div class="receipt-item">
                <span>${item.name} (x${item.qty || 1})</span>
                <span>${formatPrice(item.price * (item.qty || 1))}</span>
            </div>
        `).join('');
    }
    if (document.getElementById('r-total')) document.getElementById('r-total').textContent = formatPrice(totalPrice);

    const sendWA = () => {
        const text = `🛋️ *Evseren Mobilya - Yeni Sipariş*\n` +
                     `-----------------------------\n` +
                     `📦 *Sipariş No:* ${newOrder.orderCode}\n` +
                     `👤 *Müşteri:* ${customerName}\n` +
                     `📞 *Tel:* ${customerPhone}\n` +
                     `📍 *Adres:* ${customerAddrFull}\n` +
                     `-----------------------------\n` +
                     `🛒 *Ürünler:*\n` +
                     currentCart.map(i => `- ${i.name} (x${i.qty || 1}) - ${formatPrice(i.price*(i.qty || 1))}`).join('\n') +
                     `\n-----------------------------\n` +
                     `💰 *Toplam:* ${formatPrice(totalPrice)}\n` +
                     `✨ _Bilgilerimi teyit ediyorum._`;
        window.open(`https://wa.me/905077567887?text=${encodeURIComponent(text)}`, '_blank');
    };

    if (document.getElementById('whatsappNotify')) document.getElementById('whatsappNotify').onclick = sendWA;
    if (document.getElementById('printBtn')) document.getElementById('printBtn').onclick = () => window.print();

    goToStep(4);
    if (window.updateCartUI) window.updateCartUI();
    btn.innerHTML = originalText;
    btn.disabled = false;
});

document.getElementById('goToStep2')?.addEventListener('click', () => goToStep(2));
document.getElementById('backToStep1')?.addEventListener('click', () => goToStep(1));
document.getElementById('goToStep3')?.addEventListener('click', () => goToStep(3));
document.getElementById('backToStep2')?.addEventListener('click', () => goToStep(2));

/* ---- INIT ---- */
document.addEventListener('DOMContentLoaded', () => {
    cart = cart_init();
    renderCartItems();
    renderSummary();
    updateTotals();
    initMap();

    // Pre-fill user details if logged in
    try {
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        if (user) {
            const parts = (user.name || '').split(' ');
            const fnEl = document.getElementById('d-firstName');
            const lnEl = document.getElementById('d-lastName');
            const emEl = document.getElementById('d-email');
            const phEl = document.getElementById('d-phone');
            if (fnEl && !fnEl.value && parts[0]) fnEl.value = parts[0];
            if (lnEl && !lnEl.value && parts.length > 1) lnEl.value = parts.slice(1).join(' ');
            if (emEl && !emEl.value && user.email) emEl.value = user.email;
            if (phEl && !phEl.value && user.phone) phEl.value = user.phone;
        }
    } catch(e) {}

    const copyIbanBtn = document.getElementById('copyIban');
    if (copyIbanBtn) {
        copyIbanBtn.addEventListener('click', () => {
            const ibanText = "TR57 0006 4000 0012 2390 2019 30";
            navigator.clipboard.writeText(ibanText).then(() => {
                const originalText = copyIbanBtn.innerHTML;
                copyIbanBtn.innerHTML = '<i class="fas fa-check"></i> Kopyalandı';
                setTimeout(() => {
                    copyIbanBtn.innerHTML = originalText;
                }, 2000);
            });
        });
    }
});
