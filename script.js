const API_URL = 'http://localhost:5000/api';

/* ==========================================
   MOBILYA DUKKANIM - JAVASCRIPT
   ========================================== */

// 1. URUN VERILERI
window.fallbackProductsData = [
  { "id": 1010, "name": "Ayça Yatak Odası", "price": 86476, "oldPrice": 100270, "cat": "yatak", "img": "images/yatak_odasi.png", "badge": "2026 MODEL" },
  { "id": 1011, "name": "Ayça Yemek Odası", "price": 81394, "oldPrice": 94462, "cat": "yemek", "img": "images/yemek_odasi.png", "badge": "" },
  { "id": 1030, "name": "Buğlem Yatak Odası", "price": 89864, "oldPrice": 104142, "cat": "yatak", "img": "images/yatak_odasi.png", "badge": "POPÜLER" },
  { "id": 1031, "name": "Buğlem Yemek Odası", "price": 83088, "oldPrice": 96398, "cat": "yemek", "img": "images/yemek_odasi.png", "badge": "" },
  { "id": 1050, "name": "Tokyo Yatak Odası", "price": 88170, "oldPrice": 102206, "cat": "yatak", "img": "images/yatak_odasi.png", "badge": "YENİ" },
  { "id": 1051, "name": "Tokyo Yemek Odası", "price": 68689, "oldPrice": 79821, "cat": "yemek", "img": "images/yemek_odasi.png", "badge": "" },
  { "id": 1060, "name": "İnci Yatak Odası", "price": 79700, "oldPrice": 92405, "cat": "yatak", "img": "images/yatak_odasi.png", "badge": "" },
  { "id": 1061, "name": "İnci Yemek Odası", "price": 66148, "oldPrice": 76917, "cat": "yemek", "img": "images/yemek_odasi.png", "badge": "" }
];

// YARDIMCILAR
window.formatPrice = function(val) {
    if (typeof val !== 'number') return val;
    return '\u20BA' + val.toLocaleString('tr-TR');
}

window.getCatName = function(cat) {
    const names = { 'dugun': 'Duyun Paketi', 'yatak': 'Yatak Odası', 'yemek': 'Yemek Odası', 'koltuk': 'Koltuk Takımı', 'tv': 'TV Unitesi', 'kose': 'Kose Takimi', 'mobilya': 'Genel Mobilya' };
    return names[cat] || 'Mobilya';
}

// 2. DURUM YONETIMI
let cart = [];
try { cart = JSON.parse(localStorage.getItem('mobilya_cart')) || []; } catch(e) { console.error("Cart parse error", e); }
let favorites = [];
try { favorites = JSON.parse(localStorage.getItem('mobilya_favs')) || []; } catch(e) { console.error("Favs parse error", e); }

// HTML ELEMENTLERI
const cartBtn = document.getElementById('cartBtn');
const cartClose = document.getElementById('cartClose');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartItemsContainer = document.getElementById('cartItems');
const cartCountEl = document.getElementById('cartCount');
const cartTotalEl = document.getElementById('cartTotal');
const cartFooter = document.getElementById('cartFooter');
const nav = document.getElementById('header');
const searchToggle = document.getElementById('searchToggle');
const searchBar = document.getElementById('searchBar');
const searchClose = document.getElementById('searchClose');
const scrollTopBtn = document.getElementById('scrollTop');

// 3. SAYFA YUKLENDIGINDE
window.allProductsData = window.fallbackProductsData;
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Instant UI Updates (Auth & Cart)
    const userBtn = document.getElementById('userBtn');
    if (userBtn) {
        const token = localStorage.getItem('token');
        let user = null;
        try { user = JSON.parse(localStorage.getItem('user') || 'null'); } catch(e) { console.error("User parse error", e); }
        
        if (token && user && user.name) {
            userBtn.innerHTML = `<i class="fas fa-user-circle" style="color:var(--accent)"></i> <span class="user-name-header" style="font-size:0.8rem; font-weight:600; margin-left:5px">${user.name.split(' ')[0]}</span>`;
            userBtn.title = "Hesabım";
            userBtn.href = "profile.html";
            userBtn.onclick = (e) => { e.preventDefault(); window.location.href = "profile.html"; };
        } else {
            userBtn.href = "login.html";
            userBtn.onclick = (e) => { e.preventDefault(); window.location.href = "login.html"; };
        }
    }
    updateCartUI();

    // 2. Fetch Products
    try {
        const res = await fetch(`${API_URL}/products`);
        if (res.ok) {
            const data = await res.json();
            if (data && data.length > 0) {
                window.allProductsData = data.map(p => ({
                    id: p._id,
                    name: p.name,
                    price: p.price,
                    oldPrice: p.oldPrice || null,
                    cat: p.category,
                    img: p.image,
                    badge: p.seoTitle || ""
                }));
            }
        }
    } catch (e) {
        console.error("Fetch API error:", e);
    }
    
    // 3. Post-fetch Rendering
    const featuredGrid = document.getElementById('featuredProducts');
    if (featuredGrid) {
        renderProducts(window.allProductsData.slice(0, 4), 'featuredProducts');
    }

    const productsGrid = document.getElementById('allProducts');
    if (productsGrid) {
        handleFilters();
    }
    
    // Global Search Bar Logic
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const q = searchInput.value.trim();
                if (q) window.location.href = `products.html?search=${encodeURIComponent(q)}`;
            }
        });
        // Real-time filtering if already on products.html
        if (productsGrid) {
            const inlineInput = document.getElementById('inlineSearchInput');
            
            const handleSearchInput = (e) => {
                const q = e.target.value.trim();
                const params = new URLSearchParams(window.location.search);
                params.set('search', q);
                window.history.replaceState({}, '', `?${params.toString()}`);
                
                // Sync the other inputs if necessary
                if (inlineInput && e.target !== inlineInput) inlineInput.value = q;
                if (searchInput && e.target !== searchInput) searchInput.value = q;
                
                handleFilters(); // re-runs filter logic
            };
            
            searchInput.addEventListener('input', handleSearchInput);
            if (inlineInput) inlineInput.addEventListener('input', handleSearchInput);
        }
    }
    
    // Diger sekmelerden gelen guncellemeleri dinle
    window.addEventListener('storage', (e) => {
        if (e.key === 'mobilya_cart') {
            cart = JSON.parse(e.newValue) || [];
            updateCartUI();
        }
        if (e.key === 'mobilya_favs') {
            favorites = JSON.parse(e.newValue) || [];
            refreshUIs();
        }
    });
});

// 4. URUNLERI RENDER ET
function renderProducts(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = data.map(product => {
        const isFavorited = (favorites || []).includes(product.id);
        return `
            <div class="product-card">
                <div class="product-img">
                    ${product.badge ? `<span class="product-badge ${product.badge === 'INDIRIM' ? 'sale' : 'new'}">${product.badge}</span>` : ''}
                    <a href="product-detail.html?id=${product.id}">
                        <img src="${product.img}" alt="${product.name}" loading="lazy" />
                    </a>
                    <div class="product-actions">
                        <button class="product-action-btn" title="Sepete Ekle" onclick="addToCart(${product.id})"><i class="fas fa-shopping-cart"></i></button>
                        <button class="product-action-btn fav-btn ${isFavorited ? 'active' : ''}" title="Favorilere Ekle" onclick="toggleFavorite(this, ${product.id})">
                            <i class="${isFavorited ? 'fas' : 'far'} fa-heart"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <span class="product-cat">${getCatName(product.cat)}</span>
                    <a href="product-detail.html?id=${product.id}" class="product-name-link">
                        <h3 class="product-name">${product.name}</h3>
                    </a>
                    <div class="product-price-row">
                        <div>
                            <span class="product-price">${formatPrice(product.price)}</span>
                            ${product.oldPrice ? `<span class="product-old-price">${formatPrice(product.oldPrice)}</span>` : ''}
                        </div>
                        <button class="add-to-cart" onclick="addToCart(${product.id})">Ekle</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    const countEl = document.getElementById('resultCount');
    if (countEl) countEl.innerText = `${data.length} urun bulundu`;
}

// 5. SEPET ISLEMLERI
function addToCart(id) {
    const product = window.allProductsData.find(p => p.id === id);
    if (!product) return;
    const existing = cart.find(item => item.id === id);
    if (existing) existing.qty++;
    else cart.push({ ...product, qty: 1 });
    saveAndUpdateCart();
    openCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveAndUpdateCart();
}

function updateQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) removeFromCart(id);
        else saveAndUpdateCart();
    }
}

function saveAndUpdateCart() {
    localStorage.setItem('mobilya_cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    if (cartCountEl) cartCountEl.innerText = totalCount;
    const countLabel = document.getElementById('cartItemCount');
    if (countLabel) countLabel.innerText = `(${totalCount} urun)`;
    if (!cartItemsContainer) return;
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<div class="cart-empty"><i class="fas fa-shopping-basket"></i><p>Sepetiniz bos.</p><a href="products.html" class="btn btn-outline-dark mt-10">Urunlere Goz At</a></div>`;
        if (cartFooter) cartFooter.style.display = 'none';
    } else {
        let total = 0;
        let originalTotal = 0;
        cartItemsContainer.innerHTML = cart.map(item => {
            const itemPrice = item.price || 0;
            const itemOldPrice = item.oldPrice || itemPrice;
            total += itemPrice * (item.qty || 1);
            originalTotal += itemOldPrice * (item.qty || 1);
            return `
                <div class="cart-item">
                    <img src="${item.img}" class="cart-item-img" />
                    <div class="cart-item-info">
                        <h4 class="cart-item-name">${item.name}</h4>
                        <div class="cart-item-price">
                            ${window.formatPrice(itemPrice)}
                            ${item.oldPrice ? `<span class="cart-item-old-price" style="text-decoration:line-through;font-size:0.8rem;color:var(--text-light);margin-left:5px">${window.formatPrice(item.oldPrice)}</span>` : ''}
                        </div>
                        <div class="cart-item-actions">
                            <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                            <span class="qty-val">${item.qty}</span>
                            <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                            <button class="cart-item-remove" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        const savings = originalTotal - total;
        
        // Update footer rows
        const cartSubtotalEl = document.getElementById('cartSubtotal');
        const cartDiscountEl = document.getElementById('cartDiscount');
        const cartTotalEl = document.getElementById('cartTotal');

        if (cartSubtotalEl) cartSubtotalEl.innerText = window.formatPrice(originalTotal);
        if (cartDiscountEl) {
            cartDiscountEl.innerText = `- ${window.formatPrice(savings)}`;
            cartDiscountEl.parentElement.style.display = savings > 0 ? 'flex' : 'none';
        }
        if (cartTotalEl) cartTotalEl.innerText = window.formatPrice(total);
        if (cartFooter) cartFooter.style.display = 'block';
    }
}

// 6. FAVORI ISLEMLERI
function toggleFavorite(btn, id) {
    if (!favorites) favorites = [];
    const index = favorites.indexOf(id);
    if (index > -1) {
        favorites.splice(index, 1);
        btn.classList.remove('active');
        btn.querySelector('i').className = 'far fa-heart';
    } else {
        favorites.push(id);
        btn.classList.add('active');
        btn.querySelector('i').className = 'fas fa-heart';
    }
    localStorage.setItem('mobilya_favs', JSON.stringify(favorites));
    refreshUIs();
}

function refreshUIs() {
    const featuredGrid = document.getElementById('featuredProducts');
    if (featuredGrid) renderProducts(window.allProductsData.slice(0, 4), 'featuredProducts');
    const productsGrid = document.getElementById('allProducts');
    if (productsGrid) renderProducts(window.allProductsData, 'allProducts');
}

// 7. UI ETKILESIMLERI
function openCart() { 
    cartSidebar?.classList.add('open'); 
    cartOverlay?.classList.add('active'); 
    document.body.classList.add('cart-open');
}
function closeCart() { 
    cartSidebar?.classList.remove('open'); 
    cartOverlay?.classList.remove('active'); 
    document.body.classList.remove('cart-open');
}
cartBtn?.addEventListener('click', openCart);
cartClose?.addEventListener('click', closeCart);
cartOverlay?.addEventListener('click', closeCart);
searchToggle?.addEventListener('click', () => searchBar?.classList.toggle('active'));
searchClose?.addEventListener('click', () => searchBar?.classList.remove('active'));

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) nav?.classList.add('scrolled');
    else nav?.classList.remove('scrolled');
    if (window.scrollY > 400) scrollTopBtn?.classList.add('visible');
    else scrollTopBtn?.classList.remove('visible');
});

scrollTopBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// 8. FILTRELEME
function handleFilters() {
    const filterBtns = document.querySelectorAll('.filter-item');
    const priceBtns = document.querySelectorAll('.price-filter');
    const params = new URLSearchParams(window.location.search);
    let activeCat = params.get('cat') || 'all';
    let searchQuery = params.get('search') || '';
    let minP = 0, maxP = 999999;
    let activeSort = 'default';
    
    // Sort logic
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            activeSort = this.value;
            apply();
        });
    }
    
    // UI selection update for category buttons
    if (activeCat !== 'all') {
        filterBtns.forEach(b => b.classList.remove('active'));
        const btn = document.querySelector(`.filter-item[data-cat="${activeCat}"]`);
        if (btn) btn.classList.add('active');
    }

    // Set search box value
    const sInput = document.getElementById('searchInput');
    const inlineInput = document.getElementById('inlineSearchInput');
    if (sInput && searchQuery && sInput.value !== searchQuery) {
        sInput.value = searchQuery;
    }
    if (inlineInput && searchQuery && inlineInput.value !== searchQuery) {
        inlineInput.value = searchQuery;
    }

    function apply() {
        let filtered = window.allProductsData;
        
        // Filter by text search
        if (searchQuery) {
            const sq = searchQuery.toLowerCase();
            filtered = filtered.filter(p => p.name.toLowerCase().includes(sq) || (p.cat && p.cat.toLowerCase().includes(sq)));
        }
        
        // Filter by category
        if (activeCat !== 'all') {
            filtered = filtered.filter(p => p.cat === activeCat);
        }
        
        // Filter by price
        filtered = filtered.filter(p => p.price >= minP && p.price <= maxP);
        
        // Sorting
        if (activeSort === 'price-asc') {
            filtered = filtered.sort((a, b) => a.price - b.price);
        } else if (activeSort === 'price-desc') {
            filtered = filtered.sort((a, b) => b.price - a.price);
        } else if (activeSort === 'new') {
            filtered = filtered.filter(p => p.badge === 'YENİ').concat(filtered.filter(p => p.badge !== 'YENİ'));
        }
        
        const noP = document.getElementById('noProducts'), grid = document.getElementById('allProducts');
        if (filtered.length === 0) { 
            grid.style.display = 'none'; 
            if(noP) noP.style.display = 'block'; 
        } else { 
            grid.style.display = 'grid'; 
            if(noP) noP.style.display = 'none'; 
            renderProducts(filtered, 'allProducts'); 
        }
    }

    apply(); // Initial apply based on URL

    filterBtns.forEach(btn => {
        if (btn.classList.contains('price-filter')) return;
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-item:not(.price-filter)').forEach(b => b.classList.remove('active'));
            btn.classList.add('active'); 
            activeCat = btn.dataset.cat; 
            // Clear URL search param visually without refreshing
            searchQuery = '';
            if (sInput) sInput.value = '';
            window.history.replaceState({}, '', `?cat=${activeCat}`);
            apply();
            const b = document.getElementById('breadCat'), t = document.getElementById('pageTitle');
            if (b) b.innerText = btn.innerText; if (t) t.innerText = btn.innerText;
        });
    });
    priceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            priceBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active'); minP = parseInt(btn.dataset.min); maxP = parseInt(btn.dataset.max); apply();
        });
    });
}

// 9. HERO SLIDER
const slides = document.querySelectorAll('.hero-slide');
if (slides.length > 0) {
    let current = 0;
    const indicators = document.querySelectorAll('.indicator');
    function show(idx) {
        slides.forEach(s => s.classList.remove('active')); indicators.forEach(i => i.classList.remove('active'));
        current = (idx + slides.length) % slides.length;
        slides[current].classList.add('active'); indicators[current].classList.add('active');
    }
    document.getElementById('heroNext')?.addEventListener('click', () => show(current + 1));
    document.getElementById('heroPrev')?.addEventListener('click', () => show(current - 1));
    indicators.forEach((ind, i) => ind.addEventListener('click', () => show(i)));
    setInterval(() => show(current + 1), 6000);
}

// 10. SIPARIS TAKIP FONKSIYONU
async function trackMyOrder() {
    const codeInput = document.getElementById('orderCodeInput');
    const resultArea = document.getElementById('trackingResult');
    if (!codeInput) return;

    const code = codeInput.value.trim();
    if (!code) return alert('Lütfen bir sipariş kodu giriniz.');

    try {
        const res = await fetch(`${API_URL}/orders/track/${code}`);
        const data = await res.json();

        if (res.ok && data) {
            renderTrackingTimeline(data);
        } else {
            alert('Sipariş bulunamadı. Lütfen kodu kontrol ediniz.');
        }
    } catch (error) {
        console.error(error);
        alert('Takip bilgisi alınırken bir hata oluştu.');
    }
}

function renderTrackingTimeline(order) {
    const resultArea = document.getElementById('trackingResult');
    if (!resultArea) return;

    const statusList = ["Onaylandı", "Hazırlanıyor", "Kargoya verildi", "Dağıtımda", "Teslim edildi"];
    const currentIndex = statusList.indexOf(order.status);
    const progressPercent = (currentIndex / (statusList.length - 1)) * 100;

    resultArea.innerHTML = `
        <div class="order-tracking-card glass">
            <div class="tracking-header">
                <h3 style="font-family:var(--font-heading)">Sipariş Bilgileri</h3>
                <p style="color:var(--text-light)">Kod: <strong>${order.orderCode}</strong> | Toplam: <strong>₺${order.totalPrice.toLocaleString()}</strong></p>
            </div>
            
            <div class="tracking-timeline">
                <div class="timeline-line"></div>
                <div class="timeline-progress" style="width: ${progressPercent}%"></div>
                <div class="timeline-steps">
                    ${statusList.map((st, i) => `
                        <div class="step ${i <= currentIndex ? 'completed' : ''} ${i === currentIndex ? 'active' : ''}">
                            <div class="step-circle">${i < currentIndex ? '<i class="fas fa-check"></i>' : (i + 1)}</div>
                            <div class="step-label">${st}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

