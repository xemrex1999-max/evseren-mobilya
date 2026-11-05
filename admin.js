/* ==========================================
   EVSEREN MOBİLYA - ADMIN PANEL LOGIC (FULL CRUD & PHOTO UPLOAD)
   ========================================== */
let currentFormImages = [];

function safeImg(u) {
  if (!u) return 'images/hero_living_room.png';
  return u.startsWith('data:') ? u : encodeURI(u);
}

window.adminLogin = () => {
  const user = (document.getElementById('adminUser').value || '').trim().toLowerCase();
  const pass = document.getElementById('adminPass').value || '';

  if (
    (user === 'admin' && pass === '123456') ||
    (user === 'xemrex1999@hotmail.com' && pass === 'evseren123') ||
    (user === 'evserenmobilya@gmail.com' && pass === '123456')
  ) {
    localStorage.setItem('adminToken', 'evseren-admin-session-' + Date.now());
    document.getElementById('adminLoginOverlay').style.display = 'none';
    document.getElementById('sidebar').style.display = 'flex';
    document.getElementById('mainContent').style.display = 'block';
    initAdmin();
  } else {
    alert('Hatalı giriş bilgileri! Varsayılan: admin / 123456');
  }
};

window.adminLogout = () => {
  localStorage.removeItem('adminToken');
  window.location.reload();
};

window.switchTab = (tabName) => {
  document.querySelectorAll('.admin-tab').forEach(t => t.style.display = 'none');
  document.querySelectorAll('.admin-nav-item').forEach(i => i.classList.remove('active'));
  
  const target = document.getElementById('tab-' + tabName);
  if (target) target.style.display = 'block';

  const titles = {
    orders: 'Sipariş Yönetimi',
    products: 'Ürün Kataloğu & Fotoğraf Yönetimi',
    users: 'Kayıtlı Üyeler (MongoDB)',
    subscribers: 'E-Posta & Bülten Aboneleri'
  };
  document.getElementById('tabTitle').innerText = titles[tabName] || 'Yönetim Paneli';
  
  const navItems = document.querySelectorAll('.admin-nav-item');
  const mapIdx = { orders: 0, products: 1, users: 2, subscribers: 3 };
  if (navItems[mapIdx[tabName]]) navItems[mapIdx[tabName]].classList.add('active');

  refreshAllAdminData();
};

function getAdminOrders() {
  let orders = JSON.parse(localStorage.getItem('evseren_orders') || '[]');
  if (orders.length === 0) {
    orders = [
      {
        _id: 'ord_demo_1',
        orderCode: 'EVS-849201',
        products: [{ name: 'Aynalı Yatak Odası Takımı', quantity: 1, price: 86476 }],
        customerInfo: { name: 'Ahmet Yılmaz', phone: '0532 411 22 33', address: 'Kadıköy, İstanbul' },
        totalPrice: 86476,
        status: 'Onaylandı',
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem('evseren_orders', JSON.stringify(orders));
  }
  return orders;
}

function getAdminProducts() {
  if (window.getEffectiveProducts) {
    return window.getEffectiveProducts();
  }
  const base = window.fallbackProductsData || [];
  const custom = JSON.parse(localStorage.getItem('evseren_custom_products') || '[]');
  const deleted = JSON.parse(localStorage.getItem('evseren_deleted_products') || '[]').map(String);
  const customIds = new Set(custom.map(p => String(p.id)));
  const filteredBase = base.filter(p => !deleted.includes(String(p.id)) && !customIds.has(String(p.id)));
  return [...custom, ...filteredBase];
}

function getAdminUsers() {
  let users = JSON.parse(localStorage.getItem('evseren_users') || '[]');
  if (users.length === 0) {
    users = [
      { name: 'Emre (Yönetici)', email: 'xemrex1999@hotmail.com', phone: '0507 756 78 87', role: 'Admin', createdAt: new Date().toISOString() }
    ];
  }
  return users;
}

function getAdminSubscribers() {
  let subs = JSON.parse(localStorage.getItem('evseren_subscribers') || '[]');
  return subs.map(s => typeof s === 'string' ? { email: s, date: new Date().toISOString() } : s);
}

function refreshAllAdminData() {
  const orders = getAdminOrders();
  const products = getAdminProducts();
  const users = getAdminUsers();
  const subs = getAdminSubscribers();

  const elO = document.getElementById('statOrdersCount');
  const elP = document.getElementById('statProductsCount');
  const elU = document.getElementById('statUsersCount');
  const elS = document.getElementById('statSubsCount');
  if (elO) elO.innerText = orders.length;
  if (elP) elP.innerText = products.length;
  if (elU) elU.innerText = users.length;
  if (elS) elS.innerText = subs.length;

  renderOrders(orders);
  renderAdminProducts(products);
  renderAdminUsers(users);
  renderAdminSubs(subs);
}

function renderOrders(orders) {
  const table = document.getElementById('ordersTableBody');
  if (!table) return;

  table.innerHTML = orders.map(order => `
    <tr>
      <td><strong>${order.orderCode}</strong></td>
      <td>${order.customerInfo?.name || 'Müşteri'}</td>
      <td style="font-size:0.84rem; color:#555;">
        ${order.customerInfo?.phone || '-'}<br>
        <small>${order.customerInfo?.address || '-'}</small>
      </td>
      <td><strong>₺${Number(order.totalPrice || 0).toLocaleString('tr-TR')}</strong></td>
      <td>
        <select class="admin-input" style="width:155px; padding:6px; margin:0;" onchange="updateStatus('${order._id || order.orderCode}', this.value)">
          <option value="Onaylandı" ${order.status === 'Onaylandı' ? 'selected' : ''}>Onaylandı</option>
          <option value="Hazırlanıyor" ${order.status === 'Hazırlanıyor' ? 'selected' : ''}>Hazırlanıyor</option>
          <option value="Kargoya verildi" ${order.status === 'Kargoya verildi' ? 'selected' : ''}>Kargoya verildi</option>
          <option value="Dağıtımda" ${order.status === 'Dağıtımda' ? 'selected' : ''}>Dağıtımda</option>
          <option value="Teslim edildi" ${order.status === 'Teslim edildi' ? 'selected' : ''}>Teslim edildi</option>
        </select>
      </td>
      <td>${new Date(order.createdAt || Date.now()).toLocaleDateString('tr-TR')}</td>
      <td>
        <button class="admin-btn-sm" onclick="alert('Sipariş No: ${order.orderCode}\\nMüşteri: ${order.customerInfo?.name || ''}\\nTelefon: ${order.customerInfo?.phone || ''}\\nAdres: ${order.customerInfo?.address || ''}')">Detay</button>
      </td>
    </tr>
  `).join('');
}

window.updateStatus = (idOrCode, newStatus) => {
  const orders = getAdminOrders();
  const idx = orders.findIndex(o => o._id === idOrCode || o.orderCode === idOrCode);
  if (idx > -1) {
    orders[idx].status = newStatus;
    localStorage.setItem('evseren_orders', JSON.stringify(orders));
    alert('Sipariş durumu "' + newStatus + '" olarak güncellendi!');
    refreshAllAdminData();
  }
};

/* ==========================================
   BİLGİSAYARDAN FOTOĞRAF YÜKLEME & SIKIŞTIRMA
   ========================================== */
function compressImageFile(file, maxWidth = 1000, quality = 0.78) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let w = img.width;
        let h = img.height;
        if (w > maxWidth) {
          h = Math.round((h * maxWidth) / w);
          w = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

window.handleFilesSelected = async (fileList) => {
  if (!fileList || fileList.length === 0) return;
  const statusEl = document.getElementById('uploadStatusText');
  if (statusEl) statusEl.innerText = 'Fotoğraflar işleniyor...';

  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i];
    if (!file.type.startsWith('image/')) continue;
    try {
      const dataUrl = await compressImageFile(file);
      currentFormImages.push(dataUrl);
    } catch (e) {
      console.error('Image compress error:', e);
    }
  }

  renderUploadedPhotosPreview();
  if (statusEl) {
    statusEl.innerText = `✓ ${currentFormImages.length} fotoğraf hazır!`;
    setTimeout(() => { statusEl.innerText = ''; }, 3000);
  }
  document.getElementById('pFileInput').value = '';
};

window.addManualImageUrl = () => {
  const inp = document.getElementById('pImg');
  const val = (inp?.value || '').trim();
  if (!val) return;
  currentFormImages.push(val);
  inp.value = '';
  renderUploadedPhotosPreview();
};

window.removeFormPhoto = (idx) => {
  currentFormImages.splice(idx, 1);
  renderUploadedPhotosPreview();
};

window.makeCoverPhoto = (idx) => {
  if (idx <= 0 || idx >= currentFormImages.length) return;
  const [chosen] = currentFormImages.splice(idx, 1);
  currentFormImages.unshift(chosen);
  renderUploadedPhotosPreview();
};

function renderUploadedPhotosPreview() {
  const container = document.getElementById('uploadedPhotosPreview');
  if (!container) return;

  if (currentFormImages.length === 0) {
    container.innerHTML = '<div style="font-size:0.82rem; color:#888;">Henüz fotoğraf seçilmedi. Yukarıdaki alana tıklayarak bilgisayarınızdan fotoğraf seçebilirsiniz.</div>';
    return;
  }

  container.innerHTML = currentFormImages.map((imgSrc, idx) => `
    <div style="position:relative; width:105px; border:2px solid ${idx === 0 ? '#8b5e3c' : '#e0d6c8'}; border-radius:10px; overflow:hidden; background:#fff; box-shadow:0 4px 10px rgba(0,0,0,0.06);">
      <img src="${safeImg(imgSrc)}" style="width:100%; height:78px; object-fit:cover; display:block;">
      <div style="padding:4px; display:flex; justify-content:space-between; align-items:center; background:#faf7f2; font-size:0.7rem;">
        ${idx === 0
          ? '<span style="color:#8b5e3c; font-weight:700;">★ Vitrin</span>'
          : `<button type="button" onclick="makeCoverPhoto(${idx})" style="border:none; background:none; color:#1565c0; cursor:pointer; font-weight:600; font-size:0.68rem; padding:0;">Vitrin Yap</button>`
        }
        <button type="button" onclick="removeFormPhoto(${idx})" style="border:none; background:none; color:#c62828; cursor:pointer; font-weight:700; font-size:0.78rem; padding:0 3px;" title="Fotoğrafı Kaldır">✕</button>
      </div>
    </div>
  `).join('');
}

/* ==========================================
   ÜRÜN EKLEME / DÜZENLEME / SİLME
   ========================================== */
const catNamesMap = {
  yatak: 'Yatak Odası',
  yemek: 'Yemek Odası',
  dugun: 'Düğün Paketi',
  koltuk: 'Koltuk Takımı',
  kose: 'Köşe Koltuk',
  tv: 'TV Ünitesi'
};

window.editProduct = (id) => {
  const products = getAdminProducts();
  const prod = products.find(p => String(p.id) === String(id));
  if (!prod) return;

  document.getElementById('editProdId').value = prod.id;
  document.getElementById('pName').value = prod.name || '';
  document.getElementById('pCat').value = prod.cat || 'yatak';
  document.getElementById('pPrice').value = prod.price || '';
  document.getElementById('pOldPrice').value = prod.oldPrice || '';
  document.getElementById('pBadge').value = prod.badge !== undefined ? prod.badge : 'YENİ';
  document.getElementById('pMaterial').value = prod.material || '1. Sınıf Fırınlanmış Gürgen & MDF';
  document.getElementById('pDesc').value = prod.desc || prod.description || `${prod.name}, Evseren Mobilya İnegöl tesislerinde 1. sınıf malzemelerle üretilmiştir. Türkiye geneli ücretsiz nakliye ve profesyonel kurulum dahildir.`;

  currentFormImages = Array.isArray(prod.images) && prod.images.length > 0
    ? [...prod.images]
    : (prod.img ? [prod.img] : []);
  renderUploadedPhotosPreview();

  document.getElementById('productFormTitle').innerHTML = `<i class="fas fa-edit" style="color:#e65100;"></i> Ürünü Düzenle: ${prod.name}`;
  document.getElementById('saveProdBtn').innerHTML = '<i class="fas fa-check"></i> Değişiklikleri Kaydet';
  document.getElementById('cancelEditBtn').style.display = 'inline-block';

  document.getElementById('productEditorCard')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

window.resetProductForm = () => {
  document.getElementById('addProductForm').reset();
  document.getElementById('editProdId').value = '';
  currentFormImages = [];
  renderUploadedPhotosPreview();
  document.getElementById('productFormTitle').innerHTML = '<i class="fas fa-plus-circle" style="color:#8b5e3c;"></i> Yeni Ürün Kartı Oluştur / Ürün Düzenle';
  document.getElementById('saveProdBtn').innerHTML = '<i class="fas fa-save"></i> Ürünü ve Bilgileri Kaydet';
  document.getElementById('cancelEditBtn').style.display = 'none';
};

window.saveProductFromForm = () => {
  const editId = document.getElementById('editProdId').value.trim();
  const name = document.getElementById('pName').value.trim();
  const cat = document.getElementById('pCat').value;
  const price = parseFloat(document.getElementById('pPrice').value) || 0;
  const oldPriceInput = parseFloat(document.getElementById('pOldPrice').value);
  const oldPrice = oldPriceInput > price ? oldPriceInput : Math.round(price * 1.16);
  const badge = document.getElementById('pBadge').value;
  const material = document.getElementById('pMaterial').value.trim() || '1. Sınıf Fırınlanmış Gürgen & MDF';
  const desc = document.getElementById('pDesc').value.trim() || `${name}, İnegöl'ün usta işçiliği ve 1. sınıf malzemeleriyle üretilmiştir. Türkiye geneli ücretsiz teslimat ve kurulum avantajıyla sunulmaktadır.`;

  const manualUrl = (document.getElementById('pImg')?.value || '').trim();
  if (manualUrl) currentFormImages.push(manualUrl);

  const images = currentFormImages.length > 0
    ? [...currentFormImages]
    : ['evrensen/Aynalı Yatak Odası/WhatsApp Image 2025-09-01 at 11.43.59 (1).jpeg'];

  const productObj = {
    id: editId ? (isNaN(Number(editId)) ? editId : Number(editId)) : Date.now(),
    name,
    price,
    oldPrice,
    cat,
    catName: catNamesMap[cat] || 'Mobilya',
    img: images[0],
    images,
    badge,
    material,
    desc,
    rating: 5,
    reviews: 24
  };

  let custom = JSON.parse(localStorage.getItem('evseren_custom_products') || '[]');
  const existingIdx = custom.findIndex(p => String(p.id) === String(productObj.id));
  if (existingIdx > -1) {
    custom[existingIdx] = productObj;
  } else {
    custom.unshift(productObj);
  }

  try {
    localStorage.setItem('evseren_custom_products', JSON.stringify(custom));
  } catch (err) {
    alert('Fotoğraf boyutu çok yüksek olduğu için tarayıcı hafızası doldu. Lütfen daha az sayıda fotoğraf seçip tekrar deneyin.');
    return;
  }

  resetProductForm();
  refreshAllAdminData();
  alert(editId ? 'Ürün bilgileri ve fotoğrafları başarıyla güncellendi!' : 'Yeni ürün ve fotoğrafları kataloğa eklendi!');
};

window.deleteProduct = (id) => {
  if (!confirm('Bu ürünü katalogdan kaldırmak istediğinize emin misiniz?')) return;
  let custom = JSON.parse(localStorage.getItem('evseren_custom_products') || '[]');
  custom = custom.filter(p => String(p.id) !== String(id));
  localStorage.setItem('evseren_custom_products', JSON.stringify(custom));

  let deleted = JSON.parse(localStorage.getItem('evseren_deleted_products') || '[]');
  if (!deleted.includes(String(id))) {
    deleted.push(String(id));
    localStorage.setItem('evseren_deleted_products', JSON.stringify(deleted));
  }
  refreshAllAdminData();
};

window.restoreDefaultCatalog = () => {
  if (!confirm('Silinen varsayılan ürünleri geri yüklemek istiyor musunuz?')) return;
  localStorage.removeItem('evseren_deleted_products');
  refreshAllAdminData();
};

function renderAdminProducts(products) {
  const table = document.getElementById('productsTableBody');
  if (!table) return;

  table.innerHTML = products.map(p => {
    const photoCount = Array.isArray(p.images) ? p.images.length : 1;
    const shortDesc = (p.desc || p.description || '1. Sınıf İnegöl Mobilyası • Ücretsiz Kurulum').slice(0, 68);
    return `
    <tr>
      <td>
        <img src="${safeImg(p.img || p.image)}" style="width:72px; height:54px; object-fit:cover; border-radius:8px; border:1px solid #eee;">
      </td>
      <td>
        <strong style="font-size:0.95rem; color:#1c1613;">${p.name}</strong>
        <div style="font-size:0.78rem; color:#666; margin-top:3px;">${shortDesc}...</div>
        <span style="display:inline-block; margin-top:4px; font-size:0.73rem; color:#8b5e3c; font-weight:600;">
          <i class="fas fa-camera"></i> ${photoCount} Fotoğraf ${p.badge ? `• <span style="color:#2e7d32;">[${p.badge}]</span>` : ''}
        </span>
      </td>
      <td><span style="background:#f4efe6; padding:5px 11px; border-radius:20px; font-size:0.78rem; font-weight:600;">${catNamesMap[p.cat] || p.catName || p.cat || 'Mobilya'}</span></td>
      <td>
        <strong style="font-size:0.98rem;">₺${Number(p.price || 0).toLocaleString('tr-TR')}</strong>
        ${p.oldPrice ? `<div style="text-decoration:line-through; color:#999; font-size:0.76rem;">₺${Number(p.oldPrice).toLocaleString('tr-TR')}</div>` : ''}
      </td>
      <td style="white-space:nowrap;">
        <button type="button" class="admin-btn-sm" style="background:#fff8e1; color:#e65100; border-color:#ffe082; margin-right:5px;" onclick="editProduct('${p.id}')">
          <i class="fas fa-edit"></i> Düzenle
        </button>
        <a href="product-detail.html?id=${p.id}" target="_blank" class="admin-btn-sm" style="text-decoration:none; color:#333; margin-right:5px;">
          <i class="fas fa-eye"></i> İncele
        </a>
        <button type="button" class="admin-btn-sm" style="color:#c62828; border-color:#ffcdd2;" onclick="deleteProduct('${p.id}')">
          <i class="fas fa-trash"></i> Sil
        </button>
      </td>
    </tr>
    `;
  }).join('');
}

function renderAdminUsers(users) {
  const table = document.getElementById('usersTableBody');
  if (!table) return;
  table.innerHTML = users.map(u => `
    <tr>
      <td><strong>${u.name || '-'}</strong></td>
      <td>${u.email || '-'}</td>
      <td>${u.phone || '-'}</td>
      <td><span style="background:#e3f2fd; color:#1565c0; padding:4px 10px; border-radius:20px; font-size:0.76rem; font-weight:600;">${u.role || 'Üye'}</span></td>
      <td>${new Date(u.createdAt || Date.now()).toLocaleDateString('tr-TR')}</td>
    </tr>
  `).join('');
}

function renderAdminSubs(subs) {
  const table = document.getElementById('subsTableBody');
  if (!table) return;
  if (subs.length === 0) {
    table.innerHTML = '<tr><td colspan="4" style="text-align:center; color:#888;">Henüz bülten abonesi bulunmuyor. Ana sayfadaki Abone Ol formundan yapılan kayıtlar buraya ve evserenmobilya@gmail.com adresine düşer.</td></tr>';
    return;
  }
  table.innerHTML = subs.map((s, idx) => `
    <tr>
      <td>${idx + 1}</td>
      <td><strong>${s.email}</strong></td>
      <td><span style="background:#e8f5e9; color:#2e7d32; padding:4px 10px; border-radius:20px; font-size:0.75rem;">Aktif & Gmail'e İletildi</span></td>
      <td>${new Date(s.date || Date.now()).toLocaleString('tr-TR')}</td>
    </tr>
  `).join('');
}

function initAdmin() {
  renderUploadedPhotosPreview();
  refreshAllAdminData();

  // Drag & Drop support on dropZone
  const dz = document.getElementById('dropZone');
  if (dz) {
    dz.addEventListener('dragover', (e) => { e.preventDefault(); dz.style.borderColor = '#8b5e3c'; dz.style.background = '#f7efe4'; });
    dz.addEventListener('dragleave', () => { dz.style.borderColor = '#c8b6a0'; dz.style.background = '#fdfbf7'; });
    dz.addEventListener('drop', (e) => {
      e.preventDefault();
      dz.style.borderColor = '#c8b6a0';
      dz.style.background = '#fdfbf7';
      if (e.dataTransfer && e.dataTransfer.files) {
        window.handleFilesSelected(e.dataTransfer.files);
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('adminToken') || localStorage.getItem('token')) {
    document.getElementById('adminLoginOverlay').style.display = 'none';
    document.getElementById('sidebar').style.display = 'flex';
    document.getElementById('mainContent').style.display = 'block';
    initAdmin();
  }
});
