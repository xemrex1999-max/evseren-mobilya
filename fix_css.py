import sys

css_to_append = """

/* ==========================================
   ÜRÜNLER / HAKKIMIZDA / İLETİŞİM SAYFALARI
   Eksik stiller — otomatik eklendi
   ========================================== */

/* PRODUCTS LAYOUT: sidebar + grid yan yana */
.products-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 32px;
  align-items: start;
}
.products-sidebar { position: sticky; top: 90px; }
.products-main { min-width: 0; }
.products-main .products-grid { grid-template-columns: repeat(3, 1fr); }

/* FILTER BOX */
.filter-box {
  background: white;
  border-radius: 16px;
  padding: 22px;
  box-shadow: 0 2px 8px rgba(139,94,60,.08);
  border: 1px solid #e0d5c5;
  margin-bottom: 18px;
}
.filter-box h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  color: #1a1209;
  margin-bottom: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0d5c5;
}
.filter-list { display: flex; flex-direction: column; gap: 4px; }
.filter-item {
  background: none;
  border: none;
  text-align: left;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 500;
  color: #3d2c1e;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
  width: 100%;
}
.filter-item:hover { background: #f0ebe3; color: #8B5E3C; }
.filter-item.active { background: #8B5E3C; color: white; font-weight: 600; }

/* PAGE HERO */
.page-hero {
  background: linear-gradient(135deg, #2d2010 0%, #3a2008 100%);
  padding: 44px 0;
}
.page-hero .breadcrumb {
  display: flex; align-items: center; gap: 8px;
  font-size: 0.82rem; color: rgba(255,255,255,.55); margin-bottom: 10px;
}
.page-hero .breadcrumb a { color: #c69c72; }
.page-hero .breadcrumb span { color: rgba(255,255,255,.35); }
.page-hero h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  color: white; font-weight: 700;
}

/* SECTION HELPERS */
.section-tag {
  display: inline-block;
  font-size: 0.72rem; font-weight: 700;
  letter-spacing: 3px; color: #8B5E3C; text-transform: uppercase; margin-bottom: 10px;
}
.section-sub { font-size: 1rem; color: #7a6552; max-width: 500px; margin: 10px auto 0; }

/* CATEGORY GRID */
.cat-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}
.cat-large { grid-row: span 2; min-height: 380px; aspect-ratio: unset !important; }
.cat-card { position: relative; border-radius: 20px; overflow: hidden; cursor: pointer; aspect-ratio: 4/3; display: block; }
.cat-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
.cat-card:hover img { transform: scale(1.05); }
.cat-info {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: linear-gradient(to top, rgba(26,18,9,.85) 0%, transparent 100%);
  padding: 28px 22px 20px;
}
.cat-info h3 { font-family: 'Playfair Display', serif; color: white; font-size: 1.15rem; margin-bottom: 4px; }
.cat-info span { color: rgba(255,255,255,.7); font-size: 0.8rem; }

/* PROMO SECTION */
.promo-section { background: linear-gradient(135deg, #2d2010 0%, #3a1f05 100%); padding: 60px 0; }
.promo-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
.promo-text { color: white; }
.promo-tag { display: inline-block; font-size: 0.7rem; letter-spacing: 3px; font-weight: 700; color: #D4A843; margin-bottom: 14px; }
.promo-text h2 { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 3vw, 2.8rem); margin-bottom: 16px; line-height: 1.2; }
.promo-text p { color: rgba(255,255,255,.75); font-size: 0.95rem; margin-bottom: 28px; line-height: 1.7; }
.promo-img img { border-radius: 16px; width: 100%; max-height: 380px; object-fit: cover; }

/* ABOUT PAGE */
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
.about-text h2 { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 3vw, 2.5rem); color: #1a1209; margin-bottom: 20px; line-height: 1.25; }
.about-text p { color: #7a6552; line-height: 1.8; margin-bottom: 14px; font-size: 0.95rem; }
.about-img img { border-radius: 16px; width: 100%; box-shadow: 0 20px 60px rgba(139,94,60,.2); }
.about-values { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 24px; }
.about-value-item { display: flex; align-items: center; gap: 10px; font-size: 0.85rem; font-weight: 600; color: #3d2c1e; }
.about-value-item i { color: #8B5E3C; }

/* STATS */
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; text-align: center; }
.stat-item { color: white; }
.stat-num { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; color: #D4A843; display: block; margin-bottom: 6px; }
.stat-label { font-size: 0.85rem; color: rgba(255,255,255,.7); }

/* CONTACT */
.contact-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
.contact-form-box h2 { font-family: 'Playfair Display', serif; font-size: 1.8rem; color: #1a1209; margin-bottom: 8px; }
.contact-form-box > p { color: #7a6552; margin-bottom: 24px; }
.form-group { margin-bottom: 18px; }
.form-group label { display: block; font-size: 0.82rem; font-weight: 600; color: #3d2c1e; margin-bottom: 6px; }
.form-group input, .form-group select, .form-group textarea {
  width: 100%; border: 1.5px solid #e0d5c5; border-radius: 12px;
  padding: 12px 16px; font-size: 0.9rem; font-family: 'Inter', sans-serif;
  color: #3d2c1e; background: white; outline: none; transition: all .3s;
}
.form-group input:focus, .form-group select:focus, .form-group textarea:focus {
  border-color: #8B5E3C; box-shadow: 0 0 0 3px rgba(139,94,60,.1);
}
.form-group textarea { resize: vertical; min-height: 120px; }
.contact-info h2 { font-family: 'Playfair Display', serif; font-size: 1.8rem; color: #1a1209; margin-bottom: 10px; }
.contact-info > p { color: #7a6552; margin-bottom: 24px; line-height: 1.7; }
.contact-cards { display: flex; flex-direction: column; gap: 14px; }
.contact-card {
  display: flex; align-items: flex-start; gap: 14px;
  padding: 16px 20px; background: #f0ebe3; border-radius: 12px;
  border: 1px solid #e0d5c5; transition: all .3s;
}
.contact-card:hover { border-color: #c69c72; background: white; }
.contact-card-icon {
  width: 42px; height: 42px; background: #8B5E3C;
  border-radius: 10px; display: flex; align-items: center; justify-content: center;
  color: white; font-size: 1rem; flex-shrink: 0;
}
.contact-card strong { display: block; font-size: 0.83rem; color: #1a1209; margin-bottom: 2px; }
.contact-card span { font-size: 0.9rem; color: #8B5E3C; font-weight: 600; }

/* NEWSLETTER */
.newsletter-inner { display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap; }
.newsletter-inner h2 { font-family: 'Playfair Display', serif; font-size: 1.7rem; color: white; margin-bottom: 6px; }
.newsletter-inner > div > p { color: rgba(255,255,255,.8); }
.newsletter-form { display: flex; gap: 12px; flex-wrap: wrap; }
.newsletter-form input { flex: 1; min-width: 220px; border: none; border-radius: 50px; padding: 12px 22px; font-size: 0.9rem; outline: none; }

/* FOOTER */
.footer { background: #1a1209; padding-top: 60px; }
.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; padding-bottom: 48px; }
.footer-brand p { color: rgba(255,255,255,.5); font-size: 0.87rem; line-height: 1.7; margin-top: 12px; }
.footer-col h4 { font-family: 'Playfair Display', serif; font-size: 1rem; color: white; margin-bottom: 18px; }
.footer-col ul li { margin-bottom: 10px; }
.footer-col ul li a { color: rgba(255,255,255,.5); font-size: 0.87rem; transition: all .3s; }
.footer-col ul li a:hover { color: #c69c72; padding-left: 4px; }
.footer-contact li { display: flex; align-items: center; gap: 10px; color: rgba(255,255,255,.55); font-size: 0.87rem; margin-bottom: 12px; }
.footer-contact li i { color: #c69c72; width: 16px; flex-shrink: 0; }
.footer-social { display: flex; gap: 10px; margin-top: 20px; }
.footer-social a {
  width: 36px; height: 36px; background: rgba(255,255,255,.08); border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,.55); font-size: .95rem; transition: all .3s;
}
.footer-social a:hover { background: #8B5E3C; color: white; transform: translateY(-3px); }
.footer-bottom { border-top: 1px solid rgba(255,255,255,.08); padding: 18px 0; }
.footer-bottom .container { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }
.footer-bottom p { color: rgba(255,255,255,.35); font-size: 0.8rem; }

/* MISC */
.whatsapp-float {
  position: fixed; bottom: 24px; right: 24px;
  width: 54px; height: 54px; background: #25D366; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: white; font-size: 1.5rem;
  box-shadow: 0 6px 24px rgba(37,211,102,.4); z-index: 9990; transition: all .3s;
}
.whatsapp-float:hover { transform: scale(1.1); }
.scroll-top {
  position: fixed; bottom: 88px; right: 24px;
  width: 42px; height: 42px; background: #8B5E3C;
  color: white; border: none; border-radius: 50%;
  cursor: pointer; font-size: .85rem;
  box-shadow: 0 8px 30px rgba(139,94,60,.15); z-index: 9990;
  opacity: 0; pointer-events: none; transition: all .3s;
  display: flex; align-items: center; justify-content: center;
}
.scroll-top.visible { opacity: 1; pointer-events: all; }
.scroll-top:hover { background: #6d4a2e; transform: translateY(-3px); }
.icon-btn {
  width: 40px; height: 40px; border: none; background: none;
  cursor: pointer; border-radius: 8px; display: flex; align-items: center;
  justify-content: center; font-size: 1rem; color: #3d2c1e; transition: all .3s;
}
.icon-btn:hover { background: #f0ebe3; color: #8B5E3C; }
.menu-btn { display: none; }

/* CART */
.cart-overlay { position: fixed; inset: 0; background: rgba(26,18,9,.55); z-index: 1100; opacity: 0; pointer-events: none; transition: opacity .3s; }
.cart-overlay.active { opacity: 1; pointer-events: all; }
.cart-sidebar {
  position: fixed; top: 0; right: -420px; width: 420px; height: 100%;
  background: white; z-index: 1200; display: flex; flex-direction: column;
  box-shadow: 0 20px 60px rgba(139,94,60,.2); transition: right .4s cubic-bezier(.4,0,.2,1);
}
.cart-sidebar.open { right: 0; }
.cart-header { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px; border-bottom: 1px solid #e0d5c5; }
.cart-header h3 { font-family: 'Playfair Display', serif; font-size: 1.15rem; color: #1a1209; }
.cart-header h3 span { font-size: .8rem; color: #7a6552; font-family: 'Inter', sans-serif; font-weight: 400; }
.cart-close { background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #7a6552; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: all .3s; }
.cart-close:hover { background: #f0ebe3; }
.cart-items { flex: 1; overflow-y: auto; padding: 16px 24px; }
.cart-item { display: flex; gap: 14px; padding: 14px 0; border-bottom: 1px solid #f0ebe3; }
.cart-item-img { width: 70px; height: 70px; border-radius: 10px; object-fit: cover; flex-shrink: 0; background: #f0ebe3; }
.cart-item-info { flex: 1; }
.cart-item-name { font-size: .9rem; font-weight: 600; color: #1a1209; margin-bottom: 4px; line-height: 1.3; }
.cart-item-price { font-size: .95rem; font-weight: 700; color: #8B5E3C; margin-bottom: 8px; }
.cart-item-actions { display: flex; align-items: center; gap: 6px; }
.qty-btn { width: 26px; height: 26px; border: 1.5px solid #e0d5c5; background: white; border-radius: 6px; cursor: pointer; font-size: .85rem; font-weight: 700; display: flex; align-items: center; justify-content: center; color: #3d2c1e; transition: all .3s; }
.qty-btn:hover { border-color: #8B5E3C; color: #8B5E3C; }
.qty-val { font-size: .9rem; font-weight: 600; min-width: 20px; text-align: center; }
.cart-item-remove { margin-left: auto; background: none; border: none; color: #7a6552; cursor: pointer; font-size: .85rem; transition: all .3s; padding: 4px; }
.cart-item-remove:hover { color: #d63031; }
.cart-footer { padding: 18px 24px; border-top: 1px solid #e0d5c5; }
.cart-total-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.cart-total-row strong { font-size: 1.2rem; color: #8B5E3C; font-weight: 700; }
.checkout-btn { width: 100%; justify-content: center; }

/* HERO */
.hero-badge { display: inline-block; font-size: .72rem; font-weight: 700; letter-spacing: 4px; color: #D4A843; margin-bottom: 16px; }
.hero-sub { font-size: 1.05rem; color: rgba(255,255,255,.85); margin-bottom: 32px; max-width: 500px; }
.hero-btns { display: flex; gap: 16px; flex-wrap: wrap; }
.hero-accent { color: #D4A843; }

/* TESTIMONIALS (index) */
.testimonial-stars { color: #D4A843; font-size: 1rem; margin-bottom: 14px; }
.testimonial-author { display: flex; align-items: center; gap: 12px; }
.testimonial-avatar { width: 42px; height: 42px; background: linear-gradient(135deg, #8B5E3C, #c69c72); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: .8rem; flex-shrink: 0; }
.testimonial-author strong { display: block; font-size: .9rem; color: #1a1209; }
.testimonial-author span { font-size: .78rem; color: #7a6552; }

.link { color: #8B5E3C; text-decoration: underline; }
.btn-outline-dark { background: transparent; color: #8B5E3C; border: 2px solid #8B5E3C; }
.btn-outline-dark:hover { background: #8B5E3C; color: white; }

/* RESPONSIVE EXTRAS */
@media (max-width: 1100px) {
  .products-layout { grid-template-columns: 220px 1fr; }
}
@media (max-width: 900px) {
  .products-layout { grid-template-columns: 1fr; }
  .products-sidebar { display: none; }
  .products-main .products-grid { grid-template-columns: repeat(2, 1fr); }
  .about-grid, .contact-layout, .promo-inner { grid-template-columns: 1fr; gap: 32px; }
  .promo-img { display: none; }
  .footer-grid { grid-template-columns: 1.5fr 1fr 1fr; }
  .footer-brand { grid-column: span 3; }
  .cat-grid { grid-template-columns: 1fr 1fr; }
  .cat-large { grid-row: span 1; min-height: 200px; }
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .products-main .products-grid { grid-template-columns: 1fr; }
  .footer-grid { grid-template-columns: 1fr; }
  .footer-brand { grid-column: span 1; }
  .cart-sidebar { width: 100%; right: -100%; }
  .menu-btn { display: flex !important; }
  .nav { display: none; }
  .cat-grid { grid-template-columns: 1fr; }
  .newsletter-inner { flex-direction: column; text-align: center; }
}
"""

with open('style.css', 'r', encoding='utf-8') as f:
    content = f.read()

# Zaten eklenmediyse ekle
if 'products-layout' not in content:
    with open('style.css', 'a', encoding='utf-8') as f:
        f.write(css_to_append)
    print('CSS eklendi')
else:
    print('products-layout zaten mevcut, guncelleniyor...')
    # Eski blogu bul ve guncelle
    start_marker = '/* ==========================================\n   ÜRÜNLER / HAKKIMIZDA'
    if start_marker in content:
        idx = content.index(start_marker)
        content = content[:idx] + css_to_append.lstrip()
        with open('style.css', 'w', encoding='utf-8') as f:
            f.write(content)
        print('Guncellendi')
    else:
        with open('style.css', 'a', encoding='utf-8') as f:
            f.write(css_to_append)
        print('Append yapildi')
