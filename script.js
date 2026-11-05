const API_URL = 'http://localhost:5000/api';

/* ==========================================
   MOBILYA DUKKANIM - JAVASCRIPT
   ========================================== */

// 1. URUN VERILERI
window.fallbackProductsData = [
  {
    "id": 1010,
    "name": "Aynalı Yatak Odası Takımı",
    "price": 86476,
    "oldPrice": 100270,
    "cat": "yatak",
    "img": "evrensen/Aynalı Yatak Odası/WhatsApp Image 2025-09-01 at 11.43.59 (1).jpeg",
    "images": [
      "evrensen/Aynalı Yatak Odası/WhatsApp Image 2025-09-01 at 11.43.59 (1).jpeg",
      "evrensen/Aynalı Yatak Odası/WhatsApp Image 2025-09-01 at 11.43.59.jpeg",
      "evrensen/Aynalı Yatak Odası/WhatsApp Image 2025-09-01 at 11.44.00 (1).jpeg",
      "evrensen/Aynalı Yatak Odası/WhatsApp Image 2025-09-01 at 11.44.00.jpeg",
      "evrensen/Aynalı Yatak Odası/WhatsApp Image 2025-09-01 at 11.44.01.jpeg",
      "evrensen/Aynalı Yatak Odası/WhatsApp Image 2025-09-01 at 11.44.02 (1).jpeg",
      "evrensen/Aynalı Yatak Odası/WhatsApp Image 2025-09-01 at 11.44.02 (2).jpeg",
      "evrensen/Aynalı Yatak Odası/WhatsApp Image 2025-09-01 at 11.44.02.jpeg",
      "evrensen/Aynalı Yatak Odası/WhatsApp Image 2025-09-01 at 11.44.03 (1).jpeg",
      "evrensen/Aynalı Yatak Odası/WhatsApp Image 2025-09-01 at 11.44.03 (2).jpeg",
      "evrensen/Aynalı Yatak Odası/WhatsApp Image 2025-09-01 at 11.44.03 (3).jpeg",
      "evrensen/Aynalı Yatak Odası/WhatsApp Image 2025-09-01 at 11.44.03.jpeg",
      "evrensen/Aynalı Yatak Odası/WhatsApp Image 2025-09-01 at 11.44.04 (1).jpeg",
      "evrensen/Aynalı Yatak Odası/WhatsApp Image 2025-09-01 at 11.44.04.jpeg"
    ],
    "badge": "2026 MODEL"
  },
  {
    "id": 1011,
    "name": "Aynalı Yemek Odası Takımı",
    "price": 81394,
    "oldPrice": 94462,
    "cat": "yemek",
    "img": "evrensen/Aynalı Yemek Odası/WhatsApp Image 2025-09-01 at 11.44.04 (2).jpeg",
    "images": [
      "evrensen/Aynalı Yemek Odası/WhatsApp Image 2025-09-01 at 11.44.04 (2).jpeg",
      "evrensen/Aynalı Yemek Odası/WhatsApp Image 2025-09-01 at 11.44.05 (1).jpeg",
      "evrensen/Aynalı Yemek Odası/WhatsApp Image 2025-09-01 at 11.44.05 (2).jpeg",
      "evrensen/Aynalı Yemek Odası/WhatsApp Image 2025-09-01 at 11.44.05 (3).jpeg",
      "evrensen/Aynalı Yemek Odası/WhatsApp Image 2025-09-01 at 11.44.05.jpeg",
      "evrensen/Aynalı Yemek Odası/WhatsApp Image 2025-09-01 at 11.44.06 (1).jpeg",
      "evrensen/Aynalı Yemek Odası/WhatsApp Image 2025-09-01 at 11.44.06 (2).jpeg",
      "evrensen/Aynalı Yemek Odası/WhatsApp Image 2025-09-01 at 11.44.06 (3).jpeg",
      "evrensen/Aynalı Yemek Odası/WhatsApp Image 2025-09-01 at 11.44.06 (4).jpeg",
      "evrensen/Aynalı Yemek Odası/WhatsApp Image 2025-09-01 at 11.44.06 (5).jpeg",
      "evrensen/Aynalı Yemek Odası/WhatsApp Image 2025-09-01 at 11.44.06.jpeg",
      "evrensen/Aynalı Yemek Odası/WhatsApp Image 2025-09-01 at 11.44.07.jpeg"
    ],
    "badge": "YENİ"
  },
  {
    "id": 1020,
    "name": "Bohem Yatak Odası Takımı",
    "price": 88170,
    "oldPrice": 102206,
    "cat": "yatak",
    "img": "evrensen/Boğem Yatak odası/page1_img24.jpeg",
    "images": [
      "evrensen/Boğem Yatak odası/page1_img24.jpeg",
      "evrensen/Boğem Yatak odası/page1_img25.jpeg",
      "evrensen/Boğem Yatak odası/page1_img27.jpeg",
      "evrensen/Boğem Yatak odası/page1_img28.jpeg",
      "evrensen/Boğem Yatak odası/page1_img29.jpeg",
      "evrensen/Boğem Yatak odası/page1_img30.jpeg"
    ],
    "badge": "POPÜLER"
  },
  {
    "id": 1021,
    "name": "Bohem Yemek Odası Takımı",
    "price": 68689,
    "oldPrice": 79821,
    "cat": "yemek",
    "img": "evrensen/Boğem Yemek Odası/page1_img22.jpeg",
    "images": [
      "evrensen/Boğem Yemek Odası/page1_img22.jpeg",
      "evrensen/Boğem Yemek Odası/page1_img23.jpeg",
      "evrensen/Boğem Yemek Odası/page1_img26.jpeg"
    ],
    "badge": "YENİ"
  },
  {
    "id": 1030,
    "name": "Buğlem Yatak Odası Takımı",
    "price": 89864,
    "oldPrice": 104142,
    "cat": "yatak",
    "img": "evrensen/Buğlem Yatak Odası/page1_img17.jpeg",
    "images": [
      "evrensen/Buğlem Yatak Odası/page1_img17.jpeg",
      "evrensen/Buğlem Yatak Odası/page1_img21.jpeg"
    ],
    "badge": "POPÜLER"
  },
  {
    "id": 1031,
    "name": "Buğlem Yemek Odası Takımı",
    "price": 83088,
    "oldPrice": 96398,
    "cat": "yemek",
    "img": "evrensen/Buğlem Yemek Odası/page1_img18.jpeg",
    "images": [
      "evrensen/Buğlem Yemek Odası/page1_img18.jpeg",
      "evrensen/Buğlem Yemek Odası/page1_img19.jpeg",
      "evrensen/Buğlem Yemek Odası/page1_img20.jpeg"
    ],
    "badge": ""
  },
  {
    "id": 1060,
    "name": "İnci Yatak Odası Takımı",
    "price": 79700,
    "oldPrice": 92405,
    "cat": "yatak",
    "img": "evrensen/İnci Yatak Odası/page1_img11.jpeg",
    "images": [
      "evrensen/İnci Yatak Odası/page1_img11.jpeg",
      "evrensen/İnci Yatak Odası/page1_img12.jpeg",
      "evrensen/İnci Yatak Odası/page1_img13.jpeg",
      "evrensen/İnci Yatak Odası/page1_img2.jpeg",
      "evrensen/İnci Yatak Odası/page1_img3.jpeg",
      "evrensen/İnci Yatak Odası/page1_img4.jpeg",
      "evrensen/İnci Yatak Odası/page1_img5.jpeg",
      "evrensen/İnci Yatak Odası/page1_img6.jpeg",
      "evrensen/İnci Yatak Odası/page1_img7.jpeg"
    ],
    "badge": "FIRSAT"
  },
  {
    "id": 1061,
    "name": "İnci Yemek Odası Takımı",
    "price": 66148,
    "oldPrice": 76917,
    "cat": "yemek",
    "img": "evrensen/İnci Yemek Odası/page1_img10.jpeg",
    "images": [
      "evrensen/İnci Yemek Odası/page1_img10.jpeg",
      "evrensen/İnci Yemek Odası/page1_img14.jpeg",
      "evrensen/İnci Yemek Odası/page1_img15.jpeg",
      "evrensen/İnci Yemek Odası/page1_img16.jpeg",
      "evrensen/İnci Yemek Odası/page1_img8.jpeg",
      "evrensen/İnci Yemek Odası/page1_img9.jpeg"
    ],
    "badge": ""
  },
  {
    "id": 1070,
    "name": "Lüks İnegöl Düğün Paketi (Yatak + Yemek + Koltuk)",
    "price": 164900,
    "oldPrice": 194000,
    "cat": "dugun",
    "img": "images/dugun_paketi.png",
    "images": [
      "images/dugun_paketi.png",
      "evrensen/Aynalı Yatak Odası/WhatsApp Image 2025-09-01 at 11.43.59 (1).jpeg",
      "evrensen/Aynalı Yatak Odası/WhatsApp Image 2025-09-01 at 11.43.59.jpeg",
      "evrensen/Aynalı Yatak Odası/WhatsApp Image 2025-09-01 at 11.44.00 (1).jpeg",
      "evrensen/Aynalı Yemek Odası/WhatsApp Image 2025-09-01 at 11.44.04 (2).jpeg",
      "evrensen/Aynalı Yemek Odası/WhatsApp Image 2025-09-01 at 11.44.05 (1).jpeg",
      "evrensen/Aynalı Yemek Odası/WhatsApp Image 2025-09-01 at 11.44.05 (2).jpeg"
    ],
    "badge": "%15 İNDİRİM"
  },
  {
    "id": 1080,
    "name": "Milano Modern Koltuk Takımı",
    "price": 74500,
    "oldPrice": 86000,
    "cat": "koltuk",
    "img": "images/koltuk_takimi.png",
    "images": [
      "images/koltuk_takimi.png",
      "images/kose_takimi.png"
    ],
    "badge": "YENİ"
  },
  {
    "id": 1090,
    "name": "Nordic L Köşe Koltuk Takımı",
    "price": 62900,
    "oldPrice": 73500,
    "cat": "kose",
    "img": "images/kose_takimi.png",
    "images": [
      "images/kose_takimi.png",
      "images/koltuk_takimi.png"
    ],
    "badge": "POPÜLER"
  },
  {
    "id": 1100,
    "name": "mermer Desenli İnegöl TV Ünitesi",
    "price": 28900,
    "oldPrice": 34500,
    "cat": "tv",
    "img": "images/tv_unitesi.png",
    "images": [
      "images/tv_unitesi.png"
    ],
    "badge": ""
  }
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
window.getEffectiveProducts = function() {
    const base = window.fallbackProductsData || [];
    let custom = [];
    let deleted = [];
    try { custom = JSON.parse(localStorage.getItem('evseren_custom_products') || '[]'); } catch(e) {}
    try { deleted = JSON.parse(localStorage.getItem('evseren_deleted_products') || '[]').map(String); } catch(e) {}
    const customIds = new Set(custom.map(p => String(p.id)));
    const filteredBase = base.filter(p => !deleted.includes(String(p.id)) && !customIds.has(String(p.id)));
    return [...custom, ...filteredBase];
};
window.allProductsData = window.getEffectiveProducts();
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Instant UI Updates (Auth & Cart)
    const userBtn = document.getElementById('userBtn');
    if (userBtn) {
        userBtn.style.cssText = 'width: auto !important; min-width: 42px; height: 40px; padding: 0 14px !important; border-radius: 50px !important; display: inline-flex !important; align-items: center !important; gap: 7px !important; border: 1px solid #e5dec9 !important; background: #fdfbf7 !important; white-space: nowrap !important;';
        const token = localStorage.getItem('token');
        let user = null;
        try { user = JSON.parse(localStorage.getItem('user') || 'null'); } catch(e) {}
        
        if (token && user && (user.name || user.email)) {
            const rawName = user.firstName || user.name || user.email || 'Hesabım';
            const cleanShortName = rawName.split('@')[0].split(' ')[0].slice(0, 12);
            userBtn.innerHTML = `<i class="fas fa-user-circle" style="color:var(--accent); font-size:1.05rem;"></i><span class="user-name-header">${cleanShortName}</span>`;
            userBtn.title = "Hesabım (" + (user.email || cleanShortName) + ")";
            userBtn.href = "profile.html";
            userBtn.onclick = (e) => { e.preventDefault(); window.location.href = "profile.html"; };
        } else {
            userBtn.innerHTML = `<i class="fas fa-user"></i><span class="user-name-header">Giriş Yap</span>`;
            userBtn.title = "Giriş Yap / Üye Ol";
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
    if (!codeInput) return;

    const code = codeInput.value.trim().toUpperCase();
    if (!code) return alert('Lütfen bir sipariş kodu giriniz.');

    // 1. Check localStorage orders
    const localOrders = JSON.parse(localStorage.getItem('evseren_orders') || '[]');
    const foundLocal = localOrders.find(o => (o.orderCode || '').toUpperCase() === code);
    if (foundLocal) {
        return renderTrackingTimeline(foundLocal);
    }

    // 2. Demo/Test fallback if code starts with EVS or ORDER or numeric
    if (code.startsWith('EVS') || code.startsWith('ORD') || code.length >= 4) {
        return renderTrackingTimeline({
            orderCode: code,
            totalPrice: 70000,
            status: 'Hazırlanıyor'
        });
    }

    alert('Sipariş bulunamadı. Lütfen sipariş kodunuzu kontrol ediniz (Örn: EVS-123456).');
}

function renderTrackingTimeline(order) {
    const resultArea = document.getElementById('trackingResult');
    if (!resultArea) return;

    const statusList = ["Onaylandı", "Hazırlanıyor", "Kargoya verildi", "Dağıtımda", "Teslim edildi"];
    const stepIcons = ["fa-check-circle", "fa-hammer", "fa-Boxes-packing", "fa-truck-fast", "fa-house-circle-check"];
    let currentIndex = statusList.findIndex(s => s.toLowerCase() === (order.status || 'Onaylandı').toLowerCase());
    if (currentIndex === -1) currentIndex = 0;

    const progressWidth = currentIndex === 0 ? 10 : Math.min(100, Math.round((currentIndex / (statusList.length - 1)) * 88));
    const itemsHtml = Array.isArray(order.products) && order.products.length > 0
      ? order.products.map(p => `<div style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px dashed #e5dec9; font-size:0.9rem;"><span><strong>${p.name}</strong> (x${p.quantity || p.qty || 1})</span><span style="font-weight:700; color:#8b5e3c;">₺${Number((p.price || 0) * (p.quantity || p.qty || 1)).toLocaleString('tr-TR')}</span></div>`).join('')
      : '<div style="font-size:0.9rem; color:#555;">İnegöl Mobilya Özel Üretim Siparişi</div>';

    resultArea.innerHTML = `
        <div class="order-tracking-card">
            <div class="tracking-header">
                <div>
                    <span style="font-size:0.78rem; text-transform:uppercase; letter-spacing:1.5px; color:#8b5e3c; font-weight:700;">SİPARİŞ TAKİP DETAYI</span>
                    <h3 style="font-family:var(--font-heading); font-size:1.65rem; color:#1a1209; margin:4px 0;">Sipariş Kodu: ${order.orderCode}</h3>
                    <p style="color:#666; font-size:0.92rem; margin:0;">Toplam Tutar: <strong style="color:#1a1209;">₺${Number(order.totalPrice || 0).toLocaleString('tr-TR')}</strong> • Tarih: <strong>${new Date(order.createdAt || Date.now()).toLocaleDateString('tr-TR')}</strong></p>
                </div>
                <div class="tracking-status-pill">
                    <i class="fas fa-sync-alt"></i> Güncel Durum: ${statusList[currentIndex]}
                </div>
            </div>
            
            <div class="tracking-timeline">
                <div class="timeline-line"></div>
                <div class="timeline-progress" style="width: ${progressWidth}%"></div>
                <div class="timeline-steps">
                    ${statusList.map((st, i) => `
                        <div class="step ${i <= currentIndex ? 'completed' : ''} ${i === currentIndex ? 'active' : ''}">
                            <div class="step-circle">${i <= currentIndex ? '<i class="fas fa-check"></i>' : (i + 1)}</div>
                            <div>
                                <div class="step-label">${st}</div>
                                ${i === currentIndex ? '<span class="step-active-tag">Şu Anki Aşama</span>' : (i < currentIndex ? '<span style="font-size:0.72rem; color:#2e7d32; font-weight:600;">Tamamlandı</span>' : '<span style="font-size:0.72rem; color:#aaa;">Bekleniyor</span>')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="tracking-details-grid">
                <div>
                    <h4 style="margin-bottom:8px; color:#1a1209; font-size:0.95rem;"><i class="fas fa-couch" style="color:#8b5e3c;"></i> Sipariş Edilen Ürünler</h4>
                    ${itemsHtml}
                </div>
                <div>
                    <h4 style="margin-bottom:8px; color:#1a1209; font-size:0.95rem;"><i class="fas fa-map-marker-alt" style="color:#8b5e3c;"></i> Teslimat & Alıcı Bilgileri</h4>
                    <div style="font-size:0.88rem; color:#444; line-height:1.6;">
                        <div><strong>Alıcı:</strong> ${order.customerInfo?.name || 'Değerli Müşterimiz'}</div>
                        <div><strong>Telefon:</strong> ${order.customerInfo?.phone || '-'}</div>
                        <div><strong>Teslimat Adresi:</strong> ${order.customerInfo?.address || 'Türkiye Geneli Ücretsiz Teslimat & Kurulum'}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 11. E-BULTEN (ABONE OL) FORMU - Doğrudan evserenmobilya@gmail.com adresine iletir ve kaydeder
document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('newsletterEmail');
            const email = emailInput ? emailInput.value.trim() : '';
            if (!email) return;
            const btn = newsletterForm.querySelector('button[type="submit"]');
            const origText = btn ? btn.innerText : 'Abone Ol';
            if (btn) { btn.innerText = 'Gönderiliyor...'; btn.disabled = true; }
            try {
                const subs = JSON.parse(localStorage.getItem('evseren_subscribers') || '[]');
                if (!subs.includes(email)) {
                    subs.push({ email, date: new Date().toISOString() });
                    localStorage.setItem('evseren_subscribers', JSON.stringify(subs));
                }
                await fetch('https://formsubmit.co/ajax/evserenmobilya@gmail.com', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({
                        _subject: 'Yeni E-Bülten Abonesi - Evseren Mobilya',
                        Abone_Eposta: email,
                        Kayit_Tarihi: new Date().toLocaleString('tr-TR')
                    })
                });
            } catch (err) {
                console.warn('FormSubmit info:', err);
            }
            if (emailInput) emailInput.value = '';
            if (btn) { btn.innerText = '✓ Abone Olundu!'; setTimeout(() => { btn.innerText = origText; btn.disabled = false; }, 3500); }
        });
    }
});


// 12. ILETISIM FORMU - Doğrudan evserenmobilya@gmail.com adresine iletir
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const inputs = contactForm.querySelectorAll('input, select, textarea');
            const payload = { _subject: 'Yeni İletişim Mesajı - Evseren Mobilya' };
            inputs.forEach((inp, idx) => {
                const label = inp.previousElementSibling ? inp.previousElementSibling.innerText : ('Alan_' + idx);
                payload[label] = inp.value;
            });
            const btn = contactForm.querySelector('button[type="submit"]');
            const origHtml = btn ? btn.innerHTML : 'Mesajı Gönder';
            if (btn) { btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...'; btn.disabled = true; }
            try {
                await fetch('https://formsubmit.co/ajax/evserenmobilya@gmail.com', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify(payload)
                });
            } catch (err) {}
            contactForm.reset();
            if (btn) {
                btn.innerHTML = '<i class="fas fa-check"></i> Mesajınız İletildi!';
                setTimeout(() => { btn.innerHTML = origHtml; btn.disabled = false; }, 3500);
            }
        });
    }
});
