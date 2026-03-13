/* ==========================================================================
   Impronta Arredi – Script principale
   i18n (IT/EN/CN), cookie banner, scroll reveal, counter animation, navigation
   ========================================================================== */

(function () {
  'use strict';

  /* =================================================================
     1. SISTEMA MULTILINGUA (IT / EN / CN)
     ================================================================= */

  var translations = {
    it: {
      // Nav
      'nav.home': 'Home',
      'nav.chi-siamo': 'Chi Siamo',
      'nav.servizi': 'Servizi',
      'nav.progetti': 'Progetti',
      'nav.contatti': 'Contatti',
      'nav.faq': 'FAQ',
      // Hero
      'hero.label': 'Interior Design & Ristrutturazione Chiavi in Mano',
      'hero.title': 'Progettiamo e realizziamo <em>spazi d\'eccellenza</em>',
      'hero.text': 'Dal concept alla consegna: progettazione, ristrutturazione, impianti, arredamento e certificazioni. Un unico referente per il tuo progetto, senza sorprese.',
      'hero.cta1': 'Richiedi consulenza',
      'hero.cta2': 'Scopri i servizi',
      'hero.scroll': 'Scopri',
      // Portfolio
      'portfolio.label': 'Progetti realizzati',
      'portfolio.title': 'I nostri lavori parlano per noi',
      'portfolio.1.title': 'Residenza Brera',
      'portfolio.1.cat': 'Appartamento di lusso',
      'portfolio.2.title': 'Loft Navigli',
      'portfolio.2.cat': 'Ristrutturazione completa',
      'portfolio.3.title': 'Villa Monza',
      'portfolio.3.cat': 'Interior design',
      'portfolio.4.title': 'Headquarter Porta Nuova',
      'portfolio.4.cat': 'Ufficio direzionale',
      'portfolio.5.title': 'Suite Hotel Duomo',
      'portfolio.5.cat': 'Boutique hotel',
      'portfolio.cta': 'Scopri tutti i progetti',
      // Stats
      'stat.1.label': 'Anni di esperienza',
      'stat.2.label': 'Progetti realizzati',
      'stat.3.label': 'Certificazioni garantite',
      'stat.4.label': 'Unico referente',
      // Features
      'features.label': 'Perché sceglierci',
      'features.title': 'Un unico partner per tutto il progetto',
      'features.desc': 'La garanzia di un committente unico che coordina ogni fase, elimina i problemi e ottimizza tempi e costi.',
      'feature.1.title': 'Progettazione integrata',
      'feature.1.text': 'Architettura d\'interni, layout funzionali, render 3D fotorealistici. Ogni dettaglio progettato prima di iniziare i lavori.',
      'feature.2.title': 'Realizzazione completa',
      'feature.2.text': 'Muratura, impianti elettrici e idraulici, pavimentazioni, controsoffitti. Tutto gestito dal nostro team certificato.',
      'feature.3.title': 'Arredamento su misura',
      'feature.3.text': 'Mobili, complementi, illuminazione e tessuti selezionati per creare ambienti unici che riflettono la tua identità.',
      // Parallax
      'parallax.quote': '"Un unico referente, zero sorprese, risultati impeccabili"',
      'parallax.desc': 'Dalla prima idea alla consegna delle chiavi, il nostro team gestisce ogni aspetto del progetto con la massima cura.',
      // About
      'about.label': 'Chi siamo',
      'about.title': 'Eccellenza artigianale, visione contemporanea',
      'about.text1': 'Impronta Arredi è il partner di riferimento per chi cerca un servizio chiavi in mano di altissimo livello. Dalla progettazione alla certificazione finale, gestiamo ogni aspetto del tuo progetto con competenza e passione.',
      'about.text2': 'La nostra forza è la direzione unica: un solo referente che coordina architetti, artigiani, impiantisti e fornitori. Questo significa zero problemi di comunicazione, tempi certi e risultati impeccabili.',
      'about.cta': 'Scopri la nostra storia',
      // Testimonial
      'testimonial.text': '"Impronta Arredi ha trasformato il nostro appartamento in un capolavoro. Un unico referente per tutto, zero stress, risultato perfetto."',
      'testimonial.author': '— Cliente privato, Milano',
      // CTA
      'cta.title': 'Hai un progetto in mente?',
      'cta.text': 'Contattaci per una consulenza gratuita. Dal primo incontro alla consegna delle chiavi, saremo il tuo unico referente.',
      'cta.btn': 'Contattaci ora',
      // Footer
      'footer.desc': 'Interior design e ristrutturazione chiavi in mano. Progettazione, realizzazione, arredamento e certificazioni: un unico referente per il tuo progetto.',
      'footer.nav': 'Navigazione',
      'footer.services': 'Servizi',
      'footer.srv.1': 'Interior design',
      'footer.srv.2': 'Ristrutturazione',
      'footer.srv.3': 'Arredamento su misura',
      'footer.srv.4': 'Certificazioni',
      'footer.contact': 'Contatti',
      'footer.rights': 'Tutti i diritti riservati.',
      'footer.privacy': 'Privacy Policy',
      'footer.cookie': 'Cookie Policy',
      // Cookie
      'cookie.text': 'Questo sito utilizza cookie tecnici e, previo tuo consenso, cookie di profilazione per migliorare la tua esperienza.',
      'cookie.more': 'Scopri di più',
      'cookie.accept': 'Accetta',
      'cookie.reject': 'Rifiuta',
      // Video
      'video.title': 'Le nostre migliori realizzazioni',
      'video.desc': 'Scopri i progetti che raccontano la nostra passione per il design d\'eccellenza e la cura di ogni dettaglio.',
      'video.cta': 'Scopri i servizi',
      // Reviews
      'reviews.label': 'Recensioni',
      'reviews.title': 'Cosa dicono i nostri clienti',
      // Recensioni lingua mista: 4 IT, 4 EN, 2 CN (restano nella lingua originale del recensore)
      'review.1.text': '"Impronta Arredi ha trasformato il nostro appartamento in un capolavoro. Un unico referente per tutto, zero stress, risultato perfetto."',
      'review.1.author': 'Marco R. — Milano',
      'review.2.text': '"Professionalità impeccabile. Hanno ristrutturato il nostro ufficio rispettando tempi e budget. Consigliatissimi."',
      'review.2.author': 'Laura B. — Roma',
      'review.3.text': '"Il progetto del nostro boutique hotel è stato gestito magistralmente. Dalla progettazione all\'arredamento su misura, tutto perfetto."',
      'review.3.author': 'Giovanni T. — Firenze',
      'review.4.text': '"La qualità dei materiali e la cura dei dettagli sono straordinarie. La nostra villa è esattamente come l\'avevamo immaginata."',
      'review.4.author': 'Alessandro P. — Como',
      'review.5.text': '"Exceptional craftsmanship and attention to detail. They renovated our Manhattan penthouse with impeccable Italian taste. One contact for everything — brilliant."',
      'review.5.author': 'James W. — New York',
      'review.6.text': '"We chose Impronta Arredi for our London office redesign. The 3D renders were stunning and the final result even better. Highly professional team."',
      'review.6.author': 'Sarah K. — London',
      'review.7.text': '"From concept to keys, Impronta Arredi handled our Lake Como villa renovation flawlessly. Premium materials, on time, no hidden costs. Perfection."',
      'review.7.author': 'Robert M. — Zürich',
      'review.8.text': '"Outstanding turnkey service for our boutique hotel in Florence. The design perfectly blends Italian heritage with contemporary luxury."',
      'review.8.author': 'Emily H. — Paris',
      'review.9.text': '"Impronta Arredi为我们在米兰的公寓进行了全面翻新。从设计到施工，只需联系一个人。材料品质卓越，效果超出预期。强烈推荐！"',
      'review.9.author': '王丽华 — 上海 / Milano',
      'review.10.text': '"作为海外投资者，沟通是最大的担忧。Impronta Arredi的团队精通中文，全程无障碍沟通。交钥匙服务让我的罗马投资物业完美呈现。"',
      'review.10.author': '陈志明 — 北京 / Roma',
      // FAQ
      'faq.label': 'FAQ',
      'faq.title': 'Domande frequenti',
      'faq.1.q': 'Cosa include il servizio chiavi in mano?',
      'faq.1.a': 'Il nostro servizio chiavi in mano include progettazione e interior design, ristrutturazione edile completa, impianti elettrici e idraulici, arredamento su misura, e tutte le certificazioni necessarie. Un unico referente coordina ogni fase del progetto.',
      'faq.2.q': 'Quanto tempo richiede una ristrutturazione completa?',
      'faq.2.a': 'I tempi variano in base alla complessità del progetto. Un appartamento di medie dimensioni richiede generalmente 3-6 mesi. Durante il sopralluogo iniziale definiamo una timeline dettagliata e ci impegniamo a rispettarla grazie alla nostra gestione centralizzata.',
      'faq.3.q': 'Lavorate solo a Milano o anche in altre zone?',
      'faq.3.a': 'La nostra sede è a Milano, ma lavoriamo in tutta Italia e anche all\'estero. Abbiamo realizzato progetti a Roma, Firenze, Como, sulla costiera e in diverse capitali europee. Contattateci per verificare la disponibilità nella vostra zona.',
      'faq.4.q': 'È possibile vedere un\'anteprima 3D del progetto?',
      'faq.4.a': 'Assolutamente sì. Realizziamo render 3D fotorealistici che vi permetteranno di visualizzare ogni dettaglio del progetto prima dell\'inizio dei lavori. Questo garantisce che il risultato finale corrisponda esattamente alle vostre aspettative.',
      'faq.5.q': 'Come funziona il preventivo?',
      'faq.5.a': 'Offriamo una consulenza iniziale gratuita con sopralluogo. Dopo aver compreso le vostre esigenze, prepariamo un preventivo dettagliato e trasparente, senza costi nascosti. Il budget è unico e include tutte le lavorazioni, materiali e certificazioni.',
      // FAQ Page
      'faqpage.title': 'Domande Frequenti',
      'faqpage.subtitle': 'Tutto quello che devi sapere su interior design, ristrutturazione chiavi in mano, costi, tempistiche e materiali. Non trovi la risposta? Contattaci!',
      'faqpage.cat.1': 'Servizi e Competenze',
      'faqpage.cat.2': 'Costi e Preventivi',
      'faqpage.cat.3': 'Tempistiche e Processo',
      'faqpage.cat.4': 'Materiali e Qualità',
      'faqpage.cat.5': 'Area Geografica e Internazionale',
      'faqpage.cat.6': 'Garanzie e Sicurezza',
      'faqpage.1.q': 'Cosa include il servizio chiavi in mano?',
      'faqpage.1.a': 'Il nostro servizio chiavi in mano include progettazione e interior design, ristrutturazione edile completa, impianti elettrici e idraulici, arredamento su misura, e tutte le certificazioni necessarie. Un unico referente coordina ogni fase del progetto, dalla prima consulenza alla consegna delle chiavi.',
      'faqpage.2.q': 'Che tipo di progetti gestite?',
      'faqpage.2.a': 'Gestiamo progetti di ogni dimensione e tipologia nel segmento luxury: appartamenti di lusso, ville, attici, uffici direzionali, boutique hotel, negozi luxury, ristoranti e showroom. Lavoriamo su progetti da 50 a 5.000 mq.',
      'faqpage.3.q': 'Offrite anche solo il servizio di interior design senza ristrutturazione?',
      'faqpage.3.a': 'Sì, offriamo consulenze di interior design anche indipendentemente dalla ristrutturazione: concept creativo, mood board, selezione materiali, arredamento e styling completo degli ambienti.',
      'faqpage.4.q': 'Realizzate render 3D fotorealistici?',
      'faqpage.4.a': 'Assolutamente sì. Ogni progetto include render 3D fotorealistici ad alta definizione che vi permetteranno di visualizzare il risultato finale in ogni dettaglio prima dell\'inizio dei lavori.',
      'faqpage.5.q': 'Vi occupate anche di domotica e smart home?',
      'faqpage.5.a': 'Sì, progettiamo e installiamo sistemi domotici integrati: illuminazione intelligente, climatizzazione automatizzata, sistemi di sicurezza, audio multiroom e controllo remoto via app.',
      'faqpage.6.q': 'Fate anche lavori di manutenzione ordinaria?',
      'faqpage.6.a': 'Ci specializziamo in ristrutturazioni complete e progetti chiavi in mano di alto livello. Per manutenzione ordinaria possiamo indirizzarvi ai nostri partner di fiducia.',
      'faqpage.7.q': 'Lavorate con brand di arredamento di lusso?',
      'faqpage.7.a': 'Collaboriamo con i migliori brand italiani e internazionali: B&B Italia, Poliform, Molteni&C, Minotti, Cassina, Flos, Artemide, Boffi e molti altri. Vi guidiamo nella scelta dei pezzi perfetti per il vostro progetto.',
      'faqpage.8.q': 'Gestite anche le pratiche edilizie e i permessi?',
      'faqpage.8.a': 'Sì, ci occupiamo di tutte le pratiche burocratiche: CILA, SCIA, permessi di costruire, pratiche catastali, APE e certificazioni di conformità. Non dovrete preoccuparvi di nulla.',
      'faqpage.9.q': 'Come funziona il preventivo?',
      'faqpage.9.a': 'Offriamo una consulenza iniziale gratuita con sopralluogo. Dopo aver compreso le vostre esigenze, prepariamo un preventivo dettagliato e trasparente, senza costi nascosti. Il budget è unico e include tutte le lavorazioni, materiali e certificazioni.',
      'faqpage.10.q': 'Quanto costa una ristrutturazione di lusso al metro quadro?',
      'faqpage.10.a': 'I costi variano da €800 a €3.000+/mq a seconda della complessità del progetto, dei materiali scelti e del livello di finiture. Durante il sopralluogo gratuito forniamo una stima personalizzata e accurata.',
      'faqpage.11.q': 'Il preventivo è vincolante?',
      'faqpage.11.a': 'Sì, il nostro preventivo è fisso e vincolante una volta approvato. Nessuna sorpresa: il budget concordato è quello finale, salvo modifiche esplicitamente richieste dal cliente.',
      'faqpage.12.q': 'Quali metodi di pagamento accettate?',
      'faqpage.12.a': 'Accettiamo bonifico bancario e pagamenti dilazionati secondo un piano concordato, legato alle milestones del progetto. Massima flessibilità e trasparenza.',
      'faqpage.13.q': 'Esistono agevolazioni fiscali per le ristrutturazioni?',
      'faqpage.13.a': 'Sì, in Italia sono disponibili diversi bonus fiscali: Bonus Ristrutturazione 50%, Ecobonus 65%, Superbonus. Vi guidiamo nella scelta dell\'agevolazione più adatta al vostro progetto e nella gestione delle pratiche.',
      'faqpage.14.q': 'La consulenza iniziale è davvero gratuita?',
      'faqpage.14.a': 'Sì, il primo incontro e il sopralluogo sono completamente gratuiti e senza impegno. È il nostro modo di conoscervi, capire le vostre esigenze e proporvi la soluzione migliore.',
      'faqpage.15.q': 'Quanto tempo richiede una ristrutturazione completa?',
      'faqpage.15.a': 'I tempi variano in base alla complessità: 3-6 mesi per un appartamento medio, 6-12 mesi per progetti più complessi come ville o hotel. Durante il sopralluogo definiamo una timeline dettagliata e ci impegniamo a rispettarla.',
      'faqpage.16.q': 'Quali sono le fasi del vostro processo?',
      'faqpage.16.a': 'Il nostro processo si articola in 3 fasi: 1) Ascolto e sopralluogo gratuito per capire le vostre esigenze, 2) Progettazione con render 3D per visualizzare il risultato, 3) Realizzazione con un unico referente che coordina tutti i lavori.',
      'faqpage.17.q': 'Come vengo aggiornato durante i lavori?',
      'faqpage.17.a': 'Un project manager dedicato vi aggiorna settimanalmente con report fotografici dettagliati, videochiamata e accesso al nostro portale clienti dove potete seguire l\'avanzamento in tempo reale.',
      'faqpage.18.q': 'Cosa succede se ci sono ritardi nei lavori?',
      'faqpage.18.a': 'Grazie alla gestione centralizzata, i ritardi sono estremamente rari. In caso di imprevisti, vi informiamo immediatamente e proponiamo soluzioni concrete per recuperare i tempi previsti.',
      'faqpage.19.q': 'Posso vivere in casa durante la ristrutturazione?',
      'faqpage.19.a': 'Dipende dall\'entità dei lavori. Per ristrutturazioni totali consigliamo di trasferirsi temporaneamente per sicurezza e praticità. Per interventi parziali è spesso possibile restare nell\'abitazione.',
      'faqpage.20.q': 'Quanto tempo serve per la sola fase di progettazione?',
      'faqpage.20.a': 'La fase di progettazione richiede generalmente 3-6 settimane, incluse le revisioni, la selezione materiali e l\'approvazione dei render 3D definitivi.',
      'faqpage.21.q': 'Che tipo di materiali utilizzate?',
      'faqpage.21.a': 'Utilizziamo solo materiali premium selezionati: marmi italiani (Calacatta, Statuario, Botticino), legni pregiati, ceramiche d\'autore, tessuti di alta gamma. Ogni materiale è scelto per qualità, estetica e durabilità.',
      'faqpage.22.q': 'Posso scegliere personalmente i materiali?',
      'faqpage.22.a': 'Assolutamente. Vi accompagniamo nei migliori showroom e laboratori artigianali italiani per toccare con mano ogni materiale. La scelta finale è sempre vostra, con la nostra guida esperta al vostro fianco.',
      'faqpage.23.q': 'Utilizzate materiali sostenibili ed eco-friendly?',
      'faqpage.23.a': 'Sì, proponiamo soluzioni eco-friendly su richiesta: vernici a basse emissioni VOC, legni certificati FSC, isolamenti in fibra naturale e sistemi ad alta efficienza energetica.',
      'faqpage.24.q': 'Offrite garanzia sui lavori eseguiti?',
      'faqpage.24.a': 'Sì, tutti i nostri lavori sono coperti da garanzia: 10 anni per le strutture, 2 anni per finiture e impianti, come previsto dalla normativa italiana. Inoltre offriamo assistenza post-consegna dedicata.',
      'faqpage.25.q': 'Come viene garantita la qualità durante i lavori?',
      'faqpage.25.a': 'Effettuiamo controlli qualità rigorosi in ogni fase del cantiere: sopralluoghi tecnici settimanali, fotodocumentazione completa dell\'avanzamento e collaudo finale con checklist dettagliata prima della consegna.',
      'faqpage.26.q': 'Lavorate solo a Milano o anche in altre zone d\'Italia?',
      'faqpage.26.a': 'La nostra sede è a Milano, ma lavoriamo in tutta Italia — Roma, Firenze, Como, costiera amalfitana, Sardegna — e anche all\'estero: Londra, Parigi, New York, Zurigo, Dubai e altre capitali.',
      'faqpage.27.q': 'Come gestite i progetti internazionali?',
      'faqpage.27.a': 'Per progetti all\'estero, il nostro team si trasferisce in loco per tutta la durata dei lavori. Gestiamo fornitori locali e, quando necessario, importiamo materiali e artigiani italiani per garantire lo standard qualitativo.',
      'faqpage.28.q': 'Il vostro team parla inglese e cinese?',
      'faqpage.28.a': 'Sì, il nostro team è multilingue: italiano, inglese e cinese mandarino. Offriamo comunicazione diretta senza intermediari per tutti i clienti internazionali.',
      'faqpage.29.q': 'Lavorate con clienti stranieri che acquistano immobili in Italia?',
      'faqpage.29.a': 'Assolutamente. Assistiamo molti clienti internazionali — americani, cinesi, svizzeri, arabi — che acquistano proprietà in Italia. Li accompagniamo dalla ricerca dell\'immobile alla consegna chiavi in mano.',
      'faqpage.30.q': 'Fornite assistenza post-vendita anche per progetti all\'estero?',
      'faqpage.30.a': 'Sì, offriamo assistenza post-consegna ovunque nel mondo. Il vostro project manager dedicato resta il vostro punto di riferimento anche dopo la fine dei lavori.',
      'faqpage.31.q': 'Siete assicurati per i lavori?',
      'faqpage.31.a': 'Sì, disponiamo di assicurazione RC professionale e polizza CAR (Contractors All Risks) per ogni cantiere. La vostra proprietà è sempre protetta durante l\'intera durata dei lavori.',
      'faqpage.32.q': 'Come gestite la privacy e la riservatezza del cantiere?',
      'faqpage.32.a': 'Garantiamo massima riservatezza: accordi NDA su richiesta, cantiere coperto, accesso limitato al solo personale autorizzato. Servizio ideale per clienti VIP e high-profile.',
      'faqpage.33.q': 'I vostri operai sono in regola con le normative?',
      'faqpage.33.a': 'Tutti i nostri collaboratori sono regolarmente assunti, formati e dotati di dispositivi di protezione individuale. Rispettiamo scrupolosamente tutte le normative sulla sicurezza sul lavoro.',
      'faqpage.34.q': 'Cosa succede se qualcosa non è di mio gradimento a fine lavori?',
      'faqpage.34.a': 'Prima della consegna effettuiamo un walk-through dettagliato insieme a voi. Ogni osservazione viene documentata e risolta prima della firma del verbale di consegna. La vostra completa soddisfazione è la nostra priorità assoluta.',
      'faqpage.cta.title': 'Non hai trovato la risposta che cercavi?',
      'faqpage.cta.text': 'Contattaci per una consulenza gratuita. Il nostro team è a disposizione per rispondere a tutte le tue domande.',
      'faqpage.cta.btn': 'Contattaci ora',
      // Pages
      'page.chi-siamo.title': 'Chi Siamo',
      'page.chi-siamo.subtitle': 'Eccellenza artigianale e visione contemporanea al servizio del tuo progetto',
      'page.servizi.title': 'I Nostri Servizi',
      'page.servizi.subtitle': 'Un servizio completo chiavi in mano: dalla progettazione alla certificazione',
      'page.contatti.title': 'Contatti',
      'page.contatti.subtitle': 'Siamo a tua disposizione per consulenze, preventivi e informazioni',
      // Progetti page
      'projects.label': 'I nostri progetti',
      'projects.title': 'I nostri lavori parlano per noi',
      'projects.subtitle': 'Ogni progetto racconta una storia di eccellenza: dal concept alla consegna delle chiavi, con render 3D, disegni tecnici e risultato finale.',
      'project.1.badge': 'Progetto Realizzato',
      'project.1.title': 'Attico Piazza di Spagna',
      'project.1.location': 'Roma, Piazza di Spagna — Italia',
      'project.1.desc': 'Ristrutturazione integrale di un attico panoramico di 320 mq nel cuore di Roma, affacciato sulla scalinata di Trinità dei Monti. Il progetto ha unito il fascino dell\'architettura storica romana con un design contemporaneo radicale: superfici continue in marmo Calacatta Oro, cucina monolitica a scomparsa, sistema domotico integrato con illuminazione scenografica a layer, terrazza panoramica con giardino pensile e vasca infinity.',
      'project.2.badge': 'Progetto Realizzato',
      'project.2.title': 'Villa CityLife',
      'project.2.location': 'Milano, CityLife — Italia',
      'project.2.desc': 'Progettazione e realizzazione integrale di una villa contemporanea di 480 mq nel quartiere CityLife di Milano. Architettura a doppia altezza con scala scultorea in acciaio Cor-Ten, living panoramico con vetrate floor-to-ceiling, piscina interna con area spa, giardino zen privato e garage automatizzato.',
      'project.3.badge': 'Progetto Realizzato',
      'project.3.title': 'Penthouse Fifth Avenue',
      'project.3.location': 'New York, Fifth Avenue — Manhattan',
      'project.3.desc': 'Interior design e arredamento completo di un penthouse di 260 mq al 58° piano di un grattacielo su Fifth Avenue, con vista panoramica su Central Park. Il progetto ha portato il design italiano nel cuore di Manhattan: pavimenti in travertino romano, boiserie artigianali, cucina Boffi su misura.',
      'project.4.badge': 'Progetto Realizzato',
      'project.4.title': 'Boutique Hotel Brera',
      'project.4.location': 'Milano, Quartiere Brera — Italia',
      'project.4.desc': 'Progettazione integrale di 24 camere e suite per un boutique hotel nel cuore del quartiere Brera a Milano. Ogni camera è un pezzo unico: palette cromatiche ispirate ai pittori della Pinacoteca di Brera, testiere artigianali in tessuto Rubelli, bagni in pietra Cardoso con rubinetteria Fantini.',
      'project.spec.area': 'Superficie',
      'project.spec.duration': 'Durata',
      'project.spec.year': 'Anno',
      'project.spec.type': 'Tipologia',
      'project.spec.rooms': 'Camere',
      'project.cta': 'Richiedi un progetto simile →',
      'projects.cta.title': 'Il tuo progetto potrebbe essere il prossimo',
      'projects.cta.text': 'Contattaci per una consulenza gratuita. Raccontaci la tua visione: la realizzeremo insieme, chiavi in mano.',
      'projects.cta.btn': 'Richiedi consulenza gratuita',
      // Contact form
      'form.name': 'Nome e cognome',
      'form.email': 'Email',
      'form.phone': 'Telefono',
      'form.project': 'Tipo di progetto',
      'form.project.opt1': 'Appartamento',
      'form.project.opt2': 'Ufficio',
      'form.project.opt3': 'Hotel / Hospitality',
      'form.project.opt4': 'Negozio / Retail',
      'form.project.opt5': 'Altro',
      'form.message': 'Messaggio',
      'form.submit': 'Invia richiesta',
      // Services page
      'srv.1.title': 'Progettazione e interior design',
      'srv.1.text': 'Analisi degli spazi, concept creativo, progettazione esecutiva con render 3D fotorealistici. Ogni dettaglio viene definito prima dell\'inizio dei lavori per garantire un risultato senza sorprese.',
      'srv.2.title': 'Ristrutturazione completa',
      'srv.2.text': 'Demolizioni, muratura, massetti, pavimentazioni, controsoffitti, tinteggiature. Gestiamo tutti i lavori edili con maestranze qualificate e materiali di prima scelta.',
      'srv.3.title': 'Impianti elettrici e speciali',
      'srv.3.text': 'Progettazione e realizzazione di impianti elettrici, domotica, illuminotecnica, antintrusione, videosorveglianza. Tutto certificato secondo le normative vigenti.',
      'srv.4.title': 'Impianti idraulici e termici',
      'srv.4.text': 'Impianti idrico-sanitari, riscaldamento a pavimento, raffrescamento, ventilazione meccanica controllata. Efficienza energetica e comfort abitativo garantiti.',
      'srv.5.title': 'Arredamento su misura',
      'srv.5.text': 'Cucine, bagni, living, camere, uffici: arredi progettati e realizzati su misura con materiali selezionati. Complementi d\'arredo, illuminazione e tessuti coordinati.',
      'srv.6.title': 'Certificazioni e collaudi',
      'srv.6.text': 'Certificazione di conformità di tutti gli impianti, collaudi, pratiche catastali, APE. Consegniamo il progetto con tutta la documentazione in regola, pronta per l\'agibilità.',
      'srv.parallax.quote': '"Ogni fase del progetto, un unico responsabile"',
      // USP
      'usp.label': 'Il vantaggio chiave',
      'usp.title': 'Perché un unico committente fa la differenza',
      'usp.desc': 'Affidare il progetto a un unico referente elimina i problemi e garantisce risultati superiori.',
      'usp.1.title': 'Zero problemi di coordinamento',
      'usp.1.text': 'Nessun rimpallo di responsabilità tra impresa edile, elettricista, idraulico e arredatore. Un unico team, una sola responsabilità.',
      'usp.2.title': 'Tempi certi e rispettati',
      'usp.2.text': 'Pianificazione centralizzata: ogni fase inizia quando la precedente è completata. Niente ritardi da mancato coordinamento.',
      'usp.3.title': 'Budget ottimizzato al 100%',
      'usp.3.text': 'Preventivo unico e trasparente. Nessun costo nascosto, nessuna maggiorazione da imprevisti causati da terzi.',
      'usp.4.title': 'Qualità certificata',
      'usp.4.text': 'Ogni impianto, ogni lavorazione, ogni materiale: certificato e documentato. Consegniamo un progetto completo di tutta la documentazione.',
      // Process
      'process.label': 'Come lavoriamo',
      'process.title': 'Il nostro processo',
      'process.desc': 'Un percorso chiaro e trasparente in ogni fase del progetto.',
      'process.1.title': 'Ascolto e sopralluogo',
      'process.1.text': 'Ci incontriamo per capire le tue esigenze, visitiamo gli spazi e definiamo insieme obiettivi e budget.',
      'process.2.title': 'Progettazione',
      'process.2.text': 'Creiamo il concept, i render 3D e il progetto esecutivo completo per la tua approvazione.',
      'process.3.title': 'Realizzazione',
      'process.3.text': 'Coordiniamo tutti i lavori: edili, impiantistici e di finitura. Un unico referente ti aggiorna costantemente.',
      // Chi siamo page
      'chi.story.title': 'La nostra storia',
      'chi.story.p1': 'Impronta Arredi nasce dalla passione per il design e dalla convinzione che ogni spazio meriti di essere trasformato in un\'esperienza. Non siamo un semplice studio di interior design: siamo general contractor specializzati nel lusso.',
      'chi.story.p2': 'Gestiamo progetti chiavi in mano di alta complessità: appartamenti di pregio, uffici direzionali, boutique hotel, negozi di lusso. Dalla progettazione all\'ultimo certificato, il nostro team si occupa di tutto.',
      'chi.values.label': 'I nostri valori',
      'chi.values.title': 'Principi che guidano ogni progetto',
      'chi.val.1.title': 'Eccellenza senza compromessi',
      'chi.val.1.text': 'Selezioniamo i migliori materiali, i migliori artigiani, le migliori soluzioni. Il lusso è nella cura dei dettagli.',
      'chi.val.2.title': 'Trasparenza totale',
      'chi.val.2.text': 'Budget definito, timeline chiara, comunicazione costante. Nessuna sorpresa, solo risultati.',
      'chi.val.3.title': 'Responsabilità unica',
      'chi.val.3.text': 'Un solo referente per tutto il progetto. Zero rimpalli, zero alibi. Se qualcosa non va, lo risolviamo noi.',
      'chi.parallax.quote': '"Ogni spazio merita di essere trasformato in un\'esperienza"',
      'chi.approach.label': 'Il nostro approccio',
      'chi.approach.title': 'Un unico referente, risultati impeccabili',
      'chi.approach.text': 'La nostra forza è la direzione unica: un solo referente che coordina architetti, artigiani, impiantisti e fornitori. Questo significa zero problemi di comunicazione, tempi certi e risultati perfetti.',
      // Contact page
      'contact.address.label': 'Indirizzo',
      'contact.phone.label': 'Telefono',
      'contact.email.label': 'Email',
      'contact.hours.label': 'Orari',
      'contact.hours.1': 'Lun – Ven: 09:00 – 18:00',
      'contact.hours.2': 'Sab: 09:00 – 13:00',
      'contact.hours.3': 'Dom: Chiuso',
    },

    en: {
      'nav.home': 'Home',
      'nav.chi-siamo': 'About Us',
      'nav.servizi': 'Services',
      'nav.progetti': 'Projects',
      'nav.contatti': 'Contact',
      'nav.faq': 'FAQ',
      'hero.label': 'Interior Design & Turnkey Renovation',
      'hero.title': 'We design and create <em>spaces of excellence</em>',
      'hero.text': 'From concept to delivery: design, renovation, systems, furnishing, and certifications. One single point of contact for your project, with no surprises.',
      'hero.cta1': 'Request consultation',
      'hero.cta2': 'Discover services',
      'hero.scroll': 'Discover',
      'portfolio.label': 'Completed projects',
      'portfolio.title': 'Our work speaks for itself',
      'portfolio.1.title': 'Brera Residence',
      'portfolio.1.cat': 'Luxury apartment',
      'portfolio.2.title': 'Navigli Loft',
      'portfolio.2.cat': 'Complete renovation',
      'portfolio.3.title': 'Villa Monza',
      'portfolio.3.cat': 'Interior design',
      'portfolio.4.title': 'Porta Nuova Headquarters',
      'portfolio.4.cat': 'Executive office',
      'portfolio.5.title': 'Hotel Duomo Suite',
      'portfolio.5.cat': 'Boutique hotel',
      'portfolio.cta': 'Discover all projects',
      'stat.1.label': 'Years of experience',
      'stat.2.label': 'Projects completed',
      'stat.3.label': 'Certifications guaranteed',
      'stat.4.label': 'Single point of contact',
      'features.label': 'Why choose us',
      'features.title': 'One partner for the entire project',
      'features.desc': 'The guarantee of a single contractor who coordinates every phase, eliminates problems, and optimizes time and costs.',
      'feature.1.title': 'Integrated design',
      'feature.1.text': 'Interior architecture, functional layouts, photorealistic 3D renders. Every detail designed before work begins.',
      'feature.2.title': 'Complete construction',
      'feature.2.text': 'Masonry, electrical and plumbing systems, flooring, suspended ceilings. All managed by our certified team.',
      'feature.3.title': 'Bespoke furnishing',
      'feature.3.text': 'Furniture, accessories, lighting, and fabrics selected to create unique environments that reflect your identity.',
      'parallax.quote': '"One point of contact, zero surprises, impeccable results"',
      'parallax.desc': 'From the first idea to key handover, our team manages every aspect of the project with the utmost care.',
      'about.label': 'About us',
      'about.title': 'Artisan excellence, contemporary vision',
      'about.text1': 'Impronta Arredi is the reference partner for those seeking top-level turnkey service. From design to final certification, we manage every aspect of your project with expertise and passion.',
      'about.text2': 'Our strength is unified management: one single contact who coordinates architects, craftsmen, technicians, and suppliers. This means zero communication issues, certain timelines, and impeccable results.',
      'about.cta': 'Discover our story',
      'testimonial.text': '"Impronta Arredi transformed our apartment into a masterpiece. One single contact for everything, zero stress, perfect result."',
      'testimonial.author': '— Private client, Milan',
      'cta.title': 'Have a project in mind?',
      'cta.text': 'Contact us for a free consultation. From the first meeting to key handover, we\'ll be your single point of contact.',
      'cta.btn': 'Contact us now',
      'footer.desc': 'Interior design and turnkey renovation. Design, construction, furnishing, and certifications: one single partner for your project.',
      'footer.nav': 'Navigation',
      'footer.services': 'Services',
      'footer.srv.1': 'Interior design',
      'footer.srv.2': 'Renovation',
      'footer.srv.3': 'Bespoke furnishing',
      'footer.srv.4': 'Certifications',
      'footer.contact': 'Contact',
      'footer.rights': 'All rights reserved.',
      'footer.privacy': 'Privacy Policy',
      'footer.cookie': 'Cookie Policy',
      'cookie.text': 'This site uses technical cookies and, with your consent, profiling cookies to improve your experience.',
      'cookie.more': 'Learn more',
      'cookie.accept': 'Accept',
      'cookie.reject': 'Reject',
      // Video
      'video.title': 'Our finest projects',
      'video.desc': 'Discover the projects that tell the story of our passion for design excellence and attention to every detail.',
      'video.cta': 'Discover services',
      // Reviews
      'reviews.label': 'Reviews',
      'reviews.title': 'What our clients say',
      // Reviews stay in original reviewer language (mixed: 4 IT, 4 EN, 2 CN)
      'review.1.text': '"Impronta Arredi ha trasformato il nostro appartamento in un capolavoro. Un unico referente per tutto, zero stress, risultato perfetto."',
      'review.1.author': 'Marco R. — Milano',
      'review.2.text': '"Professionalità impeccabile. Hanno ristrutturato il nostro ufficio rispettando tempi e budget. Consigliatissimi."',
      'review.2.author': 'Laura B. — Roma',
      'review.3.text': '"Il progetto del nostro boutique hotel è stato gestito magistralmente. Dalla progettazione all\'arredamento su misura, tutto perfetto."',
      'review.3.author': 'Giovanni T. — Firenze',
      'review.4.text': '"La qualità dei materiali e la cura dei dettagli sono straordinarie. La nostra villa è esattamente come l\'avevamo immaginata."',
      'review.4.author': 'Alessandro P. — Como',
      'review.5.text': '"Exceptional craftsmanship and attention to detail. They renovated our Manhattan penthouse with impeccable Italian taste. One contact for everything — brilliant."',
      'review.5.author': 'James W. — New York',
      'review.6.text': '"We chose Impronta Arredi for our London office redesign. The 3D renders were stunning and the final result even better. Highly professional team."',
      'review.6.author': 'Sarah K. — London',
      'review.7.text': '"From concept to keys, Impronta Arredi handled our Lake Como villa renovation flawlessly. Premium materials, on time, no hidden costs. Perfection."',
      'review.7.author': 'Robert M. — Zürich',
      'review.8.text': '"Outstanding turnkey service for our boutique hotel in Florence. The design perfectly blends Italian heritage with contemporary luxury."',
      'review.8.author': 'Emily H. — Paris',
      'review.9.text': '"Impronta Arredi为我们在米兰的公寓进行了全面翻新。从设计到施工，只需联系一个人。材料品质卓越，效果超出预期。强烈推荐！"',
      'review.9.author': '王丽华 — 上海 / Milano',
      'review.10.text': '"作为海外投资者，沟通是最大的担忧。Impronta Arredi的团队精通中文，全程无障碍沟通。交钥匙服务让我的罗马投资物业完美呈现。"',
      'review.10.author': '陈志明 — 北京 / Roma',
      // FAQ
      'faq.label': 'FAQ',
      'faq.title': 'Frequently asked questions',
      'faq.1.q': 'What does the turnkey service include?',
      'faq.1.a': 'Our turnkey service includes design and interior design, complete building renovation, electrical and plumbing systems, bespoke furnishing, and all necessary certifications. A single point of contact coordinates every phase of the project.',
      'faq.2.q': 'How long does a complete renovation take?',
      'faq.2.a': 'Timelines vary based on project complexity. A medium-sized apartment typically requires 3-6 months. During the initial survey we define a detailed timeline and commit to meeting it thanks to our centralized management.',
      'faq.3.q': 'Do you only work in Milan or other areas too?',
      'faq.3.a': 'Our headquarters are in Milan, but we work throughout Italy and abroad. We have completed projects in Rome, Florence, Como, the coast, and several European capitals. Contact us to check availability in your area.',
      'faq.4.q': 'Is it possible to see a 3D preview of the project?',
      'faq.4.a': 'Absolutely. We create photorealistic 3D renders that allow you to visualize every detail of the project before work begins. This ensures the final result matches your expectations exactly.',
      'faq.5.q': 'How does the quotation process work?',
      'faq.5.a': 'We offer a free initial consultation with a site survey. After understanding your needs, we prepare a detailed and transparent quote with no hidden costs. The budget is all-inclusive, covering all work, materials, and certifications.',
      // FAQ Page
      'faqpage.title': 'Frequently Asked Questions',
      'faqpage.subtitle': 'Everything you need to know about interior design, turnkey renovation, costs, timelines and materials. Can\'t find the answer? Contact us!',
      'faqpage.cat.1': 'Services & Expertise',
      'faqpage.cat.2': 'Costs & Quotes',
      'faqpage.cat.3': 'Timelines & Process',
      'faqpage.cat.4': 'Materials & Quality',
      'faqpage.cat.5': 'Geographic Area & International',
      'faqpage.cat.6': 'Warranties & Safety',
      'faqpage.1.q': 'What does the turnkey service include?',
      'faqpage.1.a': 'Our turnkey service includes design and interior design, complete building renovation, electrical and plumbing systems, bespoke furnishing, and all necessary certifications. A single point of contact coordinates every phase, from first consultation to key handover.',
      'faqpage.2.q': 'What types of projects do you manage?',
      'faqpage.2.a': 'We manage projects of all sizes in the luxury segment: luxury apartments, villas, penthouses, executive offices, boutique hotels, luxury retail, restaurants and showrooms. We work on projects from 50 to 5,000 sqm.',
      'faqpage.3.q': 'Do you offer interior design only, without renovation?',
      'faqpage.3.a': 'Yes, we offer interior design consultancy independently from renovation: creative concept, mood board, material selection, furnishing and complete styling.',
      'faqpage.4.q': 'Do you create photorealistic 3D renders?',
      'faqpage.4.a': 'Absolutely. Every project includes high-definition photorealistic 3D renders that allow you to visualize the final result in every detail before work begins.',
      'faqpage.5.q': 'Do you also handle home automation and smart home systems?',
      'faqpage.5.a': 'Yes, we design and install integrated home automation: intelligent lighting, automated climate control, security systems, multi-room audio and remote control via app.',
      'faqpage.6.q': 'Do you also do regular maintenance work?',
      'faqpage.6.a': 'We specialize in complete renovations and high-end turnkey projects. For regular maintenance we can refer you to our trusted partners.',
      'faqpage.7.q': 'Do you work with luxury furniture brands?',
      'faqpage.7.a': 'We collaborate with the best Italian and international brands: B&B Italia, Poliform, Molteni&C, Minotti, Cassina, Flos, Artemide, Boffi and many more. We guide you in choosing the perfect pieces.',
      'faqpage.8.q': 'Do you handle building permits and paperwork?',
      'faqpage.8.a': 'Yes, we take care of all bureaucratic procedures: building permits, cadastral documentation, energy certificates and compliance certifications. You won\'t need to worry about anything.',
      'faqpage.9.q': 'How does the quotation process work?',
      'faqpage.9.a': 'We offer a free initial consultation with a site survey. After understanding your needs, we prepare a detailed and transparent quote with no hidden costs. The budget is all-inclusive.',
      'faqpage.10.q': 'How much does a luxury renovation cost per square meter?',
      'faqpage.10.a': 'Costs range from €800 to €3,000+/sqm depending on project complexity, chosen materials and finish level. During our free survey we provide an accurate personalized estimate.',
      'faqpage.11.q': 'Is the quote binding?',
      'faqpage.11.a': 'Yes, our quote is fixed and binding once approved. No surprises: the agreed budget is final, unless changes are explicitly requested by the client.',
      'faqpage.12.q': 'What payment methods do you accept?',
      'faqpage.12.a': 'We accept bank transfer and installment payments according to an agreed plan linked to project milestones. Maximum flexibility and transparency.',
      'faqpage.13.q': 'Are there tax incentives for renovations in Italy?',
      'faqpage.13.a': 'Yes, Italy offers various tax bonuses: 50% Renovation Bonus, 65% Ecobonus, Superbonus. We guide you in choosing the most suitable incentive and managing the paperwork.',
      'faqpage.14.q': 'Is the initial consultation really free?',
      'faqpage.14.a': 'Yes, the first meeting and site survey are completely free with no obligation. It\'s our way of getting to know you and understanding your needs.',
      'faqpage.15.q': 'How long does a complete renovation take?',
      'faqpage.15.a': 'Timelines vary by complexity: 3-6 months for a medium apartment, 6-12 months for more complex projects like villas or hotels. We define a detailed timeline during the survey.',
      'faqpage.16.q': 'What are the phases of your process?',
      'faqpage.16.a': 'Our process has 3 phases: 1) Free consultation and site survey, 2) Design with 3D renders to visualize the result, 3) Construction with a single point of contact coordinating all work.',
      'faqpage.17.q': 'How am I kept updated during the work?',
      'faqpage.17.a': 'A dedicated project manager updates you weekly with detailed photo reports, video calls and access to our client portal where you can follow progress in real time.',
      'faqpage.18.q': 'What happens if there are delays?',
      'faqpage.18.a': 'Thanks to centralized management, delays are extremely rare. In case of unforeseen circumstances, we inform you immediately and propose concrete solutions to recover time.',
      'faqpage.19.q': 'Can I stay in my home during renovation?',
      'faqpage.19.a': 'It depends on the scope of work. For total renovations we recommend temporarily relocating for safety. For partial interventions it\'s often possible to stay.',
      'faqpage.20.q': 'How long does the design phase alone take?',
      'faqpage.20.a': 'The design phase typically takes 3-6 weeks, including revisions, material selection and approval of the final 3D renders.',
      'faqpage.21.q': 'What type of materials do you use?',
      'faqpage.21.a': 'We use only premium selected materials: Italian marbles (Calacatta, Statuario, Botticino), fine woods, designer ceramics, high-end fabrics. Every material is chosen for quality, aesthetics and durability.',
      'faqpage.22.q': 'Can I personally choose the materials?',
      'faqpage.22.a': 'Absolutely. We accompany you to the finest Italian showrooms and artisan workshops to see and touch every material. The final choice is always yours, with our expert guidance.',
      'faqpage.23.q': 'Do you use sustainable and eco-friendly materials?',
      'faqpage.23.a': 'Yes, we offer eco-friendly solutions on request: low VOC emission paints, FSC certified woods, natural fiber insulation and high energy efficiency systems.',
      'faqpage.24.q': 'Do you offer a warranty on completed work?',
      'faqpage.24.a': 'Yes, all our work is covered by warranty: 10 years for structures, 2 years for finishes and systems, as required by Italian law. We also offer dedicated post-delivery support.',
      'faqpage.25.q': 'How is quality guaranteed during the works?',
      'faqpage.25.a': 'We carry out rigorous quality checks at every stage: weekly technical inspections, complete photo documentation and final testing with a detailed checklist before handover.',
      'faqpage.26.q': 'Do you only work in Milan?',
      'faqpage.26.a': 'Our headquarters are in Milan, but we work throughout Italy — Rome, Florence, Como, Amalfi Coast, Sardinia — and abroad: London, Paris, New York, Zurich, Dubai and more.',
      'faqpage.27.q': 'How do you manage international projects?',
      'faqpage.27.a': 'For international projects, our team relocates on-site for the duration. We manage local suppliers and, when necessary, import Italian materials and craftsmen to ensure quality standards.',
      'faqpage.28.q': 'Does your team speak English and Chinese?',
      'faqpage.28.a': 'Yes, our team is multilingual: Italian, English and Mandarin Chinese. We offer direct communication without intermediaries for all international clients.',
      'faqpage.29.q': 'Do you work with foreign clients buying property in Italy?',
      'faqpage.29.a': 'Absolutely. We assist many international clients — American, Chinese, Swiss, Arab — purchasing property in Italy. We accompany them from property search to turnkey delivery.',
      'faqpage.30.q': 'Do you provide after-sales support for international projects?',
      'faqpage.30.a': 'Yes, we offer post-delivery support worldwide. Your dedicated project manager remains your point of reference even after the work is complete.',
      'faqpage.31.q': 'Are you insured for the work?',
      'faqpage.31.a': 'Yes, we have professional liability insurance and a CAR (Contractors All Risks) policy for every site. Your property is always protected throughout the work.',
      'faqpage.32.q': 'How do you handle site privacy and confidentiality?',
      'faqpage.32.a': 'We guarantee maximum confidentiality: NDA agreements on request, covered construction site, access limited to authorized personnel only. Ideal for VIP and high-profile clients.',
      'faqpage.33.q': 'Are your workers compliant with regulations?',
      'faqpage.33.a': 'All our workers are properly employed, trained and equipped with personal protective equipment. We strictly comply with all workplace safety regulations.',
      'faqpage.34.q': 'What if I\'m not satisfied with something at the end?',
      'faqpage.34.a': 'Before delivery we conduct a detailed walk-through with you. Every observation is documented and resolved before signing the handover report. Your complete satisfaction is our absolute priority.',
      'faqpage.cta.title': 'Didn\'t find the answer you were looking for?',
      'faqpage.cta.text': 'Contact us for a free consultation. Our team is available to answer all your questions.',
      'faqpage.cta.btn': 'Contact us now',
      'page.chi-siamo.title': 'About Us',
      'page.chi-siamo.subtitle': 'Artisan excellence and contemporary vision at the service of your project',
      'page.servizi.title': 'Our Services',
      'page.servizi.subtitle': 'A complete turnkey service: from design to certification',
      'page.contatti.title': 'Contact',
      'page.contatti.subtitle': 'We\'re available for consultations, quotes, and information',
      // Projects page
      'projects.label': 'Our projects',
      'projects.title': 'Our work speaks for itself',
      'projects.subtitle': 'Every project tells a story of excellence: from concept to key handover, with 3D renders, technical drawings and final result.',
      'project.1.badge': 'Completed Project',
      'project.1.title': 'Piazza di Spagna Penthouse',
      'project.1.location': 'Rome, Piazza di Spagna — Italy',
      'project.1.desc': 'Complete renovation of a 320 sqm panoramic penthouse in the heart of Rome, overlooking the Trinità dei Monti steps. The project blends the charm of historic Roman architecture with radical contemporary design: seamless Calacatta Oro marble surfaces, concealed monolithic kitchen, integrated home automation with layered scenic lighting, panoramic terrace with roof garden and infinity pool.',
      'project.2.badge': 'Completed Project',
      'project.2.title': 'Villa CityLife',
      'project.2.location': 'Milan, CityLife — Italy',
      'project.2.desc': 'Complete design and build of a 480 sqm contemporary villa in Milan\'s CityLife district. Double-height architecture with a sculptural Cor-Ten steel staircase, panoramic living with floor-to-ceiling windows, indoor pool with spa area, private zen garden and automated garage.',
      'project.3.badge': 'Completed Project',
      'project.3.title': 'Fifth Avenue Penthouse',
      'project.3.location': 'New York, Fifth Avenue — Manhattan',
      'project.3.desc': 'Full interior design and furnishing of a 260 sqm penthouse on the 58th floor of a Fifth Avenue tower, with panoramic views of Central Park. The project brought Italian design to the heart of Manhattan: Roman travertine floors, artisan boiserie, bespoke Boffi kitchen.',
      'project.4.badge': 'Completed Project',
      'project.4.title': 'Boutique Hotel Brera',
      'project.4.location': 'Milan, Brera District — Italy',
      'project.4.desc': 'Full design of 24 rooms and suites for a boutique hotel in the heart of Milan\'s Brera district. Each room is unique: colour palettes inspired by Brera\'s Pinacoteca painters, artisan Rubelli fabric headboards, Cardoso stone bathrooms with Fantini fixtures.',
      'project.spec.area': 'Area',
      'project.spec.duration': 'Duration',
      'project.spec.year': 'Year',
      'project.spec.type': 'Type',
      'project.spec.rooms': 'Rooms',
      'project.cta': 'Request a similar project →',
      'projects.cta.title': 'Your project could be next',
      'projects.cta.text': 'Contact us for a free consultation. Tell us your vision: we\'ll make it happen together, turnkey.',
      'projects.cta.btn': 'Request free consultation',
      'form.name': 'Full name',
      'form.email': 'Email',
      'form.phone': 'Phone',
      'form.project': 'Project type',
      'form.project.opt1': 'Apartment',
      'form.project.opt2': 'Office',
      'form.project.opt3': 'Hotel / Hospitality',
      'form.project.opt4': 'Shop / Retail',
      'form.project.opt5': 'Other',
      'form.message': 'Message',
      'form.submit': 'Send request',
      'srv.1.title': 'Design & interior design',
      'srv.1.text': 'Space analysis, creative concept, executive design with photorealistic 3D renders. Every detail is defined before work begins to ensure a flawless result.',
      'srv.2.title': 'Complete renovation',
      'srv.2.text': 'Demolition, masonry, screeds, flooring, suspended ceilings, painting. We manage all construction work with qualified craftsmen and premium materials.',
      'srv.3.title': 'Electrical & special systems',
      'srv.3.text': 'Design and installation of electrical systems, home automation, lighting design, intrusion detection, video surveillance. All certified according to current regulations.',
      'srv.4.title': 'Plumbing & heating systems',
      'srv.4.text': 'Plumbing, underfloor heating, cooling, mechanical ventilation. Energy efficiency and living comfort guaranteed.',
      'srv.5.title': 'Bespoke furnishing',
      'srv.5.text': 'Kitchens, bathrooms, living rooms, bedrooms, offices: furniture designed and built to measure with selected materials. Coordinated accessories, lighting, and fabrics.',
      'srv.6.title': 'Certifications & testing',
      'srv.6.text': 'Compliance certification for all systems, testing, cadastral documentation, energy performance certificate. We deliver the project with all documentation in order.',
      'srv.parallax.quote': '"Every phase of the project, one single person in charge"',
      'usp.label': 'The key advantage',
      'usp.title': 'Why a single contractor makes the difference',
      'usp.desc': 'Entrusting the project to a single point of contact eliminates problems and guarantees superior results.',
      'usp.1.title': 'Zero coordination issues',
      'usp.1.text': 'No blame-shifting between builder, electrician, plumber, and designer. One team, one responsibility.',
      'usp.2.title': 'Certain and respected timelines',
      'usp.2.text': 'Centralized planning: each phase begins when the previous one is complete. No delays from poor coordination.',
      'usp.3.title': '100% optimized budget',
      'usp.3.text': 'Single transparent quote. No hidden costs, no surcharges from unforeseen issues caused by third parties.',
      'usp.4.title': 'Certified quality',
      'usp.4.text': 'Every system, every process, every material: certified and documented. We deliver a project complete with all documentation.',
      'process.label': 'How we work',
      'process.title': 'Our process',
      'process.desc': 'A clear and transparent journey at every stage of the project.',
      'process.1.title': 'Listening & survey',
      'process.1.text': 'We meet to understand your needs, visit the spaces, and define objectives and budget together.',
      'process.2.title': 'Design',
      'process.2.text': 'We create the concept, 3D renders, and the complete executive project for your approval.',
      'process.3.title': 'Construction',
      'process.3.text': 'We coordinate all work: building, systems, and finishing. A single contact keeps you constantly updated.',
      'chi.story.title': 'Our story',
      'chi.story.p1': 'Impronta Arredi was born from a passion for design and the conviction that every space deserves to be transformed into an experience. We\'re not just an interior design studio: we\'re general contractors specialized in luxury.',
      'chi.story.p2': 'We manage highly complex turnkey projects: luxury apartments, executive offices, boutique hotels, luxury retail. From design to the last certificate, our team handles everything.',
      'chi.values.label': 'Our values',
      'chi.values.title': 'Principles that guide every project',
      'chi.val.1.title': 'Uncompromising excellence',
      'chi.val.1.text': 'We select the best materials, the best craftsmen, the best solutions. Luxury lies in the attention to detail.',
      'chi.val.2.title': 'Total transparency',
      'chi.val.2.text': 'Defined budget, clear timeline, constant communication. No surprises, only results.',
      'chi.val.3.title': 'Single responsibility',
      'chi.val.3.text': 'One point of contact for the entire project. Zero blame-shifting, zero excuses. If something\'s wrong, we fix it.',
      'chi.parallax.quote': '"Every space deserves to be transformed into an experience"',
      'chi.approach.label': 'Our approach',
      'chi.approach.title': 'One single contact, impeccable results',
      'chi.approach.text': 'Our strength is unified management: one single contact who coordinates architects, craftsmen, technicians, and suppliers. This means zero communication issues, certain timelines, and perfect results.',
      'contact.address.label': 'Address',
      'contact.phone.label': 'Phone',
      'contact.email.label': 'Email',
      'contact.hours.label': 'Hours',
      'contact.hours.1': 'Mon – Fri: 09:00 – 18:00',
      'contact.hours.2': 'Sat: 09:00 – 13:00',
      'contact.hours.3': 'Sun: Closed',
    },

    cn: {
      'nav.home': '首页',
      'nav.chi-siamo': '关于我们',
      'nav.servizi': '服务',
      'nav.progetti': '项目',
      'nav.contatti': '联系我们',
      'nav.faq': '常见问题',
      'hero.label': '室内设计与交钥匙装修',
      'hero.title': '我们设计和打造<em>卓越空间</em>',
      'hero.text': '从概念到交付：设计、装修、系统安装、家具配置和认证。一个项目，一个负责人，没有意外。',
      'hero.cta1': '申请咨询',
      'hero.cta2': '了解服务',
      'hero.scroll': '探索',
      'portfolio.label': '已完成项目',
      'portfolio.title': '我们的作品自己会说话',
      'portfolio.1.title': '布雷拉住宅',
      'portfolio.1.cat': '豪华公寓',
      'portfolio.2.title': '运河区阁楼',
      'portfolio.2.cat': '全面翻新',
      'portfolio.3.title': '蒙扎别墅',
      'portfolio.3.cat': '室内设计',
      'portfolio.4.title': '新门总部',
      'portfolio.4.cat': '行政办公室',
      'portfolio.5.title': '大教堂酒店套房',
      'portfolio.5.cat': '精品酒店',
      'portfolio.cta': '查看所有项目',
      'stat.1.label': '年经验',
      'stat.2.label': '已完成项目',
      'stat.3.label': '认证保证',
      'stat.4.label': '唯一联系人',
      'features.label': '为什么选择我们',
      'features.title': '整个项目的唯一合作伙伴',
      'features.desc': '一个总承包商协调每个阶段，消除问题，优化时间和成本的保证。',
      'feature.1.title': '综合设计',
      'feature.1.text': '室内建筑、功能布局、逼真的3D渲染。每个细节都在施工前精心设计。',
      'feature.2.title': '全面施工',
      'feature.2.text': '砌筑、电气和管道系统、地板、吊顶。全部由我们认证的团队管理。',
      'feature.3.title': '定制家具',
      'feature.3.text': '家具、配饰、照明和面料精心挑选，打造反映您个性的独特环境。',
      'parallax.quote': '"一个联系人，零意外，完美结果"',
      'parallax.desc': '从第一个想法到交钥匙，我们的团队以最高标准管理项目的每个方面。',
      'about.label': '关于我们',
      'about.title': '工匠卓越，当代视野',
      'about.text1': 'Impronta Arredi是寻求顶级交钥匙服务者的首选合作伙伴。从设计到最终认证，我们以专业知识和热情管理您项目的每个方面。',
      'about.text2': '我们的优势是统一管理：一个联系人协调建筑师、工匠、技术人员和供应商。这意味着零沟通问题、确定的时间表和完美的结果。',
      'about.cta': '了解我们的故事',
      'testimonial.text': '"Impronta Arredi将我们的公寓变成了杰作。一个联系人负责一切，零压力，完美结果。"',
      'testimonial.author': '— 私人客户，米兰',
      'cta.title': '有项目想法吗？',
      'cta.text': '联系我们获取免费咨询。从第一次会面到交钥匙，我们将是您唯一的联系人。',
      'cta.btn': '立即联系我们',
      'footer.desc': '室内设计和交钥匙装修。设计、施工、家具配置和认证：您项目的唯一合作伙伴。',
      'footer.nav': '导航',
      'footer.services': '服务',
      'footer.srv.1': '室内设计',
      'footer.srv.2': '装修',
      'footer.srv.3': '定制家具',
      'footer.srv.4': '认证',
      'footer.contact': '联系方式',
      'footer.rights': '版权所有。',
      'footer.privacy': '隐私政策',
      'footer.cookie': 'Cookie政策',
      'cookie.text': '本网站使用技术Cookie，经您同意后还会使用分析Cookie以改善您的体验。',
      'cookie.more': '了解更多',
      'cookie.accept': '接受',
      'cookie.reject': '拒绝',
      // Video
      'video.title': '我们最好的作品',
      'video.desc': '了解展现我们对卓越设计热情和对每个细节关注的项目。',
      'video.cta': '了解服务',
      // Reviews
      'reviews.label': '客户评价',
      'reviews.title': '客户怎么说',
      // 评价保留原始语言（混合：4意大利语、4英语、2中文）
      'review.1.text': '"Impronta Arredi ha trasformato il nostro appartamento in un capolavoro. Un unico referente per tutto, zero stress, risultato perfetto."',
      'review.1.author': 'Marco R. — Milano',
      'review.2.text': '"Professionalità impeccabile. Hanno ristrutturato il nostro ufficio rispettando tempi e budget. Consigliatissimi."',
      'review.2.author': 'Laura B. — Roma',
      'review.3.text': '"Il progetto del nostro boutique hotel è stato gestito magistralmente. Dalla progettazione all\'arredamento su misura, tutto perfetto."',
      'review.3.author': 'Giovanni T. — Firenze',
      'review.4.text': '"La qualità dei materiali e la cura dei dettagli sono straordinarie. La nostra villa è esattamente come l\'avevamo immaginata."',
      'review.4.author': 'Alessandro P. — Como',
      'review.5.text': '"Exceptional craftsmanship and attention to detail. They renovated our Manhattan penthouse with impeccable Italian taste. One contact for everything — brilliant."',
      'review.5.author': 'James W. — New York',
      'review.6.text': '"We chose Impronta Arredi for our London office redesign. The 3D renders were stunning and the final result even better. Highly professional team."',
      'review.6.author': 'Sarah K. — London',
      'review.7.text': '"From concept to keys, Impronta Arredi handled our Lake Como villa renovation flawlessly. Premium materials, on time, no hidden costs. Perfection."',
      'review.7.author': 'Robert M. — Zürich',
      'review.8.text': '"Outstanding turnkey service for our boutique hotel in Florence. The design perfectly blends Italian heritage with contemporary luxury."',
      'review.8.author': 'Emily H. — Paris',
      'review.9.text': '"Impronta Arredi为我们在米兰的公寓进行了全面翻新。从设计到施工，只需联系一个人。材料品质卓越，效果超出预期。强烈推荐！"',
      'review.9.author': '王丽华 — 上海 / Milano',
      'review.10.text': '"作为海外投资者，沟通是最大的担忧。Impronta Arredi的团队精通中文，全程无障碍沟通。交钥匙服务让我的罗马投资物业完美呈现。"',
      'review.10.author': '陈志明 — 北京 / Roma',
      // FAQ
      'faq.label': '常见问题',
      'faq.title': '常见问题解答',
      'faq.1.q': '交钥匙服务包括什么？',
      'faq.1.a': '我们的交钥匙服务包括设计和室内设计、完整的建筑翻新、电气和管道系统、定制家具以及所有必要的认证。一个联系人协调项目的每个阶段。',
      'faq.2.q': '完整翻新需要多长时间？',
      'faq.2.a': '时间因项目复杂性而异。中等大小的公寓通常需要3-6个月。在初次勘察期间，我们会制定详细的时间表，并凭借集中管理确保按时完成。',
      'faq.3.q': '你们只在米兰工作还是也在其他地区？',
      'faq.3.a': '我们的总部在米兰，但我们在意大利全境和海外都有业务。我们在罗马、佛罗伦萨、科莫、海岸线和多个欧洲首都都完成了项目。请联系我们确认您所在地区的可用性。',
      'faq.4.q': '是否可以看到项目的3D预览？',
      'faq.4.a': '当然可以。我们制作逼真的3D渲染图，让您在施工前就能看到项目的每个细节。这确保最终结果完全符合您的期望。',
      'faq.5.q': '报价流程是怎样的？',
      'faq.5.a': '我们提供免费的初步咨询和现场勘察。了解您的需求后，我们会准备详细透明的报价，没有隐藏费用。预算是全包的，涵盖所有工程、材料和认证。',
      // FAQ Page
      'faqpage.title': '常见问题',
      'faqpage.subtitle': '关于室内设计、交钥匙装修、费用、时间和材料的一切信息。没找到答案？联系我们！',
      'faqpage.cat.1': '服务与专业能力',
      'faqpage.cat.2': '费用与报价',
      'faqpage.cat.3': '时间与流程',
      'faqpage.cat.4': '材料与质量',
      'faqpage.cat.5': '服务区域与国际业务',
      'faqpage.cat.6': '保修与安全',
      'faqpage.1.q': '交钥匙服务包括什么？',
      'faqpage.1.a': '我们的交钥匙服务包括设计和室内设计、完整的建筑翻新、电气和管道系统、定制家具以及所有必要的认证。一个联系人协调从首次咨询到交钥匙的每个阶段。',
      'faqpage.2.q': '你们管理什么类型的项目？',
      'faqpage.2.a': '我们在豪华领域管理各种规模的项目：豪华公寓、别墅、顶层公寓、行政办公室、精品酒店、奢侈品零售店、餐厅和展厅。项目面积从50到5000平方米。',
      'faqpage.3.q': '你们是否只提供室内设计服务而不包含装修？',
      'faqpage.3.a': '是的，我们提供独立于装修的室内设计咨询：创意概念、情绪板、材料选择、家具配置和完整的空间造型。',
      'faqpage.4.q': '你们制作逼真的3D渲染图吗？',
      'faqpage.4.a': '当然。每个项目都包含高清逼真3D渲染图，让您在施工前就能看到每个细节的最终效果。',
      'faqpage.5.q': '你们也做智能家居系统吗？',
      'faqpage.5.a': '是的，我们设计和安装集成智能家居系统：智能照明、自动化气候控制、安防系统、多房间音响和远程APP控制。',
      'faqpage.6.q': '你们也做日常维护工作吗？',
      'faqpage.6.a': '我们专注于全面翻新和高端交钥匙项目。对于日常维护，我们可以推荐我们信赖的合作伙伴。',
      'faqpage.7.q': '你们与奢侈品家具品牌合作吗？',
      'faqpage.7.a': '我们与最优秀的意大利和国际品牌合作：B&B Italia、Poliform、Molteni&C、Minotti、Cassina、Flos、Artemide、Boffi等。我们指导您选择完美的家具。',
      'faqpage.8.q': '你们处理建筑许可证和文件吗？',
      'faqpage.8.a': '是的，我们处理所有行政手续：建筑许可、地籍文件、能源证书和合规认证。您无需担心任何事务。',
      'faqpage.9.q': '报价流程是怎样的？',
      'faqpage.9.a': '我们提供免费的初步咨询和现场勘察。了解您的需求后，我们准备详细透明的报价，没有隐藏费用。预算是全包的。',
      'faqpage.10.q': '豪华装修每平方米多少钱？',
      'faqpage.10.a': '费用从€800到€3,000+/平方米不等，取决于项目复杂性、所选材料和装修水平。在免费勘察期间，我们提供准确的个性化估价。',
      'faqpage.11.q': '报价是否具有约束力？',
      'faqpage.11.a': '是的，我们的报价一旦获批即为固定且具有约束力。没有意外：商定的预算就是最终预算，除非客户明确要求变更。',
      'faqpage.12.q': '你们接受哪些付款方式？',
      'faqpage.12.a': '我们接受银行转账和根据项目里程碑商定的分期付款计划。最大限度的灵活性和透明度。',
      'faqpage.13.q': '意大利装修有税收优惠吗？',
      'faqpage.13.a': '是的，意大利提供多种税收优惠：50%装修奖金、65%节能奖金、超级奖金。我们指导您选择最适合的优惠并管理相关手续。',
      'faqpage.14.q': '初次咨询真的免费吗？',
      'faqpage.14.a': '是的，首次会面和现场勘察完全免费且无任何义务。这是我们了解您、理解您需求的方式。',
      'faqpage.15.q': '完整翻新需要多长时间？',
      'faqpage.15.a': '时间因复杂性而异：中等公寓3-6个月，别墅或酒店等复杂项目6-12个月。我们在勘察期间制定详细的时间表。',
      'faqpage.16.q': '你们的流程分几个阶段？',
      'faqpage.16.a': '我们的流程分为3个阶段：1) 免费咨询和现场勘察，2) 3D渲染设计以可视化结果，3) 由单一联系人协调所有工作的施工阶段。',
      'faqpage.17.q': '施工期间如何了解进度？',
      'faqpage.17.a': '专属项目经理每周通过详细的照片报告、视频通话和客户门户网站向您更新进度，您可以实时跟踪。',
      'faqpage.18.q': '如果出现延误怎么办？',
      'faqpage.18.a': '得益于集中管理，延误极为罕见。如遇不可预见情况，我们会立即通知您并提出具体解决方案以恢复时间进度。',
      'faqpage.19.q': '装修期间可以住在家里吗？',
      'faqpage.19.a': '这取决于工程范围。全面翻新建议暂时搬出以确保安全。部分翻新通常可以继续居住。',
      'faqpage.20.q': '仅设计阶段需要多长时间？',
      'faqpage.20.a': '设计阶段通常需要3-6周，包括修改、材料选择和最终3D渲染的审批。',
      'faqpage.21.q': '你们使用什么类型的材料？',
      'faqpage.21.a': '我们只使用精选优质材料：意大利大理石（卡拉卡塔、斯塔图里奥、博蒂奇诺）、名贵木材、设计师瓷砖、高端面料。每种材料都因品质、美观和耐用性而精选。',
      'faqpage.22.q': '我可以亲自选择材料吗？',
      'faqpage.22.a': '当然可以。我们带您到意大利最好的展厅和手工作坊亲自体验每种材料。最终选择始终由您决定，我们的专家全程指导。',
      'faqpage.23.q': '你们使用环保可持续材料吗？',
      'faqpage.23.a': '是的，我们根据要求提供环保解决方案：低VOC排放涂料、FSC认证木材、天然纤维隔热材料和高能效系统。',
      'faqpage.24.q': '你们对完成的工作提供保修吗？',
      'faqpage.24.a': '是的，我们所有的工作都有保修：结构10年，装修和系统2年，符合意大利法律规定。我们还提供专门的交后支持。',
      'faqpage.25.q': '施工期间如何保证质量？',
      'faqpage.25.a': '我们在每个阶段进行严格的质量检查：每周技术检查、完整的照片记录和交付前的详细检查清单最终测试。',
      'faqpage.26.q': '你们只在米兰工作吗？',
      'faqpage.26.a': '我们的总部在米兰，但在意大利全境——罗马、佛罗伦萨、科莫、阿马尔菲海岸、撒丁岛——以及海外：伦敦、巴黎、纽约、苏黎世、迪拜等地都有业务。',
      'faqpage.27.q': '你们如何管理国际项目？',
      'faqpage.27.a': '对于国际项目，我们的团队在工期内驻扎当地。我们管理当地供应商，必要时从意大利进口材料和工匠以确保质量标准。',
      'faqpage.28.q': '你们的团队会说英语和中文吗？',
      'faqpage.28.a': '是的，我们的团队精通多种语言：意大利语、英语和中文普通话。为所有国际客户提供无中间人的直接沟通。',
      'faqpage.29.q': '你们与在意大利购买房产的外国客户合作吗？',
      'faqpage.29.a': '当然。我们协助许多国际客户——美国、中国、瑞士、阿拉伯客户——在意大利购买房产。从物业搜寻到交钥匙交付，全程陪伴。',
      'faqpage.30.q': '你们为海外项目提供售后服务吗？',
      'faqpage.30.a': '是的，我们在全球范围内提供交后支持。您的专属项目经理在工程完成后仍然是您的联系人。',
      'faqpage.31.q': '你们有工程保险吗？',
      'faqpage.31.a': '是的，我们拥有职业责任保险和每个工地的CAR（承包商全险）保单。您的财产在整个施工期间始终受到保护。',
      'faqpage.32.q': '你们如何处理工地隐私和保密性？',
      'faqpage.32.a': '我们保证最高机密性：应要求签署保密协议、封闭工地、仅限授权人员进入。非常适合VIP和高知名度客户。',
      'faqpage.33.q': '你们的工人符合法规要求吗？',
      'faqpage.33.a': '我们所有的合作者都是正规雇佣、经过培训并配备个人防护设备。我们严格遵守所有工作场所安全法规。',
      'faqpage.34.q': '如果工程结束后有不满意的地方怎么办？',
      'faqpage.34.a': '交付前，我们与您一起进行详细的实地检查。每个问题都会在签署交接报告前记录并解决。您的完全满意是我们的最高优先级。',
      'faqpage.cta.title': '没有找到您要的答案？',
      'faqpage.cta.text': '联系我们获取免费咨询。我们的团队随时准备回答您的所有问题。',
      'faqpage.cta.btn': '立即联系我们',
      'page.chi-siamo.title': '关于我们',
      'page.chi-siamo.subtitle': '工匠卓越和当代视野，为您的项目服务',
      'page.servizi.title': '我们的服务',
      'page.servizi.subtitle': '完整的交钥匙服务：从设计到认证',
      'page.contatti.title': '联系我们',
      'page.contatti.subtitle': '我们随时为您提供咨询、报价和信息',
      // 项目页面
      'projects.label': '我们的项目',
      'projects.title': '我们的作品自己会说话',
      'projects.subtitle': '每个项目都讲述着一个卓越的故事：从概念到交钥匙，配有3D效果图、技术图纸和最终成果。',
      'project.1.badge': '已完成项目',
      'project.1.title': '西班牙广场顶层公寓',
      'project.1.location': '罗马，西班牙广场 — 意大利',
      'project.1.desc': '在罗马市中心对一套320平方米的全景顶层公寓进行全面翻新，俯瞰三一教堂台阶。项目将罗马历史建筑的魅力与激进的当代设计融为一体：连续的卡拉卡塔金大理石表面、隐藏式整体厨房、集成智能家居系统配分层灯光效果、全景露台配空中花园和无边泳池。',
      'project.2.badge': '已完成项目',
      'project.2.title': 'CityLife别墅',
      'project.2.location': '米兰，CityLife — 意大利',
      'project.2.desc': '在米兰CityLife区全面设计和建造一座480平方米的当代别墅。双层高建筑配有科尔腾钢雕塑楼梯、落地窗全景客厅、室内泳池配SPA区、私人禅意花园和自动车库。',
      'project.3.badge': '已完成项目',
      'project.3.title': '第五大道顶层公寓',
      'project.3.location': '纽约，第五大道 — 曼哈顿',
      'project.3.desc': '在第五大道一栋摩天大楼58层的260平方米顶层公寓进行全面室内设计和家具配置，可全景俯瞰中央公园。项目将意大利设计带入曼哈顿的心脏：罗马洞石地板、手工木质护墙板、定制Boffi厨房。',
      'project.4.badge': '已完成项目',
      'project.4.title': '布雷拉精品酒店',
      'project.4.location': '米兰，布雷拉区 — 意大利',
      'project.4.desc': '为米兰布雷拉区中心的精品酒店设计24间客房和套房。每间客房都是独一无二的：灵感来自布雷拉美术馆画家的色彩搭配、Rubelli面料手工床头板、卡尔多索石浴室配Fantini龙头。',
      'project.spec.area': '面积',
      'project.spec.duration': '工期',
      'project.spec.year': '年份',
      'project.spec.type': '类型',
      'project.spec.rooms': '客房',
      'project.cta': '申请类似项目 →',
      'projects.cta.title': '您的项目可能是下一个',
      'projects.cta.text': '联系我们获取免费咨询。告诉我们您的愿景：我们将一起实现，交钥匙服务。',
      'projects.cta.btn': '申请免费咨询',
      'form.name': '姓名',
      'form.email': '电子邮件',
      'form.phone': '电话',
      'form.project': '项目类型',
      'form.project.opt1': '公寓',
      'form.project.opt2': '办公室',
      'form.project.opt3': '酒店/接待',
      'form.project.opt4': '商店/零售',
      'form.project.opt5': '其他',
      'form.message': '留言',
      'form.submit': '发送请求',
      'srv.1.title': '设计与室内设计',
      'srv.1.text': '空间分析、创意概念、带逼真3D渲染的施工设计。每个细节在施工前确定，确保完美结果。',
      'srv.2.title': '全面装修',
      'srv.2.text': '拆除、砌筑、找平、铺地板、吊顶、涂装。我们以优质工匠和一流材料管理所有建筑工作。',
      'srv.3.title': '电气与特殊系统',
      'srv.3.text': '电气系统、智能家居、照明设计、防盗、视频监控的设计和安装。全部按现行法规认证。',
      'srv.4.title': '管道与供暖系统',
      'srv.4.text': '给排水、地暖、制冷、机械通风。保证能源效率和居住舒适。',
      'srv.5.title': '定制家具',
      'srv.5.text': '厨房、浴室、客厅、卧室、办公室：用精选材料设计和制造的定制家具。配套配饰、照明和面料。',
      'srv.6.title': '认证与验收',
      'srv.6.text': '所有系统合规认证、验收、地籍文件、能源性能证书。我们交付的项目附有完整的合规文件。',
      'srv.parallax.quote': '"项目的每个阶段，一个负责人"',
      'usp.label': '关键优势',
      'usp.title': '为什么单一承包商能带来不同',
      'usp.desc': '将项目委托给单一联系人可消除问题并保证卓越结果。',
      'usp.1.title': '零协调问题',
      'usp.1.text': '建筑商、电工、水管工和设计师之间没有推诿。一个团队，一个责任。',
      'usp.2.title': '确定且按时完成',
      'usp.2.text': '集中规划：每个阶段在前一个完成后开始。不会因协调不善而延误。',
      'usp.3.title': '100%优化预算',
      'usp.3.text': '单一透明报价。没有隐藏成本，没有第三方意外造成的额外费用。',
      'usp.4.title': '认证质量',
      'usp.4.text': '每个系统、每个工艺、每种材料：认证并记录。我们交付附有完整文件的项目。',
      'process.label': '我们如何工作',
      'process.title': '我们的流程',
      'process.desc': '项目每个阶段都有清晰透明的路径。',
      'process.1.title': '倾听与勘察',
      'process.1.text': '我们会面了解您的需求，参观空间，共同确定目标和预算。',
      'process.2.title': '设计',
      'process.2.text': '我们创建概念、3D渲染和完整的施工项目供您批准。',
      'process.3.title': '施工',
      'process.3.text': '我们协调所有工作：建筑、系统和装修。一个联系人持续为您更新进度。',
      'chi.story.title': '我们的故事',
      'chi.story.p1': 'Impronta Arredi源于对设计的热情和每个空间都值得被转化为一种体验的信念。我们不仅仅是室内设计工作室：我们是专注于奢华的总承包商。',
      'chi.story.p2': '我们管理高度复杂的交钥匙项目：豪华公寓、行政办公室、精品酒店、奢侈品零售。从设计到最后一份证书，我们的团队处理一切。',
      'chi.values.label': '我们的价值观',
      'chi.values.title': '指导每个项目的原则',
      'chi.val.1.title': '不妥协的卓越',
      'chi.val.1.text': '我们选择最好的材料、最好的工匠、最好的解决方案。奢华在于对细节的关注。',
      'chi.val.2.title': '完全透明',
      'chi.val.2.text': '确定的预算、清晰的时间表、持续的沟通。没有意外，只有结果。',
      'chi.val.3.title': '唯一责任',
      'chi.val.3.text': '整个项目一个联系人。零推诿，零借口。如果出了问题，我们来解决。',
      'chi.parallax.quote': '"每个空间都值得被转化为一种体验"',
      'chi.approach.label': '我们的方法',
      'chi.approach.title': '一个联系人，完美结果',
      'chi.approach.text': '我们的优势是统一管理：一个联系人协调建筑师、工匠、技术人员和供应商。这意味着零沟通问题、确定的时间表和完美的结果。',
      'contact.address.label': '地址',
      'contact.phone.label': '电话',
      'contact.email.label': '电子邮件',
      'contact.hours.label': '营业时间',
      'contact.hours.1': '周一至周五：09:00 – 18:00',
      'contact.hours.2': '周六：09:00 – 13:00',
      'contact.hours.3': '周日：休息',
    }
  };

  var currentLang = localStorage.getItem('impronta_lang') || 'it';

  function t(key) {
    return (translations[currentLang] && translations[currentLang][key]) || (translations.it[key]) || key;
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = t(key);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = val;
      } else if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    });

    document.documentElement.lang = currentLang === 'cn' ? 'zh' : currentLang;

    document.querySelectorAll('.lang-switch__btn').forEach(function (btn) {
      btn.classList.toggle('lang-switch__btn--active', btn.getAttribute('data-lang') === currentLang);
    });
  }

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('impronta_lang', lang);
    applyTranslations();
  }

  document.querySelectorAll('.lang-switch__btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLang(this.getAttribute('data-lang'));
    });
  });

  applyTranslations();

  /* =================================================================
     2. HEADER SCROLL SHADOW
     ================================================================= */
  var header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('header--scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  /* =================================================================
     3. MOBILE NAVIGATION
     ================================================================= */
  var navToggle = document.querySelector('.nav__toggle');
  var navList = document.querySelector('.nav__list');

  if (navToggle && navList) {
    navToggle.addEventListener('click', function () {
      var isOpen = navList.classList.toggle('nav__list--open');
      navToggle.classList.toggle('nav__toggle--open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navList.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        navList.classList.remove('nav__list--open');
        navToggle.classList.remove('nav__toggle--open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* =================================================================
     4. COOKIE CONSENT (GDPR)
     ================================================================= */
  var COOKIE_KEY = 'impronta_cookie_consent';
  var banner = document.querySelector('.cookie-banner');

  if (banner && !localStorage.getItem(COOKIE_KEY)) {
    setTimeout(function () {
      banner.classList.add('cookie-banner--visible');
    }, 1000);
  }

  if (banner) {
    var acceptBtn = banner.querySelector('.cookie-banner__btn--accept');
    var rejectBtn = banner.querySelector('.cookie-banner__btn--reject');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        localStorage.setItem(COOKIE_KEY, 'accepted');
        banner.classList.remove('cookie-banner--visible');
      });
    }

    if (rejectBtn) {
      rejectBtn.addEventListener('click', function () {
        localStorage.setItem(COOKIE_KEY, 'rejected');
        banner.classList.remove('cookie-banner--visible');
      });
    }
  }

  /* =================================================================
     5. SCROLL REVEAL ANIMATIONS
     ================================================================= */
  var revealSelectors = '.reveal, .reveal--left, .reveal--right, .reveal--scale';
  var revealElements = document.querySelectorAll(revealSelectors);

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* =================================================================
     6. ANIMATED COUNTERS
     ================================================================= */
  var counterElements = document.querySelectorAll('[data-counter]');

  if (counterElements.length > 0 && 'IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counterElements.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-counter'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 2000;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  /* =================================================================
     7. CURRENT YEAR IN FOOTER
     ================================================================= */
  var yearEl = document.querySelector('.footer__year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* =================================================================
     8. SMOOTH SCROLL FOR ANCHOR LINKS
     ================================================================= */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* =================================================================
     9. REVIEWS CAROUSEL (infinite scroll via duplication)
     ================================================================= */
  var reviewsTrack = document.querySelector('.reviews-track');
  if (reviewsTrack) {
    var cards = reviewsTrack.querySelectorAll('.review-card');
    cards.forEach(function (card) {
      var clone = card.cloneNode(true);
      reviewsTrack.appendChild(clone);
    });
    // Pausa carousel fuori viewport per risparmiare GPU/batteria
    if ('IntersectionObserver' in window) {
      var reviewsObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          reviewsTrack.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
        });
      }, { threshold: 0.1 });
      reviewsObs.observe(reviewsTrack.parentElement);
    }
  }

  /* =================================================================
     10. HERO GLAMOUR EFFECTS (attivati dopo 3s per non impattare LCP)
     ================================================================= */
  var heroGlamour = document.getElementById('hero-glamour');
  if (heroGlamour) {
    setTimeout(function () {
      heroGlamour.classList.add('hero--glamour');
      // Attiva anche gli effetti glamour sul portfolio
      document.querySelectorAll('.portfolio__item').forEach(function (item) {
        item.classList.add('portfolio__item--glamour');
      });
    }, 3000);
  }

  /* =================================================================
     11. EXPOSE setLang globally
     ================================================================= */
  window.improntaSetLang = setLang;
  window.improntaGetLang = function () { return currentLang; };

})();
