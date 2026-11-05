/* ==========================================
   EVSEREN MOBİLYA - ADMIN PANEL LOGIC
   ========================================== */
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
    products: 'Ürün Kataloğu Yönetimi',
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
        customerInfo: { name: 'Ahmet Yılmaz', phone: '0532 411 22 33', address: 'Kadıköy, İstanbul' },
        totalPrice: 70000,
        status: 'Onaylandı',
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem('evseren_orders', JSON.stringify(orders));
  }
  return orders;
}

function getAdminProducts() {
  const base = window.fallbackProductsData || [];
  const custom = JSON.parse(localStorage.getItem('evseren_custom_products') || '[]');
  return [...custom, ...base];
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
      <td><strong>₺${(order.totalPrice || 0).toLocaleString('tr-TR')}</strong></td>
      <td>
        <select class="admin-input" style="width:155px; padding:6px; margin:0;" onchange="updateStatus('${order._id || order.orderCode}', this.value)">
          <option value="Onaylandı" ${order.status === 'Onaylandı' ? 'selected' : ''}>Onaylandı</option>
          <option value="Hazırlanıyor" ${order.status === 'Hazırlanıyor' ? 'selected' : ''}>Hazırlanıyor</option>
          <option value="Kargoya verildi" ${order.status === 'Kargoya verildi' ? 'selected' : ''}>Kargoya verildi</option>
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

function renderAdminProducts(products) {
  const table = document.getElementById('productsTableBody');
  if (!table) return;

  table.innerHTML = products.map(p => `
    <tr>
      <td><img src="${encodeURI(p.img || p.image || 'images/hero_living_room.png')}" style="width:60px; height:45px; object-fit:cover; border-radius:6px"></td>
      <td><strong>${p.name}</strong></td>
      <td><span style="background:#f4efe6; padding:4px 10px; border-radius:20px; font-size:0.78rem;">${p.catName || p.cat || p.category}</span></td>
      <td><strong>₺${(p.price || 0).toLocaleString('tr-TR')}</strong></td>
      <td>
        <a href="product-detail.html?id=${p.id}" target="_blank" class="admin-btn-sm" style="text-decoration:none; color:#333; margin-right:6px;">İncele</a>
        <button class="admin-btn-sm" style="color:#c62828" onclick="deleteProduct('${p.id}')">Sil</button>
      </td>
    </tr>
  `).join('');
}

window.addProduct = () => {
  const name = document.getElementById('pName').value.trim();
  const price = parseFloat(document.getElementById('pPrice').value);
  const cat = document.getElementById('pCat').value;
  const img = document.getElementById('pImg').value.trim() || 'evrensen/Aynalı Yatak Odası/1 (1).jpeg';

  const catNames = { yatak: 'Yatak Odası', yemek: 'Yemek Odası', dugun: 'Düğün Paketi', koltuk: 'Koltuk Takımı', kose: 'Köşe Koltuk', tv: 'TV Ünitesi' };
  const custom = JSON.parse(localStorage.getItem('evseren_custom_products') || '[]');
  const newProd = {
    id: Date.now(),
    name,
    price,
    oldPrice: Math.round(price * 1.2),
    cat,
    catName: catNames[cat] || 'Mobilya',
    img,
    images: [img],
    rating: 5,
    reviews: 12,
    badge: 'YENİ'
  };
  custom.unshift(newProd);
  localStorage.setItem('evseren_custom_products', JSON.stringify(custom));
  document.getElementById('addProductForm').reset();
  alert('Ürün başarıyla eklendi!');
  refreshAllAdminData();
};

window.deleteProduct = (id) => {
  if (!confirm('Bu ürünü listeden kaldırmak istediğinize emin misiniz?')) return;
  let custom = JSON.parse(localStorage.getItem('evseren_custom_products') || '[]');
  custom = custom.filter(p => String(p.id) !== String(id));
  localStorage.setItem('evseren_custom_products', JSON.stringify(custom));
  refreshAllAdminData();
};

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
  refreshAllAdminData();
}

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('adminToken')) {
    document.getElementById('adminLoginOverlay').style.display = 'none';
    document.getElementById('sidebar').style.display = 'flex';
    document.getElementById('mainContent').style.display = 'block';
    initAdmin();
  }
});
