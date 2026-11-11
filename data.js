// =====================================================
//  PERSONALIZZA QUI: nome, password, foto e capitoli
//  motif disponibili: stars, squishy, slime, lipstick, palette, cake
//  color: sfondo del capitolo (tieni tonalità scure di rosa/fucsia/rosso: il testo è chiaro)
//  FOTO POLAROID: metti le immagini in assets/img/ e scrivi il percorso in "src"
//  (es. 'assets/img/zaira-piccola.jpg'). Con src vuoto vedi un riquadro segnaposto.
// =====================================================
window.SITE = {
  name: 'Zaira',
  birthYear: 2004,
  age: 22,

  // PASSWORD: mese + eta + anno + giorno (11 + 22 + 2004 + 18 -> 1122200418).
  // Slash, spazi e trattini vengono ignorati.
  password: '1122200418',

  // COUNTDOWN: enabled true lo mostra fino alla data indicata; metti false per disattivarlo.
  // La data usa il fuso italiano: a novembre l'offset è +01:00.
  countdown: {
    enabled: true,
    unlockAt: '2026-11-17T10:00:00+01:00',
    dailyReveals: [
      'Questa pagina è stata preparata con piccoli dettagli scelti pensando a te.',
      'Ci sono ricordi e fotografie che raccontano un pezzetto della tua storia.',
      'Qualche dettaglio del sito si scopre soltanto toccando lo schermo.',
      'Colori, animazioni e parole sono stati scelti per farti sorridere.',
      'Anche la musica fa parte dell’atmosfera di questo piccolo mondo.',
      'Ormai hai scoperto quasi tutto quello che si nasconde in queste pagine.',
    ],
  },

  // INSIEME DA: data del fidanzamento (anno-mese-giorno). Alimenta il contatore del capitolo con "counter: true".
  since: '2024-03-23',

  // MUSICA DI SOTTOFONDO (scegli UNA delle due, oppure lascia vuote per nessuna musica)
  //  - spotify: incolla il link della canzone (Condividi > Copia link). Compare un lettore: lei deve premere play.
  //             Senza login Spotify il lettore riproduce solo un'anteprima di 30 secondi.
  //  - file:    un mp3 in assets/audio/ (es. 'assets/audio/nostra-canzone.mp3'). Parte da solo quando lei preme "Apri"
  //             e c'è un pulsante per metterla in pausa. È la scelta più affidabile per un'esperienza completa.
  music: { spotify: 'https://open.spotify.com/intl-it/track/2YuelA1W0c01zSMTa4mrko?si=cefa2426ff0b4974', file: '', caption: 'La nostra canzone' },

  // GIOCHINO INIZIALE: gira le carte, risolvi gli indovinelli e riordina i frammenti del codice.
  lockText: 'Gira tutte le carte e risolvi gli indovinelli. Poi ricomponi il codice nell’ordine: mese, età, anno, giorno.',
  clues: [
    { part: 'mese', text: 'Sono il numero che viene subito dopo dieci.', choices: ['10', '11', '12'], answer: '11' },
    { part: 'età', text: 'Due dozzine di candeline meno due: quante ne spegni?', choices: ['20', '22', '24'], answer: '22' },
    { part: 'anno', text: 'Parti dal 2000 e aggiungi il quadrato di due.', choices: ['2002', '2004', '2008'], answer: '2004' },
    { part: 'giorno', text: 'Il giorno è il doppio di tre moltiplicato per tre.', choices: ['9', '18', '27'], answer: '18' },
  ],
  passwordOrder: ['mese', 'età', 'anno', 'giorno'],

  title: 'Ventidue anni di te',
  intro: 'Scorri piano: vedremo insieme da quando eri piccola fino alla magnifica donna che sei ora.',
 

  // Le 3 polaroid in alto, sotto la colata di slime
  heroPolaroids: [
    { src: 'assets/img/IMG (5).JPG', caption: 'piccolissima' },
    { src: 'assets/img/IMG (2).png', caption: 'bellissima' },
    { src: 'assets/img/IMG (1).png', caption: 'noi due' },
  ],

  finalText: 'E adesso sei qui, con 22 anni e la parte più bella della tua vita e della nostra storia ancora da scrivere. Buon compleanno, amore mio.',
  finalSign: 'Con tutto il mio amore, Mauro',

  // I colori dei capitoli disegnano il viaggio degli anni: dal viola notturno della nascita,
  // al fucsia dell'adolescenza, fino al rosso e al rosa acceso di oggi. Tieni sempre tonalità scure/medie (testo chiaro).
  chapters: [
    {
      age: 0, color: '#3d0d4f', motif: 'stars', stage: 'appena nata',
      title: 'Nasce la mia stella',
      text: 'Una di novembre arrivi tu, piccolissima e già molto decisa. Nata a Caserta,sin da piccola eri una bambina vivace,curiosa e intelligente.',
      polaroid: { src: 'assets/img/IMG (6).JPG', caption: 'giorno 1' },
    },
    {
      age: 6, color: '#6b1a8a', motif: 'lipstick', stage: 'bambina',
      title: 'I primi trucchi',
      text: 'Sin da piccola adoravi vestirti e truccarti. Passione che poi non è mai cambiata ma solo maturata e migliorata,bellissima sin da piccola facevi sfilate e shooting',
      polaroid: { src: 'assets/img/IMG (2).jpg', caption: 'I primi trucchi' },
    },
    {
      age: 12, color: '#9c1f92', motif: 'slime', stage: 'ragazzina',
      title: 'Laboratorio di slime',
      text: 'Colla, glitter, un pizzico di attivatore e tanta pazienza. Facevi slime dalla mattina alla sera con i tuoi amici e guardavi youtube,mangiavi schifezze e bevevi bibete gasate.',
      polaroid: { src: 'assets/img/IMG (7).jpg', caption: '#yolo' },
    },
    {
      age: 14, color: '#c21f86', motif: 'nails', stage: 'quasi teenager',
      title: 'La ribellione',
      text: 'Capelli colorati,outfit stravaganti,unghia improriamente comuni, questa è stata la te della ribellione e del cosiddetto periodo "emo".Lo stile faceva discutere...',
      polaroid: { src: 'assets/img/IMG (8).png', caption: 'tumblr' },
    },
    {
      age: 16, color: '#d6246a', motif: 'palette', stage: 'adolescente',
      title: 'Caschetto bianco',
      text: 'Decolorazioni,colorazioni di tutto e di più,epoca e intenzioni sbagliate, ma forse uno dei tagli piu caratterizzanti e che ti siano mai stati meglio. Fica! ',
      polaroid: { src: 'assets/img/IMG (9).png', caption: 'bianchissima' },
    },
    {
      age: 19, color: '#d12f3f', motif: 'cake', stage: 'giovane donna',
      title: 'Poi ci siamo incontrati',
      text: 'Destino,poco ma sicuro.Ci siamo incontrati allo stappo di Ale e non ci siamo lasciati più.Che storia...',
      polaroid: { src: 'assets/img/IMG (10).png', caption: 'innamorati' },
    },
    {
      age: 20, color: '#a8163f', motif: 'perfume', stage: 'ventenne', counter: true,
      title: 'Fidanzamento',
      text: 'Ci siamo fidanzati il 23 marzo 2024, da li non ci siamo staccati per più di un giorno.Ci siamo trovati e ci siamo completati a vicenda',
      polaroid: { src: 'assets/img/IMG (11).png', caption: 'amore' },
    },
    {
      age: 22, color: '#cf2269', motif: 'cake', stage: 'oggi',
      title: '22esimo compleanno',
      text: 'Ed eccoci qui, al tuo 22esimo compleanno,innamorati come il primo giorno quasi 3 anni fa.Una cosa è sicura,più il tempo passa e più ti amo.Buon compleanno amore mio!',
      polaroid: { src: 'assets/img/IMG (12).png', caption: 'noi' },
    },
  ],

  // ALBUM IN FONDO: tante polaroid. Aggiungi o togli righe quante ne vuoi.
  albumTitle: "L'album di Zaira",
  albumText: 'Un po\' di momenti che amo, in ordine sparso. Passaci sopra con il dito.',
  gallery: [
    { src: 'assets/img/IMG (1).jpg', caption: 'fiore' },
    { src: 'assets/img/IMG (3).jpg', caption: 'blu' },
    { src: 'assets/img/IMG (4).jpg', caption: 'principessa' },
    { src: 'assets/img/IMG (13).png', caption: 'bellezza' },

    { src: 'assets/img/IMG (14).png', caption: 'sorriso' },
    { src: 'assets/img/IMG (15).png', caption: 'punk' },
    { src: 'assets/img/IMG (16).png', caption: 'cappello' },
    { src: 'assets/img/IMG (17).png', caption: 'dark' },
  ],

  // GRATTA E VINCI: buoni regalo da grattare con il dito (o col mouse). Cambia, aggiungi o togli quelli che vuoi.
  couponsTitle: 'Gratta e vinci',
  couponsLabel: 'hai vinto',
  couponsText: 'Quattro regali solo per te. Gratta con il dito e scopri cosa hai vinto.',
  coupons: [
    { title: 'Un Funko Pop di Heisenberg', note: 'say my name' },
    { title: 'Una scimmia pupazzo enorme', note: 'gigante' },
    { title: 'Un basket pieno di cose che ami', note: '' },
    { title: 'Una cena di sushi', note: 'offro io' },
  ],

  // ANIMAZIONE DI CARICAMENTO dopo la password giusta
  loaderSeconds: 3.6,
  loaderMessages: [
    'Preparo le candeline…',
    'Impasto lo slime…',
    'Sistemo i trucchi…',
    'Accendo le candeline…',
    'Appendo le foto…',
    'Quasi pronto, amore ♥',
  ],

  // IL REGALO GRANDE: si apre con il pulsante "Auguri Amore!" nella pagina regalo.html
  gift: {
    teaser: 'Un ultimo regalo, il più grande. Tocca il pacco per aprirlo.',
    title: 'Il tuo regalo più grande',
    text: 'Una cena da Nero&Oro Restaurant e un soggiorno in una suite di Gramsci Suites sul lungomare di chiaia',
    image: 'assets/img/images.jfif',                 // foto del regalo o vostra, es. 'assets/img/regalo.jpg' (vuoto = nessuna foto)
    caption: 'la vista',
    // music: { spotify: 'https://open.spotify.com/…', file: '' },  // facoltativo: una canzone diversa solo per questa pagina (altrimenti usa la stessa della festa)
    link: { label: '', url: '' }, // un pulsante opzionale, es. { label: 'Guarda il video', url: 'https://…' }
    itineraryTitle: 'Il nostro programma segreto',
    itineraryText: 'Una giornata speciale, da vivere insieme, senza fretta.',
    itinerary: [
      { title: 'Un giro sul lungomare', text: 'Nel pomeriggio ci godiamo una passeggiata insieme sul lungomare.' },
      { title: 'Check-in e preparativi', text: 'Poi facciamo check-in in hotel e ci prepariamo con calma per la serata.' },
      { title: 'Cena insieme', text: 'Andiamo a cena da Nero&Oro e brindiamo al tuo compleanno.' },
      { title: 'La nostra notte', text: 'Dopo cena torniamo in hotel, per goderci la notte insieme.' },
    ],
  },

  // ===== MAPPA DEI NOSTRI POSTI: x e y vanno da 0 a 100 (0,0 = in alto a sinistra). I pin sono uniti nell'ordine della lista. =====
  places: {
    title: 'I nostri posti',
    text: 'Il nostro viaggio, un pin alla volta. Tocca i pin per scoprire i ricordi.',
    places: [
      { name: 'Lo stappo di Ale', note: 'dove tutto è iniziato per noi,dove ci siamo ri-visti', x: 20, y: 62 },
      { name: 'Unior', note: 'Dove ti venni a trovare per la prima volta da soli', x: 46, y: 34 },
      { name: 'Il primo ti amo', note: 'Nel nostro posto, dopo il mio compleanno', x: 72, y: 58 },
      { name: 'Il nostro primo viaggio', note: 'A Malaga,la nostra città del cuore', x: 52, y: 82 },
    ],
  },

  // ===== 22 MOTIVI PER CUI TI AMO: tante bolle quante sono le frasi della lista =====
  reasons: {
    title: '22 motivi per cui ti amo',
    text: 'Tocca le bolle una a una: dentro ognuna c\'è un motivo.',
    done: 'E ce ne sarebbero altri mille ♥',
    items: [
      'Perché sei speciale.',
      'Perché sei bellissima .',
      'Perché sei divertente.',
      'Perché sei curiosa e intelligente.',
      'Perché con te ogni posto diventa casa.',
      'Perché non ti arrendi, nemmeno quando è difficile.',
      'Perché sei un po pazza.',
      'Perché ricordi i dettagli che per gli altri non contano.',
      'Perché mi capisci anche quando non parlo.',
      'Perché sei la mia persona preferita con cui non fare niente.',
      'Perché hai uno stile che è solo tuo.',
      'Perché dai sempre una seconda possibilità allo slime venuto male.',
      'Perché sei dolce solo con me.',
      'Perché ogni giorno ti amo di più.',
      'Perché mi hai insegnato tanto.',
      'Perché sei coraggiosa quando serve.',
      'Perché il tuo abbraccio sistema tutto.',
      'Perché hai riempito la mia vita.',
      'Perché con te posso essere me stesso.',
      'Perché ti guardo e mi innamoro ogni volta sempre di più.',
      'Perché abbiamo ancora mille cose da fare insieme.',
      'Perché sei tu.',
    ],
  },

  // ===== QUIZ SU DI NOI: answer = numero della risposta giusta (0 = la prima) =====
  quiz: {
    title: 'Quanto ci conosciamo?',
    text: 'Poche domande su di noi. Nessuna pressione, ma qualcuna è insidiosa.',
    questions: [
      { q: 'Dove ci siamo re-incontrati?', options: ['Allo stappo di Ale', 'All\'università', 'In spiaggia', 'Alla festa di un parente'], answer: 0, ok: 'Esatto! Destino puro.', ko: 'Quasi… era allo stappo di Ale.' },
      { q: 'Quando ci siamo fidanzati?', options: ['23 marzo 2024', '18 novembre 2023', '14 febbraio 2024', '1 giugno 2024'], answer: 0, ok: 'Il giorno più bello!', ko: 'Era il 23 marzo 2024.' },
      { q: 'Quando ti ho detto ti amo per la prima volta?', options: ['20 marzo 2024', '19 marzo 2024', '23 marzo 2024', '22 marzo 2024'], answer: 0, ok: 'Sì, proprio quello!', ko: 'Ma come, non te lo ricordi?' },
      { q: 'Quale canzone mi hai fatto ascoltare 5 volte in macchina la prima volta che tornavo da solo?', options: ['Iris', 'End of beginning', 'Nessuna', 'Dubbi non ho'], answer: 0, ok: 'Brava, la canticchiamo sempre.', ko: 'Era quella di sottofondo!' },
    ],
    results: ['Dobbiamo ripassare i nostri ricordi ♥', 'Ci conosciamo bene!', 'Sei la mia persona, lo sapevo ♥'],
  },

 

  // ===== LETTERA FINALE: si scrive da sola dopo aver aperto la busta. \n\n = nuovo paragrafo =====
  letter: {
    title: 'Una lettera per te',
    intro: 'Tocca la busta per aprirla.',
    text: 'Zaira,\n\nventidue anni fa è nata la persona che oggi ho il privilegio di chiamare amore. Non so se ti rendi conto di quanto sei speciale per me e di quanto ti ami.\n\nBuon compleanno amore mio, la mia stella.',
  },
};
