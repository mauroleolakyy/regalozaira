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

  // PASSWORD: giorno + mese + anno di nascita attaccati (18/11/2004 -> 18112004).
  // Slash, spazi e trattini vengono ignorati.
  password: '18112004',

  // INSIEME DA: data del fidanzamento (anno-mese-giorno). Alimenta il contatore del capitolo con "counter: true".
  since: '2024-03-23',

  // MUSICA DI SOTTOFONDO (scegli UNA delle due, oppure lascia vuote per nessuna musica)
  //  - spotify: incolla il link della canzone (Condividi > Copia link). Compare un lettore: lei deve premere play.
  //             Senza login Spotify il lettore riproduce solo un'anteprima di 30 secondi.
  //  - file:    un mp3 in assets/audio/ (es. 'assets/audio/nostra-canzone.mp3'). Parte da solo quando lei preme "Apri"
  //             e c'è un pulsante per metterla in pausa. È la scelta più affidabile per un'esperienza completa.
  music: { spotify: 'https://open.spotify.com/intl-it/track/2YuelA1W0c01zSMTa4mrko?si=cefa2426ff0b4974', file: '', caption: 'La nostra canzone' },

  // GIOCHINO INIZIALE: ogni indizio è una carta da girare. Il testo tra {graffe} viene evidenziato.
  // Il "22" è volutamente un'esca: gli anni non fanno parte della password.
  lockText: 'Per aprire il regalo trova la parola magica. Gira le carte, cerca i numeri evidenziati e ricomponi il giorno in cui sei nata: giorno, mese, anno.',
  clues: [
    'Il {18} è il giorno del mese in cui sei nata, 4 numeri in meno della tua erà.',
    "Quest'anno spegni {22} candeline, ma non li dimostri affatto.",
    "Novembre è l'{11}º mese dell'anno: freddo ma magico.",
    'Nel {2004} è nata la persona che mi ha cambiato la vità.',
  ],

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
    { title: 'Una cena di sushi', note: 'offro io' },
    { title: 'Un basket pieno di cose che ami', note: '' },
    { title: 'Una giornata di shopping', note: 'offro io' },
  ],

  // ANIMAZIONE DI CARICAMENTO dopo la password giusta
  loaderSeconds: 3.6,
  loaderMessages: [
    'Preparo il gloss…',
    'Impasto lo slime…',
    'Gonfio gli squishy…',
    'Accendo le candeline…',
    'Ultimi ritocchi di glitter…',
    'Quasi pronto, amore ♥',
  ],

  // IL REGALO GRANDE: si apre con il pulsante "Auguri Amore!" nella pagina regalo.html
  gift: {
    teaser: 'Un ultimo regalo, il più grande. Tocca il pacco per aprirlo.',
    title: 'Il tuo regalo più grande',
    text: 'Qui scriverai di che regalo si tratta (lo stai ancora scegliendo!). Puoi raccontare perché lo hai scelto, quando lo riceverà e cosa significa per voi.',
    image: '',                 // foto del regalo o vostra, es. 'assets/img/regalo.jpg' (vuoto = nessuna foto)
    caption: 'per te',
    // music: { spotify: 'https://open.spotify.com/…', file: '' },  // facoltativo: una canzone diversa solo per questa pagina (altrimenti usa la stessa della festa)
    link: { label: '', url: '' }, // un pulsante opzionale, es. { label: 'Guarda il video', url: 'https://…' }
  },
};
