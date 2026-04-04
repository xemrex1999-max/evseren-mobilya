// ==========================================
// MOBILYA DÜKKANIM — AI CHATBOT (Gemini API)
// ==========================================

// ⚡ AYAR: Google AI Studio'dan ücretsiz API key alın:
// https://aistudio.google.com/app/apikey
// Buraya yapıştırın:
const GEMINI_API_KEY = 'BURAYA_API_KEY_YAZIN';

// Chatbot sabitler
const BOT_NAME = 'Mobilya Asistanım';
const STORE_NAME = 'Mobilya Dükkanım';

// Sistem promptu — botun "kişiliği" ve ürün bilgileri
const SYSTEM_PROMPT = `Sen ${STORE_NAME} adlı Türk mobilya mağazasının yapay zeka müşteri hizmetleri asistanısın. Adın "Mobilya Asistanım".

MAĞAZA HAKKINDA:
- Türkiye geneli ücretsiz nakliye ve kurulum hizmeti veriyoruz
- 25+ yıl deneyim, 10.000+ mutlu müşteri
- İnegöl, Bursa merkezli üretim
- Ürünler masif ahşap ve gerçek deri kullanılarak üretiliyor
- Tüm ürünlerde 2 yıl garanti
- 12 aya kadar faizsiz taksit imkânı
- Telefon: 0850 XXX XX XX | WhatsApp: 0532 XXX XX XX

ÜRÜN KATEGORİLERİ VE FİYATLAR:
1. Düğün Paketleri: Majeste (₺89.500 → ₺105.000 indirimli), Delta (₺72.000 → ₺85.000), komple ev mobilyası
2. Yatak Odası: Zara (₺42.500), Lotta (₺38.900 YENİ), Vanessa (₺55.000 indirimli), Life (₺31.500), Trend (₺47.200)
3. Yemek Odası: Zara (₺28.750), Zara Siyah (₺33.400 YENİ)
4. Koltuk Takımı: Nova (₺15.600 YENİ)
5. Köşe Takımı: Puma (₺19.900 indirimli)
6. TV Ünitesi: Asil (₺8.750)

GÖREVLERIN:
- Müşterilere ürün önerisi sun
- Fiyat, teslimat, garanti sorularını yanıtla
- Sipariş vermelerini teşvik et
- WhatsApp: 0532 XXX XX XX numarasına yönlendir
- Sıcak, samimi ve kısa cevaplar ver
- Emoji kullanabilirsin ama fazla olmadan
- Her zaman Türkçe konuş

ÖNEMLI: Eğer özel ölçü, renk veya konfigürasyon isteniyorsa WhatsApp'a yönlendir.
Cevapların 2-3 cümleyi geçmesin. Kısa ve net ol.`;

// Mesaj geçmişi
let conversationHistory = [];
let isTyping = false;

// YARDIMCI: API durumu kontrol
function isApiKeySet() {
  return GEMINI_API_KEY && GEMINI_API_KEY !== 'BURAYA_API_KEY_YAZIN' && GEMINI_API_KEY.length > 10;
}

// MESAJ GÖNDER — Gemini API
async function sendToGemini(userMessage) {
  if (!isApiKeySet()) {
    return getDemoResponse(userMessage);
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

  // Geçmiş mesajları formatla
  const contents = [
    {
      role: 'user',
      parts: [{ text: SYSTEM_PROMPT }]
    },
    {
      role: 'model',
      parts: [{ text: 'Anlıyorum, Mobilya Dükkanım müşteri asistanıyım. Müşterilere yardımcı olmaya hazırım! 🛋️' }]
    },
    ...conversationHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    })),
    {
      role: 'user',
      parts: [{ text: userMessage }]
    }
  ];

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 256,
          topP: 0.9,
        }
      })
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('Gemini API hatası:', err);
      return 'Üzgünüm, şu anda yanıt veremiyorum. Lütfen WhatsApp\'tan ulaşın: 0532 XXX XX XX 📱';
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Anlamadım, tekrar sorar mısınız?';
  } catch (error) {
    console.error('Bağlantı hatası:', error);
    return 'Bağlantı sorunu. Lütfen WhatsApp\'tan yazın: 0532 XXX XX XX 📱';
  }
}

// DEMO MODU — API key yokken çalışır
function getDemoResponse(message) {
  const msg = message.toLowerCase();
  if (msg.includes('fiyat') || msg.includes('kaç') || msg.includes('ücret')) {
    return 'Ürün fiyatlarımız ₺8.750\'den başlamaktadır. Yatak odaları ₺31.500\'den, düğün paketleri ₺72.000\'den başlar. Özel fiyat için WhatsApp: 0532 XXX XX XX 💰';
  }
  if (msg.includes('teslimat') || msg.includes('kargo') || msg.includes('kurulum')) {
    return 'Türkiye genelinde ücretsiz nakliye ve kurulum yapıyoruz! Standart teslimat 7-14 iş günü, hızlı teslimat 3-5 iş günündür. 🚚';
  }
  if (msg.includes('düğün') || msg.includes('evlilik') || msg.includes('nikah')) {
    return 'Düğün paketlerimiz ₺72.000\'den başlıyor ve tüm ev mobilyasını kapsıyor! Ücretsiz kurulum dahil. Detaylı bilgi için WhatsApp: 0532 XXX XX XX 💍';
  }
  if (msg.includes('taksit') || msg.includes('ödeme') || msg.includes('kredi')) {
    return '6 aya kadar faizsiz taksit imkânımız var! Kredi kartı veya havale seçeneklerimiz mevcut. 💳';
  }
  if (msg.includes('garanti') || msg.includes('iade')) {
    return 'Tüm ürünlerimizde 2 yıl garanti ve 30 gün iade hakkı sunuyoruz. Kalite güvencemizdir! 🛡️';
  }
  if (msg.includes('merhaba') || msg.includes('selam') || msg.includes('iyi')) {
    return 'Merhaba! Mobilya Dükkanım\'a hoş geldiniz 😊 Size nasıl yardımcı olabilirim? Ürün bilgisi, fiyat veya sipariş için buradayım!';
  }
  return 'Size en iyi şekilde yardımcı olmak için WhatsApp\'tan da yazabilirsiniz: 0532 XXX XX XX 📞 Ya da sorularınızı sormaya devam edebilirsiniz!';
}

// WIDGET OLUŞTUR
function createChatbotWidget() {
  if (document.getElementById('chatbotWrapper')) return;

  const wrapper = document.createElement('div');
  wrapper.id = 'chatbotWrapper';

  wrapper.innerHTML = `
    <!-- CHAT WINDOW -->
    <div class="chatbot-window" id="chatbotWindow">
      <div class="chatbot-header">
        <div class="chatbot-avatar"><i class="fas fa-robot"></i></div>
        <div class="chatbot-header-info">
          <div class="chatbot-header-name">${BOT_NAME}</div>
          <div class="chatbot-header-status">
            <span class="chatbot-online-dot"></span> Çevrimiçi — Gemini AI
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
          placeholder="Soru sorun..."
          maxlength="500"
        />
        <button class="chatbot-send" id="chatbotSend">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
      <div class="chatbot-footer">
        Powered by <a href="https://ai.google.dev" target="_blank">Google Gemini AI</a>
      </div>
    </div>

    <!-- TOGGLE BUTTON -->
    <button class="chatbot-toggle" id="chatbotToggle" title="AI Asistan">
      <i class="fas fa-robot" id="chatbotIcon"></i>
      <span class="bot-badge">AI</span>
    </button>
  `;

  document.body.appendChild(wrapper);

  // Karşılama mesajı
  setTimeout(() => {
    addMessage('bot', 'Merhaba! 👋 ${STORE_NAME} yapay zeka asistanıyım.\n\nFiyat, teslimat, ürün bilgisi veya sipariş konusunda yardımcı olabilirim!'
      .replace('${STORE_NAME}', STORE_NAME));

    // API yoksa uyarı ekle
    if (!isApiKeySet()) {
      addApiWarning();
    }

    // Hızlı cevap butonları
    addQuickReplies([
      '💰 Fiyatlar nedir?',
      '🚚 Teslimat ne zaman?',
      '💍 Düğün paketleri',
      '💳 Taksit seçenekleri'
    ]);
  }, 800);

  bindEvents();
}

// OLAY DİNLEYİCİLERİ
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
    if (icon) icon.className = isOpen ? 'fas fa-robot' : 'fas fa-times';
  });

  closeBtn?.addEventListener('click', () => {
    window_.classList.remove('active');
    const icon = document.getElementById('chatbotIcon');
    if (icon) icon.className = 'fas fa-robot';
  });

  sendBtn?.addEventListener('click', handleSend);
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  });
}

// GÖNDERİM İŞLEYİCİSİ
async function handleSend() {
  const input = document.getElementById('chatbotInput');
  const sendBtn = document.getElementById('chatbotSend');
  const text = input?.value.trim();
  if (!text || isTyping) return;

  input.value = '';
  addMessage('user', text);
  conversationHistory.push({ role: 'user', content: text });

  // Yazıyor göstergesi
  isTyping = true;
  sendBtn.disabled = true;
  const typingId = showTyping();

  const reply = await sendToGemini(text);

  removeTyping(typingId);
  isTyping = false;
  sendBtn.disabled = false;

  addMessage('bot', reply);
  conversationHistory.push({ role: 'bot', content: reply });

  // Geçmişi en fazla 10 mesajda tut (token tasarrufu)
  if (conversationHistory.length > 10) {
    conversationHistory = conversationHistory.slice(-10);
  }
}

// MESAJ EKLE
function addMessage(role, text) {
  const container = document.getElementById('chatbotMessages');
  if (!container) return;

  const msg = document.createElement('div');
  msg.className = `chat-msg ${role}`;

  const avatarIcon = role === 'bot' ? 'fa-robot' : 'fa-user';
  const formattedText = text.replace(/\n/g, '<br>');

  msg.innerHTML = `
    <div class="chat-msg-avatar"><i class="fas ${avatarIcon}"></i></div>
    <div class="chat-msg-bubble">${formattedText}</div>
  `;
  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
}

// YAZMA GÖSTERGESİ
function showTyping() {
  const container = document.getElementById('chatbotMessages');
  const id = 'typing-' + Date.now();
  const el = document.createElement('div');
  el.id = id;
  el.className = 'chat-msg bot';
  el.innerHTML = `
    <div class="chat-msg-avatar"><i class="fas fa-robot"></i></div>
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

// HIZLI CEVAP BUTONLARI
function addQuickReplies(options) {
  const container = document.getElementById('chatbotMessages');
  if (!container) return;

  const qr = document.createElement('div');
  qr.className = 'chat-msg bot';
  qr.id = 'quickRepliesBlock';
  qr.innerHTML = `
    <div class="chat-msg-avatar" style="visibility:hidden"></div>
    <div class="chat-quick-replies">
      ${options.map(o => `<button class="quick-reply-btn">${o}</button>`).join('')}
    </div>`;
  container.appendChild(qr);

  qr.querySelectorAll('.quick-reply-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('chatbotInput').value = btn.textContent.replace(/^[^\w\s]+\s/, '');
      document.getElementById('quickRepliesBlock')?.remove();
      handleSend();
    });
  });
  container.scrollTop = container.scrollHeight;
}

// API UYARISI
function addApiWarning() {
  const container = document.getElementById('chatbotMessages');
  if (!container) return;
  const el = document.createElement('div');
  el.innerHTML = `
    <div class="chatbot-api-warning">
      ⚡ Demo mod aktif. Tam AI için
      <a href="https://aistudio.google.com/app/apikey" target="_blank">buradan</a>
      ücretsiz API key alın ve <code>chatbot.js</code>'ye ekleyin.
    </div>`;
  container.appendChild(el);
}

// BAŞLAT
document.addEventListener('DOMContentLoaded', createChatbotWidget);
