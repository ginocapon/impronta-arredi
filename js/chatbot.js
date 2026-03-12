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
     KNOWLEDGE BASE — 100+ FAQ (IT, keyword-matched)
     Risposte in italiano; tradotte automaticamente
     via oggetto kbTranslations per EN e CN.
     ══════════════════════════════════════════ */
  var knowledgeBase = [
    // === SERVIZI OFFERTI ===
    { keys: ['interior design', 'progettazione interni', 'design interni'], a: 'Il nostro servizio di **interior design** comprende analisi degli spazi, concept creativo, progettazione esecutiva e render 3D fotorealistici. Ogni dettaglio viene definito prima dell\'inizio dei lavori.' },
    { keys: ['ristrutturazione', 'ristrutturare', 'lavori edili'], a: 'Gestiamo **ristrutturazioni complete**: demolizioni, muratura, massetti, pavimentazioni, controsoffitti e tinteggiature con maestranze qualificate e materiali di prima scelta.' },
    { keys: ['arredamento su misura', 'mobili su misura', 'arredo personalizzato', 'custom furniture'], a: 'Progettiamo e realizziamo **arredamento su misura**: cucine, bagni, living, camere e uffici con materiali selezionati. Complementi d\'arredo, illuminazione e tessuti coordinati.' },
    { keys: ['impianto elettrico', 'impianti elettrici', 'domotica', 'illuminotecnica'], a: 'Progettiamo e installiamo **impianti elettrici**, domotica, illuminotecnica, antintrusione e videosorveglianza. Tutto certificato secondo le normative vigenti.' },
    { keys: ['impianto idraulico', 'impianti idraulici', 'riscaldamento', 'condizionamento', 'climatizzazione'], a: 'Realizziamo **impianti idrico-sanitari**, riscaldamento a pavimento, raffrescamento e ventilazione meccanica controllata. Efficienza energetica e comfort garantiti.' },
    { keys: ['certificazione', 'certificazioni', 'collaudo', 'conformità', 'ape'], a: 'Ci occupiamo di **tutte le certificazioni**: conformità impiantistica, collaudi, pratiche catastali e APE. Consegniamo il progetto con documentazione completa, pronta per l\'agibilità.' },
    { keys: ['chiavi in mano', 'turnkey', 'tutto incluso', 'servizio completo'], a: 'Il nostro servizio **chiavi in mano** include: progettazione, ristrutturazione edile, impianti elettrici e idraulici, arredamento su misura e certificazioni. Un unico referente per tutto.' },
    { keys: ['render 3d', 'render', 'anteprima', 'visualizzazione', 'fotorealistico'], a: 'Realizziamo **render 3D fotorealistici** che permettono di visualizzare ogni dettaglio del progetto prima dell\'inizio dei lavori. Nessuna sorpresa, solo soddisfazione.' },
    { keys: ['pavimento', 'pavimentazione', 'parquet', 'gres', 'marmo'], a: 'Installiamo ogni tipo di **pavimentazione**: parquet, gres porcellanato, marmo, pietra naturale, resina. Selezioniamo materiali premium per durabilità ed estetica.' },
    { keys: ['controsoffitto', 'cartongesso', 'soffitto'], a: 'Realizziamo **controsoffitti** in cartongesso con illuminazione integrata, zone funzionali e finiture perfette per ogni ambiente.' },
    { keys: ['tinteggiatura', 'pittura', 'verniciatura', 'pareti'], a: 'Offriamo **tinteggiature** di alta qualità: pitture decorative, stucco veneziano, effetti materici e colori personalizzati per ogni ambiente.' },
    { keys: ['demolizione', 'demolizioni', 'rimozione'], a: 'Gestiamo **demolizioni controllate** con smaltimento certificato dei materiali, nel rispetto delle normative ambientali e di sicurezza.' },
    // === COSTI E PREVENTIVI ===
    { keys: ['quanto costa', 'prezzo', 'costo', 'tariffe', 'prezzi'], a: 'I costi variano in base alla complessità del progetto. Offriamo una **consulenza iniziale gratuita** con sopralluogo per preparare un preventivo dettagliato e trasparente, senza costi nascosti.' },
    { keys: ['preventivo gratuito', 'preventivo', 'stima costi', 'quanto viene'], a: 'Il **preventivo è gratuito** e senza impegno. Dopo il sopralluogo, riceverai un documento dettagliato con tutte le voci di spesa, materiali inclusi, senza sorprese.' },
    { keys: ['pagamento', 'rate', 'finanziamento', 'come si paga', 'pagare'], a: 'Offriamo **modalità di pagamento flessibili** con acconti a stato avanzamento lavori. È possibile concordare piani personalizzati. Contattaci per i dettagli.' },
    { keys: ['budget', 'risparmio', 'economico', 'risparmia'], a: 'Ottimizziamo il **budget** grazie alla gestione centralizzata: nessun costo nascosto, nessun ricarico da intermediari. Un preventivo unico e trasparente.' },
    { keys: ['costo metro quadro', 'costo al metro', 'prezzo mq', '€/mq'], a: 'Il costo al metro quadro dipende dal tipo di intervento e dai materiali scelti. Per una ristrutturazione completa di lusso, i costi partono da circa **800-1.500 €/mq**. Il sopralluogo gratuito permette una stima precisa.' },
    { keys: ['extra', 'costi aggiuntivi', 'imprevisti', 'sorprese'], a: 'Il nostro preventivo è **tutto incluso**. Eventuali varianti vengono concordate e approvate prima dell\'esecuzione. Zero sorprese economiche: è la nostra promessa.' },
    { keys: ['caparra', 'acconto', 'deposito'], a: 'Richiediamo un **acconto iniziale** alla firma del contratto, con successivi pagamenti a stato avanzamento lavori (SAL). Le modalità esatte vengono concordate nel contratto.' },
    { keys: ['iva', 'agevolazione fiscale', 'detrazione', 'bonus', 'bonus ristrutturazione'], a: 'Le ristrutturazioni possono beneficiare di **agevolazioni fiscali** come il bonus ristrutturazione (50%) e l\'ecobonus (65%). Vi assistiamo nella gestione delle pratiche per le detrazioni.' },
    // === TEMPI DI REALIZZAZIONE ===
    { keys: ['quanto tempo', 'tempistiche', 'tempi', 'durata', 'consegna', 'quando finisce'], a: 'I tempi variano per complessità: un **appartamento medio** richiede 3-6 mesi, un **ufficio** 2-4 mesi, un **hotel** 6-12 mesi. Definiamo una timeline dettagliata al sopralluogo iniziale.' },
    { keys: ['ritardo', 'ritardi', 'penale', 'in tempo'], a: 'Grazie alla **gestione centralizzata**, minimizziamo i ritardi. Ogni fase è pianificata in sequenza. In caso di imprevisti, comunichiamo immediatamente e proponiamo soluzioni.' },
    { keys: ['inizio lavori', 'quando iniziate', 'partenza', 'avvio'], a: 'Dopo l\'approvazione del progetto e l\'ottenimento dei permessi necessari, i **lavori iniziano** generalmente entro 2-4 settimane. Il sopralluogo e la progettazione richiedono circa 3-4 settimane.' },
    { keys: ['fasi', 'step', 'passaggi', 'processo lavorativo'], a: 'Il nostro processo in **3 fasi**: 1) Ascolto e sopralluogo 2) Progettazione con render 3D 3) Realizzazione con unico referente. Ogni fase ha tempistiche definite.' },
    { keys: ['sopralluogo', 'prima visita', 'consulenza iniziale'], a: 'Il **sopralluogo iniziale è gratuito**: visitiamo gli spazi, ascoltiamo le vostre esigenze e definiamo insieme obiettivi e budget. Durata circa 1-2 ore.' },
    // === MATERIALI E FORNITORI ===
    { keys: ['materiali', 'qualità materiali', 'che materiali'], a: 'Selezioniamo **materiali premium** dai migliori produttori italiani e internazionali: ceramiche, marmi, legni pregiati, tessuti di alta gamma. Ogni materiale è certificato e garantito.' },
    { keys: ['fornitori', 'brand', 'marche'], a: 'Collaboriamo con i **migliori fornitori** italiani e internazionali: B&B Italia, Poliform, Minotti, Flos, e molti altri. Selezioniamo brand che garantiscono qualità e design senza compromessi.' },
    { keys: ['campioni', 'campionatura', 'toccare materiali'], a: 'Prima di procedere, forniamo **campionature complete** di tutti i materiali proposti: potrete vedere e toccare ogni finitura, tessuto, legno e pietra.' },
    { keys: ['sostenibile', 'sostenibilità', 'ecologico', 'green', 'eco'], a: 'Promuoviamo la **sostenibilità**: materiali eco-certificati, vernici a basso VOC, sistemi di recupero energetico e soluzioni per la riduzione dell\'impatto ambientale.' },
    { keys: ['made in italy', 'italiano', 'artigianato'], a: 'Privilegiamo il **Made in Italy**: artigiani locali, materiali di produzione italiana e tradizione manifatturiera d\'eccellenza. La qualità italiana è il nostro marchio di fabbrica.' },
    { keys: ['illuminazione', 'luci', 'lampade', 'light design'], a: 'Il nostro servizio di **light design** include progettazione illuminotecnica, selezione apparecchi, sistemi dimmerabili e scenografie luminose per ogni ambiente.' },
    { keys: ['tessuti', 'tende', 'tendaggi', 'imbottiti'], a: 'Selezioniamo **tessuti d\'alta gamma** per divani, tende, cuscini e imbottiti. Coordinamo colori e texture per creare ambienti armonici e raffinati.' },
    { keys: ['cucina', 'cucine'], a: 'Progettiamo **cucine su misura** con i migliori brand: piani in marmo, quarzo o Corian, elettrodomestici di alta gamma, sistemi di organizzazione interna intelligenti.' },
    { keys: ['bagno', 'bagni', 'sanitari'], a: 'Realizziamo **bagni di design**: rubinetteria premium, sanitari sospesi, docce walk-in, vasche freestanding, rivestimenti in marmo o mosaico. Ogni bagno è un\'opera d\'arte.' },
    // === CERTIFICAZIONI E PERMESSI ===
    { keys: ['cila', 'scia', 'permesso', 'permessi', 'pratica edilizia', 'autorizzazione'], a: 'Gestiamo **tutte le pratiche edilizie**: CILA, SCIA, permessi di costruire. Il nostro team tecnico si occupa di ogni aspetto burocratico con il Comune.' },
    { keys: ['catasto', 'catastale', 'accatastamento', 'variazione catastale'], a: 'Ci occupiamo delle **pratiche catastali**: variazioni, accatastamenti, planimetrie aggiornate. Tutto viene consegnato in regola per la compravendita o l\'affitto.' },
    { keys: ['sicurezza', 'normative', 'norma', 'a norma', 'legge'], a: 'Tutti i nostri lavori rispettano le **normative vigenti**: sicurezza cantiere (D.Lgs. 81/2008), normativa antincendio, acustica, accessibilità. Certificazioni complete a fine lavori.' },
    { keys: ['agibilità', 'abitabilità'], a: 'Consegniamo il progetto con tutta la **documentazione per l\'agibilità**: certificazioni impiantistiche, conformità edilizia, APE e collaudi.' },
    { keys: ['classe energetica', 'efficienza energetica', 'risparmio energetico'], a: 'Progettiamo interventi per migliorare la **classe energetica**: isolamento, infissi performanti, impianti ad alta efficienza, pannelli solari. Consulenza APE inclusa.' },
    // === ZONE SERVITE ===
    { keys: ['milano', 'dove siete', 'sede', 'zona', 'dove lavorate'], a: 'La nostra sede è a **Milano**, ma operiamo in tutta Italia e all\'estero. Abbiamo realizzato progetti a Roma, Firenze, Como, sulla costiera e in capitali europee.' },
    { keys: ['roma', 'lazio'], a: 'Sì, lavoriamo anche a **Roma** e nel Lazio. Abbiamo completato diversi progetti nella capitale. Contattaci per verificare disponibilità e tempistiche.' },
    { keys: ['firenze', 'toscana'], a: 'Operiamo anche in **Toscana**: Firenze, Siena, Lucca e zone limitrofe. Abbiamo esperienza con ville storiche e immobili di pregio toscani.' },
    { keys: ['como', 'lago', 'laghi'], a: 'Lavoriamo regolarmente nella zona dei **laghi**: Como, Garda, Maggiore. Ville e residenze di lusso sul lago sono una delle nostre specialità.' },
    { keys: ['estero', 'internazionale', 'abroad', 'europa'], a: 'Operiamo anche **all\'estero**: abbiamo realizzato progetti in Svizzera, Francia, UK e altre capitali europee. Contattaci per progetti internazionali.' },
    // === TIPOLOGIE DI PROGETTO ===
    { keys: ['appartamento', 'casa', 'residenza', 'abitazione'], a: 'Siamo specializzati in **appartamenti e residenze di pregio**: attici, loft, ville, bilocali di design. Dalla monolocale alla grande residenza, ogni spazio merita eccellenza.' },
    { keys: ['ufficio', 'uffici', 'office', 'workspace', 'coworking'], a: 'Progettiamo **uffici e spazi di lavoro**: open space, sale riunioni, executive office, coworking. Design funzionale che migliora produttività e benessere.' },
    { keys: ['hotel', 'albergo', 'hospitality', 'b&b', 'bed and breakfast'], a: 'Realizziamo **progetti hospitality**: boutique hotel, B&B di charme, resort. Dalla hall alle suite, progettiamo esperienze uniche per gli ospiti.' },
    { keys: ['negozio', 'retail', 'boutique', 'showroom', 'commerciale'], a: 'Progettiamo **spazi retail e showroom**: vetrine, layout di vendita, illuminazione commerciale, arredi espositivi. Design che attrae e converte.' },
    { keys: ['ristorante', 'bar', 'locale', 'food', 'ristorazione'], a: 'Realizziamo **interni per la ristorazione**: ristoranti, bar, wine bar, bistrot. Ambienti che creano atmosfera e valorizzano l\'esperienza gastronomica.' },
    { keys: ['attico', 'penthouse', 'terrazza'], a: 'Gli **attici** sono una delle nostre specialità: progettazione di terrazze panoramiche, giardini pensili, spazi living con vista. Lusso ai piani alti.' },
    { keys: ['villa', 'villetta', 'casa indipendente'], a: 'Progettiamo **ville complete**: interni ed esterni, piscine, giardini, domotica avanzata. Dal cancello alla camera padronale, tutto su misura.' },
    { keys: ['loft', 'open space', 'spazio aperto'], a: 'Trasformiamo **loft e spazi industriali** in ambienti di design: soppalchi, grandi vetrate, materiali grezzi combinati con finiture di lusso.' },
    // === STILI DI DESIGN ===
    { keys: ['moderno', 'contemporaneo', 'minimal', 'minimalista'], a: 'Lo stile **moderno e minimalista** è uno dei nostri punti di forza: linee pulite, materiali naturali, spazi luminosi e funzionali. Less is more, ma con sostanza.' },
    { keys: ['classico', 'tradizionale', 'neoclassico'], a: 'Realizziamo anche interni in stile **classico e neoclassico**: boiserie, stucchi, marmi pregiati, arredi di ispirazione storica rivisitati in chiave contemporanea.' },
    { keys: ['lusso', 'luxury', 'di lusso', 'alta gamma', 'esclusivo'], a: 'Il **lusso** è il nostro DNA: materiali pregiati, finiture impeccabili, dettagli su misura. Non è solo estetica, è un\'esperienza da vivere ogni giorno.' },
    { keys: ['industriale', 'industrial', 'urban'], a: 'Lo stile **industriale** rivisitato: mattoni a vista, metallo, legno grezzo, grandi vetrate. Combinato con comfort moderno per spazi urbani di carattere.' },
    { keys: ['scandinavo', 'nordico', 'hygge'], a: 'Lo stile **scandinavo** per ambienti luminosi e accoglienti: legno chiaro, tessuti naturali, colori neutri, funzionalità al primo posto.' },
    { keys: ['wabi sabi', 'giapponese', 'zen', 'orientale'], a: 'Il design **orientale** e wabi-sabi: materiali naturali imperfetti, spazi meditativi, equilibrio tra vuoto e pieno. Armonia e semplicità raffinata.' },
    // === GARANZIE ===
    { keys: ['garanzia', 'garanzie', 'copertura', 'assicurazione'], a: 'Offriamo **garanzia completa** su tutti i lavori: 2 anni su finiture e lavorazioni, 5 anni su impianti, garanzia del produttore su arredi e materiali. Intervento rapido in caso di necessità.' },
    { keys: ['assistenza post', 'manutenzione', 'dopo lavori', 'post vendita'], a: 'Il nostro servizio non finisce alla consegna: offriamo **assistenza post-lavori** per manutenzione, piccoli interventi e consulenza continua.' },
    { keys: ['assicurazione cantiere', 'polizza', 'danni'], a: 'Tutti i nostri cantieri sono coperti da **polizza assicurativa** per danni a terzi e responsabilità civile. Lavoriamo in totale sicurezza per voi e per i vicini.' },
    { keys: ['contratto', 'accordo', 'tutela'], a: 'Firmiamo un **contratto dettagliato** che specifica: lavorazioni, materiali, tempistiche, costi, penali e garanzie. La vostra tutela è la nostra priorità.' },
    // === PERSONALIZZAZIONE ===
    { keys: ['personalizzare', 'personalizzazione', 'su misura', 'customizzare'], a: 'Ogni progetto è **100% personalizzato**: ascoltiamo le vostre esigenze, il vostro stile di vita, e creiamo spazi che vi rappresentano. Nessun progetto è uguale all\'altro.' },
    { keys: ['colori', 'palette', 'colore', 'combinazione colori'], a: 'La scelta dei **colori** è fondamentale: creiamo palette coordinate per ogni ambiente, considerando luce naturale, dimensioni e funzione dello spazio.' },
    { keys: ['spazio piccolo', 'piccolo', 'monolocale', 'poco spazio'], a: 'Siamo esperti nella **progettazione di spazi piccoli**: soluzioni salvaspazio, arredi multifunzione, specchi e luci che ampliano la percezione degli ambienti.' },
    { keys: ['open plan', 'open space abitativo', 'spazio aperto casa'], a: 'Progettiamo **spazi open plan** funzionali: cucina-soggiorno integrati, zone definite senza pareti, divisori trasparenti o mobili. Fluidità e convivialità.' },
    { keys: ['smart home', 'casa intelligente', 'automazione'], a: 'Integriamo sistemi **smart home**: controllo luci, clima, sicurezza e multimedia da smartphone. Domotica avanzata nascosta nel design, per un comfort invisibile.' },
    // === PROCESSO DI LAVORO ===
    { keys: ['referente unico', 'unico interlocutore', 'project manager', 'chi coordina'], a: 'Il vostro **unico referente** coordina tutto: architetti, artigiani, impiantisti e fornitori. Nessun rimpallo di responsabilità, comunicazione diretta e costante.' },
    { keys: ['aggiornamenti', 'come mi aggiornate', 'stato lavori', 'avanzamento'], a: 'Vi teniamo **costantemente aggiornati**: report fotografici settimanali, accesso al cantiere su appuntamento, il referente è sempre raggiungibile per telefono o email.' },
    { keys: ['sopralluogo tecnico', 'rilievi', 'misure'], a: 'Il **sopralluogo tecnico** include rilievi dettagliati, analisi dello stato attuale, verifica impianti esistenti e documentazione fotografica completa.' },
    { keys: ['progetto esecutivo', 'disegni tecnici', 'planimetria'], a: 'Il **progetto esecutivo** include planimetrie, sezioni, dettagli costruttivi, computo metrico e specifiche tecniche di ogni materiale. Nulla è lasciato al caso.' },
    { keys: ['cantiere', 'lavori in corso', 'durante i lavori'], a: 'Il **cantiere** è gestito con ordine e sicurezza: programma lavori giornaliero, pulizia costante, protezione delle aree non interessate. Minimizziamo i disagi.' },
    { keys: ['subappalto', 'subappaltatori', 'terze parti'], a: 'Collaboriamo con **artigiani e tecnici selezionati** che lavorano esclusivamente per noi. Ogni collaboratore è verificato, certificato e condivide i nostri standard di qualità.' },
    // === DOMANDE GENERICHE / AZIENDA ===
    { keys: ['chi siete', 'chi è impronta', 'storia', 'azienda', 'chi è'], a: '**Impronta Arredi** è general contractor specializzato in interior design e ristrutturazioni chiavi in mano di lusso. Operiamo con un unico referente per progetti residenziali, commerciali e hospitality.' },
    { keys: ['esperienza', 'anni esperienza', 'da quanto tempo'], a: 'Abbiamo oltre **20 anni di esperienza** nel settore, con più di 500 progetti realizzati. La nostra competenza spazia dal residenziale di lusso all\'hospitality e al commerciale.' },
    { keys: ['team', 'squadra', 'quante persone', 'dipendenti'], a: 'Il nostro **team** include architetti, interior designer, project manager e una rete di artigiani qualificati. Ogni professionista è selezionato per competenza e passione.' },
    { keys: ['portfolio', 'lavori precedenti', 'progetti realizzati', 'esempi'], a: 'Abbiamo realizzato oltre **500 progetti**: appartamenti di lusso a Milano, uffici direzionali, boutique hotel, negozi e showroom. Scopri i nostri lavori nella sezione portfolio del sito.' },
    { keys: ['differenza', 'perché voi', 'vantaggio', 'cosa vi distingue'], a: 'Ciò che ci distingue: **un unico referente** per tutto il progetto. Nessun rimpallo tra impresa, elettricista, idraulico e arredatore. Zero sorprese, tempi certi, budget rispettato.' },
    { keys: ['recensioni', 'opinioni', 'feedback clienti'], a: 'I nostri clienti ci apprezzano per **professionalità, puntualità e trasparenza**. Puoi leggere le recensioni sul nostro sito nella sezione dedicata. Il passaparola è il nostro miglior biglietto da visita.' },
    // === CONTATTI E ORARI ===
    { keys: ['orari', 'quando aprite', 'apertura', 'chiusura', 'orario'], a: '**Orari:**\nLun–Ven: 09:00–18:00\nSab: 09:00–13:00\nDom: Chiuso\n\nSiamo disponibili per appuntamenti anche fuori orario, su richiesta.' },
    { keys: ['appuntamento', 'fissare appuntamento', 'prenotare', 'incontro'], a: 'Puoi **fissare un appuntamento** chiamando il +39 000 0000000, scrivendo a info@improntarredi.it o compilando il modulo nella pagina Contatti. Prima consulenza gratuita!' },
    { keys: ['email', 'scrivere', 'posta elettronica'], a: 'Scrivici a **info@improntarredi.it** — rispondiamo entro 24 ore lavorative. Per urgenze, chiama il +39 000 0000000.' },
    { keys: ['showroom', 'visita', 'visitare'], a: 'Il nostro **showroom** è a Milano, Via Example 1. Puoi visitarlo su appuntamento per vedere materiali, finiture e lasciarti ispirare dai nostri ambienti.' },
    { keys: ['whatsapp', 'messaggio', 'chat'], a: 'Puoi contattarci anche via **chat** su questo widget! Per richieste dettagliate, scrivici a info@improntarredi.it o chiama il +39 000 0000000.' },
    // === INFISSI E SERRAMENTI ===
    { keys: ['infissi', 'serramenti', 'finestre', 'vetri'], a: 'Forniamo e installiamo **infissi di alta qualità**: alluminio, legno, PVC, taglio termico. Vetri basso-emissivi per isolamento termico e acustico. Tutto certificato.' },
    { keys: ['porte', 'porta', 'porte interne', 'porte blindate'], a: 'Installiamo **porte interne** di design (battente, scorrevoli, a scomparsa, filomuro) e porte blindate di sicurezza certificate, con finiture personalizzate.' },
    // === GIARDINO E OUTDOOR ===
    { keys: ['giardino', 'esterno', 'outdoor', 'terrazzo', 'balcone'], a: 'Progettiamo anche **spazi esterni**: terrazzi, giardini, pergole, piscine. Design outdoor coordinato con gli interni per un\'esperienza abitativa completa.' },
    { keys: ['piscina', 'spa', 'wellness'], a: 'Realizziamo **piscine e aree wellness** private: saune, hammam, vasche idromassaggio, spazi relax. Lusso e benessere direttamente a casa tua.' },
    // === ACUSTICA E ISOLAMENTO ===
    { keys: ['acustica', 'insonorizzazione', 'rumore', 'isolamento acustico'], a: 'Progettiamo soluzioni di **isolamento acustico**: pareti fonoassorbenti, controsoffitti acustici, pavimenti flottanti. Per un comfort sonoro perfetto in ogni ambiente.' },
    { keys: ['isolamento termico', 'cappotto', 'coibentazione'], a: 'Realizziamo **isolamento termico** con cappotto interno/esterno, infissi performanti e soluzioni innovative per ridurre dispersioni e costi energetici.' },
    // === SITUAZIONI SPECIFICHE ===
    { keys: ['condominio', 'lavori condominiali', 'regolamento condominiale'], a: 'Gestiamo anche i **rapporti condominiali**: comunicazioni all\'amministratore, rispetto degli orari, protezione aree comuni. Lavoriamo in armonia con il condominio.' },
    { keys: ['emergenza', 'urgente', 'urgenza', 'guasto'], a: 'Per **interventi urgenti** (guasti, infiltrazioni, problemi impiantistici) contattaci al +39 000 0000000. Valutiamo la situazione e interveniamo rapidamente.' },
    { keys: ['rumoroso', 'rumore cantiere', 'disturbo', 'vicini'], a: 'Rispettiamo rigorosamente gli **orari di lavoro** consentiti e adottiamo ogni misura per ridurre il rumore. Informiamo i vicini e l\'amministratore prima dell\'inizio lavori.' },
    { keys: ['vincolo', 'beni culturali', 'edificio storico', 'soprintendenza'], a: 'Abbiamo esperienza con **edifici vincolati**: conosciamo le procedure della Soprintendenza e lavoriamo nel rispetto dei vincoli architettonici e storici.' },
    { keys: ['nuovo costruzione', 'casa nuova', 'nuova costruzione'], a: 'Oltre alle ristrutturazioni, progettiamo gli **interni di nuove costruzioni**: dalla planimetria all\'arredamento, per abitazioni nuove che nascono già perfette.' },
    // === ACCESSIBILITA ===
    { keys: ['accessibilità', 'disabilità', 'barriere architettoniche', 'anziani'], a: 'Progettiamo ambienti **accessibili e senza barriere**: bagni attrezzati, percorsi agevoli, domotica assistiva. Design inclusivo che non rinuncia all\'estetica.' },
    // === TENDENZE ===
    { keys: ['tendenze', 'trend', 'moda', 'novità design'], a: 'Le **tendenze 2026**: materiali naturali e sostenibili, tonalità calde, curve morbide, design biophilic, integrazione indoor-outdoor, domotica invisibile. Vi guidiamo nella scelta.' },
    { keys: ['biophilic', 'piante', 'verde', 'natura'], a: 'Il **design biophilic** integra la natura negli interni: pareti verdi, giardini interni, materiali naturali, luce naturale. Benessere e bellezza si fondono.' },
    // === DOMANDE PRATICHE ===
    { keys: ['dove dormire', 'dove vivere durante', 'durante i lavori dove'], a: 'Durante la ristrutturazione potrebbe non essere possibile abitare l\'immobile. Vi consigliamo sulla **pianificazione**: fasi per rimanere parzialmente, o soluzioni temporanee.' },
    { keys: ['pulizia', 'fine lavori', 'pulizia finale'], a: 'La **pulizia finale** è inclusa nel nostro servizio: al termine dei lavori, consegniamo l\'immobile pulito e pronto da abitare.' },
    { keys: ['smaltimento', 'macerie', 'rifiuti', 'calcinacci'], a: 'Lo **smaltimento dei materiali** di demolizione è incluso: gestiamo il trasporto e lo smaltimento certificato nel rispetto delle normative ambientali.' },
    { keys: ['vicini informare', 'comunicazione vicini', 'avviso lavori'], a: 'Prima dell\'inizio lavori, prepariamo una **comunicazione formale** per l\'amministratore e i vicini, con orari di lavoro e referente di cantiere per qualsiasi esigenza.' },
    // === LINGUE ===
    { keys: ['lingua', 'lingue parlate', 'english', 'chinese', 'language'], a: 'Parliamo **italiano, inglese e cinese**. Il nostro team è in grado di seguire clienti internazionali in modo fluido e professionale.' },
    { keys: ['cliente straniero', 'straniero', 'investitore estero', 'foreigner'], a: 'Siamo abituati a lavorare con **clienti internazionali**: comunicazione in inglese e cinese, conoscenza delle esigenze di investitori esteri, assistenza completa.' },
    // === REFERENZE E FIDUCIA ===
    { keys: ['referenze', 'lavori fatti', 'dimostrazione', 'case study'], a: 'Su richiesta, possiamo fornire **referenze dirette** di clienti soddisfatti e organizzare visite a progetti completati. La trasparenza è il nostro valore.' },
    { keys: ['come trovarvi', 'dove trovarvi', 'come raggiungervi', 'parcheggio'], a: 'Siamo in **Via Example 1, Milano**. Facilmente raggiungibili con mezzi pubblici. Parcheggio disponibile nelle vicinanze. Appuntamento consigliato.' },
    // === VARIE COMPETITOR-INSPIRED ===
    { keys: ['differenza architetto', 'meglio architetto', 'perché non un architetto'], a: 'Un architetto progetta, noi **progettiamo E realizziamo**. Con noi non dovete coordinare separatamente impresa edile, idraulico, elettricista e arredatore. Un unico contratto, un unico responsabile.' },
    { keys: ['differenza impresa edile', 'perché non un\'impresa', 'general contractor'], a: 'Un\'impresa edile esegue lavori, noi siamo **general contractor**: progettiamo, coordiniamo, arrediamo e certifichiamo. Dal concept al trasloco, tutto gestito da noi.' },
    { keys: ['secondo parere', 'opinione', 'consulenza tecnica'], a: 'Offriamo anche **consulenze tecniche** su progetti in corso o preventivi di altri: valutiamo fattibilità, costi e proponiamo alternative. Consulenza iniziale gratuita.' },
    { keys: ['problemi precedente impresa', 'lavoro incompleto', 'cantiere abbandonato'], a: 'Ci occupiamo anche di **completamento lavori** iniziati da altri: valutiamo lo stato, proponiamo soluzioni e portiamo a termine il progetto con i nostri standard.' },
    { keys: ['conflitto interessi', 'trasparenza prezzi', 'ricarico materiali'], a: 'Massima **trasparenza**: i prezzi dei materiali sono documentati con fatture dei fornitori. Nessun ricarico nascosto. Il nostro guadagno è nella gestione, non nei materiali.' },
    { keys: ['cambio idea', 'modificare progetto', 'variante', 'ripensamento'], a: 'Le **varianti** sono possibili: valutiamo l\'impatto su tempi e costi, vi presentiamo le opzioni e procediamo solo con la vostra approvazione scritta.' },
    { keys: ['rinuncia', 'annullamento', 'cancellare progetto'], a: 'In caso di **rinuncia**, le condizioni sono regolate dal contratto. Le fasi di progettazione già completate vengono fatturate. Nessuna penale nascosta.' },
    { keys: ['privacy', 'riservatezza', 'discrezione'], a: 'Garantiamo **massima riservatezza**: i dati dei clienti e le immagini dei progetti non vengono divulgati senza consenso esplicito. NDA disponibile su richiesta.' },
    { keys: ['collaborazione', 'partnership', 'lavorare insieme', 'subfornitore'], a: 'Siamo aperti a **collaborazioni** con architetti, studi di design e professionisti del settore. Contattaci per discutere opportunità di partnership.' }
  ];

  /* ══════════════════════════════════════════
     KB TRANSLATIONS (EN/CN)
     ══════════════════════════════════════════ */
  var kbTranslations = {
    en: {},
    cn: {}
  };

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
      return bestMatch.a;
    }
    return null;
  }

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
      default:
        // Search knowledge base before fallback
        var kbAnswer = searchKB(text);
        if (kbAnswer) {
          return kbAnswer + '\n\nHai altre domande? Sono a disposizione!';
        }
        return r.fallback;
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
