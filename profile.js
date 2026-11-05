/* ==========================================
   EVSEREN MOBİLYA - KULLANICI PANELİ (PROFILE.JS)
   ========================================== */

function checkAuth() {
    let token = localStorage.getItem('token') || localStorage.getItem('adminToken');
    let user = null;
    try { 
        user = JSON.parse(localStorage.getItem('user') || 'null');
    } catch(e) {}
    
    if (!token && !user) {
        window.location.href = 'login.html';
        return null;
    }
    if (!user) {
        user = { name: 'Değerli Üyemiz', email: 'musteri@evserenmobilya.com', role: 'user' };
        localStorage.setItem('user', JSON.stringify(user));
    }
    return user;
}

function switchProfileTab(tabName) {
    document.querySelectorAll('.profile-tab').forEach(t => t.style.display = 'none');
    document.querySelectorAll('.side-nav-item').forEach(i => i.classList.remove('active'));
    
    const tabEl = document.getElementById(`tab-${tabName}`);
    if (tabEl) tabEl.style.display = 'block';
    
    const navItems = document.querySelectorAll('.side-nav-item');
    if (tabName === 'orders' && navItems[0]) navItems[0].classList.add('active');
    else if (tabName === 'info' && navItems[1]) navItems[1].classList.add('active');
    else if (tabName === 'favs' && navItems[2]) navItems[2].classList.add('active');
    else if (tabName === 'coupons' && navItems[3]) navItems[3].classList.add('active');

    if (tabName === 'orders') fetchUserOrders();
    if (tabName === 'favs') refreshFavs();
}

async function fetchUserOrders() {
    const user = checkAuth();
    if (!user) return;
    try {
        const localOrders = JSON.parse(localStorage.getItem('evseren_orders') || '[]');
        renderOrdersList(localOrders);
    } catch (e) {
        renderOrdersList([]);
    }
}

function renderOrdersList(orders) {
    const container = document.getElementById('ordersList');
    if (!container) return;

    if (!orders || orders.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:50px; color:#888"><i class="fas fa-shopping-basket" style="font-size:3rem; margin-bottom:15px; opacity:0.35"></i><p>Henüz bir siparişiniz bulunmuyor.</p><a href="products.html" class="btn btn-primary" style="margin-top:18px;">Alışverişe Başla</a></div>`;
        return;
    }

    container.innerHTML = orders.map(order => {
        const prodCount = Array.isArray(order.products) ? order.products.length : 1;
        const priceVal = Number(order.totalPrice) || 0;
        const dateStr = order.createdAt ? new Date(order.createdAt).toLocaleDateString('tr-TR') : new Date().toLocaleDateString('tr-TR');
        return `
        <div class="order-card">
            <div class="order-header">
                <div class="order-date"><i class="far fa-calendar-alt"></i> ${dateStr}</div>
                <div class="order-status-tag ${order.status === 'Teslim edildi' ? 'status-delivered' : 'status-processing'}">
                    ${order.status || 'Onaylandı'}
                </div>
            </div>
            <div class="order-body">
                <div style="display:flex; align-items:center; gap:14px;">
                    <div style="width:48px; height:48px; border-radius:12px; background:#fdf8f0; display:flex; align-items:center; justify-content:center; color:var(--accent); font-size:1.4rem;">
                        <i class="fas fa-box"></i>
                    </div>
                    <div class="order-info-text">
                        <div class="order-code">Sipariş No: ${order.orderCode || 'EVS-100001'}</div>
                        <div style="font-size:0.82rem; color:var(--text-light)">${prodCount} Ürün • Ücretsiz Nakliye & Kurulum</div>
                        <div class="order-price">₺${priceVal.toLocaleString('tr-TR')}</div>
                    </div>
                </div>
                <a href="track-order.html?code=${encodeURIComponent(order.orderCode || '')}" class="btn btn-primary" style="padding:9px 20px; font-size:0.84rem;">Kargo & Sipariş Takibi</a>
            </div>
        </div>
        `;
    }).join('');
}

function refreshFavs() {
    const favs = JSON.parse(localStorage.getItem('mobilya_favs') || '[]');
    const container = document.getElementById('favsGrid');
    if (!container) return;

    if (favs.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align:center; padding:40px; color:#888">Favori listenizde henüz ürün bulunmuyor.</p>`;
        return;
    }

    const sourceData = window.allProductsData || window.fallbackProductsData || [];
    const favProducts = sourceData.filter(p => favs.includes(p.id));

    container.innerHTML = favProducts.map(p => `
        <div class="product-card" style="box-shadow:none; border:1px solid #eee; border-radius:12px; overflow:hidden;">
            <a href="product-detail.html?id=${p.id}" class="product-img" style="aspect-ratio:4/3; display:block;">
                <img src="${encodeURI(p.img)}" alt="${p.name}" style="width:100%; height:100%; object-fit:cover;">
            </a>
            <div class="product-info" style="padding:14px;">
                <h4 style="font-size:0.9rem; margin-bottom:6px;">${p.name}</h4>
                <div style="color:var(--accent); font-weight:700">₺${Number(p.price || 0).toLocaleString('tr-TR')}</div>
            </div>
        </div>
    `).join('');
}

function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

function initProfile() {
    const user = checkAuth();
    if (!user) return;

    try {
        const nameEl = document.getElementById('profileName');
        const emailEl = document.getElementById('profileEmail');
        const avatarEl = document.getElementById('avatarInitial');

        const displayName = user.name || user.firstName || (user.email ? user.email.split('@')[0] : 'Değerli Üyemiz');
        if (nameEl) nameEl.innerText = displayName;
        if (emailEl) emailEl.innerText = user.email || '';
        if (avatarEl && displayName) avatarEl.innerText = displayName.charAt(0).toUpperCase();

        const infoName = document.getElementById('infoName');
        const infoEmail = document.getElementById('infoEmail');
        const infoPhone = document.getElementById('infoPhone');
        const infoAddr = document.getElementById('infoAddr');

        if (infoName) infoName.value = displayName;
        if (infoEmail) infoEmail.value = user.email || '';
        if (infoPhone) infoPhone.value = user.phone || '';
        if (infoAddr) infoAddr.value = user.address || '';
    } catch (err) {}

    fetchUserOrders();
}

const updateForm = document.getElementById('updateInfoForm');
if (updateForm) {
    updateForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = updateForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Kaydediliyor...';
        btn.disabled = true;

        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const updatedUser = {
            ...currentUser,
            name: document.getElementById('infoName').value.trim(),
            phone: document.getElementById('infoPhone').value.trim(),
            address: document.getElementById('infoAddr').value.trim()
        };

        localStorage.setItem('user', JSON.stringify(updatedUser));

        const users = JSON.parse(localStorage.getItem('evseren_users') || '[]');
        const idx = users.findIndex(u => u.email === updatedUser.email);
        if (idx > -1) {
            users[idx] = { ...users[idx], ...updatedUser };
            localStorage.setItem('evseren_users', JSON.stringify(users));
        }

        setTimeout(() => {
            btn.innerText = originalText;
            btn.disabled = false;
            alert('Bilgileriniz başarıyla güncellendi!');
            initProfile();
        }, 250);
    });
}

window.switchProfileTab = switchProfileTab;
window.handleLogout = handleLogout;
window.initProfile = initProfile;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProfile);
} else {
    initProfile();
}
