```
████████╗██████╗  ██████╗ ███╗   ██╗███╗   ██╗██╗   ██╗    ██████╗ ███╗   ███╗ ██████╗ 
╚══██╔══╝██╔══██╗██╔═══██╗████╗  ██║████╗  ██║╚██╗ ██╔╝    ██╔══██╗████╗ ████║██╔════╝ 
   ██║   ██████╔╝██║   ██║██╔██╗ ██║██╔██╗ ██║ ╚████╔╝     ██║  ██║██╔████╔██║██║  ███╗
   ██║   ██╔══██╗██║   ██║██║╚██╗██║██║╚██╗██║  ╚██╔╝      ██║  ██║██║╚██╔╝██║██║   ██║
   ██║   ██║  ██║╚██████╔╝██║ ╚████║██║ ╚████║   ██║       ██████╔╝██║ ╚═╝ ██║╚██████╔╝
   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═══╝   ╚═╝       ╚═════╝ ╚═╝     ╚═╝ ╚═════╝ 
```

## Wat is dit?

**TRONNY.DMG** is een lokale 4-speler Flappy Bird, gebouwd in één avond tijdens een Nerdcore-bijeenkomst in **Birdie's Bar**. Het doel: Claude Code uitproberen en kijken hoe ver je in één sessie kunt komen. Het antwoord: een volledig werkend spel met Tron-thema, procedurele audio en een settings-menu.

Geen installatie nodig voor spelers — gewoon een browser openen, toets kiezen en hop door de avond.

---

## Features

- **1–4 spelers** op één scherm, elk hun eigen toets
- **Tron / Daft Punk thema** — neon pipes, circuit-ball, 138 BPM Derezzed-geïnspireerde audio engine (volledig Web Audio API, geen samples)
- **4 levens** per speler met respawn, invincibility shield en een smooth nudge-animatie
- **Progressieve moeilijkheidsgraad** — automatische levels elke 20 seconden
- **Settings panel** in de lobby — gravity, sprong, opening, snelheid, levens en rondes instelbaar met pijltjestoetsen
- **Session high scores** opgeslagen per toets
- **Fullscreen** met `Option + F`
- **ESC** tijdens het spel voor tussenstand

---

## Besturing

| Actie | Toets |
|---|---|
| Joinen | Druk op jouw eigen toets |
| Springen | Diezelfde toets |
| Starten | `Spatie` |
| Settings navigeren | `↑ ↓` |
| Setting aanpassen | `← →` |
| Settings resetten | `R` |
| Fullscreen | `Option + F` |
| Spel verlaten | `ESC` |

---

## Lokaal draaien

```bash
npm install
npm start
```

Open `http://localhost:3000` — of deel het lokale IP met andere apparaten in hetzelfde netwerk.

---

## Stack

- **Node.js + Express** — statische server
- **Socket.io** — meegeleverd maar niet gebruikt (overgebleven van de eerste opzet als reactiespel)
- **Canvas 2D API** — volledige game loop
- **Web Audio API** — procedurele drumsequencer + arp + bass, geen externe audio bestanden
- **Één HTML bestand** — alles zit in `public/index.html`

---

## Ontstaan

Op een vrijdagavond in **Birdie's Bar** kwamen we samen als **Nerdcore** bij elkaar. Alex helemaal lyrisch over Claude Code en als z'n agents met wie die de week keurig is doorgekomen; Wij nog een beetje vastgeroest aan onze Cursor IDE en de relatie die we met ChatGPT hebben opgebouwd. Het plan: Claude Code uitproberen en kijken wat je in één avond kunt bouwen.

We begonnen met een reactiespelletje over het netwerk. Het netwerk in het café werkte niet mee. Pivot naar lokaal. Pivot naar Flappy Bird. Pivot naar Tron. Elke keer een stuk beter.

Het resultaat: dit spel. Gebouwd via conversatie met [Claude Code](https://claude.com/claude-code), live gespeeld aan de bar. Barmeisje moest nog even wachten op de pinbetaling en kon gelijk het spelletje spelen, ze ging "stuk".

---

<p align="center">
  <sub>Built at Birdie's Bar · Nerdcore · Powered by Claude Code</sub>
</p>
