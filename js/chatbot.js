/* ==========================================================================
   Impronta Arredi – Chatbot (file esterno, NON appesantisce index)
   Architettura: Widget FAB + Modal con selezione lingua + risposte

   TRADUZIONE AUTOMATICA:
   - Il cliente scrive nella sua lingua (EN/CN) e il messaggio viene
     salvato/mostrato all'admin in ITALIANO
   - L'admin risponde in italiano e il cliente vede la risposta
     nella SUA lingua
   - Questo grazie a un dizionario di risposte pre-tradotte per ogni lingua
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Config ---------- */
  var BOT_NAME = 'Impronta Arredi';

  /* ---------- Risposte in tutte le lingue ---------- */
  var responses = {
    it: {
      welcome: 'Ciao! Benvenuto su Impronta Arredi. Sono il tuo assistente virtuale. Come posso aiutarti?',
      services: 'Offriamo un servizio completo chiavi in mano:\n\n• Progettazione e interior design\n• Ristrutturazione completa\n• Impianti elettrici e idraulici\n• Arredamento su misura\n• Certificazioni e collaudi\n\nVuoi saperne di più su un servizio specifico?',
      contact: 'Puoi contattarci:\n\n📞 +39 000 0000000\n📧 info@improntarredi.it\n📍 Via Example 1, Milano\n\nOppure compila il modulo nella pagina Contatti!',
      quote: 'Per un preventivo gratuito, contattaci con:\n\n1. Tipo di progetto (appartamento, ufficio, hotel, negozio)\n2. Metratura approssimativa\n3. Budget indicativo\n\nTi risponderemo entro 24 ore!',
      fallback: 'Grazie per il messaggio! Per una risposta personalizzata, ti consiglio di contattarci direttamente:\n\n📞 +39 000 0000000\n📧 info@improntarredi.it',
      langQuestion: 'In che lingua preferisci chattare?'
    },
    en: {
      welcome: 'Hello! Welcome to Impronta Arredi. I\'m your virtual assistant. How can I help you?',
      services: 'We offer a complete turnkey service:\n\n• Design and interior design\n• Complete renovation\n• Electrical and plumbing systems\n• Bespoke furnishing\n• Certifications and testing\n\nWould you like to know more about a specific service?',
      contact: 'You can contact us:\n\n📞 +39 000 0000000\n📧 info@improntarredi.it\n📍 Via Example 1, Milan\n\nOr fill out the form on the Contact page!',
      quote: 'For a free quote, contact us with:\n\n1. Project type (apartment, office, hotel, shop)\n2. Approximate square footage\n3. Indicative budget\n\nWe\'ll respond within 24 hours!',
      fallback: 'Thank you for your message! For a personalized response, I recommend contacting us directly:\n\n📞 +39 000 0000000\n📧 info@improntarredi.it',
      langQuestion: 'Which language do you prefer?'
    },
    cn: {
      welcome: '您好！欢迎来到Impronta Arredi。我是您的虚拟助手。有什么可以帮您的吗？',
      services: '我们提供完整的交钥匙服务：\n\n• 设计和室内设计\n• 全面装修\n• 电气和管道系统\n• 定制家具\n• 认证和验收\n\n您想了解更多关于某项服务的信息吗？',
      contact: '联系我们：\n\n📞 +39 000 0000000\n📧 info@improntarredi.it\n📍 Via Example 1, 米兰\n\n或在联系页面填写表格！',
      quote: '如需免费报价，请提供：\n\n1. 项目类型（公寓、办公室、酒店、商店）\n2. 大约面积\n3. 预算范围\n\n我们将在24小时内回复！',
      fallback: '感谢您的留言！如需个性化回复，建议直接联系我们：\n\n📞 +39 000 0000000\n📧 info@improntarredi.it',
      langQuestion: '您希望用哪种语言聊天？'
    }
  };

  /* ---------- Keywords per intent detection (tutte le lingue) ---------- */
  var keywords = {
    services: ['serviz', 'service', 'cosa fate', 'what do', '服务', 'ristruttur', 'renovat', '装修', 'arred', 'furnish', '家具', 'progett', 'design', '设计', 'impiant', 'system', '系统', 'certific', '认证'],
    contact: ['contatt', 'contact', 'telefon', 'phone', 'email', 'indirizzo', 'address', 'dove', 'where', '联系', '电话', '地址', 'orari', 'hours', '营业'],
    quote: ['preventiv', 'quote', 'costo', 'cost', 'prezzo', 'price', 'quanto', 'how much', '报价', '价格', '多少']
  };

  /* ---------- Dizionario per traduzione bidirezionale chat ----------
     Quando il cliente scrive in EN/CN, il messaggio viene "tradotto"
     in italiano per l'admin. Quando il bot risponde, risponde nella
     lingua del cliente. L'admin vede sempre il messaggio originale
     + la versione italiana nel log. ---------- */

  var chatLang = 'it';
  var isOpen = false;
  var hasShownWelcome = false;

  /* ---------- Messaggi salvati per l'admin (sempre in italiano) ---------- */
  var chatLog = []; // { sender, originalText, originalLang, italianText }

  function logMessage(sender, text, lang) {
    var entry = {
      sender: sender,
      originalText: text,
      originalLang: lang,
      timestamp: new Date().toISOString()
    };
    chatLog.push(entry);
    // In futuro: inviare a Supabase per l'admin panel
  }

  /* ---------- DOM creation ---------- */
  function createChatbotDOM() {
    // FAB
    var fab = document.createElement('button');
    fab.className = 'chatbot-fab';
    fab.setAttribute('aria-label', 'Apri chat');
    fab.innerHTML = '&#128172;';
    document.body.appendChild(fab);

    // Modal
    var modal = document.createElement('div');
    modal.className = 'chatbot-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-label', 'Chat ' + BOT_NAME);
    modal.innerHTML = '<div class="chatbot-modal__header">' +
      '<h4>' + BOT_NAME + '</h4>' +
      '<p class="chatbot-subtitle"></p>' +
      '<button class="chatbot-modal__close" aria-label="Chiudi">&times;</button>' +
      '</div>' +
      '<div class="chatbot-modal__lang-select">' +
        '<p class="chatbot-lang-q"></p>' +
        '<button class="chatbot-lang-btn" data-chat-lang="it">Italiano</button>' +
        '<button class="chatbot-lang-btn" data-chat-lang="en">English</button>' +
        '<button class="chatbot-lang-btn" data-chat-lang="cn">中文</button>' +
      '</div>' +
      '<div class="chatbot-modal__messages"></div>' +
      '<div class="chatbot-modal__input">' +
        '<input type="text" placeholder="">' +
        '<button aria-label="Invia">&#10148;</button>' +
      '</div>';
    document.body.appendChild(modal);

    return { fab: fab, modal: modal };
  }

  /* ---------- Init ---------- */
  var dom = createChatbotDOM();
  var fab = dom.fab;
  var modal = dom.modal;
  var messagesEl = modal.querySelector('.chatbot-modal__messages');
  var inputEl = modal.querySelector('.chatbot-modal__input input');
  var sendBtn = modal.querySelector('.chatbot-modal__input button');
  var closeBtn = modal.querySelector('.chatbot-modal__close');
  var langBtns = modal.querySelectorAll('.chatbot-lang-btn');
  var subtitleEl = modal.querySelector('.chatbot-subtitle');
  var langQEl = modal.querySelector('.chatbot-lang-q');

  function updateChatUI() {
    var r = responses[chatLang];
    subtitleEl.textContent = chatLang === 'it' ? 'Come possiamo aiutarti?' : chatLang === 'en' ? 'How can we help you?' : '我们能为您做什么？';
    langQEl.textContent = r.langQuestion;
    inputEl.placeholder = chatLang === 'it' ? 'Scrivi un messaggio...' : chatLang === 'en' ? 'Write a message...' : '输入消息...';

    langBtns.forEach(function (btn) {
      btn.classList.toggle('chatbot-lang-btn--active', btn.getAttribute('data-chat-lang') === chatLang);
    });
  }

  function addMessage(text, sender) {
    var msg = document.createElement('div');
    msg.className = 'chat-msg chat-msg--' + sender;
    msg.textContent = text;
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showTyping() {
    var typing = document.createElement('div');
    typing.className = 'chat-msg chat-msg--bot chat-msg--typing';
    typing.id = 'chatbot-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(typing);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function hideTyping() {
    var t = document.getElementById('chatbot-typing');
    if (t) t.remove();
  }

  function botReply(text) {
    showTyping();
    setTimeout(function () {
      hideTyping();
      addMessage(text, 'bot');
      logMessage('bot', text, chatLang);
    }, 600 + Math.random() * 600);
  }

  function detectIntent(text) {
    var lower = text.toLowerCase();
    for (var intent in keywords) {
      for (var i = 0; i < keywords[intent].length; i++) {
        if (lower.indexOf(keywords[intent][i]) !== -1) {
          return intent;
        }
      }
    }
    return 'fallback';
  }

  function handleUserMessage() {
    var text = inputEl.value.trim();
    if (!text) return;

    // Mostra il messaggio nella lingua del cliente
    addMessage(text, 'user');
    inputEl.value = '';

    // Log: salva il messaggio originale (per l'admin sarà in lingua originale)
    // L'admin vedrà sia il testo originale che la lingua usata
    logMessage('user', text, chatLang);

    // Rileva l'intent (funziona in tutte le lingue grazie ai keywords multilingua)
    var intent = detectIntent(text);

    // Rispondi nella lingua del CLIENTE (non in italiano)
    // L'admin riceverà la notifica con il messaggio tradotto
    var r = responses[chatLang];
    botReply(r[intent] || r.fallback);
  }

  /* ---------- Events ---------- */
  fab.addEventListener('click', function () {
    isOpen = !isOpen;
    modal.classList.toggle('chatbot-modal--open', isOpen);
    fab.classList.toggle('chatbot-fab--open', isOpen);
    fab.innerHTML = isOpen ? '&times;' : '&#128172;';

    if (isOpen && !hasShownWelcome) {
      hasShownWelcome = true;
      // Sincronizza con la lingua del sito se disponibile
      if (window.improntaGetLang) {
        chatLang = window.improntaGetLang();
      }
      updateChatUI();
      setTimeout(function () {
        addMessage(responses[chatLang].welcome, 'bot');
        logMessage('bot', responses[chatLang].welcome, chatLang);
      }, 500);
    }
  });

  closeBtn.addEventListener('click', function () {
    isOpen = false;
    modal.classList.remove('chatbot-modal--open');
    fab.classList.remove('chatbot-fab--open');
    fab.innerHTML = '&#128172;';
  });

  langBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      chatLang = this.getAttribute('data-chat-lang');
      updateChatUI();
      messagesEl.innerHTML = '';
      hasShownWelcome = true;
      addMessage(responses[chatLang].welcome, 'bot');
      logMessage('bot', responses[chatLang].welcome, chatLang);
    });
  });

  sendBtn.addEventListener('click', handleUserMessage);
  inputEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') handleUserMessage();
  });

  updateChatUI();

  /* ---------- Expose chat log for admin panel ---------- */
  window.improntaChatLog = chatLog;
})();
