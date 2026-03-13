# Impronta Arredi – Sito Web

## Panoramica
Sito web statico per **Impronta Arredi**, general contractor specializzato in interior design e ristrutturazioni chiavi in mano di lusso.
Target: appartamenti di pregio, uffici direzionali, boutique hotel, negozi luxury.
HTML puro, CSS custom, JS vanilla. Nessun framework, nessun build step.
**3 lingue:** Italiano, English, 中文 (Cinese) — via sistema i18n client-side con `data-i18n`.

## Struttura progetto
```
/
├── index.html              # Homepage
├── chi-siamo.html          # Chi siamo
├── servizi.html            # Servizi (6 servizi chiavi in mano)
├── progetti.html           # Progetti showcase (4 progetti luxury)
├── contatti.html           # Contatti + form
├── privacy.html            # Privacy Policy (GDPR)
├── cookie-policy.html      # Cookie Policy
├── sitemap.xml             # Sitemap XML (7 URL)
├── robots.txt              # Robots + AI bots Allow
├── llms.txt                # File per AI bots (GEO)
├── CLAUDE.md               # Questo file
├── SKILL-UNIFICATA.md      # Linee guida operative
├── css/
│   ├── style.css           # Foglio di stile principale (~750 righe)
│   └── chatbot.css         # Stili chatbot + CTA mobile
├── js/
│   ├── main.js             # Script principale (~700 righe, i18n IT/EN/CN)
│   └── chatbot.js          # Chatbot multilingua con KB 80+ FAQ
├── fonts/                  # Font self-hosted Inter (woff2) — DA AGGIUNGERE
└── img/                    # Immagini — DA AGGIUNGERE
```

## Palette colori (Luxury)
| Ruolo        | Nome     | Hex        |
|-------------|----------|-----------|
| Primary      | Nero     | `#0A0A0A` |
| Secondary    | Oro      | `#C9A84C` |
| Accent       | Crema    | `#F5F0E8` |
| Light        | Bianco   | `#FAFAF8` |
| Dark text    | Grigio   | `#2A2A2A` |
| Gold dark    | Oro scuro| `#A8893A` |

## Sistema multilingua (i18n)
- Tutte le stringhe traducibili usano `data-i18n="chiave"` nell'HTML
- Le traduzioni sono in `js/main.js` nell'oggetto `translations` (it, en, cn)
- Lingua salvata in `localStorage` (`impronta_lang`)
- Switcher nella navbar: IT | EN | 中文
- **Per aggiungere una nuova stringa:** aggiungere la chiave in tutti e 3 gli oggetti lingua + `data-i18n` nell'HTML

## Convenzioni (da SKILL-UNIFICATA.md)
- HTML5 semantico, accessibile (WCAG 2.1 AA)
- Mobile-first, responsive
- Font self-hosted (Inter) via `@font-face` con `font-display: swap`
- Schema.org `GeneralContractor` + `FurnitureStore` in JSON-LD
- `BreadcrumbList` su tutte le pagine interne
- Cookie banner conforme GDPR
- Scroll reveal animations via IntersectionObserver
- Chatbot widget con selezione lingua
- Nessuna dipendenza esterna (no CDN, no npm)

## Regole operative
1. **Leggi prima** il file da modificare — mai al buio
2. **Mobile-first** — ogni modifica deve funzionare su mobile
3. **No librerie extra** — il sito e' volutamente leggero (vanilla HTML/CSS/JS)
4. **Commit** chiari e descrittivi in italiano
5. **Aggiorna** sitemap.xml quando aggiungi/rimuovi pagine
6. **Aggiorna** le 3 lingue quando aggiungi testo traducibile
7. **Performance** — mai animazioni sull'elemento LCP
8. **CTA contrast** — minimo 4.5:1 (WCAG AA)

## Checklist automatica di conformità (da SKILL-UNIFICATA.md)
**OBBLIGATORIO:** Ad ogni creazione o modifica di file, verificare TUTTI i punti seguenti prima di committare.

### HTML
- [ ] HTML5 semantico con tag corretti (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`)
- [ ] Attributi `role` e `aria-label` per accessibilità (WCAG 2.1 AA)
- [ ] `data-i18n` su ogni testo visibile (con chiave in IT, EN, CN nel main.js)
- [ ] `<meta name="description">` e `<title>` univoci per ogni pagina
- [ ] Open Graph tags (`og:title`, `og:description`, `og:url`, `og:locale`)
- [ ] Schema.org `BreadcrumbList` JSON-LD su pagine interne
- [ ] Cookie banner presente
- [ ] Link navbar coerente su TUTTE le pagine (Home, Chi Siamo, Servizi, Progetti, Contatti)
- [ ] Link footer coerente su tutte le pagine
- [ ] `loading="lazy"` su tutte le immagini sotto la fold
- [ ] Nessun CDN esterno — tutto self-hosted

### CSS
- [ ] Palette colori: solo variabili dalla tabella (Nero, Oro, Crema, Bianco, Grigio, Oro scuro)
- [ ] Mobile-first: stili base per mobile, `@media` per desktop
- [ ] Font: Inter self-hosted con `font-display: swap`
- [ ] Contrasto minimo 4.5:1 su CTA e testi importanti
- [ ] Animazioni: NO su elemento LCP, solo `reveal` con IntersectionObserver

### JavaScript
- [ ] Vanilla JS — nessun framework/libreria
- [ ] i18n: ogni nuova stringa aggiunta in TUTTE e 3 le lingue (it, en, cn)
- [ ] Chatbot KB: ogni nuova FAQ deve avere `a` (IT), `a_en` (EN), `a_cn` (CN) + keywords multilingua
- [ ] Chatbot log: risposte sempre loggabili in italiano per il proprietario (`replyIt`)
- [ ] Performance: chatbot caricato con `setTimeout(3000)`

### SEO & Sitemap
- [ ] sitemap.xml aggiornata con ogni nuova pagina
- [ ] `<link rel="canonical">` corretto
- [ ] robots.txt permissivo per AI bots

### Recensioni
- [ ] Mix linguistico: ~40% IT, ~40% EN, ~20% CN
- [ ] Recensioni restano nella lingua originale del recensore (non tradotte)

### Commit
- [ ] Messaggio in italiano, descrittivo
- [ ] Nessun file sensibile committato (.env, credenziali)

## Comandi
- Nessun build richiesto: aprire `index.html` nel browser
- Per sviluppo locale: `python3 -m http.server 8000`

## SEO
- Meta description e title univoci per pagina
- Open Graph tags con locale alternativo (it_IT, en_GB, zh_CN)
- Schema.org GeneralContractor + FurnitureStore + BreadcrumbList
- GEO: robots.txt permissivo per AI bots + llms.txt
- Sitemap XML aggiornata ad ogni nuova pagina

## TODO
- [ ] Aggiungere font Inter woff2 nella cartella /fonts
- [ ] Aggiungere immagini hero e portfolio nella cartella /img
- [ ] Collegare form contatti a backend email (API relay)
- [x] Implementare chatbot multilingua con KB 80+ FAQ
- [x] Aggiungere pagina progetti showcase
- [ ] Aggiungere pagina blog per SEO content
- [ ] Sostituire immagini Unsplash con foto reali dei progetti
