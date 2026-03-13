# SKILL UNIFICATA — Impronta Arredi
## Prompt Operativo Master Consolidato

> **Versione:** 1.0 — 13 Marzo 2026
> **Unica fonte di verita'** per lo sviluppo e la manutenzione del sito.
> **Prossima verifica consigliata:** Aprile 2026

---

## 1. ISTRUZIONI PER CLAUDE

### 1.1 Verifica Aggiornamenti Google (Consigliata ad Ogni Sessione)
Prima di ogni sessione di lavoro SEO, ricercare:
- `"Google Search updates [mese corrente] [anno corrente]"`
- `"Core Web Vitals updates [anno corrente]"`
- `"GEO Generative Engine Optimization updates [anno corrente]"`

Confronta con la sezione "Stato Aggiornamenti Google" e aggiorna questo file se trovi novita'.

### 1.2 Regole Operative
1. **Leggi prima** il file da modificare — mai al buio
2. **Mobile-first** — ogni modifica deve funzionare su mobile
3. **No librerie extra** — il sito e' volutamente leggero (vanilla HTML/CSS/JS)
4. **Commit** chiari e descrittivi in italiano
5. **Aggiorna** sitemap.xml quando aggiungi/rimuovi pagine
6. **Aggiorna** le 3 lingue quando aggiungi testo traducibile (IT/EN/CN in main.js)
7. **Performance** — mai animazioni sull'elemento LCP; usare opacity/transform, mai filter
8. **CTA contrast** — minimo 4.5:1 (WCAG AA)
9. **Chatbot KB** — ogni nuova FAQ deve avere `a` (IT), `a_en` (EN), `a_cn` (CN) + keywords multilingua
10. **Chatbot log** — risposte sempre loggabili in italiano per il proprietario (`replyIt`)

### 1.3 Stile di Comunicazione
- Rispondi in italiano
- Sii diretto e pratico
- Proponi sempre prima di agire su operazioni irreversibili

---

## 2. CONTESTO PROGETTO

### 2.1 Informazioni Generali
| Campo | Valore |
|---|---|
| **Dominio** | improntarredi.it / www.improntarredi.it |
| **Tech Stack** | HTML statico + CSS custom + JS vanilla |
| **Framework** | Nessuno — zero dipendenze esterne |
| **Lingue** | Italiano, English, 中文 (Cinese) |
| **i18n** | Client-side con `data-i18n` attributes + oggetto `translations` in main.js |
| **Target** | Appartamenti lusso, uffici direzionali, boutique hotel, negozi luxury |
| **Mercato** | Italia + internazionale (clienti high-end) |

### 2.2 Struttura File
```
/
├── index.html              # Homepage (hero glamour, portfolio, stats, reviews)
├── chi-siamo.html          # Chi siamo (timeline, valori, team)
├── servizi.html            # 6 servizi chiavi in mano
├── progetti.html           # 4 progetti showcase luxury
├── contatti.html            # Form contatti + mappa
├── privacy.html            # Privacy Policy GDPR
├── cookie-policy.html       # Cookie Policy
├── sitemap.xml             # 7 URL
├── robots.txt              # AI bots Allow
├── llms.txt                # GEO per AI bots
├── CLAUDE.md               # Istruzioni progetto
├── SKILL-UNIFICATA.md      # Questo file
├── css/style.css           # Foglio stile principale (~2100 righe)
├── css/chatbot.css         # Stili chatbot + CTA mobile
├── js/main.js              # i18n IT/EN/CN, scroll reveal, counter, nav, glamour
├── js/chatbot.js           # Chatbot multilingua KB 100+ FAQ + tour guidato
├── fonts/                  # Inter woff2 self-hosted
└── img/                    # Immagini (foto-home-arreda.webp)
```

### 2.3 Palette Colori (Luxury)
| Ruolo | Nome | Hex | CSS Var |
|---|---|---|---|
| Primary | Nero | `#0A0A0A` | `--nero` |
| Secondary | Oro | `#C9A84C` | `--oro` |
| Accent | Crema | `#F5F0E8` | `--crema` |
| Light | Bianco | `#FAFAF8` | `--bianco` |
| Dark text | Grigio | `#2A2A2A` | `--grigio-scuro` |
| Gold dark | Oro scuro | `#A8893A` | `--oro-scuro` |

---

## 3. ARCHITETTURA CHATBOT (`js/chatbot.js`)

### 3.1 Componenti
- **Tour guidato interattivo** — 5 step (Servizi → Progetti → Chi Siamo → Processo → Contatti) in IT/EN/CN
- **Auto-open desktop** — su schermi >768px, dopo 3s invita al tour
- **Risposte strutturate multilingua** (`responses` IT/EN/CN) — benvenuto, servizi, contatti, preventivo, processo
- **Knowledge Base 100+ FAQ** con keyword-matching e risposte in 3 lingue (`a`, `a_en`, `a_cn`)
- **Contact form guidato** — state machine: nome → email → telefono → tipo progetto → messaggio
- **Quick action buttons** multilingua
- **Intent detection** — keyword-based per IT/EN/CN + saluti + conferma
- **Markdown renderer** — bold, italic, link, line break
- **Icona casa/compasso** — SVG oro (#C9A84C) profilato nero (#0A0A0A) su FAB, header e messaggi

### 3.2 Log Proprietario Sempre in Italiano
- `processMessage()` e `processContactState()` restituiscono `{reply, replyIt}`
- `logMessage()` salva `italianText` in ogni entry del `chatLog[]`
- `window.improntaChatLog` espone il log
- `window.improntaGetLeads()` espone i lead

### 3.3 Mobile CTA Bar
- Barra fissa WhatsApp + Chiamata su mobile (≤768px)
- Appare allo scroll (>80px), scompare tornando in cima
- Non impatta LCP: nascosto con `transform: translateY(100%)`

### 3.4 Performance Chatbot
- Avvio ritardato 3 secondi (`setTimeout(3000)`)
- Particles hero in pausa fino a glamour activation
- Animazioni hero content partono solo dopo `.hero--glamour` (3s)
- No `filter: blur` — solo `opacity` e `transform` per animazioni

### 3.5 Checklist Chatbot — Per Ogni Modifica
- [ ] Aggiornare risposte in TUTTE e 3 le lingue (IT/EN/CN)
- [ ] Aggiornare KB con `a`, `a_en`, `a_cn` per ogni nuova FAQ
- [ ] Aggiungere keyword multilingua per matching
- [ ] Verificare che il log salvi sempre `italianText`
- [ ] Testare su mobile: CTA bar visibile, FAB non sovrapposto

---

## 4. REQUISITI GOOGLE — AGGIORNATI MARZO 2026

### 4.1 Core Web Vitals — Soglie 2026
| Metrica | Buono | Da migliorare | Scarso |
|---|---|---|---|
| **LCP** | < 2.5s (target: <2s) | 2.5s - 4.0s | > 4.0s |
| **INP** | < 200ms | 200ms - 500ms | > 500ms |
| **CLS** | < 0.1 | 0.1 - 0.25 | > 0.25 |

### 4.2 Performance Rules — OBBLIGATORIO
1. **No `filter: blur` su animazioni** — usare `opacity` e `transform` (GPU-accelerated)
2. **No `will-change` permanente** — solo al `:hover` o quando serve
3. **Particles in pausa** fino attivazione glamour (3s)
4. **Hero animations post-glamour** — nessuna animazione above-the-fold nei primi 3s
5. **Immagini above-fold** — mai `loading="lazy"`, sempre `fetchpriority="high"` se hero
6. **Font** — preload Inter woff2, `font-display: swap`
7. **YouTube iframe** — sempre `loading="lazy"`
8. **Reviews carousel** — `animation-play-state: paused` fuori viewport

### 4.3 E-E-A-T
- Pagine autore con bio, qualifiche, foto
- Author bio su articoli blog
- Person schema con jobTitle, worksFor
- Chi siamo dettagliato con storia, team, competenze
- Coerenza brand cross-platform

### 4.4 GEO — Generative Engine Optimization
1. **Frasi dichiarative** nelle prime 2 righe di ogni sezione
2. **Dati numerici specifici** e verificabili
3. **Formato:** Domanda H2 → Risposta diretta (40-60 parole) → Approfondimento
4. **Liste, tabelle, definizioni chiare**
5. **llms.txt** aggiornato con ogni modifica
6. **robots.txt** permissivo per AI bots (GPTBot, ClaudeBot, Google-Extended, PerplexityBot)

### 4.5 Schema.org — Best Practice
- `GeneralContractor` + `FurnitureStore` — su homepage
- `BreadcrumbList` — su tutte le pagine interne
- `FAQPage` — su pagine con FAQ
- GeoCoordinates obbligatorio

---

## 5. SISTEMA MULTILINGUA (i18n)

### 5.1 Come Funziona
- Ogni testo visibile usa `data-i18n="chiave"` nell'HTML
- Le traduzioni sono in `js/main.js` nell'oggetto `translations` (it, en, cn)
- Lingua salvata in `localStorage` (`impronta_lang`)
- Switcher navbar: IT | EN | 中文

### 5.2 Per Aggiungere una Nuova Stringa
1. Aggiungere la chiave in TUTTI e 3 gli oggetti lingua (it, en, cn) in `main.js`
2. Aggiungere `data-i18n="chiave"` nell'HTML
3. Se la stringa contiene HTML, usare `data-i18n-html` attribute

### 5.3 hreflang Tags
Ogni pagina DEVE avere:
```html
<link rel="alternate" hreflang="it" href="URL_PAGINA">
<link rel="alternate" hreflang="en" href="URL_PAGINA">
<link rel="alternate" hreflang="zh" href="URL_PAGINA">
<link rel="alternate" hreflang="x-default" href="URL_PAGINA">
```

---

## 6. STRATEGIA VISIBILITA' — CONCORRENTI E MERCATO

### 6.1 Competitor Interior Design Lusso Italia
| Competitor | Punti di forza | Cosa impariamo |
|---|---|---|
| **Studio Peregalli** | Heritage italiano, press internazionale, AD/Vogue | Servono case study con foto professionali |
| **Molteni&C** | Brand globale, showroom experience | Content marketing editoriale di qualita' |
| **Patricia Urquiola** | Designer star, portfolio visivo potente | Portfolio con render 3D e before/after |
| **Dimore Studio** | Estetica unica, Instagram potentissimo | Social media con contenuti visivi luxury |
| **Matteo Thun** | Hotel + residenziale, network internazionale | Diversificare target (hotel + residenziale) |

### 6.2 Competitor Turnkey Renovation
| Competitor | Punti di forza | Gap di Impronta |
|---|---|---|
| **Pellicano Hotels Design** | Hospitality luxury | Mancano case study hotel |
| **Costa Group** | Retail + hospitality chiavi in mano | Blog assente, migliorare content |
| **Vudafieri-Saverino** | Architettura + interni, portfolio premiato | Servono premi/riconoscimenti |

### 6.3 Le 5 Priorita' Strategiche
1. **Blog SEO** — Articoli su interior design trends, materiali, processi (min 2/mese)
2. **Portfolio professionale** — Foto reali HD dei progetti, before/after, render 3D
3. **Recensioni Google** — Richiedere attivamente dopo ogni progetto
4. **Social Media** — Instagram + Pinterest per visual content (pin dei progetti)
5. **Backlink** — Guest post su riviste design (AD, Elle Decor, Living), directory architettura

### 6.4 Keyword Strategy
| Keyword | Volume | Difficolta' | Stato |
|---|---|---|---|
| "interior design Milano" | Alto | Alta | DA CONQUISTARE |
| "ristrutturazione chiavi in mano" | Medio | Media | FOCUS |
| "general contractor Milano" | Medio | Media | FOCUS |
| "luxury renovation Italy" | Basso (EN) | Bassa | OPPORTUNITA' |
| "turnkey interior design" | Basso (EN) | Bassa | OPPORTUNITA' |
| "意大利室内设计" | Basso (CN) | Bassissima | BLUE OCEAN |
| "boutique hotel renovation" | Basso (EN) | Bassa | NICHE |
| "arredamento lusso su misura" | Medio | Media | FOCUS |

### 6.5 Azioni SEO Internazionale
- [ ] **hreflang** implementato su tutte le pagine (IT/EN/ZH)
- [ ] **og:locale** con alternate per le 3 lingue
- [ ] **Schema.org** con `knowsLanguage: ["Italian", "English", "Chinese"]`
- [ ] **llms.txt** multilingua con sezioni EN e CN
- [ ] **Meta description** in inglese per pagine target internazionali
- [ ] **Blog in inglese** — almeno 2 articoli per clientela internazionale
- [ ] **Pinterest** — creare board per ogni progetto (alto traffico visual)
- [ ] **Houzz Italia** — profilo + portfolio (directory #1 design)
- [ ] **Architonic / ArchDaily** — profilo azienda per backlink autorevoli

---

## 7. CHECKLIST AUTOMATICHE

### Per Ogni Nuova Pagina
- [ ] Title tag unico (max 60 char)
- [ ] Meta description unica (max 160 char)
- [ ] H1 unico con keyword
- [ ] `data-i18n` su ogni testo visibile (3 lingue in main.js)
- [ ] Schema.org JSON-LD (BreadcrumbList + tipo specifico)
- [ ] Open Graph tags (og:title, og:description, og:url, og:locale)
- [ ] hreflang tags (it, en, zh, x-default)
- [ ] `<meta name="theme-color" content="#0A0A0A">`
- [ ] `<link rel="canonical">`
- [ ] Hero image con `fetchpriority="high"`, mai `loading="lazy"` above-fold
- [ ] Font preload (Inter woff2)
- [ ] CTA primario con contrasto >= 4.5:1
- [ ] Registrato in sitemap.xml
- [ ] Link navbar e footer coerenti con tutte le altre pagine
- [ ] Cookie banner presente
- [ ] Nessun CDN esterno

### Per Ogni Modifica CSS
- [ ] Solo variabili dalla palette colori
- [ ] Mobile-first: stili base per mobile, `@media` per desktop
- [ ] No `filter` su animazioni — solo `opacity` e `transform`
- [ ] No `will-change` permanente
- [ ] Contrasto minimo 4.5:1 su CTA

### Per Ogni Modifica JS
- [ ] Vanilla JS — nessun framework
- [ ] i18n: nuova stringa in TUTTE e 3 le lingue
- [ ] Chatbot KB: `a` + `a_en` + `a_cn` + keywords
- [ ] Performance: chatbot caricato con `setTimeout(3000)`

### Commit
- [ ] Messaggio in italiano, descrittivo
- [ ] Nessun file sensibile (.env, credenziali)

---

## 8. TODO — Azioni Future

### Contenuti
- [ ] Aggiungere pagina blog per SEO content
- [ ] Creare 2 articoli blog/mese (IT + EN)
- [ ] Sostituire immagini Unsplash con foto reali progetti
- [ ] Aggiungere before/after gallery ai progetti
- [ ] Creare video tour dei progetti completati

### SEO & Visibilita'
- [ ] Registrare Google Business Profile
- [ ] Profilo Houzz Italia con portfolio
- [ ] Profilo Pinterest con board per progetto
- [ ] Guest post su riviste design italiane
- [ ] Backlink da directory architettura (Architonic, ArchDaily)
- [ ] Google Posts settimanali su GBP

### Tecnico
- [ ] Aggiungere font Inter woff2 nella cartella /fonts
- [ ] Collegare form contatti a backend email
- [ ] Implementare `prefers-reduced-motion` per accessibilita'
- [ ] Critical CSS inline per LCP <2s
- [ ] Service Worker per caching offline (PWA light)

---

## 9. CHANGELOG

### v1.0 - 13 Marzo 2026 (Setup iniziale)
- Creazione SKILL-UNIFICATA.md per Impronta Arredi
- Documentazione completa architettura chatbot con tour guidato
- Performance rules: no filter blur, will-change solo hover, particles in pausa
- Strategia SEO internazionale con hreflang IT/EN/ZH
- Analisi concorrenti interior design lusso
- Keyword strategy multilingua (IT/EN/CN)
- Checklist automatiche per nuove pagine, CSS, JS
