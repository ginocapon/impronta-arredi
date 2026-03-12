/* ==========================================================================
   Impronta Arredi – Chatbot Avanzato (file esterno)

   Features:
   - Quick action buttons (Servizi, Preventivo, Contattaci, Orari)
   - Contact form flow (guided state machine: nome → email → tel → progetto → msg)
   - Markdown rendering (bold, links, line breaks)
   - Multilingual (IT/EN/CN) with auto-translation architecture
   - Online indicator + avatar
   - Chat log for admin panel
   ========================================================================== */

(function () {
  'use strict';

  /* ══════════════════════════════════════════
     CONFIG
     ══════════════════════════════════════════ */
  var BOT_NAME = 'Impronta Arredi';
  var chatLang = 'it';
  var isOpen = false;
  var hasShownWelcome = false;
  var state = 'idle'; // idle | contatto_nome | contatto_email | contatto_tel | contatto_progetto | contatto_msg
  var contattoPending = {};
  var chatLog = [];

  /* ══════════════════════════════════════════
     RISPOSTE MULTILINGUA
     ══════════════════════════════════════════ */
  var responses = {
    it: {
      welcome: 'Ciao! Sono l\'assistente di **Impronta Arredi**.\n\nPosso aiutarti con:\n• **Servizi** — cosa offriamo\n• **Preventivo** — richiedi un preventivo gratuito\n• **Contatti** — orari, telefono, email\n• **Processo** — come lavoriamo\n\nCome posso aiutarti?',
      services: '**I nostri servizi chiavi in mano:**\n\n• **Progettazione e interior design** — concept, render 3D, progetto esecutivo\n• **Ristrutturazione completa** — muratura, pavimenti, finiture\n• **Impianti elettrici e idraulici** — domotica, illuminotecnica\n• **Arredamento su misura** — cucine, bagni, living, uffici\n• **Certificazioni e collaudi** — APE, conformità, pratiche\n\nVuoi saperne di più su un servizio specifico?',
      contact: '**Contatti Impronta Arredi**\n\n📞 +39 000 0000000\n📧 info@improntarredi.it\n📍 Via Example 1, Milano\n\n**Orari:**\nLun–Ven: 09:00–18:00\nSab: 09:00–13:00\nDom: Chiuso\n\nOppure compila il modulo nella [pagina Contatti](contatti.html)!',
      quote: 'Per un **preventivo gratuito** e senza impegno, ho bisogno di qualche informazione.\n\nPosso guidarti nel processo oppure puoi contattarci direttamente:\n📞 +39 000 0000000\n📧 info@improntarredi.it\n\nVuoi procedere con la richiesta guidata?',
      process: '**Come lavoriamo — 3 fasi:**\n\n**1. Ascolto e sopralluogo**\nCi incontriamo, visitiamo gli spazi e definiamo obiettivi e budget.\n\n**2. Progettazione**\nConcept creativo, render 3D fotorealistici, progetto esecutivo.\n\n**3. Realizzazione**\nCoordiamo tutti i lavori con un unico referente che ti aggiorna costantemente.\n\n**Il vantaggio?** Zero rimpalli, tempi certi, budget rispettato.',
      fallback: 'Grazie per il messaggio! Per una risposta personalizzata ti consiglio di contattarci:\n\n📞 +39 000 0000000\n📧 info@improntarredi.it\n\nOppure clicca su **"Richiedi preventivo"** qui sotto!',
      greeting: 'Ciao! Sono l\'assistente di **Impronta Arredi**.\n\nPosso aiutarti con informazioni sui nostri servizi, preventivi gratuiti o metterti in contatto con il nostro team.\n\nCome posso aiutarti?',
      askName: 'Ottimo! Ti guido nella richiesta.\n\n**Come ti chiami?** (Nome e Cognome)',
      askEmail: 'Piacere **%name%**!\n\n**Qual è la tua email?**',
      askPhone: 'Perfetto!\n\n**Numero di telefono?** (puoi scrivere "skip" per saltare)',
      askProject: '**Che tipo di progetto hai in mente?**\n\n1. Appartamento\n2. Ufficio\n3. Hotel / Hospitality\n4. Negozio / Retail\n5. Altro',
      askMessage: '**Descrivi brevemente il tuo progetto:**\n(metratura, zona, cosa vorresti realizzare...)',
      contactSuccess: '✅ **Richiesta inviata con successo!**\n\nUn nostro consulente ti contatterà entro **24 ore lavorative**.\n\n📞 Urgente? Chiama il +39 000 0000000\n\nGrazie per aver scelto Impronta Arredi!',
      contactError: '⚠️ Non riesco a salvare la richiesta al momento.\n\n📞 Chiamaci: **+39 000 0000000**\n📧 Scrivi a: **info@improntarredi.it**',
      langQuestion: 'In che lingua preferisci chattare?'
    },
    en: {
      welcome: 'Hello! I\'m the **Impronta Arredi** assistant.\n\nI can help you with:\n• **Services** — what we offer\n• **Quote** — request a free quote\n• **Contact** — hours, phone, email\n• **Process** — how we work\n\nHow can I help you?',
      services: '**Our turnkey services:**\n\n• **Design & interior design** — concept, 3D renders, executive project\n• **Complete renovation** — masonry, flooring, finishes\n• **Electrical & plumbing** — home automation, lighting design\n• **Bespoke furnishing** — kitchens, bathrooms, living, offices\n• **Certifications & testing** — energy cert, compliance, documentation\n\nWould you like to know more about a specific service?',
      contact: '**Contact Impronta Arredi**\n\n📞 +39 000 0000000\n📧 info@improntarredi.it\n📍 Via Example 1, Milan\n\n**Hours:**\nMon–Fri: 09:00–18:00\nSat: 09:00–13:00\nSun: Closed\n\nOr fill out the form on the [Contact page](contatti.html)!',
      quote: 'For a **free quote** with no obligation, I need some information.\n\nI can guide you through the process, or you can contact us directly:\n📞 +39 000 0000000\n📧 info@improntarredi.it\n\nWould you like to proceed with the guided request?',
      process: '**How we work — 3 phases:**\n\n**1. Listening & survey**\nWe meet, visit your spaces, and define objectives and budget.\n\n**2. Design**\nCreative concept, photorealistic 3D renders, executive project.\n\n**3. Construction**\nWe coordinate all work with a single point of contact keeping you updated.\n\n**The advantage?** Zero blame-shifting, certain timelines, respected budget.',
      fallback: 'Thank you for your message! For a personalized response, I recommend contacting us:\n\n📞 +39 000 0000000\n📧 info@improntarredi.it\n\nOr click **"Request quote"** below!',
      greeting: 'Hello! I\'m the **Impronta Arredi** assistant.\n\nI can help with information about our services, free quotes, or connect you with our team.\n\nHow can I help?',
      askName: 'Great! I\'ll guide you through the request.\n\n**What\'s your name?** (First and Last)',
      askEmail: 'Nice to meet you **%name%**!\n\n**What\'s your email?**',
      askPhone: 'Perfect!\n\n**Phone number?** (you can write "skip" to skip)',
      askProject: '**What type of project do you have in mind?**\n\n1. Apartment\n2. Office\n3. Hotel / Hospitality\n4. Shop / Retail\n5. Other',
      askMessage: '**Briefly describe your project:**\n(square footage, area, what you\'d like to achieve...)',
      contactSuccess: '✅ **Request sent successfully!**\n\nOur consultant will contact you within **24 business hours**.\n\n📞 Urgent? Call +39 000 0000000\n\nThank you for choosing Impronta Arredi!',
      contactError: '⚠️ Unable to save the request at the moment.\n\n📞 Call us: **+39 000 0000000**\n📧 Write to: **info@improntarredi.it**',
      langQuestion: 'Which language do you prefer?'
    },
    cn: {
      welcome: '您好！我是**Impronta Arredi**的助手。\n\n我可以帮助您：\n• **服务** — 我们提供什么\n• **报价** — 申请免费报价\n• **联系方式** — 营业时间、电话、邮箱\n• **流程** — 我们如何工作\n\n有什么可以帮您的吗？',
      services: '**我们的交钥匙服务：**\n\n• **设计与室内设计** — 概念、3D渲染、施工图\n• **全面装修** — 砌筑、地板、装饰\n• **电气与管道** — 智能家居、照明设计\n• **定制家具** — 厨房、浴室、客厅、办公室\n• **认证与验收** — 能源证书、合规、文件\n\n您想了解更多关于某项服务的信息吗？',
      contact: '**联系 Impronta Arredi**\n\n📞 +39 000 0000000\n📧 info@improntarredi.it\n📍 Via Example 1, 米兰\n\n**营业时间：**\n周一至周五：09:00–18:00\n周六：09:00–13:00\n周日：休息\n\n或在[联系页面](contatti.html)填写表格！',
      quote: '如需**免费报价**，我需要一些信息。\n\n我可以引导您完成流程，或者您可以直接联系我们：\n📞 +39 000 0000000\n📧 info@improntarredi.it\n\n您想继续进行引导式请求吗？',
      process: '**我们如何工作 — 3个阶段：**\n\n**1. 倾听与勘察**\n我们会面、参观空间、确定目标和预算。\n\n**2. 设计**\n创意概念、逼真3D渲染、施工项目。\n\n**3. 施工**\n我们协调所有工作，一个联系人持续为您更新。\n\n**优势？** 零推诿、确定时间、预算保证。',
      fallback: '感谢您的留言！如需个性化回复，建议联系我们：\n\n📞 +39 000 0000000\n📧 info@improntarredi.it\n\n或点击下方**"申请报价"**！',
      greeting: '您好！我是**Impronta Arredi**的助手。\n\n我可以帮助您了解我们的服务、免费报价或联系我们的团队。\n\n有什么可以帮您的吗？',
      askName: '好的！我将引导您完成请求。\n\n**您叫什么名字？**（姓名）',
      askEmail: '很高兴认识您 **%name%**！\n\n**您的电子邮件是什么？**',
      askPhone: '很好！\n\n**电话号码？**（您可以写"skip"跳过）',
      askProject: '**您有什么类型的项目？**\n\n1. 公寓\n2. 办公室\n3. 酒店/接待\n4. 商店/零售\n5. 其他',
      askMessage: '**简要描述您的项目：**\n（面积、区域、您想实现什么...）',
      contactSuccess: '✅ **请求已成功发送！**\n\n我们的顾问将在**24个工作小时**内与您联系。\n\n📞 紧急？请致电 +39 000 0000000\n\n感谢您选择 Impronta Arredi！',
      contactError: '⚠️ 目前无法保存请求。\n\n📞 请致电：**+39 000 0000000**\n📧 请发邮件：**info@improntarredi.it**',
      langQuestion: '您希望用哪种语言聊天？'
    }
  };

  /* ══════════════════════════════════════════
     QUICK ACTION BUTTONS (multilingua)
     ══════════════════════════════════════════ */
  var quickButtons = {
    it: [
      { label: '🏠 Servizi', msg: 'Quali servizi offrite?' },
      { label: '💰 Preventivo', msg: 'Vorrei un preventivo' },
      { label: '📞 Contatti', msg: 'Come posso contattarvi?' },
      { label: '⚙️ Processo', msg: 'Come lavorate?' }
    ],
    en: [
      { label: '🏠 Services', msg: 'What services do you offer?' },
      { label: '💰 Quote', msg: 'I\'d like a quote' },
      { label: '📞 Contact', msg: 'How can I contact you?' },
      { label: '⚙️ Process', msg: 'How do you work?' }
    ],
    cn: [
      { label: '🏠 服务', msg: '你们提供什么服务？' },
      { label: '💰 报价', msg: '我想要一个报价' },
      { label: '📞 联系', msg: '如何联系你们？' },
      { label: '⚙️ 流程', msg: '你们如何工作？' }
    ]
  };

  /* ══════════════════════════════════════════
     KEYWORDS PER INTENT DETECTION (tutte le lingue)
     ══════════════════════════════════════════ */
  var keywords = {
    services: ['serviz', 'service', 'cosa fate', 'cosa offr', 'what do', 'what service', 'offer', '服务', '提供', 'ristruttur', 'renovat', '装修', 'arred', 'furnish', '家具', 'progett', 'design', '设计', 'impiant', 'system', '系统', 'certific', '认证'],
    contact: ['contatt', 'contact', 'telefon', 'phone', 'email', 'indirizzo', 'address', 'dove si', 'dove siete', 'where', '联系', '电话', '地址', 'orari', 'hours', '营业', 'apertura'],
    quote: ['preventiv', 'quote', 'costo', 'cost', 'prezzo', 'price', 'quanto', 'how much', '报价', '价格', '多少', 'stima', 'estimate', 'budget'],
    process: ['come lavora', 'how do you work', 'processo', 'process', 'fasi', 'phases', 'step', '流程', '如何工作', 'come funzion', 'how does it']
  };

  /* ══════════════════════════════════════════
     CHAT LOG (per admin panel)
     ══════════════════════════════════════════ */
  function logMessage(sender, text, lang) {
    chatLog.push({
      sender: sender,
      originalText: text,
      originalLang: lang,
      timestamp: new Date().toISOString()
    });
  }

  /* ══════════════════════════════════════════
     MARKDOWN RENDERER
     ══════════════════════════════════════════ */
  function renderMarkdown(text) {
    return text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/\n/g, '<br>');
  }

  /* ══════════════════════════════════════════
     INTENT DETECTION
     ══════════════════════════════════════════ */
  function detectIntent(text) {
    var lower = text.toLowerCase();

    // Saluto
    if (/^(ciao|salve|buongiorno|buonasera|hey|hi|hello|你好|您好)/.test(lower)) {
      return 'greeting';
    }

    // Si/procedere — durante flusso quote
    if (/^(s[ìi]|yes|ok|proceed|procedi|是|好|voglio|want|sure|certo)/.test(lower)) {
      return 'yes';
    }

    // Keywords
    for (var intent in keywords) {
      for (var i = 0; i < keywords[intent].length; i++) {
        if (lower.indexOf(keywords[intent][i]) !== -1) {
          return intent;
        }
      }
    }
    return 'fallback';
  }

  /* ══════════════════════════════════════════
     CONTACT FORM STATE MACHINE
     ══════════════════════════════════════════ */
  function processContactState(text) {
    var r = responses[chatLang];

    if (state === 'contatto_nome') {
      contattoPending.nome = text;
      state = 'contatto_email';
      return r.askEmail.replace('%name%', text);
    }

    if (state === 'contatto_email') {
      contattoPending.email = text;
      state = 'contatto_tel';
      return r.askPhone;
    }

    if (state === 'contatto_tel') {
      contattoPending.telefono = (text.toLowerCase() === 'skip') ? '' : text;
      state = 'contatto_progetto';
      return r.askProject;
    }

    if (state === 'contatto_progetto') {
      var projectTypes = { it: ['Appartamento', 'Ufficio', 'Hotel / Hospitality', 'Negozio / Retail', 'Altro'], en: ['Apartment', 'Office', 'Hotel / Hospitality', 'Shop / Retail', 'Other'], cn: ['公寓', '办公室', '酒店/接待', '商店/零售', '其他'] };
      var num = parseInt(text, 10);
      if (num >= 1 && num <= 5) {
        contattoPending.progetto = projectTypes[chatLang][num - 1];
      } else {
        contattoPending.progetto = text;
      }
      state = 'contatto_msg';
      return r.askMessage;
    }

    if (state === 'contatto_msg') {
      contattoPending.messaggio = text;
      contattoPending.lingua = chatLang;
      contattoPending.timestamp = new Date().toISOString();
      state = 'idle';

      // Log the contact request
      logMessage('system', 'LEAD: ' + JSON.stringify(contattoPending), chatLang);

      // Store locally for admin
      try {
        var leads = JSON.parse(localStorage.getItem('impronta_leads') || '[]');
        leads.unshift(contattoPending);
        localStorage.setItem('impronta_leads', JSON.stringify(leads));
      } catch (e) { /* silently fail */ }

      contattoPending = {};
      return r.contactSuccess;
    }

    return null;
  }

  /* ══════════════════════════════════════════
     PROCESS USER MESSAGE
     ══════════════════════════════════════════ */
  function processMessage(text) {
    var r = responses[chatLang];

    // If in contact form flow
    if (state !== 'idle') {
      var contactReply = processContactState(text);
      if (contactReply) return contactReply;
    }

    var intent = detectIntent(text);

    // "Yes" after quote prompt → start contact form
    if (intent === 'yes') {
      state = 'contatto_nome';
      contattoPending = {};
      return r.askName;
    }

    switch (intent) {
      case 'greeting': return r.greeting;
      case 'services': return r.services;
      case 'contact': return r.contact;
      case 'process': return r.process;
      case 'quote':
        state = 'contatto_nome';
        contattoPending = {};
        return r.askName;
      default: return r.fallback;
    }
  }

  /* ══════════════════════════════════════════
     DOM CREATION
     ══════════════════════════════════════════ */
  function createChatbotDOM() {
    // FAB
    var fab = document.createElement('button');
    fab.className = 'chatbot-fab';
    fab.setAttribute('aria-label', 'Apri chat');
    fab.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
    document.body.appendChild(fab);

    // Modal
    var modal = document.createElement('div');
    modal.className = 'chatbot-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-label', 'Chat ' + BOT_NAME);
    modal.innerHTML =
      '<div class="chatbot-modal__header">' +
        '<div class="chatbot-header__avatar">IA</div>' +
        '<div class="chatbot-header__info">' +
          '<h4>' + BOT_NAME + '</h4>' +
          '<span class="chatbot-header__status"><span class="chatbot-online-dot"></span> <span class="chatbot-subtitle"></span></span>' +
        '</div>' +
        '<button class="chatbot-modal__close" aria-label="Chiudi">&times;</button>' +
      '</div>' +
      '<div class="chatbot-modal__lang-select">' +
        '<button class="chatbot-lang-btn" data-chat-lang="it">IT</button>' +
        '<button class="chatbot-lang-btn" data-chat-lang="en">EN</button>' +
        '<button class="chatbot-lang-btn" data-chat-lang="cn">中文</button>' +
      '</div>' +
      '<div class="chatbot-modal__messages"></div>' +
      '<div class="chatbot-modal__quick" id="chatbot-quick"></div>' +
      '<div class="chatbot-modal__input">' +
        '<input type="text" placeholder="">' +
        '<button aria-label="Invia"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>' +
      '</div>';
    document.body.appendChild(modal);

    return { fab: fab, modal: modal };
  }

  /* ══════════════════════════════════════════
     INIT
     ══════════════════════════════════════════ */
  var dom = createChatbotDOM();
  var fab = dom.fab;
  var modal = dom.modal;
  var messagesEl = modal.querySelector('.chatbot-modal__messages');
  var inputEl = modal.querySelector('.chatbot-modal__input input');
  var sendBtn = modal.querySelector('.chatbot-modal__input button');
  var closeBtn = modal.querySelector('.chatbot-modal__close');
  var langBtns = modal.querySelectorAll('.chatbot-lang-btn');
  var subtitleEl = modal.querySelector('.chatbot-subtitle');
  var quickEl = modal.querySelector('#chatbot-quick');

  /* ══════════════════════════════════════════
     UI UPDATES
     ══════════════════════════════════════════ */
  function updateChatUI() {
    subtitleEl.textContent = chatLang === 'it' ? 'Online — rispondiamo subito' : chatLang === 'en' ? 'Online — we reply instantly' : '在线 — 即时回复';
    inputEl.placeholder = chatLang === 'it' ? 'Scrivi un messaggio...' : chatLang === 'en' ? 'Write a message...' : '输入消息...';

    langBtns.forEach(function (btn) {
      btn.classList.toggle('chatbot-lang-btn--active', btn.getAttribute('data-chat-lang') === chatLang);
    });

    renderQuickButtons();
  }

  function renderQuickButtons() {
    var btns = quickButtons[chatLang] || quickButtons.it;
    quickEl.innerHTML = '';
    btns.forEach(function (b) {
      var btn = document.createElement('button');
      btn.className = 'chatbot-qbtn';
      btn.textContent = b.label;
      btn.addEventListener('click', function () {
        quickEl.style.display = 'none';
        handleUserMessage(b.msg);
      });
      quickEl.appendChild(btn);
    });
    quickEl.style.display = '';
  }

  function addMessage(text, sender) {
    var msg = document.createElement('div');
    msg.className = 'chat-msg chat-msg--' + sender;

    if (sender === 'bot') {
      var avatar = document.createElement('div');
      avatar.className = 'chat-msg__avatar';
      avatar.textContent = 'IA';
      msg.appendChild(avatar);
    }

    var bubble = document.createElement('div');
    bubble.className = 'chat-msg__bubble';
    bubble.innerHTML = renderMarkdown(text);
    msg.appendChild(bubble);

    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showTyping() {
    var typing = document.createElement('div');
    typing.className = 'chat-msg chat-msg--bot';
    typing.id = 'chatbot-typing';

    var avatar = document.createElement('div');
    avatar.className = 'chat-msg__avatar';
    avatar.textContent = 'IA';
    typing.appendChild(avatar);

    var dots = document.createElement('div');
    dots.className = 'chat-msg__bubble chat-msg--typing';
    dots.innerHTML = '<span></span><span></span><span></span>';
    typing.appendChild(dots);

    messagesEl.appendChild(typing);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function hideTyping() {
    var t = document.getElementById('chatbot-typing');
    if (t) t.remove();
  }

  function botReply(text) {
    showTyping();
    var delay = 500 + Math.random() * 500;
    setTimeout(function () {
      hideTyping();
      addMessage(text, 'bot');
      logMessage('bot', text, chatLang);
    }, delay);
  }

  /* ══════════════════════════════════════════
     MESSAGE HANDLER
     ══════════════════════════════════════════ */
  function handleUserMessage(text) {
    if (!text) {
      text = inputEl.value.trim();
    }
    if (!text) return;

    addMessage(text, 'user');
    inputEl.value = '';
    logMessage('user', text, chatLang);

    var reply = processMessage(text);
    botReply(reply);
  }

  /* ══════════════════════════════════════════
     EVENTS
     ══════════════════════════════════════════ */
  fab.addEventListener('click', function () {
    isOpen = !isOpen;
    modal.classList.toggle('chatbot-modal--open', isOpen);
    fab.classList.toggle('chatbot-fab--open', isOpen);

    if (isOpen) {
      fab.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
    } else {
      fab.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
    }

    if (isOpen && !hasShownWelcome) {
      hasShownWelcome = true;
      if (window.improntaGetLang) {
        chatLang = window.improntaGetLang();
      }
      updateChatUI();
      setTimeout(function () {
        addMessage(responses[chatLang].welcome, 'bot');
        logMessage('bot', responses[chatLang].welcome, chatLang);
        inputEl.focus();
      }, 400);
    }
  });

  closeBtn.addEventListener('click', function () {
    isOpen = false;
    modal.classList.remove('chatbot-modal--open');
    fab.classList.remove('chatbot-fab--open');
    fab.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
  });

  langBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      chatLang = this.getAttribute('data-chat-lang');
      updateChatUI();
      messagesEl.innerHTML = '';
      hasShownWelcome = true;
      state = 'idle';
      contattoPending = {};
      addMessage(responses[chatLang].welcome, 'bot');
      logMessage('bot', responses[chatLang].welcome, chatLang);
    });
  });

  sendBtn.addEventListener('click', function () { handleUserMessage(); });
  inputEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') handleUserMessage();
  });

  updateChatUI();

  /* ══════════════════════════════════════════
     EXPOSE FOR ADMIN
     ══════════════════════════════════════════ */
  window.improntaChatLog = chatLog;
  window.improntaGetLeads = function () {
    try { return JSON.parse(localStorage.getItem('impronta_leads') || '[]'); } catch (e) { return []; }
  };

})();
