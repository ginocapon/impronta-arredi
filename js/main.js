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
      'nav.contatti': 'Contatti',
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
      'review.1.text': '"Impronta Arredi ha trasformato il nostro appartamento in un capolavoro. Un unico referente per tutto, zero stress, risultato perfetto."',
      'review.1.author': 'Marco R. — Milano',
      'review.2.text': '"Professionalità impeccabile. Hanno ristrutturato il nostro ufficio rispettando tempi e budget. Consigliatissimi."',
      'review.2.author': 'Laura B. — Roma',
      'review.3.text': '"Il progetto del nostro boutique hotel è stato gestito magistralmente. Dalla progettazione all\'arredamento su misura, tutto perfetto."',
      'review.3.author': 'Giovanni T. — Firenze',
      'review.4.text': '"Cercavamo qualcuno che gestisse tutto: edilizia, impianti, arredamento. Impronta Arredi ha superato le aspettative."',
      'review.4.author': 'Francesca M. — Torino',
      'review.5.text': '"La qualità dei materiali e la cura dei dettagli sono straordinarie. La nostra villa è esattamente come l\'avevamo immaginata."',
      'review.5.author': 'Alessandro P. — Como',
      'review.6.text': '"Il render 3D ci ha permesso di vedere il risultato prima ancora di iniziare. Nessuna sorpresa, solo soddisfazione."',
      'review.6.author': 'Chiara L. — Bergamo',
      'review.7.text': '"Ristrutturazione completa del nostro negozio in centro a Milano. Lavoro impeccabile, consegnato nei tempi previsti."',
      'review.7.author': 'Roberto S. — Milano',
      'review.8.text': '"Finalmente un\'azienda che mantiene le promesse. Un unico interlocutore dal primo giorno alla consegna delle chiavi."',
      'review.8.author': 'Elena V. — Monza',
      'review.9.text': '"Abbiamo affidato a loro la ristrutturazione del nostro attico. Risultato spettacolare, con certificazioni impeccabili."',
      'review.9.author': 'Davide C. — Brescia',
      'review.10.text': '"Design moderno e funzionale per i nostri uffici. Il team ha capito subito le nostre esigenze e le ha realizzate alla perfezione."',
      'review.10.author': 'Paola G. — Verona',
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
      // Pages
      'page.chi-siamo.title': 'Chi Siamo',
      'page.chi-siamo.subtitle': 'Eccellenza artigianale e visione contemporanea al servizio del tuo progetto',
      'page.servizi.title': 'I Nostri Servizi',
      'page.servizi.subtitle': 'Un servizio completo chiavi in mano: dalla progettazione alla certificazione',
      'page.contatti.title': 'Contatti',
      'page.contatti.subtitle': 'Siamo a tua disposizione per consulenze, preventivi e informazioni',
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
      'nav.contatti': 'Contact',
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
      'review.1.text': '"Impronta Arredi transformed our apartment into a masterpiece. One single contact for everything, zero stress, perfect result."',
      'review.1.author': 'Marco R. — Milan',
      'review.2.text': '"Impeccable professionalism. They renovated our office on time and on budget. Highly recommended."',
      'review.2.author': 'Laura B. — Rome',
      'review.3.text': '"Our boutique hotel project was managed masterfully. From design to bespoke furnishing, everything was perfect."',
      'review.3.author': 'Giovanni T. — Florence',
      'review.4.text': '"We were looking for someone to manage everything: construction, systems, furnishing. Impronta Arredi exceeded expectations."',
      'review.4.author': 'Francesca M. — Turin',
      'review.5.text': '"The quality of materials and attention to detail are extraordinary. Our villa is exactly as we imagined it."',
      'review.5.author': 'Alessandro P. — Como',
      'review.6.text': '"The 3D render let us see the result before even starting. No surprises, only satisfaction."',
      'review.6.author': 'Chiara L. — Bergamo',
      'review.7.text': '"Complete renovation of our shop in central Milan. Impeccable work, delivered on time."',
      'review.7.author': 'Roberto S. — Milan',
      'review.8.text': '"Finally a company that keeps its promises. One single contact from day one to key handover."',
      'review.8.author': 'Elena V. — Monza',
      'review.9.text': '"We entrusted them with our penthouse renovation. Spectacular result, with impeccable certifications."',
      'review.9.author': 'Davide C. — Brescia',
      'review.10.text': '"Modern and functional design for our offices. The team immediately understood our needs and executed them perfectly."',
      'review.10.author': 'Paola G. — Verona',
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
      'page.chi-siamo.title': 'About Us',
      'page.chi-siamo.subtitle': 'Artisan excellence and contemporary vision at the service of your project',
      'page.servizi.title': 'Our Services',
      'page.servizi.subtitle': 'A complete turnkey service: from design to certification',
      'page.contatti.title': 'Contact',
      'page.contatti.subtitle': 'We\'re available for consultations, quotes, and information',
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
      'nav.contatti': '联系我们',
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
      'review.1.text': '"Impronta Arredi将我们的公寓变成了杰作。一个联系人负责一切，零压力，完美结果。"',
      'review.1.author': 'Marco R. — 米兰',
      'review.2.text': '"无可挑剔的专业素质。他们按时按预算完成了我们办公室的翻新。强烈推荐。"',
      'review.2.author': 'Laura B. — 罗马',
      'review.3.text': '"我们精品酒店项目管理得非常出色。从设计到定制家具，一切都很完美。"',
      'review.3.author': 'Giovanni T. — 佛罗伦萨',
      'review.4.text': '"我们在寻找能管理一切的人：建筑、系统、家具。Impronta Arredi超出了预期。"',
      'review.4.author': 'Francesca M. — 都灵',
      'review.5.text': '"材料质量和对细节的关注非常出色。我们的别墅完全如我们所想象的那样。"',
      'review.5.author': 'Alessandro P. — 科莫',
      'review.6.text': '"3D渲染让我们在开工前就看到了最终效果。没有意外，只有满意。"',
      'review.6.author': 'Chiara L. — 贝加莫',
      'review.7.text': '"在米兰市中心完成了我们商店的全面翻新。工作无可挑剔，按时交付。"',
      'review.7.author': 'Roberto S. — 米兰',
      'review.8.text': '"终于找到一家信守承诺的公司。从第一天到交钥匙只有一个联系人。"',
      'review.8.author': 'Elena V. — 蒙扎',
      'review.9.text': '"我们将阁楼翻新交给了他们。效果惊人，认证无可挑剔。"',
      'review.9.author': 'Davide C. — 布雷西亚',
      'review.10.text': '"为我们的办公室提供了现代且实用的设计。团队立即理解了我们的需求并完美实现。"',
      'review.10.author': 'Paola G. — 维罗纳',
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
      'page.chi-siamo.title': '关于我们',
      'page.chi-siamo.subtitle': '工匠卓越和当代视野，为您的项目服务',
      'page.servizi.title': '我们的服务',
      'page.servizi.subtitle': '完整的交钥匙服务：从设计到认证',
      'page.contatti.title': '联系我们',
      'page.contatti.subtitle': '我们随时为您提供咨询、报价和信息',
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
  }

  /* =================================================================
     10. EXPOSE setLang globally
     ================================================================= */
  window.improntaSetLang = setLang;
  window.improntaGetLang = function () { return currentLang; };

})();
