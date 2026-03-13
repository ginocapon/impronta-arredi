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

/* ==========================================================================
   Mobile CTA Bar — WhatsApp + Chiamata (appaiono allo scroll)
   ========================================================================== */
(function () {
  'use strict';
  var PHONE = '+393488621888';
  var WA_URL = 'https://wa.me/393488621888';

  // Solo su mobile (≤768px)
  function isMobile() { return window.innerWidth <= 768; }

  // Crea il DOM della barra CTA
  var bar = document.createElement('div');
  bar.className = 'mobile-cta-bar';
  bar.innerHTML =
    '<a href="' + WA_URL + '" target="_blank" rel="noopener" class="mobile-cta-bar__btn mobile-cta-bar__btn--whatsapp" aria-label="WhatsApp">' +
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>' +
      '<span>WhatsApp</span>' +
    '</a>' +
    '<a href="tel:' + PHONE + '" class="mobile-cta-bar__btn mobile-cta-bar__btn--call" aria-label="Chiama">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>' +
      '<span>Chiama</span>' +
    '</a>';
  document.body.appendChild(bar);

  // Mostra/nascondi allo scroll (solo mobile)
  var scrollShown = false;
  function checkScroll() {
    if (!isMobile()) {
      bar.classList.remove('mobile-cta-bar--visible');
      return;
    }
    if (window.scrollY > 80 && !scrollShown) {
      scrollShown = true;
      bar.classList.add('mobile-cta-bar--visible');
    } else if (window.scrollY <= 80 && scrollShown) {
      scrollShown = false;
      bar.classList.remove('mobile-cta-bar--visible');
    }
  }
  window.addEventListener('scroll', checkScroll, { passive: true });
  window.addEventListener('resize', checkScroll);
})();

/* ==========================================================================
   Chatbot — avvio ritardato 3s
   ========================================================================== */
setTimeout(function () {
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
     KNOWLEDGE BASE — 100+ FAQ (multilingua IT/EN/CN)
     Keyword-matched, risposte in 3 lingue.
     Log per il proprietario sempre in italiano (campo 'a').
     ══════════════════════════════════════════ */
  var knowledgeBase = [
    // === SERVIZI OFFERTI ===
    { keys: ['interior design', 'progettazione interni', 'design interni', 'interior decoration', '室内设计', '室内装饰'], a: 'Il nostro servizio di **interior design** comprende analisi degli spazi, concept creativo, progettazione esecutiva e render 3D fotorealistici. Ogni dettaglio viene definito prima dell\'inizio dei lavori.', a_en: 'Our **interior design** service includes space analysis, creative concept, executive design and photorealistic 3D renders. Every detail is defined before work begins.', a_cn: '我们的**室内设计**服务包括空间分析、创意概念、施工设计和逼真3D渲染。每个细节都在施工前确定。' },
    { keys: ['ristrutturazione', 'ristrutturare', 'lavori edili', 'renovation', 'remodel', '装修', '翻新'], a: 'Gestiamo **ristrutturazioni complete**: demolizioni, muratura, massetti, pavimentazioni, controsoffitti e tinteggiature con maestranze qualificate e materiali di prima scelta.', a_en: 'We manage **complete renovations**: demolitions, masonry, screeds, flooring, false ceilings and painting with qualified craftsmen and premium materials.', a_cn: '我们管理**全面翻新**：拆除、砌筑、找平、铺地、吊顶和粉刷，由合格工匠使用优质材料完成。' },
    { keys: ['arredamento su misura', 'mobili su misura', 'arredo personalizzato', 'custom furniture', 'bespoke furniture', '定制家具', '定制装修'], a: 'Progettiamo e realizziamo **arredamento su misura**: cucine, bagni, living, camere e uffici con materiali selezionati. Complementi d\'arredo, illuminazione e tessuti coordinati.', a_en: 'We design and build **custom furniture**: kitchens, bathrooms, living rooms, bedrooms and offices with selected materials. Coordinated accessories, lighting and fabrics.', a_cn: '我们设计和制造**定制家具**：厨房、浴室、客厅、卧室和办公室，使用精选材料。配套配饰、照明和面料。' },
    { keys: ['impianto elettrico', 'impianti elettrici', 'domotica', 'illuminotecnica', 'electrical', 'wiring', '电气', '电路'], a: 'Progettiamo e installiamo **impianti elettrici**, domotica, illuminotecnica, antintrusione e videosorveglianza. Tutto certificato secondo le normative vigenti.', a_en: 'We design and install **electrical systems**, home automation, lighting design, security and CCTV. All certified according to current regulations.', a_cn: '我们设计和安装**电气系统**、智能家居、照明设计、防盗和监控系统。全部按现行法规认证。' },
    { keys: ['impianto idraulico', 'impianti idraulici', 'riscaldamento', 'condizionamento', 'climatizzazione', 'plumbing', 'heating', 'air conditioning', '水暖', '空调', '暖通'], a: 'Realizziamo **impianti idrico-sanitari**, riscaldamento a pavimento, raffrescamento e ventilazione meccanica controllata. Efficienza energetica e comfort garantiti.', a_en: 'We install **plumbing systems**, underfloor heating, cooling and mechanical ventilation. Energy efficiency and comfort guaranteed.', a_cn: '我们安装**给排水系统**、地暖、制冷和机械通风系统。保证能源效率和舒适度。' },
    { keys: ['certificazione', 'certificazioni', 'collaudo', 'conformità', 'ape', 'certification', 'compliance', '认证', '合规'], a: 'Ci occupiamo di **tutte le certificazioni**: conformità impiantistica, collaudi, pratiche catastali e APE. Consegniamo il progetto con documentazione completa, pronta per l\'agibilità.', a_en: 'We handle **all certifications**: system compliance, testing, cadastral procedures and energy performance certificates. We deliver the project with complete documentation.', a_cn: '我们处理**所有认证**：系统合规性、测试、地籍手续和能源性能证书。我们交付完整文档的项目。' },
    { keys: ['chiavi in mano', 'turnkey', 'tutto incluso', 'servizio completo', 'full service', '交钥匙', '一站式'], a: 'Il nostro servizio **chiavi in mano** include: progettazione, ristrutturazione edile, impianti elettrici e idraulici, arredamento su misura e certificazioni. Un unico referente per tutto.', a_en: 'Our **turnkey service** includes: design, renovation, electrical and plumbing systems, custom furniture and certifications. One single point of contact for everything.', a_cn: '我们的**交钥匙服务**包括：设计、翻新、电气和水暖系统、定制家具和认证。一个联系人负责一切。' },
    { keys: ['render 3d', 'render', 'anteprima', 'visualizzazione', 'fotorealistico', '3d render', 'preview', '3D渲染', '效果图'], a: 'Realizziamo **render 3D fotorealistici** che permettono di visualizzare ogni dettaglio del progetto prima dell\'inizio dei lavori. Nessuna sorpresa, solo soddisfazione.', a_en: 'We create **photorealistic 3D renders** that allow you to visualise every project detail before work begins. No surprises, only satisfaction.', a_cn: '我们制作**逼真3D效果图**，让您在施工前看到项目的每个细节。没有意外，只有满意。' },
    { keys: ['pavimento', 'pavimentazione', 'parquet', 'gres', 'marmo', 'flooring', 'marble', 'tiles', '地板', '大理石', '瓷砖'], a: 'Installiamo ogni tipo di **pavimentazione**: parquet, gres porcellanato, marmo, pietra naturale, resina. Selezioniamo materiali premium per durabilità ed estetica.', a_en: 'We install every type of **flooring**: parquet, porcelain stoneware, marble, natural stone, resin. We select premium materials for durability and aesthetics.', a_cn: '我们安装各种**地板**：实木地板、瓷砖、大理石、天然石材、树脂。我们选择优质材料，兼顾耐用性和美观。' },
    { keys: ['controsoffitto', 'cartongesso', 'soffitto', 'false ceiling', 'drywall', '吊顶', '石膏板'], a: 'Realizziamo **controsoffitti** in cartongesso con illuminazione integrata, zone funzionali e finiture perfette per ogni ambiente.', a_en: 'We build **false ceilings** in plasterboard with integrated lighting, functional zones and perfect finishes for every room.', a_cn: '我们制作石膏板**吊顶**，配有集成照明、功能分区和完美的饰面。' },
    { keys: ['tinteggiatura', 'pittura', 'verniciatura', 'pareti', 'painting', 'wall finish', '粉刷', '墙面'], a: 'Offriamo **tinteggiature** di alta qualità: pitture decorative, stucco veneziano, effetti materici e colori personalizzati per ogni ambiente.', a_en: 'We offer high-quality **painting**: decorative paints, Venetian plaster, textured effects and custom colours for every room.', a_cn: '我们提供高品质**粉刷**：装饰涂料、威尼斯灰泥、质感效果和每个房间的定制颜色。' },
    { keys: ['demolizione', 'demolizioni', 'rimozione', 'demolition', 'removal', '拆除', '拆卸'], a: 'Gestiamo **demolizioni controllate** con smaltimento certificato dei materiali, nel rispetto delle normative ambientali e di sicurezza.', a_en: 'We manage **controlled demolitions** with certified material disposal, in compliance with environmental and safety regulations.', a_cn: '我们管理**可控拆除**，并按环保和安全法规进行认证材料处理。' },
    // === COSTI E PREVENTIVI ===
    { keys: ['quanto costa', 'prezzo', 'costo', 'tariffe', 'prezzi', 'how much', 'price', 'cost', '价格', '多少钱', '费用'], a: 'I costi variano in base alla complessità del progetto. Offriamo una **consulenza iniziale gratuita** con sopralluogo per preparare un preventivo dettagliato e trasparente, senza costi nascosti.', a_en: 'Costs vary based on project complexity. We offer a **free initial consultation** with site visit to prepare a detailed and transparent quote, with no hidden costs.', a_cn: '费用根据项目复杂程度而异。我们提供**免费初步咨询**和现场勘察，准备详细透明的报价，没有隐藏费用。' },
    { keys: ['preventivo gratuito', 'preventivo', 'stima costi', 'quanto viene', 'free quote', 'estimate', '免费报价', '估价'], a: 'Il **preventivo è gratuito** e senza impegno. Dopo il sopralluogo, riceverai un documento dettagliato con tutte le voci di spesa, materiali inclusi, senza sorprese.', a_en: 'The **quote is free** and without obligation. After the site visit, you will receive a detailed document with all cost items, materials included, no surprises.', a_cn: '**报价免费**且无任何义务。现场勘察后，您将收到详细的费用清单，包含所有材料，没有意外。' },
    { keys: ['pagamento', 'rate', 'finanziamento', 'come si paga', 'pagare', 'payment', 'instalment', 'financing', '付款', '分期'], a: 'Offriamo **modalità di pagamento flessibili** con acconti a stato avanzamento lavori. È possibile concordare piani personalizzati. Contattaci per i dettagli.', a_en: 'We offer **flexible payment options** with progress payments. Custom payment plans can be arranged. Contact us for details.', a_cn: '我们提供**灵活的付款方式**，按工程进度付款。可以安排定制付款计划。请联系我们了解详情。' },
    { keys: ['budget', 'risparmio', 'economico', 'risparmia', 'save money', '预算', '省钱'], a: 'Ottimizziamo il **budget** grazie alla gestione centralizzata: nessun costo nascosto, nessun ricarico da intermediari. Un preventivo unico e trasparente.', a_en: 'We optimise your **budget** through centralised management: no hidden costs, no middleman markups. One single, transparent quote.', a_cn: '我们通过集中管理优化**预算**：没有隐藏费用，没有中间商加价。一份透明的统一报价。' },
    { keys: ['costo metro quadro', 'costo al metro', 'prezzo mq', '€/mq', 'cost per sqm', 'price per square', '每平米价格', '单价'], a: 'Il costo al metro quadro dipende dal tipo di intervento e dai materiali scelti. Per una ristrutturazione completa di lusso, i costi partono da circa **800-1.500 €/mq**. Il sopralluogo gratuito permette una stima precisa.', a_en: 'The cost per square metre depends on the type of work and materials chosen. For a complete luxury renovation, costs start from approximately **€800-1,500/sqm**. The free site visit allows a precise estimate.', a_cn: '每平方米费用取决于工程类型和所选材料。豪华全面翻新费用从约**800-1,500欧元/平方米**起。免费现场勘察可提供精确估算。' },
    { keys: ['extra', 'costi aggiuntivi', 'imprevisti', 'sorprese', 'additional costs', 'hidden fees', '额外费用', '附加费'], a: 'Il nostro preventivo è **tutto incluso**. Eventuali varianti vengono concordate e approvate prima dell\'esecuzione. Zero sorprese economiche: è la nostra promessa.', a_en: 'Our quote is **all-inclusive**. Any changes are agreed and approved before execution. Zero financial surprises: that is our promise.', a_cn: '我们的报价**全包**。任何变更在执行前都会协商并批准。零经济意外：这是我们的承诺。' },
    { keys: ['caparra', 'acconto', 'deposito', 'deposit', 'down payment', '定金', '预付款'], a: 'Richiediamo un **acconto iniziale** alla firma del contratto, con successivi pagamenti a stato avanzamento lavori (SAL). Le modalità esatte vengono concordate nel contratto.', a_en: 'We require an **initial deposit** upon contract signing, with subsequent progress payments (SAL). Exact terms are agreed in the contract.', a_cn: '我们要求在签署合同时支付**首付款**，后续按工程进度付款。具体条款在合同中约定。' },
    { keys: ['iva', 'agevolazione fiscale', 'detrazione', 'bonus', 'bonus ristrutturazione', 'tax deduction', 'tax benefit', '税收优惠', '减税'], a: 'Le ristrutturazioni possono beneficiare di **agevolazioni fiscali** come il bonus ristrutturazione (50%) e l\'ecobonus (65%). Vi assistiamo nella gestione delle pratiche per le detrazioni.', a_en: 'Renovations can benefit from **tax incentives** such as the renovation bonus (50%) and eco-bonus (65%). We assist you with the paperwork for deductions.', a_cn: '翻新可以享受**税收优惠**，如翻新奖金（50%）和生态奖金（65%）。我们协助您办理减税手续。' },
    // === TEMPI DI REALIZZAZIONE ===
    { keys: ['quanto tempo', 'tempistiche', 'tempi', 'durata', 'consegna', 'quando finisce', 'how long', 'timeline', 'duration', 'delivery', '多长时间', '工期', '交付'], a: 'I tempi variano per complessità: un **appartamento medio** richiede 3-6 mesi, un **ufficio** 2-4 mesi, un **hotel** 6-12 mesi. Definiamo una timeline dettagliata al sopralluogo iniziale.', a_en: 'Timelines vary by complexity: an **average apartment** takes 3-6 months, an **office** 2-4 months, a **hotel** 6-12 months. We define a detailed timeline at the initial site visit.', a_cn: '工期因复杂程度而异：**普通公寓**需要3-6个月，**办公室**2-4个月，**酒店**6-12个月。我们在初次现场勘察时制定详细时间表。' },
    { keys: ['ritardo', 'ritardi', 'penale', 'in tempo', 'delay', 'on time', 'penalty', '延期', '准时'], a: 'Grazie alla **gestione centralizzata**, minimizziamo i ritardi. Ogni fase è pianificata in sequenza. In caso di imprevisti, comunichiamo immediatamente e proponiamo soluzioni.', a_en: 'Thanks to **centralised management**, we minimise delays. Every phase is planned in sequence. In case of unforeseen events, we communicate immediately and propose solutions.', a_cn: '由于**集中管理**，我们将延误降至最低。每个阶段按顺序规划。如有意外，我们立即沟通并提出解决方案。' },
    { keys: ['inizio lavori', 'quando iniziate', 'partenza', 'avvio', 'when do you start', 'start date', '何时开工', '开始'], a: 'Dopo l\'approvazione del progetto e l\'ottenimento dei permessi necessari, i **lavori iniziano** generalmente entro 2-4 settimane. Il sopralluogo e la progettazione richiedono circa 3-4 settimane.', a_en: 'After project approval and obtaining necessary permits, **work begins** generally within 2-4 weeks. The site visit and design phase take approximately 3-4 weeks.', a_cn: '项目批准并获得必要许可后，**施工通常**在2-4周内开始。现场勘察和设计阶段大约需要3-4周。' },
    { keys: ['fasi', 'step', 'passaggi', 'processo lavorativo', 'phases', 'stages', 'workflow', '流程', '步骤', '阶段'], a: 'Il nostro processo in **3 fasi**: 1) Ascolto e sopralluogo 2) Progettazione con render 3D 3) Realizzazione con unico referente. Ogni fase ha tempistiche definite.', a_en: 'Our **3-phase process**: 1) Consultation and site visit 2) Design with 3D renders 3) Execution with a single point of contact. Each phase has defined timelines.', a_cn: '我们的**三阶段流程**：1）咨询和现场勘察 2）3D效果图设计 3）由单一负责人执行。每个阶段都有明确的时间表。' },
    { keys: ['sopralluogo', 'prima visita', 'consulenza iniziale', 'site visit', 'first visit', 'consultation', '现场勘察', '首次咨询'], a: 'Il **sopralluogo iniziale è gratuito**: visitiamo gli spazi, ascoltiamo le vostre esigenze e definiamo insieme obiettivi e budget. Durata circa 1-2 ore.', a_en: 'The **initial site visit is free**: we visit the spaces, listen to your needs and define objectives and budget together. Duration approximately 1-2 hours.', a_cn: '**初次现场勘察免费**：我们参观空间，倾听您的需求，共同确定目标和预算。时间约1-2小时。' },
    // === MATERIALI E FORNITORI ===
    { keys: ['materiali', 'qualità materiali', 'che materiali', 'materials', 'quality', '材料', '质量'], a: 'Selezioniamo **materiali premium** dai migliori produttori italiani e internazionali: ceramiche, marmi, legni pregiati, tessuti di alta gamma. Ogni materiale è certificato e garantito.', a_en: 'We select **premium materials** from the best Italian and international manufacturers: ceramics, marbles, fine woods, high-end fabrics. Every material is certified and guaranteed.', a_cn: '我们从最好的意大利和国际制造商中选择**优质材料**：陶瓷、大理石、名贵木材、高档面料。每种材料都经过认证和保证。' },
    { keys: ['fornitori', 'brand', 'marche', 'suppliers', 'brands', '供应商', '品牌'], a: 'Collaboriamo con i **migliori fornitori** italiani e internazionali: B&B Italia, Poliform, Minotti, Flos, e molti altri. Selezioniamo brand che garantiscono qualità e design senza compromessi.', a_en: 'We work with the **best suppliers** Italian and international: B&B Italia, Poliform, Minotti, Flos, and many more. We select brands that guarantee quality and design without compromise.', a_cn: '我们与**最佳供应商**合作：B&B Italia、Poliform、Minotti、Flos等众多意大利和国际品牌。我们选择保证质量和设计的品牌。' },
    { keys: ['campioni', 'campionatura', 'toccare materiali', 'samples', 'swatches', '样品', '样板'], a: 'Prima di procedere, forniamo **campionature complete** di tutti i materiali proposti: potrete vedere e toccare ogni finitura, tessuto, legno e pietra.', a_en: 'Before proceeding, we provide **complete samples** of all proposed materials: you can see and touch every finish, fabric, wood and stone.', a_cn: '在继续之前，我们提供所有建议材料的**完整样品**：您可以看到和触摸每种饰面、面料、木材和石材。' },
    { keys: ['sostenibile', 'sostenibilità', 'ecologico', 'green', 'eco', 'sustainable', 'ecological', '可持续', '环保', '绿色'], a: 'Promuoviamo la **sostenibilità**: materiali eco-certificati, vernici a basso VOC, sistemi di recupero energetico e soluzioni per la riduzione dell\'impatto ambientale.', a_en: 'We promote **sustainability**: eco-certified materials, low-VOC paints, energy recovery systems and solutions to reduce environmental impact.', a_cn: '我们推广**可持续发展**：环保认证材料、低VOC涂料、能源回收系统和减少环境影响的解决方案。' },
    { keys: ['made in italy', 'italiano', 'artigianato', 'italian craftsmanship', '意大利制造', '手工艺'], a: 'Privilegiamo il **Made in Italy**: artigiani locali, materiali di produzione italiana e tradizione manifatturiera d\'eccellenza. La qualità italiana è il nostro marchio di fabbrica.', a_en: 'We favour **Made in Italy**: local craftsmen, Italian-made materials and a tradition of manufacturing excellence. Italian quality is our hallmark.', a_cn: '我们优先选择**意大利制造**：本地工匠、意大利生产的材料和卓越的制造传统。意大利品质是我们的标志。' },
    { keys: ['illuminazione', 'luci', 'lampade', 'light design', 'lighting', '照明', '灯光设计'], a: 'Il nostro servizio di **light design** include progettazione illuminotecnica, selezione apparecchi, sistemi dimmerabili e scenografie luminose per ogni ambiente.', a_en: 'Our **lighting design** service includes lighting engineering, fixture selection, dimmable systems and lighting scenography for every room.', a_cn: '我们的**灯光设计**服务包括照明工程、灯具选择、调光系统和每个空间的灯光场景设计。' },
    { keys: ['tessuti', 'tende', 'tendaggi', 'imbottiti', 'fabrics', 'curtains', 'upholstery', '面料', '窗帘', '软装'], a: 'Selezioniamo **tessuti d\'alta gamma** per divani, tende, cuscini e imbottiti. Coordinamo colori e texture per creare ambienti armonici e raffinati.', a_en: 'We select **high-end fabrics** for sofas, curtains, cushions and upholstery. We coordinate colours and textures to create harmonious and refined spaces.', a_cn: '我们为沙发、窗帘、靠垫和软垫选择**高端面料**。我们协调颜色和质感，打造和谐精致的空间。' },
    { keys: ['cucina', 'cucine', 'kitchen', '厨房'], a: 'Progettiamo **cucine su misura** con i migliori brand: piani in marmo, quarzo o Corian, elettrodomestici di alta gamma, sistemi di organizzazione interna intelligenti.', a_en: 'We design **custom kitchens** with the best brands: marble, quartz or Corian countertops, high-end appliances, smart internal organisation systems.', a_cn: '我们与最佳品牌合作设计**定制厨房**：大理石、石英或可丽耐台面、高端电器、智能内部收纳系统。' },
    { keys: ['bagno', 'bagni', 'sanitari', 'bathroom', '浴室', '卫生间'], a: 'Realizziamo **bagni di design**: rubinetteria premium, sanitari sospesi, docce walk-in, vasche freestanding, rivestimenti in marmo o mosaico. Ogni bagno è un\'opera d\'arte.', a_en: 'We create **designer bathrooms**: premium taps, wall-hung fixtures, walk-in showers, freestanding bathtubs, marble or mosaic cladding. Every bathroom is a work of art.', a_cn: '我们打造**设计师浴室**：高端龙头、壁挂式洁具、步入式淋浴、独立浴缸、大理石或马赛克装饰。每间浴室都是艺术品。' },
    // === CERTIFICAZIONI E PERMESSI ===
    { keys: ['cila', 'scia', 'permesso', 'permessi', 'pratica edilizia', 'autorizzazione', 'building permit', 'planning permission', '建筑许可', '审批'], a: 'Gestiamo **tutte le pratiche edilizie**: CILA, SCIA, permessi di costruire. Il nostro team tecnico si occupa di ogni aspetto burocratico con il Comune.', a_en: 'We handle **all building permits**: CILA, SCIA, construction permits. Our technical team manages every bureaucratic aspect with the Municipality.', a_cn: '我们处理**所有建筑许可**：CILA、SCIA、施工许可证。我们的技术团队负责与市政府的所有行政事务。' },
    { keys: ['catasto', 'catastale', 'accatastamento', 'variazione catastale', 'land registry', 'cadastral', '地籍', '房产登记'], a: 'Ci occupiamo delle **pratiche catastali**: variazioni, accatastamenti, planimetrie aggiornate. Tutto viene consegnato in regola per la compravendita o l\'affitto.', a_en: 'We handle **cadastral procedures**: variations, registrations, updated floor plans. Everything is delivered in order for sale or rental.', a_cn: '我们处理**地籍手续**：变更、登记、更新平面图。所有文件都按规定准备好，可用于买卖或租赁。' },
    { keys: ['sicurezza', 'normative', 'norma', 'a norma', 'legge', 'safety', 'regulations', 'compliance', '安全', '法规', '合规'], a: 'Tutti i nostri lavori rispettano le **normative vigenti**: sicurezza cantiere (D.Lgs. 81/2008), normativa antincendio, acustica, accessibilità. Certificazioni complete a fine lavori.', a_en: 'All our work complies with **current regulations**: site safety (D.Lgs. 81/2008), fire prevention, acoustics, accessibility. Complete certifications at end of works.', a_cn: '我们所有的工程都符合**现行法规**：施工安全（D.Lgs. 81/2008）、消防、声学、无障碍。工程完工后提供完整认证。' },
    { keys: ['agibilità', 'abitabilità', 'occupancy permit', 'habitation certificate', '居住许可', '入住证'], a: 'Consegniamo il progetto con tutta la **documentazione per l\'agibilità**: certificazioni impiantistiche, conformità edilizia, APE e collaudi.', a_en: 'We deliver the project with all **occupancy documentation**: system certifications, building compliance, energy performance certificates and testing.', a_cn: '我们交付项目时提供所有**入住文件**：系统认证、建筑合规、能源性能证书和检测报告。' },
    { keys: ['classe energetica', 'efficienza energetica', 'risparmio energetico', 'energy class', 'energy efficiency', '能源等级', '节能'], a: 'Progettiamo interventi per migliorare la **classe energetica**: isolamento, infissi performanti, impianti ad alta efficienza, pannelli solari. Consulenza APE inclusa.', a_en: 'We design interventions to improve the **energy class**: insulation, high-performance windows, efficient systems, solar panels. Energy performance consultation included.', a_cn: '我们设计提高**能源等级**的方案：隔热、高性能门窗、高效系统、太阳能板。包含能源性能咨询。' },
    // === ZONE SERVITE ===
    { keys: ['milano', 'dove siete', 'sede', 'zona', 'dove lavorate', 'milan', 'where are you', 'location', '米兰', '在哪里', '位置'], a: 'La nostra sede è a **Milano**, ma operiamo in tutta Italia e all\'estero. Abbiamo realizzato progetti a Roma, Firenze, Como, sulla costiera e in capitali europee.', a_en: 'Our headquarters are in **Milan**, but we operate throughout Italy and abroad. We have completed projects in Rome, Florence, Como, the coast and European capitals.', a_cn: '我们的总部在**米兰**，但我们在意大利各地和海外运营。我们在罗马、佛罗伦萨、科莫、海岸和欧洲各国首都完成了项目。' },
    { keys: ['roma', 'lazio', 'rome', '罗马'], a: 'Sì, lavoriamo anche a **Roma** e nel Lazio. Abbiamo completato diversi progetti nella capitale. Contattaci per verificare disponibilità e tempistiche.', a_en: 'Yes, we also work in **Rome** and Lazio. We have completed several projects in the capital. Contact us to check availability and timelines.', a_cn: '是的，我们也在**罗马**和拉齐奥工作。我们在首都完成了多个项目。请联系我们查询可用性和时间表。' },
    { keys: ['firenze', 'toscana', 'florence', 'tuscany', '佛罗伦萨', '托斯卡纳'], a: 'Operiamo anche in **Toscana**: Firenze, Siena, Lucca e zone limitrofe. Abbiamo esperienza con ville storiche e immobili di pregio toscani.', a_en: 'We also operate in **Tuscany**: Florence, Siena, Lucca and surrounding areas. We have experience with historic villas and prestigious Tuscan properties.', a_cn: '我们也在**托斯卡纳**运营：佛罗伦萨、锡耶纳、卢卡及周边地区。我们拥有历史别墅和托斯卡纳名贵房产的经验。' },
    { keys: ['como', 'lago', 'laghi', 'lake como', 'lakes', '科莫湖', '湖区'], a: 'Lavoriamo regolarmente nella zona dei **laghi**: Como, Garda, Maggiore. Ville e residenze di lusso sul lago sono una delle nostre specialità.', a_en: 'We regularly work in the **lakes area**: Como, Garda, Maggiore. Luxury villas and lakeside residences are one of our specialities.', a_cn: '我们经常在**湖区**工作：科莫、加尔达、马焦雷。湖畔豪华别墅和住宅是我们的专长之一。' },
    { keys: ['estero', 'internazionale', 'abroad', 'europa', 'international', 'europe', '海外', '国际', '欧洲'], a: 'Operiamo anche **all\'estero**: abbiamo realizzato progetti in Svizzera, Francia, UK e altre capitali europee. Contattaci per progetti internazionali.', a_en: 'We also operate **abroad**: we have completed projects in Switzerland, France, UK and other European capitals. Contact us for international projects.', a_cn: '我们也在**海外**运营：我们在瑞士、法国、英国和其他欧洲首都完成了项目。请联系我们了解国际项目。' },
    // === TIPOLOGIE DI PROGETTO ===
    { keys: ['appartamento', 'casa', 'residenza', 'abitazione', 'apartment', 'flat', 'home', 'residence', '公寓', '住宅', '房子'], a: 'Siamo specializzati in **appartamenti e residenze di pregio**: attici, loft, ville, bilocali di design. Dalla monolocale alla grande residenza, ogni spazio merita eccellenza.', a_en: 'We specialise in **luxury apartments and residences**: penthouses, lofts, villas, designer studios. From studio flats to grand residences, every space deserves excellence.', a_cn: '我们专注于**豪华公寓和住宅**：顶层公寓、阁楼、别墅、设计师工作室。从单间到大型住宅，每个空间都值得卓越。' },
    { keys: ['ufficio', 'uffici', 'office', 'workspace', 'coworking', '办公室', '工作空间'], a: 'Progettiamo **uffici e spazi di lavoro**: open space, sale riunioni, executive office, coworking. Design funzionale che migliora produttività e benessere.', a_en: 'We design **offices and workspaces**: open plan, meeting rooms, executive offices, coworking. Functional design that improves productivity and well-being.', a_cn: '我们设计**办公室和工作空间**：开放式、会议室、行政办公室、联合办公。功能性设计提升生产力和幸福感。' },
    { keys: ['hotel', 'albergo', 'hospitality', 'b&b', 'bed and breakfast', '酒店', '民宿', '接待'], a: 'Realizziamo **progetti hospitality**: boutique hotel, B&B di charme, resort. Dalla hall alle suite, progettiamo esperienze uniche per gli ospiti.', a_en: 'We deliver **hospitality projects**: boutique hotels, charming B&Bs, resorts. From lobby to suites, we design unique guest experiences.', a_cn: '我们承接**酒店项目**：精品酒店、特色民宿、度假村。从大堂到套房，我们设计独特的宾客体验。' },
    { keys: ['negozio', 'retail', 'boutique', 'showroom', 'commerciale', 'shop', 'store', '商店', '零售', '展厅'], a: 'Progettiamo **spazi retail e showroom**: vetrine, layout di vendita, illuminazione commerciale, arredi espositivi. Design che attrae e converte.', a_en: 'We design **retail spaces and showrooms**: shop windows, sales layouts, commercial lighting, display furniture. Design that attracts and converts.', a_cn: '我们设计**零售空间和展厅**：橱窗、销售布局、商业照明、展示家具。吸引并转化客户的设计。' },
    { keys: ['ristorante', 'bar', 'locale', 'food', 'ristorazione', 'restaurant', '餐厅', '酒吧'], a: 'Realizziamo **interni per la ristorazione**: ristoranti, bar, wine bar, bistrot. Ambienti che creano atmosfera e valorizzano l\'esperienza gastronomica.', a_en: 'We create **restaurant interiors**: restaurants, bars, wine bars, bistros. Spaces that create atmosphere and enhance the dining experience.', a_cn: '我们打造**餐饮内饰**：餐厅、酒吧、葡萄酒吧、小酒馆。营造氛围并提升美食体验的空间。' },
    { keys: ['attico', 'penthouse', 'terrazza', 'terrace', '顶层公寓', '露台'], a: 'Gli **attici** sono una delle nostre specialità: progettazione di terrazze panoramiche, giardini pensili, spazi living con vista. Lusso ai piani alti.', a_en: '**Penthouses** are one of our specialities: panoramic terrace design, roof gardens, living spaces with views. Luxury at the top.', a_cn: '**顶层公寓**是我们的专长之一：全景露台设计、屋顶花园、带景观的起居空间。顶层的奢华。' },
    { keys: ['villa', 'villetta', 'casa indipendente', 'detached house', '别墅', '独立屋'], a: 'Progettiamo **ville complete**: interni ed esterni, piscine, giardini, domotica avanzata. Dal cancello alla camera padronale, tutto su misura.', a_en: 'We design **complete villas**: interiors and exteriors, pools, gardens, advanced home automation. From the gate to the master bedroom, everything custom-made.', a_cn: '我们设计**完整别墅**：室内外、泳池、花园、先进智能家居。从大门到主卧，一切定制。' },
    { keys: ['loft', 'open space', 'spazio aperto', 'industrial space', '阁楼', '开放空间'], a: 'Trasformiamo **loft e spazi industriali** in ambienti di design: soppalchi, grandi vetrate, materiali grezzi combinati con finiture di lusso.', a_en: 'We transform **lofts and industrial spaces** into design environments: mezzanines, large windows, raw materials combined with luxury finishes.', a_cn: '我们将**阁楼和工业空间**改造成设计环境：夹层、大型窗户、原始材料与奢华饰面的结合。' },
    // === STILI DI DESIGN ===
    { keys: ['moderno', 'contemporaneo', 'minimal', 'minimalista', 'modern', 'contemporary', 'minimalist', '现代', '简约', '极简'], a: 'Lo stile **moderno e minimalista** è uno dei nostri punti di forza: linee pulite, materiali naturali, spazi luminosi e funzionali. Less is more, ma con sostanza.', a_en: 'The **modern and minimalist** style is one of our strengths: clean lines, natural materials, bright and functional spaces. Less is more, with substance.', a_cn: '**现代简约**风格是我们的强项之一：简洁线条、天然材料、明亮实用的空间。少即是多，但有内涵。' },
    { keys: ['classico', 'tradizionale', 'neoclassico', 'classic', 'traditional', 'neoclassical', '古典', '传统', '新古典'], a: 'Realizziamo anche interni in stile **classico e neoclassico**: boiserie, stucchi, marmi pregiati, arredi di ispirazione storica rivisitati in chiave contemporanea.', a_en: 'We also create **classic and neoclassical** interiors: wood panelling, stucco, fine marbles, historically inspired furniture reinterpreted in a contemporary key.', a_cn: '我们也打造**古典和新古典**风格室内：木质护墙板、灰泥装饰、名贵大理石、以当代方式重新诠释的历史风格家具。' },
    { keys: ['lusso', 'luxury', 'di lusso', 'alta gamma', 'esclusivo', 'exclusive', 'high-end', '奢华', '豪华', '高端'], a: 'Il **lusso** è il nostro DNA: materiali pregiati, finiture impeccabili, dettagli su misura. Non è solo estetica, è un\'esperienza da vivere ogni giorno.', a_en: '**Luxury** is in our DNA: premium materials, impeccable finishes, bespoke details. It is not just aesthetics, it is an experience to live every day.', a_cn: '**奢华**是我们的DNA：优质材料、完美饰面、定制细节。这不仅是美学，更是每天生活的体验。' },
    { keys: ['industriale', 'industrial', 'urban', '工业风', '城市风'], a: 'Lo stile **industriale** rivisitato: mattoni a vista, metallo, legno grezzo, grandi vetrate. Combinato con comfort moderno per spazi urbani di carattere.', a_en: 'The **industrial** style revisited: exposed brick, metal, raw wood, large windows. Combined with modern comfort for urban spaces with character.', a_cn: '重新诠释的**工业风格**：裸露砖墙、金属、原木、大窗户。结合现代舒适，打造有个性的城市空间。' },
    { keys: ['scandinavo', 'nordico', 'hygge', 'scandinavian', 'nordic', '北欧风', '斯堪的纳维亚'], a: 'Lo stile **scandinavo** per ambienti luminosi e accoglienti: legno chiaro, tessuti naturali, colori neutri, funzionalità al primo posto.', a_en: 'The **Scandinavian** style for bright and cosy spaces: light wood, natural fabrics, neutral colours, functionality first.', a_cn: '**北欧风格**打造明亮温馨的空间：浅色木材、天然面料、中性色调、功能至上。' },
    { keys: ['wabi sabi', 'giapponese', 'zen', 'orientale', 'japanese', 'oriental', '日式', '禅', '东方'], a: 'Il design **orientale** e wabi-sabi: materiali naturali imperfetti, spazi meditativi, equilibrio tra vuoto e pieno. Armonia e semplicità raffinata.', a_en: '**Oriental** and wabi-sabi design: imperfect natural materials, meditative spaces, balance between void and fullness. Harmony and refined simplicity.', a_cn: '**东方**与侘寂设计：不完美的天然材料、冥想空间、虚实平衡。和谐与精致的简约。' },
    // === GARANZIE ===
    { keys: ['garanzia', 'garanzie', 'copertura', 'assicurazione', 'warranty', 'guarantee', 'insurance', '保修', '保证', '保险'], a: 'Offriamo **garanzia completa** su tutti i lavori: 2 anni su finiture e lavorazioni, 5 anni su impianti, garanzia del produttore su arredi e materiali. Intervento rapido in caso di necessità.', a_en: 'We offer a **full warranty** on all work: 2 years on finishes and workmanship, 5 years on systems, manufacturer warranty on furniture and materials. Prompt intervention when needed.', a_cn: '我们对所有工程提供**全面保修**：饰面和工艺2年，系统5年，家具和材料享有制造商保修。需要时快速响应。' },
    { keys: ['assistenza post', 'manutenzione', 'dopo lavori', 'post vendita', 'after-sales', 'maintenance', 'aftercare', '售后', '维护'], a: 'Il nostro servizio non finisce alla consegna: offriamo **assistenza post-lavori** per manutenzione, piccoli interventi e consulenza continua.', a_en: 'Our service does not end at delivery: we offer **after-sales support** for maintenance, minor works and ongoing consultation.', a_cn: '我们的服务不会在交付时结束：我们提供**售后支持**，包括维护、小型工程和持续咨询。' },
    { keys: ['assicurazione cantiere', 'polizza', 'danni', 'site insurance', 'liability', '工地保险', '责任险'], a: 'Tutti i nostri cantieri sono coperti da **polizza assicurativa** per danni a terzi e responsabilità civile. Lavoriamo in totale sicurezza per voi e per i vicini.', a_en: 'All our sites are covered by **insurance policies** for third-party damage and civil liability. We work in complete safety for you and your neighbours.', a_cn: '我们所有工地都有**保险保障**，覆盖第三方损害和民事责任。我们在完全安全的条件下为您和邻居工作。' },
    { keys: ['contratto', 'accordo', 'tutela', 'contract', 'agreement', 'protection', '合同', '协议', '保障'], a: 'Firmiamo un **contratto dettagliato** che specifica: lavorazioni, materiali, tempistiche, costi, penali e garanzie. La vostra tutela è la nostra priorità.', a_en: 'We sign a **detailed contract** specifying: works, materials, timelines, costs, penalties and warranties. Your protection is our priority.', a_cn: '我们签署**详细合同**，明确：工程内容、材料、时间表、费用、违约金和保修。保护您的权益是我们的首要任务。' },
    // === PERSONALIZZAZIONE ===
    { keys: ['personalizzare', 'personalizzazione', 'su misura', 'customizzare', 'customise', 'bespoke', 'tailor-made', '定制', '个性化'], a: 'Ogni progetto è **100% personalizzato**: ascoltiamo le vostre esigenze, il vostro stile di vita, e creiamo spazi che vi rappresentano. Nessun progetto è uguale all\'altro.', a_en: 'Every project is **100% customised**: we listen to your needs, your lifestyle, and create spaces that represent you. No two projects are alike.', a_cn: '每个项目都是**100%定制**：我们倾听您的需求和生活方式，创造代表您的空间。没有两个项目是相同的。' },
    { keys: ['colori', 'palette', 'colore', 'combinazione colori', 'colours', 'color palette', '颜色', '配色'], a: 'La scelta dei **colori** è fondamentale: creiamo palette coordinate per ogni ambiente, considerando luce naturale, dimensioni e funzione dello spazio.', a_en: 'The choice of **colours** is fundamental: we create coordinated palettes for every room, considering natural light, dimensions and function of the space.', a_cn: '**颜色**的选择至关重要：我们为每个空间创建协调的配色方案，考虑自然光、尺寸和空间功能。' },
    { keys: ['spazio piccolo', 'piccolo', 'monolocale', 'poco spazio', 'small space', 'studio flat', '小空间', '小户型'], a: 'Siamo esperti nella **progettazione di spazi piccoli**: soluzioni salvaspazio, arredi multifunzione, specchi e luci che ampliano la percezione degli ambienti.', a_en: 'We are experts in **small space design**: space-saving solutions, multifunctional furniture, mirrors and lighting that expand the perception of rooms.', a_cn: '我们是**小空间设计**专家：节省空间的解决方案、多功能家具、扩大空间感的镜子和照明。' },
    { keys: ['open plan', 'open space abitativo', 'spazio aperto casa', 'open living', '开放式', '开放布局'], a: 'Progettiamo **spazi open plan** funzionali: cucina-soggiorno integrati, zone definite senza pareti, divisori trasparenti o mobili. Fluidità e convivialità.', a_en: 'We design functional **open plan spaces**: integrated kitchen-living areas, defined zones without walls, transparent or movable dividers. Flow and conviviality.', a_cn: '我们设计功能性**开放式空间**：厨房与客厅一体化、无墙划分的功能区、透明或可移动隔断。流动性与社交性。' },
    { keys: ['smart home', 'casa intelligente', 'automazione', 'home automation', '智能家居', '智能家庭'], a: 'Integriamo sistemi **smart home**: controllo luci, clima, sicurezza e multimedia da smartphone. Domotica avanzata nascosta nel design, per un comfort invisibile.', a_en: 'We integrate **smart home** systems: light, climate, security and multimedia control from your smartphone. Advanced automation hidden in the design, for invisible comfort.', a_cn: '我们集成**智能家居**系统：通过手机控制灯光、温度、安防和多媒体。先进的自动化隐藏在设计中，带来无形的舒适。' },
    // === PROCESSO DI LAVORO ===
    { keys: ['referente unico', 'unico interlocutore', 'project manager', 'chi coordina', 'single contact', 'who coordinates', '单一联系人', '项目经理', '谁负责'], a: 'Il vostro **unico referente** coordina tutto: architetti, artigiani, impiantisti e fornitori. Nessun rimpallo di responsabilità, comunicazione diretta e costante.', a_en: 'Your **single point of contact** coordinates everything: architects, craftsmen, system installers and suppliers. No passing the buck, direct and constant communication.', a_cn: '您的**唯一联系人**协调一切：建筑师、工匠、系统安装商和供应商。没有推诿，直接和持续的沟通。' },
    { keys: ['aggiornamenti', 'come mi aggiornate', 'stato lavori', 'avanzamento', 'updates', 'progress', 'status', '进度', '更新', '状态'], a: 'Vi teniamo **costantemente aggiornati**: report fotografici settimanali, accesso al cantiere su appuntamento, il referente è sempre raggiungibile per telefono o email.', a_en: 'We keep you **constantly updated**: weekly photo reports, site access by appointment, your contact person is always reachable by phone or email.', a_cn: '我们**持续更新**进度：每周照片报告、预约参观工地、联系人随时可通过电话或邮件联系。' },
    { keys: ['sopralluogo tecnico', 'rilievi', 'misure', 'technical survey', 'measurements', '技术勘察', '测量'], a: 'Il **sopralluogo tecnico** include rilievi dettagliati, analisi dello stato attuale, verifica impianti esistenti e documentazione fotografica completa.', a_en: 'The **technical survey** includes detailed measurements, analysis of current condition, verification of existing systems and complete photographic documentation.', a_cn: '**技术勘察**包括详细测量、现状分析、现有系统验证和完整的摄影记录。' },
    { keys: ['progetto esecutivo', 'disegni tecnici', 'planimetria', 'technical drawings', 'floor plan', 'blueprint', '施工图', '平面图', '技术图纸'], a: 'Il **progetto esecutivo** include planimetrie, sezioni, dettagli costruttivi, computo metrico e specifiche tecniche di ogni materiale. Nulla è lasciato al caso.', a_en: 'The **executive project** includes floor plans, sections, construction details, bill of quantities and technical specifications for every material. Nothing is left to chance.', a_cn: '**施工设计**包括平面图、剖面图、施工详图、工程量清单和每种材料的技术规格。一切都不留给偶然。' },
    { keys: ['cantiere', 'lavori in corso', 'durante i lavori', 'construction site', 'during works', '工地', '施工中'], a: 'Il **cantiere** è gestito con ordine e sicurezza: programma lavori giornaliero, pulizia costante, protezione delle aree non interessate. Minimizziamo i disagi.', a_en: 'The **construction site** is managed with order and safety: daily work schedule, constant cleaning, protection of unaffected areas. We minimise disruption.', a_cn: '**施工现场**管理有序且安全：每日工作计划、持续清洁、保护未受影响的区域。我们将干扰降至最低。' },
    { keys: ['subappalto', 'subappaltatori', 'terze parti', 'subcontractor', 'third party', '分包', '第三方'], a: 'Collaboriamo con **artigiani e tecnici selezionati** che lavorano esclusivamente per noi. Ogni collaboratore è verificato, certificato e condivide i nostri standard di qualità.', a_en: 'We work with **selected craftsmen and technicians** who work exclusively for us. Every collaborator is verified, certified and shares our quality standards.', a_cn: '我们与**精选的工匠和技术人员**合作，他们专门为我们工作。每位合作者都经过验证、认证，并遵守我们的质量标准。' },
    // === DOMANDE GENERICHE / AZIENDA ===
    { keys: ['chi siete', 'chi è impronta', 'storia', 'azienda', 'chi è', 'who are you', 'about', 'company', '你们是谁', '公司', '关于'], a: '**Impronta Arredi** è general contractor specializzato in interior design e ristrutturazioni chiavi in mano di lusso. Operiamo con un unico referente per progetti residenziali, commerciali e hospitality.', a_en: '**Impronta Arredi** is a general contractor specialising in interior design and luxury turnkey renovations. We operate with a single point of contact for residential, commercial and hospitality projects.', a_cn: '**Impronta Arredi**是专注于室内设计和豪华交钥匙翻新的总承包商。我们为住宅、商业和酒店项目提供单一联系人服务。' },
    { keys: ['esperienza', 'anni esperienza', 'da quanto tempo', 'experience', 'how long', 'years', '经验', '多少年'], a: 'Abbiamo oltre **20 anni di esperienza** nel settore, con più di 500 progetti realizzati. La nostra competenza spazia dal residenziale di lusso all\'hospitality e al commerciale.', a_en: 'We have over **20 years of experience** in the sector, with more than 500 completed projects. Our expertise ranges from luxury residential to hospitality and commercial.', a_cn: '我们在该行业拥有超过**20年的经验**，完成了500多个项目。我们的专长涵盖豪华住宅、酒店和商业项目。' },
    { keys: ['team', 'squadra', 'quante persone', 'dipendenti', 'staff', 'employees', '团队', '员工'], a: 'Il nostro **team** include architetti, interior designer, project manager e una rete di artigiani qualificati. Ogni professionista è selezionato per competenza e passione.', a_en: 'Our **team** includes architects, interior designers, project managers and a network of qualified craftsmen. Every professional is selected for expertise and passion.', a_cn: '我们的**团队**包括建筑师、室内设计师、项目经理和合格工匠网络。每位专业人员都是根据专业能力和热情挑选的。' },
    { keys: ['portfolio', 'lavori precedenti', 'progetti realizzati', 'esempi', 'previous work', 'examples', '作品集', '案例'], a: 'Abbiamo realizzato oltre **500 progetti**: appartamenti di lusso a Milano, uffici direzionali, boutique hotel, negozi e showroom. Scopri i nostri lavori nella sezione portfolio del sito.', a_en: 'We have completed over **500 projects**: luxury apartments in Milan, executive offices, boutique hotels, shops and showrooms. Discover our work in the portfolio section of the website.', a_cn: '我们已完成超过**500个项目**：米兰的豪华公寓、行政办公室、精品酒店、商店和展厅。请在网站作品集部分查看我们的作品。' },
    { keys: ['differenza', 'perché voi', 'vantaggio', 'cosa vi distingue', 'why you', 'advantage', 'what makes you different', '为什么选你们', '优势', '区别'], a: 'Ciò che ci distingue: **un unico referente** per tutto il progetto. Nessun rimpallo tra impresa, elettricista, idraulico e arredatore. Zero sorprese, tempi certi, budget rispettato.', a_en: 'What sets us apart: **one single contact** for the entire project. No bouncing between builder, electrician, plumber and furnisher. Zero surprises, reliable timelines, budget respected.', a_cn: '我们的与众不同之处：整个项目**一个联系人**。不在建筑商、电工、水管工和家具商之间周转。零意外、可靠的时间表、尊重预算。' },
    { keys: ['recensioni', 'opinioni', 'feedback clienti', 'reviews', 'testimonials', 'feedback', '评价', '客户反馈'], a: 'I nostri clienti ci apprezzano per **professionalità, puntualità e trasparenza**. Puoi leggere le recensioni sul nostro sito nella sezione dedicata. Il passaparola è il nostro miglior biglietto da visita.', a_en: 'Our clients appreciate us for **professionalism, punctuality and transparency**. You can read reviews on our website in the dedicated section. Word of mouth is our best calling card.', a_cn: '客户赞赏我们的**专业、准时和透明**。您可以在我们网站的专门板块阅读评价。口碑是我们最好的名片。' },
    // === CONTATTI E ORARI ===
    { keys: ['orari', 'quando aprite', 'apertura', 'chiusura', 'orario', 'opening hours', 'business hours', '营业时间', '工作时间'], a: '**Orari:**\nLun–Ven: 09:00–18:00\nSab: 09:00–13:00\nDom: Chiuso\n\nSiamo disponibili per appuntamenti anche fuori orario, su richiesta.', a_en: '**Opening hours:**\nMon–Fri: 09:00–18:00\nSat: 09:00–13:00\nSun: Closed\n\nWe are available for appointments outside business hours upon request.', a_cn: '**营业时间：**\n周一至周五：09:00–18:00\n周六：09:00–13:00\n周日：休息\n\n如有需要，可在营业时间外预约。' },
    { keys: ['appuntamento', 'fissare appuntamento', 'prenotare', 'incontro', 'appointment', 'book', 'meeting', '预约', '约见'], a: 'Puoi **fissare un appuntamento** chiamando il +39 000 0000000, scrivendo a info@improntarredi.it o compilando il modulo nella pagina Contatti. Prima consulenza gratuita!', a_en: 'You can **book an appointment** by calling +39 000 0000000, emailing info@improntarredi.it or filling in the form on the Contact page. First consultation free!', a_cn: '您可以通过致电+39 000 0000000、发邮件至info@improntarredi.it或填写联系页面表单来**预约**。首次咨询免费！' },
    { keys: ['email', 'scrivere', 'posta elettronica', 'write to', 'mail', '邮件', '邮箱'], a: 'Scrivici a **info@improntarredi.it** — rispondiamo entro 24 ore lavorative. Per urgenze, chiama il +39 000 0000000.', a_en: 'Write to us at **info@improntarredi.it** — we reply within 24 business hours. For urgent matters, call +39 000 0000000.', a_cn: '请发邮件至**info@improntarredi.it**——我们在24个工作小时内回复。紧急事项请致电+39 000 0000000。' },
    { keys: ['showroom', 'visita', 'visitare', 'visit', '展厅', '参观'], a: 'Il nostro **showroom** è a Milano, Via Example 1. Puoi visitarlo su appuntamento per vedere materiali, finiture e lasciarti ispirare dai nostri ambienti.', a_en: 'Our **showroom** is in Milan, Via Example 1. You can visit by appointment to see materials, finishes and be inspired by our spaces.', a_cn: '我们的**展厅**位于米兰Via Example 1。您可以预约参观，查看材料、饰面并从我们的空间中获取灵感。' },
    { keys: ['whatsapp', 'messaggio', 'chat', 'message', '微信', '消息'], a: 'Puoi contattarci anche via **chat** su questo widget! Per richieste dettagliate, scrivici a info@improntarredi.it o chiama il +39 000 0000000.', a_en: 'You can also contact us via **chat** on this widget! For detailed requests, write to info@improntarredi.it or call +39 000 0000000.', a_cn: '您也可以通过这个**聊天**窗口联系我们！如需详细咨询，请发邮件至info@improntarredi.it或致电+39 000 0000000。' },
    // === INFISSI E SERRAMENTI ===
    { keys: ['infissi', 'serramenti', 'finestre', 'vetri', 'windows', 'glazing', 'frames', '门窗', '窗户', '玻璃'], a: 'Forniamo e installiamo **infissi di alta qualità**: alluminio, legno, PVC, taglio termico. Vetri basso-emissivi per isolamento termico e acustico. Tutto certificato.', a_en: 'We supply and install **high-quality windows and frames**: aluminium, wood, PVC, thermal break. Low-emissivity glass for thermal and acoustic insulation. All certified.', a_cn: '我们供应和安装**高品质门窗**：铝合金、木质、PVC、断桥隔热。低辐射玻璃用于隔热和隔音。全部认证。' },
    { keys: ['porte', 'porta', 'porte interne', 'porte blindate', 'doors', 'security door', '门', '室内门', '防盗门'], a: 'Installiamo **porte interne** di design (battente, scorrevoli, a scomparsa, filomuro) e porte blindate di sicurezza certificate, con finiture personalizzate.', a_en: 'We install designer **interior doors** (hinged, sliding, pocket, flush) and certified security doors, with custom finishes.', a_cn: '我们安装设计师**室内门**（平开门、推拉门、隐藏式、隐框门）和认证安全门，定制饰面。' },
    // === GIARDINO E OUTDOOR ===
    { keys: ['giardino', 'esterno', 'outdoor', 'terrazzo', 'balcone', 'garden', 'terrace', 'balcony', '花园', '户外', '露台', '阳台'], a: 'Progettiamo anche **spazi esterni**: terrazzi, giardini, pergole, piscine. Design outdoor coordinato con gli interni per un\'esperienza abitativa completa.', a_en: 'We also design **outdoor spaces**: terraces, gardens, pergolas, pools. Outdoor design coordinated with interiors for a complete living experience.', a_cn: '我们还设计**户外空间**：露台、花园、凉棚、泳池。户外设计与室内协调，提供完整的居住体验。' },
    { keys: ['piscina', 'spa', 'wellness', 'pool', 'swimming pool', '泳池', 'SPA', '健康'], a: 'Realizziamo **piscine e aree wellness** private: saune, hammam, vasche idromassaggio, spazi relax. Lusso e benessere direttamente a casa tua.', a_en: 'We build private **pools and wellness areas**: saunas, hammams, hot tubs, relaxation spaces. Luxury and well-being directly at your home.', a_cn: '我们建造私人**泳池和健康区**：桑拿、土耳其浴、按摩浴缸、休闲空间。在家即享奢华与健康。' },
    // === ACUSTICA E ISOLAMENTO ===
    { keys: ['acustica', 'insonorizzazione', 'rumore', 'isolamento acustico', 'soundproofing', 'acoustic', 'noise', '隔音', '声学'], a: 'Progettiamo soluzioni di **isolamento acustico**: pareti fonoassorbenti, controsoffitti acustici, pavimenti flottanti. Per un comfort sonoro perfetto in ogni ambiente.', a_en: 'We design **acoustic insulation** solutions: sound-absorbing walls, acoustic ceilings, floating floors. For perfect sound comfort in every room.', a_cn: '我们设计**隔音**解决方案：吸音墙、隔音吊顶、浮动地板。为每个空间提供完美的声学舒适。' },
    { keys: ['isolamento termico', 'cappotto', 'coibentazione', 'thermal insulation', 'insulation', '保温', '隔热'], a: 'Realizziamo **isolamento termico** con cappotto interno/esterno, infissi performanti e soluzioni innovative per ridurre dispersioni e costi energetici.', a_en: 'We provide **thermal insulation** with internal/external cladding, high-performance windows and innovative solutions to reduce heat loss and energy costs.', a_cn: '我们提供**保温隔热**：内外保温层、高性能门窗和创新解决方案，减少热量损失和能源成本。' },
    // === SITUAZIONI SPECIFICHE ===
    { keys: ['condominio', 'lavori condominiali', 'regolamento condominiale', 'condo', 'building management', '公寓管理', '物业'], a: 'Gestiamo anche i **rapporti condominiali**: comunicazioni all\'amministratore, rispetto degli orari, protezione aree comuni. Lavoriamo in armonia con il condominio.', a_en: 'We also manage **building relations**: communications with the administrator, respecting hours, protecting common areas. We work in harmony with the building.', a_cn: '我们也管理**物业关系**：与管理员沟通、遵守工作时间、保护公共区域。我们与物业和谐合作。' },
    { keys: ['emergenza', 'urgente', 'urgenza', 'guasto', 'emergency', 'urgent', 'breakdown', '紧急', '急修'], a: 'Per **interventi urgenti** (guasti, infiltrazioni, problemi impiantistici) contattaci al +39 000 0000000. Valutiamo la situazione e interveniamo rapidamente.', a_en: 'For **urgent interventions** (breakdowns, leaks, system problems) contact us at +39 000 0000000. We assess the situation and act quickly.', a_cn: '如需**紧急维修**（故障、漏水、系统问题），请致电+39 000 0000000。我们评估情况并快速响应。' },
    { keys: ['rumoroso', 'rumore cantiere', 'disturbo', 'vicini', 'noise nuisance', 'neighbours', '噪音', '邻居'], a: 'Rispettiamo rigorosamente gli **orari di lavoro** consentiti e adottiamo ogni misura per ridurre il rumore. Informiamo i vicini e l\'amministratore prima dell\'inizio lavori.', a_en: 'We strictly respect permitted **working hours** and take every measure to reduce noise. We inform neighbours and the building manager before work begins.', a_cn: '我们严格遵守允许的**工作时间**，并采取一切措施减少噪音。在开工前通知邻居和物业管理员。' },
    { keys: ['vincolo', 'beni culturali', 'edificio storico', 'soprintendenza', 'listed building', 'heritage', 'historic building', '文物建筑', '历史建筑'], a: 'Abbiamo esperienza con **edifici vincolati**: conosciamo le procedure della Soprintendenza e lavoriamo nel rispetto dei vincoli architettonici e storici.', a_en: 'We have experience with **listed buildings**: we know the Heritage Authority procedures and work respecting architectural and historical constraints.', a_cn: '我们拥有**文物建筑**的经验：熟悉文物保护程序，在尊重建筑和历史约束的前提下施工。' },
    { keys: ['nuovo costruzione', 'casa nuova', 'nuova costruzione', 'new build', 'new construction', '新建', '新房'], a: 'Oltre alle ristrutturazioni, progettiamo gli **interni di nuove costruzioni**: dalla planimetria all\'arredamento, per abitazioni nuove che nascono già perfette.', a_en: 'Besides renovations, we design **interiors for new builds**: from floor plan to furnishing, for new homes that are born perfect.', a_cn: '除了翻新，我们还为**新建筑设计室内**：从平面图到家具，让新家从一开始就完美。' },
    // === ACCESSIBILITA ===
    { keys: ['accessibilità', 'disabilità', 'barriere architettoniche', 'anziani', 'accessibility', 'disability', 'barrier-free', 'elderly', '无障碍', '残疾', '老年人'], a: 'Progettiamo ambienti **accessibili e senza barriere**: bagni attrezzati, percorsi agevoli, domotica assistiva. Design inclusivo che non rinuncia all\'estetica.', a_en: 'We design **accessible, barrier-free** environments: equipped bathrooms, easy pathways, assistive automation. Inclusive design that does not compromise aesthetics.', a_cn: '我们设计**无障碍**环境：配备齐全的浴室、便捷通道、辅助智能系统。包容性设计不牺牲美学。' },
    // === TENDENZE ===
    { keys: ['tendenze', 'trend', 'moda', 'novità design', 'trends', 'what\'s new', '趋势', '潮流', '新潮'], a: 'Le **tendenze 2026**: materiali naturali e sostenibili, tonalità calde, curve morbide, design biophilic, integrazione indoor-outdoor, domotica invisibile. Vi guidiamo nella scelta.', a_en: '**2026 trends**: natural and sustainable materials, warm tones, soft curves, biophilic design, indoor-outdoor integration, invisible automation. We guide you in choosing.', a_cn: '**2026年趋势**：天然可持续材料、暖色调、柔和曲线、亲生物设计、室内外融合、隐形智能。我们指导您选择。' },
    { keys: ['biophilic', 'piante', 'verde', 'natura', 'plants', 'greenery', 'nature', '植物', '绿植', '自然'], a: 'Il **design biophilic** integra la natura negli interni: pareti verdi, giardini interni, materiali naturali, luce naturale. Benessere e bellezza si fondono.', a_en: '**Biophilic design** integrates nature into interiors: green walls, indoor gardens, natural materials, natural light. Well-being and beauty merge.', a_cn: '**亲生物设计**将自然融入室内：绿植墙、室内花园、天然材料、自然采光。健康与美丽融为一体。' },
    // === DOMANDE PRATICHE ===
    { keys: ['dove dormire', 'dove vivere durante', 'durante i lavori dove', 'where to stay', 'temporary housing', '住哪里', '临时住所'], a: 'Durante la ristrutturazione potrebbe non essere possibile abitare l\'immobile. Vi consigliamo sulla **pianificazione**: fasi per rimanere parzialmente, o soluzioni temporanee.', a_en: 'During renovation it may not be possible to live in the property. We advise on **planning**: phased work to stay partially, or temporary solutions.', a_cn: '翻新期间可能无法居住在房产中。我们提供**规划建议**：分阶段施工以部分留住，或临时解决方案。' },
    { keys: ['pulizia', 'fine lavori', 'pulizia finale', 'cleaning', 'final clean', '清洁', '最终清洁'], a: 'La **pulizia finale** è inclusa nel nostro servizio: al termine dei lavori, consegniamo l\'immobile pulito e pronto da abitare.', a_en: '**Final cleaning** is included in our service: at the end of works, we deliver the property clean and ready to live in.', a_cn: '**最终清洁**包含在我们的服务中：工程结束后，我们交付干净整洁、可以入住的房产。' },
    { keys: ['smaltimento', 'macerie', 'rifiuti', 'calcinacci', 'waste disposal', 'debris', 'rubble', '废物处理', '建筑垃圾'], a: 'Lo **smaltimento dei materiali** di demolizione è incluso: gestiamo il trasporto e lo smaltimento certificato nel rispetto delle normative ambientali.', a_en: '**Demolition waste disposal** is included: we manage transport and certified disposal in compliance with environmental regulations.', a_cn: '**拆除废物处理**包含在内：我们按照环保法规管理运输和认证处理。' },
    { keys: ['vicini informare', 'comunicazione vicini', 'avviso lavori', 'notify neighbours', 'works notice', '通知邻居', '施工通知'], a: 'Prima dell\'inizio lavori, prepariamo una **comunicazione formale** per l\'amministratore e i vicini, con orari di lavoro e referente di cantiere per qualsiasi esigenza.', a_en: 'Before work begins, we prepare a **formal notice** for the building manager and neighbours, with working hours and site contact for any needs.', a_cn: '开工前，我们为物业管理员和邻居准备**正式通知**，包含工作时间和施工联系人信息。' },
    // === LINGUE ===
    { keys: ['lingua', 'lingue parlate', 'english', 'chinese', 'language', 'languages', '语言', '说什么语言'], a: 'Parliamo **italiano, inglese e cinese**. Il nostro team è in grado di seguire clienti internazionali in modo fluido e professionale.', a_en: 'We speak **Italian, English and Chinese**. Our team can assist international clients fluently and professionally.', a_cn: '我们讲**意大利语、英语和中文**。我们的团队能够流利而专业地服务国际客户。' },
    { keys: ['cliente straniero', 'straniero', 'investitore estero', 'foreigner', 'foreign investor', 'international client', '外国客户', '海外投资者'], a: 'Siamo abituati a lavorare con **clienti internazionali**: comunicazione in inglese e cinese, conoscenza delle esigenze di investitori esteri, assistenza completa.', a_en: 'We are accustomed to working with **international clients**: communication in English and Chinese, understanding of foreign investor needs, complete assistance.', a_cn: '我们习惯与**国际客户**合作：英语和中文沟通，了解海外投资者需求，提供全面协助。' },
    // === REFERENZE E FIDUCIA ===
    { keys: ['referenze', 'lavori fatti', 'dimostrazione', 'case study', 'references', 'proof', '参考', '案例研究'], a: 'Su richiesta, possiamo fornire **referenze dirette** di clienti soddisfatti e organizzare visite a progetti completati. La trasparenza è il nostro valore.', a_en: 'On request, we can provide **direct references** from satisfied clients and arrange visits to completed projects. Transparency is our value.', a_cn: '应要求，我们可以提供满意客户的**直接推荐**，并安排参观已完成的项目。透明是我们的价值观。' },
    { keys: ['come trovarvi', 'dove trovarvi', 'come raggiungervi', 'parcheggio', 'how to find you', 'directions', 'parking', '怎么找到你们', '停车'], a: 'Siamo in **Via Example 1, Milano**. Facilmente raggiungibili con mezzi pubblici. Parcheggio disponibile nelle vicinanze. Appuntamento consigliato.', a_en: 'We are at **Via Example 1, Milan**. Easily accessible by public transport. Parking available nearby. Appointment recommended.', a_cn: '我们在**米兰Via Example 1**。公共交通便捷可达。附近有停车场。建议预约。' },
    // === VARIE COMPETITOR-INSPIRED ===
    { keys: ['differenza architetto', 'meglio architetto', 'perché non un architetto', 'vs architect', 'why not architect', '和建筑师的区别'], a: 'Un architetto progetta, noi **progettiamo E realizziamo**. Con noi non dovete coordinare separatamente impresa edile, idraulico, elettricista e arredatore. Un unico contratto, un unico responsabile.', a_en: 'An architect designs, we **design AND build**. With us you don\'t have to coordinate builder, plumber, electrician and furnisher separately. One contract, one responsible party.', a_cn: '建筑师负责设计，我们**既设计又施工**。与我们合作，您无需分别协调建筑商、水管工、电工和家具商。一份合同，一个负责人。' },
    { keys: ['differenza impresa edile', 'perché non un\'impresa', 'general contractor', 'vs builder', '和施工队的区别', '总承包'], a: 'Un\'impresa edile esegue lavori, noi siamo **general contractor**: progettiamo, coordiniamo, arrediamo e certifichiamo. Dal concept al trasloco, tutto gestito da noi.', a_en: 'A builder does construction work, we are **general contractors**: we design, coordinate, furnish and certify. From concept to move-in, everything managed by us.', a_cn: '施工队负责施工，我们是**总承包商**：设计、协调、装修和认证。从概念到入住，一切由我们管理。' },
    { keys: ['secondo parere', 'opinione', 'consulenza tecnica', 'second opinion', 'technical advice', '第二意见', '技术咨询'], a: 'Offriamo anche **consulenze tecniche** su progetti in corso o preventivi di altri: valutiamo fattibilità, costi e proponiamo alternative. Consulenza iniziale gratuita.', a_en: 'We also offer **technical consultations** on ongoing projects or other quotes: we assess feasibility, costs and propose alternatives. Free initial consultation.', a_cn: '我们还提供**技术咨询**，针对进行中的项目或其他报价：评估可行性、成本并提出替代方案。首次咨询免费。' },
    { keys: ['problemi precedente impresa', 'lavoro incompleto', 'cantiere abbandonato', 'unfinished work', 'abandoned site', '烂尾工程', '未完成工程'], a: 'Ci occupiamo anche di **completamento lavori** iniziati da altri: valutiamo lo stato, proponiamo soluzioni e portiamo a termine il progetto con i nostri standard.', a_en: 'We also handle **completion of work** started by others: we assess the situation, propose solutions and bring the project to completion with our standards.', a_cn: '我们还承接**他人未完成的工程**：评估现状，提出解决方案，按我们的标准完成项目。' },
    { keys: ['conflitto interessi', 'trasparenza prezzi', 'ricarico materiali', 'price transparency', 'markup', '价格透明', '加价'], a: 'Massima **trasparenza**: i prezzi dei materiali sono documentati con fatture dei fornitori. Nessun ricarico nascosto. Il nostro guadagno è nella gestione, non nei materiali.', a_en: 'Maximum **transparency**: material prices are documented with supplier invoices. No hidden markups. Our earnings come from management, not materials.', a_cn: '最大**透明度**：材料价格有供应商发票为证。没有隐藏加价。我们的收入来自管理，而非材料。' },
    { keys: ['cambio idea', 'modificare progetto', 'variante', 'ripensamento', 'change mind', 'modify project', 'variation', '改主意', '修改项目', '变更'], a: 'Le **varianti** sono possibili: valutiamo l\'impatto su tempi e costi, vi presentiamo le opzioni e procediamo solo con la vostra approvazione scritta.', a_en: '**Variations** are possible: we assess the impact on time and costs, present the options and proceed only with your written approval.', a_cn: '**变更**是可能的：我们评估对时间和费用的影响，展示选项，仅在您书面批准后执行。' },
    { keys: ['rinuncia', 'annullamento', 'cancellare progetto', 'cancellation', 'withdraw', '取消', '退出'], a: 'In caso di **rinuncia**, le condizioni sono regolate dal contratto. Le fasi di progettazione già completate vengono fatturate. Nessuna penale nascosta.', a_en: 'In case of **cancellation**, conditions are governed by the contract. Completed design phases are invoiced. No hidden penalties.', a_cn: '如需**取消**，条件按合同规定执行。已完成的设计阶段将开具发票。没有隐藏罚款。' },
    { keys: ['privacy', 'riservatezza', 'discrezione', 'confidentiality', 'discretion', 'NDA', '隐私', '保密'], a: 'Garantiamo **massima riservatezza**: i dati dei clienti e le immagini dei progetti non vengono divulgati senza consenso esplicito. NDA disponibile su richiesta.', a_en: 'We guarantee **maximum confidentiality**: client data and project images are not disclosed without explicit consent. NDA available on request.', a_cn: '我们保证**最高保密性**：未经明确同意，不会泄露客户数据和项目图片。可应要求提供保密协议。' },
    { keys: ['collaborazione', 'partnership', 'lavorare insieme', 'subfornitore', 'collaboration', 'work together', '合作', '伙伴关系'], a: 'Siamo aperti a **collaborazioni** con architetti, studi di design e professionisti del settore. Contattaci per discutere opportunità di partnership.', a_en: 'We are open to **collaborations** with architects, design studios and industry professionals. Contact us to discuss partnership opportunities.', a_cn: '我们愿意与建筑师、设计工作室和行业专业人士**合作**。请联系我们讨论合作机会。' }
  ];

  /* ══════════════════════════════════════════
     KB SEARCH — trova la migliore risposta nel knowledge base
     ══════════════════════════════════════════ */
  function searchKB(text) {
    var lower = text.toLowerCase().replace(/[?!.,;:'"]/g, '');
    var bestMatch = null;
    var bestScore = 0;

    for (var i = 0; i < knowledgeBase.length; i++) {
      var entry = knowledgeBase[i];
      var score = 0;
      for (var k = 0; k < entry.keys.length; k++) {
        if (lower.indexOf(entry.keys[k].toLowerCase()) !== -1) {
          score += entry.keys[k].length;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = entry;
      }
    }

    if (bestMatch && bestScore >= 3) {
      var localized = bestMatch.a; // default Italian
      if (chatLang === 'en' && bestMatch.a_en) localized = bestMatch.a_en;
      if (chatLang === 'cn' && bestMatch.a_cn) localized = bestMatch.a_cn;
      return { localized: localized, it: bestMatch.a };
    }
    return null;
  }

  /* ══════════════════════════════════════════
     CHAT LOG (per admin panel)
     ══════════════════════════════════════════ */
  function logMessage(sender, text, lang, italianText) {
    chatLog.push({
      sender: sender,
      originalText: text,
      originalLang: lang,
      italianText: italianText || text,
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
    var rIt = responses['it'];

    if (state === 'contatto_nome') {
      contattoPending.nome = text;
      state = 'contatto_email';
      return { reply: r.askEmail.replace('%name%', text), replyIt: rIt.askEmail.replace('%name%', text) };
    }

    if (state === 'contatto_email') {
      contattoPending.email = text;
      state = 'contatto_tel';
      return { reply: r.askPhone, replyIt: rIt.askPhone };
    }

    if (state === 'contatto_tel') {
      contattoPending.telefono = (text.toLowerCase() === 'skip') ? '' : text;
      state = 'contatto_progetto';
      return { reply: r.askProject, replyIt: rIt.askProject };
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
      return { reply: r.askMessage, replyIt: rIt.askMessage };
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
      return { reply: r.contactSuccess, replyIt: rIt.contactSuccess };
    }

    return null;
  }

  /* ══════════════════════════════════════════
     PROCESS USER MESSAGE
     ══════════════════════════════════════════ */
  function processMessage(text) {
    var r = responses[chatLang];
    var rIt = responses['it'];

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
      return { reply: r.askName, replyIt: rIt.askName };
    }

    var kbTail = { it: '\n\nHai altre domande? Sono a disposizione!', en: '\n\nAny other questions? I\'m here to help!', cn: '\n\n还有其他问题吗？我随时为您服务！' };

    switch (intent) {
      case 'greeting': return { reply: r.greeting, replyIt: rIt.greeting };
      case 'services': return { reply: r.services, replyIt: rIt.services };
      case 'contact': return { reply: r.contact, replyIt: rIt.contact };
      case 'process': return { reply: r.process, replyIt: rIt.process };
      case 'quote':
        state = 'contatto_nome';
        contattoPending = {};
        return { reply: r.askName, replyIt: rIt.askName };
      default:
        // Search knowledge base before fallback
        var kbResult = searchKB(text);
        if (kbResult) {
          var tail = kbTail[chatLang] || kbTail['it'];
          return { reply: kbResult.localized + tail, replyIt: kbResult.it + kbTail['it'] };
        }
        return { reply: r.fallback, replyIt: rIt.fallback };
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

  function botReply(result) {
    var text = (typeof result === 'object') ? result.reply : result;
    var textIt = (typeof result === 'object') ? result.replyIt : result;
    showTyping();
    var delay = 500 + Math.random() * 500;
    setTimeout(function () {
      hideTyping();
      addMessage(text, 'bot');
      logMessage('bot', text, chatLang, textIt);
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
        logMessage('bot', responses[chatLang].welcome, chatLang, responses['it'].welcome);
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
      logMessage('bot', responses[chatLang].welcome, chatLang, responses['it'].welcome);
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
}, 3000); // Avvio ritardato 3s per non impattare LCP/velocità
