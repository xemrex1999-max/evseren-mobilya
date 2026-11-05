// ==========================================
// EVSEREN MOBİLYA — AKILLI MÜŞTERİ ASİSTANI
// ==========================================

const BOT_NAME = 'Evseren Mobilya Asistanı';
const STORE_NAME = 'Evseren Mobilya';
const WHATSAPP_NUMBER = '+90 507 756 78 87';
const WHATSAPP_LINK = 'https://wa.me/905077567887';
const STORE_ADDRESS = 'Mahmudiye Mh. 14 Mob. Nil Sk. No:33, İnegöl / BURSA';

const ALL_QUICK_REPLIES = [
  '💰 Fiyatlar nedir?',
  '🛏️ Yatak odası modelleri',
  '🍽️ Yemek odası modelleri',
  '💍 Düğün paketleri',
  '🚚 Teslimat & Kurulum',
  '💳 Taksit & Kupon Kodu',
  '📦 Sipariş Takibi',
  '📍 Mağaza adresiniz'
];

let conversationHistory = [];
let isTyping = false;

function getSmartEvserenResponse(message) {
  const msg = message.toLocaleLowerCase('tr-TR');

  if (msg.includes('aynalı') || msg.includes('aynali')) {
    return '✨ <strong>Aynalı Koleksiyonumuz:</strong><br>• <strong>Aynalı Yatak Odası Takımı:</strong> ₺86.476 (14 parça detaylı görsel)<br>• <strong>Aynalı Yemek Odası Takımı:</strong> ₺81.394<br>Türkiye geneli ücretsiz nakliye ve kurulum dahildir! Detaylar için <a href="products.html?search=Aynal%C4%B1" style="color:#8b5e3c;font-weight:700;">buraya tıklayabilirsiniz</a>.';
  }
  if (msg.includes('bohem') || msg.includes('boğem')) {
    return '🌿 <strong>Bohem Koleksiyonumuz:</strong><br>• <strong>Bohem Yatak Odası Takımı:</strong> ₺88.170<br>• <strong>Bohem Yemek Odası Takımı:</strong> ₺68.689<br>1. sınıf fırınlanmış gürgen iskelet ve MDF kalitesiyle üretilmektedir. <a href="products.html?search=Bohem" style="color:#8b5e3c;font-weight:700;">Modelleri İncele →</a>';
  }
  if (msg.includes('buğlem') || msg.includes('buglem')) {
    return '👑 <strong>Buğlem Koleksiyonumuz:</strong><br>• <strong>Buğlem Yatak Odası Takımı:</strong> ₺89.864<br>• <strong>Buğlem Yemek Odası Takımı:</strong> ₺83.088<br>Geniş iç hacimli dolap ve frenli kapak sistemiyle çok tercih edilen modelimizdir.';
  }
  if (msg.includes('inci')) {
    return '💎 <strong>İnci Koleksiyonumuz (Fırsat Modeli):</strong><br>• <strong>İnci Yatak Odası Takımı:</strong> ₺79.700<br>• <strong>İnci Yemek Odası Takımı:</strong> ₺66.148<br>Hem şık hem ekonomik İnegöl tasarımımızdır.';
  }
  if (msg.includes('yatak')) {
    return '🛏️ <strong>Yatak Odası Takımlarımız:</strong><br>• İnci Yatak Odası: <strong>₺79.700</strong><br>• Aynalı Yatak Odası: <strong>₺86.476</strong><br>• Bohem Yatak Odası: <strong>₺88.170</strong><br>• Buğlem Yatak Odası: <strong>₺89.864</strong><br><a href="products.html?cat=yatak" style="color:#8b5e3c;font-weight:700;">Tüm Yatak Odalarını Gör →</a>';
  }
  if (msg.includes('yemek')) {
    return '🍽️ <strong>Yemek Odası Takımlarımız:</strong><br>• İnci Yemek Odası: <strong>₺66.148</strong><br>• Bohem Yemek Odası: <strong>₺68.689</strong><br>• Aynalı Yemek Odası: <strong>₺81.394</strong><br>• Buğlem Yemek Odası: <strong>₺83.088</strong><br><a href="products.html?cat=yemek" style="color:#8b5e3c;font-weight:700;">Tüm Yemek Odalarını Gör →</a>';
  }
  if (msg.includes('düğün') || msg.includes('dugun') || msg.includes('paket') || msg.includes('çeyiz')) {
    return '💍 <strong>Lüks İnegöl Düğün Paketimiz (%15 İndirimli):</strong><br>Yatak Odası + Yemek Odası + Koltuk Takımı komple setimiz ₺194.000 yerine <strong>₺164.900</strong>! Türkiye geneli ücretsiz nakliye ve kurulum dahildir. <a href="products.html?cat=dugun" style="color:#8b5e3c;font-weight:700;">Düğün Paketini İncele →</a>';
  }
  if (msg.includes('fiyat') || msg.includes('kaç') || msg.includes('ücret') || msg.includes('ne kadar')) {
    return '💰 <strong>Güncel Fiyat Aralıklarımız:</strong><br>• Yemek Odası Takımları: <strong>₺66.148 – ₺83.088</strong><br>• Yatak Odası Takımları: <strong>₺79.700 – ₺89.864</strong><br>• Komple Düğün Paketi: <strong>₺164.900</strong> (%15 İndirimli)<br>Tüm fiyatlarımıza KDV, tüm Türkiye nakliye ve uzman kurulum dahildir!';
  }
  if (msg.includes('teslimat') || msg.includes('kargo') || msg.includes('nakliye') || msg.includes('kurulum')) {
    return '🚚 <strong>Ücretsiz Nakliye & Kurulum:</strong><br>Bursa İnegöl üretim tesislerimizden Türkiye\'nin 81 iline kendi uzman ekibimizle <strong>ücretsiz teslimat ve evinizde kurulum</strong> yapıyoruz. Ortalama teslimat süremiz 7-14 iş günüdür.';
  }
  if (msg.includes('takip') || msg.includes('sipariş') || msg.includes('evs-')) {
    return '📦 Siparişinizin durumunu <a href="track-order.html" style="color:#8b5e3c;font-weight:700;">Sipariş Takibi</a> sayfamızdan <strong>EVS-...</strong> sipariş kodunuzla anlık olarak sorgulayabilirsiniz.';
  }
  if (msg.includes('taksit') || msg.includes('ödeme') || msg.includes('kredi') || msg.includes('havale') || msg.includes('kupon')) {
    return '💳 <strong>Ödeme & Kupon Fırsatı:</strong><br>Kredi kartına 6 aya varan taksit veya Havale/EFT ile güvenli ödeme yapabilirsiniz. Sepetinizde <code>EVSEREN10</code> kupon koduyla ekstra <strong>%10 indirim</strong> kazanabilirsiniz!';
  }
  if (msg.includes('adres') || msg.includes('nerede') || msg.includes('mağaza') || msg.includes('inegöl') || msg.includes('iletisim') || msg.includes('iletişim') || msg.includes('telefon')) {
    return `📍 <strong>Mağaza Adresimiz:</strong> ${STORE_ADDRESS}<br>📞 <strong>Telefon & WhatsApp:</strong> <a href="${WHATSAPP_LINK}" target="_blank" style="color:#8b5e3c;font-weight:700;">${WHATSAPP_NUMBER}</a><br>🕘 Çalışma Saatleri: Pzt–Cts 09:00–18:00`;
  }
  if (msg.includes('garanti') || msg.includes('iade') || msg.includes('malzeme') || msg.includes('kalite')) {
    return '🛡️ Tüm ürünlerimiz 1. sınıf fırınlanmış gürgen iskelet ve E1 kalitesinde MDF malzemeden üretilir, <strong>2 yıl tam garanti</strong> ve 30 gün kolay iade güvencesi altındadır.';
  }
  if (msg.includes('merhaba') || msg.includes('selam') || msg.includes('iyi günler')) {
    return 'Merhaba! 👋 <strong>Evseren Mobilya</strong> İnegöl mağazamıza hoş geldiniz. Aşağıdaki hızlı seçeneklerden birine tıklayabilir veya sorunuzu yazabilirsiniz!';
  }

  return `Size hemen yardımcı olalım! 🛋️ Güncel modellerimizi <a href="products.html" style="color:#8b5e3c;font-weight:700;">Ürünler</a> sayfamızdan inceleyebilir, aşağıdaki başlıklardan birini seçebilir veya doğrudan WhatsApp hattımızdan bize ulaşabilirsiniz: <a href="${WHATSAPP_LINK}" target="_blank" style="color:#25D366;font-weight:700;">${WHATSAPP_NUMBER}</a>`;
}

function createChatbotWidget() {
  if (document.getElementById('chatbotWrapper')) return;

  const wrapper = document.createElement('div');
  wrapper.id = 'chatbotWrapper';

  wrapper.innerHTML = `
    <div class="chatbot-window" id="chatbotWindow">
      <div class="chatbot-header">
        <div class="chatbot-avatar"><i class="fas fa-couch"></i></div>
        <div class="chatbot-header-info">
          <div class="chatbot-header-name">${BOT_NAME}</div>
          <div class="chatbot-header-status">
            <span class="chatbot-online-dot"></span> Çevrimiçi — İnegöl Müşteri Destek
          </div>
        </div>
        <button class="chatbot-close" id="chatbotClose" title="Kapat">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="chatbot-messages" id="chatbotMessages"></div>

      <div class="chatbot-input-area">
        <input
          type="text"
          class="chatbot-input"
          id="chatbotInput"
          placeholder="Model, fiyat veya teslimat sorun..."
          maxlength="500"
        />
        <button class="chatbot-send" id="chatbotSend">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
      <div class="chatbot-footer">
        Evseren Mobilya İnegöl • <a href="${WHATSAPP_LINK}" target="_blank">WhatsApp: ${WHATSAPP_NUMBER}</a>
      </div>
    </div>

    <button class="chatbot-toggle" id="chatbotToggle" title="Evseren Mobilya Asistanı">
      <i class="fas fa-comments" id="chatbotIcon"></i>
      <span class="bot-badge">Canlı</span>
    </button>
  `;

  document.body.appendChild(wrapper);

  setTimeout(() => {
    addMessage('bot', 'Merhaba! 👋 <strong>Evseren Mobilya</strong> dijital asistanıyım.<br><br>İnegöl yatak odası, yemek odası, düğün paketleri, fiyatlar veya ücretsiz kurulum hakkında size nasıl yardımcı olabilirim?');
    addQuickReplies(ALL_QUICK_REPLIES);
  }, 400);

  bindEvents();
}

function bindEvents() {
  const toggle = document.getElementById('chatbotToggle');
  const closeBtn = document.getElementById('chatbotClose');
  const input = document.getElementById('chatbotInput');
  const sendBtn = document.getElementById('chatbotSend');
  const window_ = document.getElementById('chatbotWindow');

  toggle?.addEventListener('click', () => {
    const isOpen = window_.classList.contains('active');
    window_.classList.toggle('active');
    const icon = document.getElementById('chatbotIcon');
    if (icon) icon.className = isOpen ? 'fas fa-comments' : 'fas fa-times';
  });

  closeBtn?.addEventListener('click', () => {
    window_.classList.remove('active');
    const icon = document.getElementById('chatbotIcon');
    if (icon) icon.className = 'fas fa-comments';
  });

  sendBtn?.addEventListener('click', handleSend);
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  });
}

async function handleSend() {
  const input = document.getElementById('chatbotInput');
  const sendBtn = document.getElementById('chatbotSend');
  const text = input?.value.trim();
  if (!text || isTyping) return;

  input.value = '';
  // Remove previous quick-replies block so it moves cleanly below the new answer
  document.getElementById('quickRepliesBlock')?.remove();

  addMessage('user', text);
  conversationHistory.push({ role: 'user', content: text });

  isTyping = true;
  sendBtn.disabled = true;
  const typingId = showTyping();

  await new Promise(r => setTimeout(r, 300));
  const reply = getSmartEvserenResponse(text);

  removeTyping(typingId);
  isTyping = false;
  sendBtn.disabled = false;

  addMessage('bot', reply);
  conversationHistory.push({ role: 'bot', content: reply });

  // Always show the remaining/all quick reply options below the answer so the user can keep clicking other questions!
  const norm = text.toLocaleLowerCase('tr-TR');
  const nextOptions = ALL_QUICK_REPLIES.filter(opt => !opt.toLocaleLowerCase('tr-TR').includes(norm));
  addQuickReplies(nextOptions.length >= 4 ? nextOptions : ALL_QUICK_REPLIES);
}

function addMessage(role, text) {
  const container = document.getElementById('chatbotMessages');
  if (!container) return;

  const msg = document.createElement('div');
  msg.className = `chat-msg ${role}`;

  const avatarIcon = role === 'bot' ? 'fa-couch' : 'fa-user';
  const formattedText = text.replace(/\n/g, '<br>');

  msg.innerHTML = `
    <div class="chat-msg-avatar"><i class="fas ${avatarIcon}"></i></div>
    <div class="chat-msg-bubble">${formattedText}</div>
  `;
  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
}

function showTyping() {
  const container = document.getElementById('chatbotMessages');
  const id = 'typing-' + Date.now();
  const el = document.createElement('div');
  el.id = id;
  el.className = 'chat-msg bot';
  el.innerHTML = `
    <div class="chat-msg-avatar"><i class="fas fa-couch"></i></div>
    <div class="chat-msg-bubble">
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    </div>`;
  container.appendChild(el);
  container.scrollTop = container.scrollHeight;
  return id;
}

function removeTyping(id) {
  document.getElementById(id)?.remove();
}

function addQuickReplies(options) {
  const container = document.getElementById('chatbotMessages');
  if (!container) return;

  document.getElementById('quickRepliesBlock')?.remove();

  const qr = document.createElement('div');
  qr.className = 'chat-msg bot';
  qr.id = 'quickRepliesBlock';
  qr.innerHTML = `
    <div class="chat-msg-avatar" style="visibility:hidden"></div>
    <div class="chat-quick-replies">
      <div style="width:100%; font-size:0.72rem; color:#8b5e3c; font-weight:700; margin-bottom:2px;">Başka ne sormak istersiniz?</div>
      ${options.map(o => `<button class="quick-reply-btn">${o}</button>`).join('')}
    </div>`;
  container.appendChild(qr);

  qr.querySelectorAll('.quick-reply-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('chatbotInput').value = btn.textContent.replace(/^[^\w\sÇĞİÖŞÜçğıöşü]+\s*/, '');
      handleSend();
    });
  });
  container.scrollTop = container.scrollHeight;
}

document.addEventListener('DOMContentLoaded', createChatbotWidget);
