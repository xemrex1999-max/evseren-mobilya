/* API_URL is already defined in script.js */

/* ==========================================
   AUTH CHECK
   ========================================== */
function checkAuth() {
    let token = localStorage.getItem('token');
    let user = null;
    try { 
        user = JSON.parse(localStorage.getItem('user') || 'null');
    } catch(e) { 
        console.error("Auth check parse error", e);
    }
    
    if (!token || !user) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        try {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user') || 'null');
            if (token && user) {
                window.location.href = 'index.html';
            }
        } catch(e) { /* silent fail */ }
        window.location.href = 'login.html';
        return null;
    }
    return user;
}

/* ==========================================
   TABS & NAVIGATION
   ========================================== */
function switchProfileTab(tabName) {
    document.querySelectorAll('.profile-tab').forEach(t => t.style.display = 'none');
    document.querySelectorAll('.side-nav-item').forEach(i => i.classList.remove('active'));
    
    document.getElementById(`tab-${tabName}`).style.display = 'block';
    
    const navItems = document.querySelectorAll('.side-nav-item');
    if (tabName === 'orders') navItems[0].classList.add('active');
    else if (tabName === 'info') navItems[1].classList.add('active');
    else if (tabName === 'favs') navItems[2].classList.add('active');
    else if (tabName === 'coupons') navItems[3].classList.add('active');

    if (tabName === 'orders') fetchUserOrders();
    if (tabName === 'favs') refreshFavs();
}

/* ==========================================
   RENDER ORDERS (Trendyol Style)
   ========================================== */
async function fetchUserOrders() {
    const user = checkAuth();
    if (!user) return;

    try {
        const res = await fetch(`${API_URL}/orders/${user._id}`, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        });
        const orders = await res.json();
        renderOrdersList(orders);
    } catch (e) {
        console.error(e);
    }
}

function renderOrdersList(orders) {
    const container = document.getElementById('ordersList');
    if (!container) return;

    if (orders.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:50px; color:#aaa"><i class="fas fa-shopping-basket" style="font-size:3rem; margin-bottom:15px; opacity:0.3"></i><p>Henüz bir siparişiniz bulunmuyor.</p><a href="products.html" class="btn btn-outline-dark mt-40">Alışverişe Başla</a></div>`;
        return;
    }

    container.innerHTML = orders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <div class="order-date">${new Date(order.createdAt).toLocaleDateString('tr-TR')}</div>
                <div class="order-status-tag ${order.status === 'Teslim edildi' ? 'status-delivered' : 'status-processing'}">
                    ${order.status}
                </div>
            </div>
            <div class="order-body">
                <i class="fas fa-box" style="font-size:2rem; color:var(--accent); margin-right:10px"></i>
                <div class="order-info-text">
                    <div class="order-code">Sipariş No: ${order.orderCode}</div>
                    <div style="font-size:0.8rem; color:var(--text-light)">${order.products.length} Ürün</div>
                    <div class="order-price">₺${order.totalPrice.toLocaleString()}</div>
                </div>
                <a href="track-order.html?code=${order.orderCode}" class="admin-btn-sm">Detaylar</a>
            </div>
        </div>
    `).join('');
}

/* ==========================================
   FAVORITES
   ========================================== */
function refreshFavs() {
    const favs = JSON.parse(localStorage.getItem('mobilya_favs') || '[]');
    const container = document.getElementById('favsGrid');
    if (!container) return;

    if (favs.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align:center; padding:40px; color:#aaa">Favorileriniz boş.</p>`;
        return;
    }

    // Since we only have IDs, we'll try to find them in window.allProductsData
    // Use fallback if window.allProductsData is not loaded yet
    const sourceData = window.allProductsData || window.fallbackProductsData || [];
    const favProducts = sourceData.filter(p => favs.includes(p.id));

    container.innerHTML = favProducts.map(p => `
        <div class="product-card" style="box-shadow:none; border:1px solid #eee">
            <div class="product-img" style="aspect-ratio:1/1">
                <img src="${p.img}" alt="${p.name}">
            </div>
            <div class="product-info">
                <h4 style="font-size:0.85rem">${p.name}</h4>
                <div style="color:var(--accent); font-weight:700">₺${p.price.toLocaleString()}</div>
            </div>
        </div>
    `).join('');
}

/* ==========================================
   LOGOUT / INIT
   ========================================== */
function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

function initProfile() {
    const user = checkAuth();
    if (!user) return;

    console.log("Initializing Profile for:", user);

    try {
        // Header info
        const nameEl = document.getElementById('profileName');
        const emailEl = document.getElementById('profileEmail');
        const avatarEl = document.getElementById('avatarInitial');

        if (nameEl) nameEl.innerText = user.name || 'Kullanıcı';
        if (emailEl) emailEl.innerText = user.email || '';
        if (avatarEl && user.name) avatarEl.innerText = user.name.charAt(0).toUpperCase();

        // Form pre-fill
        const infoName = document.getElementById('infoName');
        const infoEmail = document.getElementById('infoEmail');
        const infoPhone = document.getElementById('infoPhone');
        const infoAddr = document.getElementById('infoAddr');

        if (infoName) infoName.value = user.name || '';
        if (infoEmail) infoEmail.value = user.email || '';
        if (infoPhone) infoPhone.value = user.phone || '';
        if (infoAddr) infoAddr.value = user.address || '';
    } catch (err) {
        console.error("initProfile DOM error:", err);
    }

    // Initial Tab (only if not already switched)
    if (document.getElementById('tab-orders') && (document.getElementById('tab-orders').style.display !== 'none' || 
        document.getElementById('tab-info').style.display !== 'none')) {
        // stay on current
    } else {
        switchProfileTab('orders');
    }
}

/* ==========================================
   UPDATE PROFILE
   ========================================== */
const updateForm = document.getElementById('updateInfoForm');
if (updateForm) {
    updateForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = updateForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Kaydediliyor...';
        btn.disabled = true;

        const updatedData = {
            name: document.getElementById('infoName').value,
            phone: document.getElementById('infoPhone').value,
            address: document.getElementById('infoAddr').value
        };

        try {
            const res = await fetch(`${API_URL}/auth/profile`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(updatedData)
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('user', JSON.stringify(data));
                alert('Bilgileriniz başarıyla güncellendi!');
                initProfile(); // Refresh UI
            } else {
                alert('Hata: ' + (data.message || 'Güncellenemedi'));
            }
        } catch (err) {
            alert('Bağlantı hatası!');
        } finally {
            btn.innerText = originalText;
            btn.disabled = false;
        }
    });
}

// Init check
function start() {
    try {
        initProfile();
    } catch (e) {
        console.error("Profile init error:", e);
    }
}

// Global scope attachment for HTML onclicks
window.switchProfileTab = switchProfileTab;
window.handleLogout = handleLogout;
window.initProfile = initProfile;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
} else {
    start();
}
