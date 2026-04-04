const API_URL = 'http://localhost:5000/api';
let adminAuthenticated = false;

/* ==========================================
   ADMIN LOGIN LOGIC
   ========================================== */
window.adminLogin = () => {
  const user = document.getElementById('adminUser').value;
  const pass = document.getElementById('adminPass').value;

  if (user === 'admin' && pass === '123456') { // Mock check
    localStorage.setItem('adminToken', 'mock-admin-token');
    document.getElementById('adminLoginOverlay').style.display = 'none';
    document.getElementById('sidebar').style.display = 'block';
    document.getElementById('mainContent').style.display = 'block';
    initAdmin();
  } else {
    alert('Hatalı giriş bilgileri!');
  }
};

window.adminLogout = () => {
  localStorage.removeItem('adminToken');
  window.location.reload();
};

/* ==========================================
   TABS & NAVIGATION
   ========================================== */
window.switchTab = (tabName) => {
  document.querySelectorAll('.admin-tab').forEach(t => t.style.display = 'none');
  document.querySelectorAll('.admin-nav-item').forEach(i => i.classList.remove('active'));
  
  document.getElementById(`tab-${tabName}`).style.display = 'block';
  document.getElementById('tabTitle').innerText = tabName === 'orders' ? 'Sipariş Yönetimi' : 'Ürün Yönetimi';
  
  const navItems = document.querySelectorAll('.admin-nav-item');
  if (tabName === 'orders') navItems[0].classList.add('active');
  if (tabName === 'products') navItems[1].classList.add('active');

  if (tabName === 'orders') fetchOrders();
  if (tabName === 'products') fetchProducts();
};

/* ==========================================
   ORDERS MANAGEMENT
   ========================================== */
async function fetchOrders() {
  try {
    const res = await fetch(`${API_URL}/orders`, {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') || 'temp' } 
    });
    const orders = await res.json();
    renderOrders(orders);
  } catch (error) {
    console.error(error);
  }
}

function renderOrders(orders) {
  const table = document.getElementById('ordersTableBody');
  if (!table) return;

  table.innerHTML = orders.map(order => `
    <tr>
      <td><strong>${order.orderCode}</strong></td>
      <td>${order.customerInfo?.name || 'Müşteri'}</td>
      <td>₺${order.totalPrice.toLocaleString()}</td>
      <td>
        <select class="admin-input" style="width:140px; padding:5px" onchange="updateStatus('${order._id}', this.value)">
          <option value="Onaylandı" ${order.status === 'Onaylandı' ? 'selected' : ''}>Onaylandı</option>
          <option value="Hazırlanıyor" ${order.status === 'Hazırlanıyor' ? 'selected' : ''}>Hazırlanıyor</option>
          <option value="Kargoya verildi" ${order.status === 'Kargoya verildi' ? 'selected' : ''}>Kargoya verildi</option>
          <option value="Teslim edildi" ${order.status === 'Teslim edildi' ? 'selected' : ''}>Teslim edildi</option>
        </select>
      </td>
      <td>${new Date(order.createdAt).toLocaleDateString()}</td>
      <td>
        <button class="admin-btn-sm" onclick="alert('Detaylar: \\nAdres: ${order.customerInfo?.address}')">Görüntüle</button>
      </td>
    </tr>
  `).join('');
}

async function updateStatus(id, newStatus) {
  try {
    const res = await fetch(`${API_URL}/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    if (res.ok) alert('Durum güncellendi!');
  } catch (error) {
    alert('Hata oluştu!');
  }
}

/* ==========================================
   PRODUCTS MANAGEMENT
   ========================================== */
async function fetchProducts() {
  try {
    const res = await fetch(`${API_URL}/products`);
    const products = await res.json();
    renderAdminProducts(products);
  } catch (error) {
    console.error(error);
  }
}

function renderAdminProducts(products) {
  const table = document.getElementById('productsTableBody');
  if (!table) return;

  table.innerHTML = products.map(p => `
    <tr>
      <td><img src="${p.image}" style="width:50px; height:40px; object-fit:cover; border-radius:4px"></td>
      <td>${p.name}</td>
      <td>${p.category}</td>
      <td>₺${p.price.toLocaleString()}</td>
      <td>
        <button class="admin-btn-sm" style="color:red" onclick="deleteProduct('${p._id}')">Sil</button>
      </td>
    </tr>
  `).join('');
}

async function addProduct() {
  const product = {
    name: document.getElementById('pName').value,
    price: parseFloat(document.getElementById('pPrice').value),
    category: document.getElementById('pCat').value,
    image: document.getElementById('pImg').value
  };

  try {
    const res = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    if (res.ok) {
      alert('Ürün eklendi!');
      document.getElementById('addProductForm').reset();
      fetchProducts();
    }
  } catch (error) {
    alert('Hata oluştu!');
  }
}

async function deleteProduct(id) {
  if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) return;
  try {
    await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
    fetchProducts();
  } catch (error) {
    alert('Hata!');
  }
}

/* ==========================================
   INITIALIZATION
   ========================================== */
function initAdmin() {
  fetchOrders();
}

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('adminToken')) {
    document.getElementById('adminLoginOverlay').style.display = 'none';
    document.getElementById('sidebar').style.display = 'block';
    document.getElementById('mainContent').style.display = 'block';
    initAdmin();
  }
});
