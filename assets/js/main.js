(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const PAL = ['#ff8fc7', '#ff4d9d', '#ffd1e8', '#ff5a6e', '#fff4e0', '#ffe36e'];
  const fx = n => { try { window.SFX && window.SFX[n] && window.SFX[n](); } catch (e) {} };
  const esc = v => String(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- Utilità per le illustrazioni ---------- */
  const rng = seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const pick = (r, a) => a[Math.floor(r() * a.length)];
  const star = (x, y, s, f) =>
    `<path fill="${f}" d="M${x} ${y - s}Q${x} ${y} ${x + s} ${y}Q${x} ${y} ${x} ${y + s}Q${x} ${y} ${x - s} ${y}Q${x} ${y} ${x} ${y - s}Z"/>`;
  const face = (x, y, s) =>
    `<g fill="#5a1038"><circle cx="${x - s * .3}" cy="${y}" r="${s * .07}"/><circle cx="${x + s * .3}" cy="${y}" r="${s * .07}"/></g>
     <ellipse cx="${x - s * .5}" cy="${y + s * .14}" rx="${s * .12}" ry="${s * .07}" fill="#ff5a8a" opacity=".6"/>
     <ellipse cx="${x + s * .5}" cy="${y + s * .14}" rx="${s * .12}" ry="${s * .07}" fill="#ff5a8a" opacity=".6"/>
     <path d="M${x - s * .1} ${y + s * .1}q${s * .1} ${s * .12} ${s * .2} 0" stroke="#5a1038" stroke-width="3" fill="none" stroke-linecap="round"/>`;

  /* ---------- Slime che cola dall'alto ---------- */
  const dripPath = (r, base) => {
    let x = 1200, d = `M0 0H1200V${base}`;
    while (x > 0) {
      const w = 40 + r() * 90, len = r() < .6 ? 25 + r() * 95 : 6;
      const x2 = Math.max(0, x - w), mid = (x + x2) / 2, tw = Math.min(14, w / 3), b = base;
      d += `L${x} ${b}C${x - 4} ${b} ${mid + tw} ${b + len * .2} ${mid + tw} ${b + len}q${-tw} ${tw + 4} ${-2 * tw} 0C${mid - tw} ${b + len * .2} ${x2 + 4} ${b} ${x2} ${b}`;
      x = x2;
    }
    return d + 'Z';
  };
  const paintDrip = (svg, seed) => {
    const r = rng(seed);
    svg.innerHTML = `<path d="${dripPath(r, 28)}" fill="#e0267f"/><path d="${dripPath(r, 14)}" fill="#ff4fa3"/>`;
  };

  /* ---------- Illustrazioni automatiche: lista di [profondità, markup] ---------- */
  const motifs = {
    stars(r) {
      const o = [[.3, `<path d="M200 335C80 245 90 145 150 145C180 145 195 163 200 178C205 163 220 145 250 145C310 145 320 245 200 335Z" fill="#ff8fc7"/><ellipse cx="160" cy="185" rx="14" ry="22" fill="#fff" opacity=".4" transform="rotate(25 160 185)"/>`]];
      for (let i = 0; i < 16; i++) o.push([r() * .8 + .2, star(r() * 380 + 10, r() * 380 + 10, r() * 12 + 5, pick(r, PAL))]);
      return o;
    },
    squishy(r) {
      const o = [], cols = ['#ffd1e8', '#fff4e0', '#ffe36e'];
      [[130, 250, 95, 80], [285, 290, 70, 58], [250, 130, 62, 52]].forEach(([x, y, rx, ry], i) =>
        o.push([.3 + i * .25, `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${cols[i]}"/><ellipse cx="${x - rx * .4}" cy="${y - ry * .5}" rx="${rx * .22}" ry="${ry * .12}" fill="#fff" opacity=".7"/>${face(x, y + ry * .1, rx * .9)}`]));
      for (let i = 0; i < 10; i++) o.push([r() * .8 + .2, star(r() * 380 + 10, r() * 380 + 10, r() * 9 + 4, pick(r, PAL))]);
      return o;
    },
    slime(r) {
      const o = [[.3, `<path d="M30 355C15 292 90 270 140 288C170 235 270 235 300 290C375 285 392 340 362 358Z" fill="#ff4d9d"/><path d="M60 335C80 305 118 304 140 316" stroke="#fff" stroke-opacity=".55" stroke-width="8" fill="none" stroke-linecap="round"/>`],
        [.5, `<path d="M170 265C175 195 212 150 226 86" stroke="#ff4d9d" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M226 86C222 60 258 60 256 86C255 104 228 108 226 86Z" fill="#ff4d9d"/>`]];
      for (let i = 0; i < 9; i++) o.push([r() * .9 + .1, `<circle cx="${r() * 340 + 30}" cy="${r() * 220 + 30}" r="${r() * 12 + 6}" fill="#fff" fill-opacity=".15" stroke="#fff" stroke-opacity=".6" stroke-width="2"/>`]);
      for (let i = 0; i < 8; i++) o.push([r() * .8 + .2, star(r() * 380 + 10, r() * 380 + 10, r() * 8 + 4, pick(r, PAL))]);
      return o;
    },
    lipstick(r) {
      const o = [];
      [[60, '#ff2e4d', .4, 150], [140, '#ff7ac0', .6, 190], [220, '#c4122f', .8, 130]].forEach(([x, c, d, h]) => {
        const y = 340 - h;
        o.push([d, `<rect x="${x}" y="${y}" width="56" height="${h}" rx="6" fill="#ffd37a"/><rect x="${x}" y="${y}" width="56" height="24" rx="4" fill="#3a0b2a"/><path d="M${x + 8} ${y}V${y - 44}L${x + 48} ${y - 66}V${y}Z" fill="${c}"/>`]);
      });
      o.push([.3, `<path d="M290 98Q315 74 335 90Q355 74 380 98Q355 132 335 136Q315 132 290 98Z" fill="#ff2e4d"/><path d="M290 98Q335 112 380 98" stroke="#8a0f2a" stroke-width="3" fill="none"/>`]);
      for (let i = 0; i < 10; i++) o.push([r() * .8 + .2, star(r() * 380 + 10, r() * 200 + 10, r() * 9 + 4, pick(r, PAL))]);
      return o;
    },
    palette(r) {
      const pans = ['#ff8fc7', '#ff4d9d', '#ffd37a', '#ff5a6e', '#c9b6ff', '#fff4e0', '#ff2e4d', '#ffb3d9'];
      const dots = pans.map((c, i) => `<circle cx="${95 + (i % 4) * 58}" cy="${242 + Math.floor(i / 4) * 58}" r="22" fill="${c}"/>`).join('');
      const o = [
        [.3, `<rect x="60" y="205" width="250" height="140" rx="20" fill="#3a0b2a" stroke="#ffd37a" stroke-width="4"/>${dots}`],
        [.5, `<circle cx="310" cy="110" r="62" fill="#ffd37a"/><circle cx="310" cy="110" r="50" fill="#d9f2ff"/><path d="M285 92q10-14 28-14" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>`],
        [.7, `<g transform="rotate(-35 150 120)"><rect x="60" y="112" width="130" height="14" rx="7" fill="#ffd37a"/><rect x="190" y="110" width="22" height="18" fill="#c8c8d0"/><path d="M212 112Q252 119 212 126Z" fill="#ff4d9d"/></g>`],
      ];
      for (let i = 0; i < 10; i++) o.push([r() * .8 + .2, star(r() * 380 + 10, r() * 190 + 10, r() * 9 + 4, pick(r, PAL))]);
      return o;
    },
    nails(r) {
      const cols = ['#ff2e4d', '#ff8fc7', '#fff4e0', '#c9b6ff', '#ffe36e'], o = [];
      cols.forEach((c, i) => {
        const x = 62 + i * 69, y = 235 + (i % 2 ? 18 : -6);
        o.push([.3 + i * .12, `<path d="M${x - 24} ${y}V${y - 70}Q${x - 24} ${y - 112} ${x} ${y - 124}Q${x + 24} ${y - 112} ${x + 24} ${y - 70}V${y}Z" fill="${c}"/><path d="M${x - 11} ${y - 14}V${y - 74}" stroke="#fff" stroke-opacity=".6" stroke-width="6" stroke-linecap="round" fill="none"/>`]);
      });
      [[95, '#ff4d9d'], [300, '#ffe36e']].forEach(([x, c]) =>
        o.push([.6, `<rect x="${x - 26}" y="305" width="52" height="46" rx="12" fill="${c}"/><rect x="${x - 8}" y="288" width="16" height="18" fill="#3a0b2a"/><rect x="${x - 14}" y="248" width="28" height="42" rx="7" fill="#ffd37a"/>`]));
      for (let i = 0; i < 10; i++) o.push([r() * .8 + .2, star(r() * 380 + 10, r() * 110 + 10, r() * 9 + 4, pick(r, PAL))]);
      return o;
    },
    perfume(r) {
      const o = [
        [.3, `<rect x="120" y="190" width="160" height="150" rx="28" fill="#ffd1e8"/><rect x="132" y="250" width="136" height="78" rx="18" fill="#ff4d9d"/><path d="M200 308C170 288 172 262 186 262C193 262 198 267 200 272C202 267 207 262 214 262C228 262 230 288 200 308Z" fill="#fff4e0"/><rect x="178" y="166" width="44" height="26" fill="#ffd37a"/><rect x="164" y="108" width="72" height="60" rx="12" fill="#3a0b2a"/>`],
        [.6, `<rect x="305" y="250" width="52" height="90" rx="16" fill="#ffe36e"/><rect x="317" y="222" width="28" height="30" rx="6" fill="#3a0b2a"/>`],
        [.8, `<path d="M92 130h36M100 160h30M96 100h26" stroke="#fff" stroke-opacity=".7" stroke-width="5" stroke-linecap="round"/>`],
      ];
      for (let i = 0; i < 14; i++) o.push([r() * .8 + .2, `<circle cx="${r() * 160 + 20}" cy="${r() * 200 + 40}" r="${r() * 5 + 2}" fill="${pick(r, PAL)}"/>`]);
      for (let i = 0; i < 8; i++) o.push([r() * .8 + .2, star(r() * 380 + 10, r() * 380 + 10, r() * 9 + 4, pick(r, PAL))]);
      return o;
    },
    cake(r) {
      const o = [[.3, `<rect x="90" y="250" width="220" height="90" rx="14" fill="#ff8fc7"/><rect x="120" y="190" width="160" height="70" rx="12" fill="#fff4e0"/>
        <path d="M90 262q18 18 36 0t36 0 36 0 36 0 36 0 34 0" fill="none" stroke="#ff4d9d" stroke-width="9" stroke-linecap="round"/>`]];
      for (let i = 0; i < 5; i++) {
        const x = 140 + i * 30;
        o.push([.3, `<rect x="${x - 4}" y="156" width="8" height="34" rx="2" fill="#ffd1e8"/><path class="flame" d="M${x} 126q-9 14 0 26 9-12 0-26z" fill="#ffe36e"/>`]);
      }
      for (let i = 0; i < 18; i++) o.push([r() * .9 + .2, star(r() * 380 + 10, r() * 330, r() * 9 + 4, pick(r, PAL))]);
      return o;
    },
  };
  const paint = (svg, motif, seed) => {
    const make = motifs[motif]; if (!make) return;
    const r = rng(seed * 9973 + 7);
    svg.innerHTML = make(r).map(([d, m], i) =>
      `<g class="p" data-d="${d.toFixed(2)}"><g style="--d:${(i * .04).toFixed(2)}s">${m}</g></g>`).join('');
  };

  /* ---------- Sticker decorativi (si schiacciano al tocco, come uno squishy) ---------- */
  const ICONS = [
    '<rect x="17" y="24" width="14" height="20" rx="2" fill="#ffd37a"/><rect x="17" y="24" width="14" height="6" fill="#3a0b2a"/><path d="M19 24V10l10-6v20z" fill="#ff2e4d"/>',
    '<rect x="14" y="22" width="20" height="21" rx="6" fill="#ff4d9d"/><rect x="20" y="13" width="8" height="10" fill="#3a0b2a"/><rect x="18" y="4" width="12" height="11" rx="3" fill="#ffd37a"/>',
    '<path d="M24 4C24 4 10 22 10 30a14 14 0 0 0 28 0C38 22 24 4 24 4z" fill="#ff4d9d"/><ellipse cx="18" cy="31" rx="3" ry="5" fill="#fff" opacity=".5"/>',
    '<ellipse cx="24" cy="28" rx="19" ry="15" fill="#ffd1e8"/><circle cx="17" cy="27" r="1.8" fill="#5a1038"/><circle cx="31" cy="27" r="1.8" fill="#5a1038"/><path d="M21 32q3 3 6 0" stroke="#5a1038" stroke-width="1.6" fill="none"/><ellipse cx="13" cy="31" rx="3" ry="1.8" fill="#ff5a8a" opacity=".6"/><ellipse cx="35" cy="31" rx="3" ry="1.8" fill="#ff5a8a" opacity=".6"/>',
    '<path d="M24 42C6 29 8 14 17 14C21 14 23 17 24 19C25 17 27 14 31 14C40 14 42 29 24 42Z" fill="#ff5a6e"/>',
    '<path d="M24 4Q24 24 44 24Q24 24 24 44Q24 24 4 24Q24 24 24 4Z" fill="#ffe36e"/>',
    '<rect x="12" y="20" width="24" height="24" rx="8" fill="#ffd1e8"/><rect x="12" y="30" width="24" height="14" rx="6" fill="#ff4d9d"/><rect x="20" y="13" width="8" height="8" fill="#ffd37a"/><rect x="17" y="4" width="14" height="10" rx="3" fill="#3a0b2a"/>',
    '<rect x="18" y="14" width="12" height="30" rx="5" fill="#ff8fc7"/><rect x="20" y="3" width="8" height="13" rx="4" fill="#3a0b2a"/><rect x="21" y="20" width="3" height="16" rx="1.5" fill="#fff" opacity=".55"/>',
  ];
  const stickers = (chapter, seed) => {
    const r = rng(seed * 331 + 5);
    for (let i = 0; i < 4; i++) {
      const el = document.createElement('span');
      el.className = 'sticker'; el.setAttribute('aria-hidden', 'true');
      const left = i % 2 === 0;
      el.style.cssText = `${left ? 'left' : 'right'}:${1 + r() * 5}%;top:${8 + r() * 78}%;--s:${34 + r() * 30}px;--rot:${Math.round(r() * 50 - 25)}deg;--dl:${(r() * 4).toFixed(1)}s`;
      el.innerHTML = `<svg viewBox="0 0 48 48">${ICONS[Math.floor(r() * ICONS.length)]}</svg>`;
      el.addEventListener('click', () => { fx('squish'); const s = $('svg', el); s.classList.remove('sq'); void s.getBoundingClientRect(); s.classList.add('sq'); });
      chapter.appendChild(el);
    }
  };

  /* ---------- Polaroid ---------- */
  // Rende il percorso a prova di spazi, parentesi e backslash di Windows
  const url = s => { s = String(s).trim().replace(/\\/g, '/'); try { s = decodeURI(s); } catch (e) {} return encodeURI(s); };
  const pol = (p = {}, rot = 0, extra = '') =>
    `<div class="polaroid ${extra}" style="--r:${rot}deg"><div class="ph${p.src ? '' : ' empty'}">${p.src
      ? `<img src="${esc(url(p.src))}" alt="${esc(p.caption || '')}" loading="lazy">` : '<span>la tua foto qui</span>'}</div><p class="cap">${esc(p.caption || '')}</p></div>`;

  /* ---------- Costruzione della pagina dai dati ---------- */
  const build = d => {
    document.title = `${d.title} · ${d.name}`;
    const chap = d.chapters.map((c, i) => `
      <section class="chapter ${i % 2 ? 'flip' : ''}" data-color="${esc(c.color)}" data-age="${+c.age}" data-stage="${esc(c.stage || '')}" data-motif="${esc(c.motif)}" data-seed="${i + 3}">
        <div class="copy">
          <p class="year">${+c.age} ${c.age == 1 ? 'anno' : 'anni'}, ${d.birthYear + +c.age}</p>
          <h2>${esc(c.title)}</h2>
          <p>${esc(c.text)}</p>
          ${c.counter && d.since ? '<div class="counter"></div>' : ''}
        </div>
        <figure class="art">
          <svg viewBox="0 0 400 400" role="img" aria-label="Illustrazione: ${esc(c.title)}"></svg>
          ${pol(c.polaroid, i % 2 ? 5 : -5, 'corner')}
        </figure>
      </section>`).join('');
    const hero = (d.heroPolaroids || []).map((p, i) => pol(p, [-6, 3, -2][i % 3])).join('');
    const word = (d.ticker || []).join(' ✦ ') + ' ✦ ';
    const last = d.chapters[d.chapters.length - 1].color;
    const now = d.chapters[d.chapters.length - 1].stage || '';
    const sec = (cls, x, inner) => `
        <section class="chapter stack ${cls}" data-color="${esc(last)}" data-age="${+d.age}" data-stage="${esc(now)}">
          <div class="copy"><h2>${esc(x.title)}</h2><p>${esc(x.intro !== undefined ? x.intro : (x.text || ''))}</p></div>${inner}
        </section>`;
    const has = a => a && a.length;
    const mapSec = d.places && has(d.places.places) ? sec('mapsec', d.places, `<div class="mapwrap"><svg class="map" viewBox="0 0 400 300" role="img" aria-label="Mappa dei nostri posti"></svg><div class="placebox" aria-live="polite"><b></b><span>Tocca un pin ♥</span></div></div>`) : '';
    const reasonsSec = d.reasons && has(d.reasons.items) ? sec('reasons', d.reasons, `<div class="bubbles">${d.reasons.items.map((t, i) => `<button class="bub" type="button" style="--i:${i}" data-i="${i}" aria-label="Motivo ${i + 1}">${i + 1}</button>`).join('')}</div><div class="reasonbox" aria-live="polite"><p class="rcount"></p><p class="rtext">Tocca una bolla ♥</p></div>`) : '';
    const quizSec = d.quiz && has(d.quiz.questions) ? sec('quiz', d.quiz, '<div class="quizbox" aria-live="polite"></div>') : '';
    const squishSec = d.squishy ? sec('squish', d.squishy, `<div class="sqwrap"><button class="bigsq" type="button" aria-label="Schiaccia lo squishy"><svg viewBox="0 0 240 200" aria-hidden="true"><ellipse class="sqbody" cx="120" cy="112" rx="104" ry="82" fill="#ffd1e8"/><ellipse cx="80" cy="64" rx="26" ry="11" fill="#fff" opacity=".7"/><g class="sqface"></g></svg></button><p class="sqcount">squish: <b>0</b></p><p class="sqmsg" aria-live="polite"></p></div>`) : '';
    const letterSec = d.letter && d.letter.text ? sec('letterSec', d.letter, `<div class="envwrap"><button class="env" type="button" aria-label="Apri la busta"><span class="eback"></span><span class="eflap"></span><span class="eheart">♥</span></button><div class="paper" hidden><p class="sr"></p><p class="typed" aria-hidden="true"></p><button class="skip" type="button">salta</button></div></div>`) : '';
    const rots = [-5, 4, -3, 6, -6, 3, -4, 5];
    const shelf = (d.gallery || []).map((p, i) => pol(p, rots[i % 8], 'big')).join('');
    const album = shelf ? `
        <section class="chapter album" data-color="${esc(last)}" data-age="${+d.age}" data-stage="${esc(now)}">
          <div class="copy"><h2>${esc(d.albumTitle || "L'album")}</h2><p>${esc(d.albumText || '')}</p></div>
          <div class="shelf">${shelf}</div>
        </section>` : '';
    const prizes = (d.coupons || []).map(c => `
      <div class="coupon"><div class="prize"><small>${esc(d.couponsLabel || 'buono per')}</small><b>${esc(c.title)}</b>${c.note ? `<em>${esc(c.note)}</em>` : ''}</div>
        <canvas aria-hidden="true"></canvas><button class="rv" type="button" aria-label="Svela il premio: ${esc(c.title)}">svela</button></div>`).join('');
    const couponSec = prizes ? `
        <section class="chapter coupons" data-color="${esc(last)}" data-age="${+d.age}" data-stage="${esc(now)}">
          <div class="copy"><h2>${esc(d.couponsTitle || 'Gratta e vinci')}</h2><p>${esc(d.couponsText || '')}</p></div>
          <div class="ticketgrid">${prizes}</div>
        </section>` : '';
    $('#app').innerHTML = `
      <header class="hero" data-color="${esc(d.chapters[0].color)}" data-age="0" data-stage="">
        <svg class="drip" viewBox="0 0 1200 170" preserveAspectRatio="none" aria-hidden="true"></svg>
        <div class="wall">${hero}</div>
        <h1>${esc(d.title)}</h1>
        <p class="for">per ${esc(d.name)}</p>
        <p class="lead">${esc(d.intro)}</p>
        <span class="hint" aria-hidden="true"></span>
      </header>
      <div class="ticker" aria-hidden="true"><div class="track">${(word.repeat(4) + '').replace(/(.+)/, '<span>$1</span><span>$1</span>')}</div></div>
      <main>${chap}${mapSec}${album}${reasonsSec}${quizSec}${squishSec}${couponSec}${letterSec}
        <section class="chapter finale" data-color="${esc(last)}" data-age="${+d.age}" data-stage="${esc(now)}">
          <div class="copy">
            <h2>Buon compleanno, amore mio!</h2>
            <p>${esc(d.finalText)}</p>
            <div class="cake" id="cake">
              <svg viewBox="0 0 400 300" role="group" aria-label="Torta con le candeline"></svg>
              <p id="cakeCount" aria-live="polite"></p>
              <p class="cakeNote">Esprimi un desiderio e spegni le candeline: toccale una a una oppure soffia nel microfono.</p>
              <div class="cakeBtns"><button id="blow" type="button" hidden>Soffia nel microfono</button><button id="relight" type="button" hidden>Riaccendi</button></div>
            </div>
            <p class="sign">${esc(d.finalSign)}</p>
            <button id="party" type="button">Auguri Amore!</button>
          </div>
        </section>
      </main>`;
    paintDrip($('.hero .drip'), 11);
    $$('.polaroid img').forEach(im => im.addEventListener('error', () => {
      const ph = im.parentNode; ph.classList.add('empty'); ph.innerHTML = '<span>foto non trovata</span>';
    }));
  };

  /* ---------- Contatore: da quanto tempo siete insieme ---------- */
  let counterTimer = 0;
  const ymd = (a, b) => {
    let y = b.getFullYear() - a.getFullYear(), m = b.getMonth() - a.getMonth(), d = b.getDate() - a.getDate();
    if (d < 0) { m--; d += new Date(b.getFullYear(), b.getMonth(), 0).getDate(); }
    if (m < 0) { y--; m += 12; }
    return [y, m, d];
  };
  const pl = (n, s, p) => `${n} ${n === 1 ? s : p}`;
  function initCounter() {
    const box = $('.counter'), since = new Date(`${SITE.since}T00:00:00`);
    if (!box || isNaN(since)) return;
    box.innerHTML = `<p class="cl">insieme da</p><p class="big"><b data-k="days">0</b> giorni</p><p class="cs" data-k="ymd"></p>
      <div class="tiles"><div><b data-k="h">0</b>ore</div><div><b data-k="m">0</b>minuti</div><div><b data-k="s">0</b>secondi</div></div>`;
    const put = (k, v) => { const el = $(`[data-k="${k}"]`, box); if (el && el.textContent !== String(v)) el.textContent = v; };
    const tick = () => {
      const now = new Date(), ms = Math.max(0, now - since), [y, m, d] = ymd(since, now);
      put('days', Math.floor(ms / 864e5).toLocaleString('it-IT'));
      put('ymd', `${pl(y, 'anno', 'anni')}, ${pl(m, 'mese', 'mesi')} e ${pl(d, 'giorno', 'giorni')}`);
      put('h', Math.floor(ms / 36e5) % 24); put('m', Math.floor(ms / 6e4) % 60); put('s', Math.floor(ms / 1e3) % 60);
    };
    tick(); clearInterval(counterTimer); counterTimer = setInterval(tick, 1000);
  }

  /* ---------- Torta con le candeline da spegnere ---------- */
  function initCake() {
    const svg = $('#cake svg'); if (!svg) return;
    const N = SITE.age || 22, cols = ['#ff8fc7', '#8fd3ff', '#ffe36e', '#c9b6ff'], r = rng(42);
    const nb = Math.ceil(N / 2), nf = N - nb;
    const candle = (x, y, i) => `<g class="candle lit" role="button" tabindex="0" aria-label="Spegni la candelina ${i + 1}">
      <rect x="${x - 12}" y="${y - 64}" width="24" height="72" fill="#000" fill-opacity="0"/>
      <rect x="${x - 4}" y="${y - 34}" width="8" height="34" rx="2" fill="${cols[i % 4]}"/><rect x="${x - 2}" y="${y - 31}" width="2.5" height="26" rx="1" fill="#fff" opacity=".55"/>
      <path class="flame" d="M${x} ${y - 62}q-9 13 0 24 9-11 0-24z" fill="#ffe36e"/><path class="flame" d="M${x} ${y - 54}q-4.5 8 0 14 4.5-6 0-14z" fill="#ff8a3d"/>
      <circle class="smoke" cx="${x}" cy="${y - 46}" r="4"/></g>`;
    let sp = '', cs = '';
    for (let i = 0; i < 26; i++) sp += `<rect x="${55 + r() * 290}" y="${208 + r() * 56}" width="9" height="3.5" rx="1.7" fill="${cols[i % 4]}" transform="rotate(${Math.round(r() * 180)} 200 230)"/>`;
    for (let i = 0; i < 10; i++) cs += `<circle cx="${51.5 + 33 * i}" cy="196" r="16.5" fill="#fff4e0"/>`;
    const back = Array.from({ length: nb }, (_, i) => candle(nb > 1 ? 70 + i * (260 / (nb - 1)) : 200, 158, i)).join('');
    const front = Array.from({ length: nf }, (_, i) => candle(nf > 1 ? 84 + i * (260 / (nf - 1)) : 200, 188, nb + i)).join('');
    svg.innerHTML = `<ellipse cx="200" cy="274" rx="192" ry="18" fill="#ffc2e2"/>
      <path d="M35 172V262A165 34 0 0 0 365 262V172Z" fill="#ff8fc7"/>${sp}
      <rect x="35" y="172" width="330" height="24" fill="#fff4e0"/>${cs}
      <ellipse cx="200" cy="172" rx="165" ry="34" fill="#fff4e0"/><ellipse cx="200" cy="172" rx="150" ry="28" fill="#ffd1e8"/>${back}${front}`;
    let lit = N;
    const count = $('#cakeCount'), relight = $('#relight'), blow = $('#blow');
    const refresh = () => { count.textContent = lit ? `Candeline accese: ${lit}` : 'Tutte spente: desiderio esaudito ♥'; relight.hidden = lit === N; };
    const snuff = el => {
      if (!el || !el.classList.contains('lit')) return;
      fx('blow'); el.classList.remove('lit'); el.classList.remove('puff'); void el.getBoundingClientRect(); el.classList.add('puff');
      lit--; refresh();
      if (!lit) { setTimeout(() => fx('tada'), 250); if (!reduce) setTimeout(burst, 350); }
    };
    svg.addEventListener('click', e => snuff(e.target.closest('.candle')));
    svg.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); snuff(e.target.closest('.candle')); } });
    relight.addEventListener('click', () => { fx('pop'); $$('.candle', svg).forEach(c => { c.classList.add('lit'); c.classList.remove('puff'); }); lit = N; refresh(); });

    // Soffio nel microfono: più forte soffia, più candeline si spengono
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) blow.hidden = false;
    blow.addEventListener('click', async () => {
      try {
        const st = await navigator.mediaDevices.getUserMedia({ audio: true });
        const ac = new (window.AudioContext || window.webkitAudioContext)(), an = ac.createAnalyser();
        an.fftSize = 512; ac.createMediaStreamSource(st).connect(an);
        const buf = new Uint8Array(an.fftSize); blow.textContent = 'Sto ascoltando… soffia!';
        const stop = () => { st.getTracks().forEach(t => t.stop()); ac.close(); blow.textContent = 'Soffia nel microfono'; };
        const tick = () => {
          an.getByteTimeDomainData(buf);
          let sum = 0; for (const v of buf) { const x = (v - 128) / 128; sum += x * x; }
          const level = Math.sqrt(sum / buf.length);
          if (level > .12) { const on = $$('.candle.lit', svg); for (let i = 0; i < Math.min(on.length, Math.ceil(level * 14)); i++) snuff(on[Math.floor(Math.random() * on.length)]); }
          if (lit > 0 && document.body.contains(svg)) requestAnimationFrame(tick); else stop();
        };
        tick();
      } catch (e) { blow.textContent = 'Microfono non disponibile: tocca le candeline'; blow.disabled = true; }
    });
    refresh();
  }

  /* ---------- Gratta e vinci ---------- */
  function initCoupons() {
    $$('.coupon').forEach(card => {
      const cv = $('canvas', card), ctx = cv.getContext('2d', { willReadFrequently: true }), W = (cv.width = 300), H = (cv.height = 160);
      const g = ctx.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, '#ffb3d9'); g.addColorStop(.5, '#ff6fb5'); g.addColorStop(1, '#ff8fc7');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      const r = rng(7); ctx.fillStyle = 'rgba(255,255,255,.35)';
      for (let i = 0; i < 26; i++) { ctx.font = `${14 + r() * 16}px sans-serif`; ctx.fillText(r() < .5 ? '✦' : '♥', r() * W, r() * H + 14); }
      ctx.fillStyle = '#fff'; ctx.font = '600 30px Fredoka, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('gratta qui', W / 2, H / 2 + 10);
      let down = false, last = null, moves = 0, done = false;
      const reveal = () => { if (done) return; done = true; fx('win'); card.classList.add('done'); if (!reduce) burst(); };
      const pos = e => { const b = cv.getBoundingClientRect(); return [(e.clientX - b.left) * W / b.width, (e.clientY - b.top) * H / b.height]; };
      const scratch = (a, b) => { ctx.globalCompositeOperation = 'destination-out'; fx('scratch'); ctx.lineWidth = 34; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); };
      const check = () => {
        if (done) return;
        const px = ctx.getImageData(0, 0, W, H).data; let clear = 0, n = 0;
        for (let i = 3; i < px.length; i += 64) { n++; if (px[i] < 40) clear++; }
        if (n && clear / n > .5) reveal();
      };
      cv.addEventListener('pointerdown', e => { down = true; cv.setPointerCapture(e.pointerId); last = pos(e); scratch(last, last); });
      cv.addEventListener('pointermove', e => { if (!down) return; const p = pos(e); scratch(last, p); last = p; if (++moves % 6 === 0) check(); });
      const end = () => { down = false; check(); };
      cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
      $('.rv', card).addEventListener('click', reveal);
    });
  }

  /* ---------- Foto ingrandita al tocco ---------- */
  function initLightbox() {
    const lb = document.createElement('div'); lb.id = 'lightbox'; lb.hidden = true; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-label', 'Foto ingrandita');
    document.body.appendChild(lb);
    const close = () => { lb.hidden = true; lb.innerHTML = ''; fx('pop'); };
    const open = p => {
      const c = p.cloneNode(true); c.className = 'polaroid'; c.removeAttribute('tabindex'); c.removeAttribute('role'); c.style.setProperty('--r', '-2deg');
      lb.innerHTML = ''; lb.appendChild(c); lb.hidden = false; fx('whoosh');
    };
    $$('.polaroid').forEach(p => {
      if (!$('img', p)) return;
      p.tabIndex = 0; p.setAttribute('role', 'button'); p.setAttribute('aria-label', 'Ingrandisci la foto');
      p.addEventListener('click', () => open(p));
      p.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(p); } });
    });
    lb.addEventListener('click', close);
    addEventListener('keydown', e => { if (e.key === 'Escape' && !lb.hidden) close(); });
  }

  /* ---------- Scia di cuoricini e glitter che segue il mouse ---------- */
  function initTrail() {
    if (reduce) return;
    let lx = -99, ly = -99; const chars = ['♥', '✦', '♡', '✧'];
    addEventListener('pointermove', e => {
      if (e.pointerType === 'touch' || Math.hypot(e.clientX - lx, e.clientY - ly) < 30) return;
      lx = e.clientX; ly = e.clientY;
      const s = document.createElement('span'); s.className = 'trail'; s.setAttribute('aria-hidden', 'true');
      s.textContent = chars[Math.floor(Math.random() * chars.length)];
      s.style.cssText = `left:${lx}px;top:${ly}px;--dx:${Math.round(Math.random() * 40 - 20)}px;color:${pick(Math.random, PAL)};font-size:${12 + Math.random() * 14}px`;
      document.body.appendChild(s); s.addEventListener('animationend', () => s.remove());
    });
  }

  /* ---------- Mappa dei nostri posti ---------- */
  function initMap() {
    const svg = $('.map'); if (!svg) return;
    const P = SITE.places.places, pts = P.map(p => [p.x * 4, p.y * 3]), r = rng(9);
    let deco = '';
    for (let i = 0; i < 6; i++) deco += `<ellipse cx="${r() * 360 + 20}" cy="${r() * 260 + 20}" rx="${30 + r() * 40}" ry="${18 + r() * 26}" fill="${i % 2 ? '#ffd1e8' : '#ffe4f1'}"/>`;
    let dp = `M${pts[0]}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      dp += `C${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2}`;
    }
    const pins = pts.map((p, i) => `<g transform="translate(${p[0]} ${p[1]})" class="pin" tabindex="0" role="button" aria-label="Posto ${i + 1}: ${esc(P[i].name)}" data-i="${i}">
        <g class="pi" style="--d:${(i * .25).toFixed(2)}s"><path d="M0 0C-22-22-22-44 0-44C22-44 22-22 0 0Z" fill="#ff4fa3"/><circle cy="-29" r="10" fill="#fff"/>
        <text y="-25" text-anchor="middle" font-size="12" font-weight="700" fill="#b3125f" style="font-family:Fredoka,sans-serif">${i + 1}</text>
        <text y="15" text-anchor="middle" font-size="13" fill="#5a1038" style="font-family:Caveat,cursive;font-weight:600">${esc(P[i].name)}</text></g></g>`).join('');
    svg.innerHTML = `<rect width="400" height="300" rx="22" fill="#fff4e0"/>${deco}<path d="${dp}" fill="none" stroke="#ffc2e2" stroke-width="12" stroke-linecap="round"/><path d="${dp}" fill="none" stroke="#ff4fa3" stroke-width="4" stroke-linecap="round" stroke-dasharray="2 9"/>${pins}`;
    const box = $('.placebox'), show = pin => {
      const p = P[+pin.dataset.i]; fx('pop');
      $$('.pin', svg).forEach(x => x.classList.toggle('on', x === pin));
      $('b', box).textContent = p.name; $('span', box).textContent = p.note || '';
    };
    $$('.pin', svg).forEach(pin => {
      pin.addEventListener('click', () => show(pin));
      pin.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(pin); } });
    });
  }

  /* ---------- 22 motivi ---------- */
  function initReasons() {
    const s = $('.reasons'); if (!s) return;
    const items = SITE.reasons.items, txt = $('.rtext', s), cnt = $('.rcount', s); let opened = 0;
    const upd = () => { cnt.textContent = `Motivi scoperti: ${opened} su ${items.length}`; }; upd();
    $$('.bub', s).forEach(b => b.addEventListener('click', () => {
      fx('pop');
      txt.textContent = items[+b.dataset.i]; txt.classList.remove('swap'); void txt.offsetWidth; txt.classList.add('swap');
      if (b.classList.contains('seen')) return;
      b.classList.add('seen'); b.textContent = '♥'; opened++; upd();
      if (opened === items.length) { setTimeout(() => { fx('tada'); txt.textContent = SITE.reasons.done || 'E ce ne sarebbero altri mille ♥'; }, 900); if (!reduce) setTimeout(burst, 900); }
    }));
  }

  /* ---------- Quiz su di noi ---------- */
  function initQuiz() {
    const box = $('.quizbox'); if (!box) return;
    const Q = SITE.quiz.questions; let i = 0, score = 0;
    const show = () => {
      if (i >= Q.length) {
        const res = SITE.quiz.results || [], idx = Math.min(res.length - 1, Math.round(score / Q.length * (res.length - 1)));
        box.innerHTML = `<p class="qn">Risultato</p><h3>${score} su ${Q.length}</h3><p class="qfb">${esc(res[idx] || '')}</p><button type="button" class="qnext">Rifai il quiz</button>`;
        if (score === Q.length) { fx('tada'); if (!reduce) burst(); } else fx('win');
        $('.qnext', box).addEventListener('click', () => { i = 0; score = 0; show(); });
        return;
      }
      const q = Q[i];
      box.innerHTML = `<p class="qn">Domanda ${i + 1} di ${Q.length}</p><h3>${esc(q.q)}</h3>
        <div class="opts">${q.options.map((o, k) => `<button type="button" class="opt" data-k="${k}">${esc(o)}</button>`).join('')}</div><p class="qfb"></p>`;
      let answered = false;
      $$('.opt', box).forEach(btn => btn.addEventListener('click', () => {
        if (answered) return; answered = true;
        const k = +btn.dataset.k, good = k === q.answer;
        btn.classList.add(good ? 'good' : 'bad'); $$('.opt', box)[q.answer].classList.add('good');
        if (good) { score++; fx('ding'); } else fx('error');
        $('.qfb', box).textContent = (good ? q.ok : q.ko) || '';
        const n = document.createElement('button'); n.type = 'button'; n.className = 'qnext'; n.textContent = i === Q.length - 1 ? 'Vedi il risultato' : 'Avanti';
        n.addEventListener('click', () => { i++; show(); }); box.appendChild(n); n.focus({ preventScroll: true });
      }));
    };
    show();
  }

  /* ---------- Squishy da schiacciare ---------- */
  function initSquishy() {
    const s = $('.squish'); if (!s) return;
    const btn = $('.bigsq', s), cnt = $('.sqcount b', s), msg = $('.sqmsg', s), face = $('.sqface', s), wrap = $('.sqwrap', s);
    const M = (SITE.squishy.milestones || []).slice().sort((a, b) => a[0] - b[0]); let n = 0;
    const faceFor = k => {
      const eyes = k >= 100 ? star(88, 112, 12, '#5a1038') + star(152, 112, 12, '#5a1038')
        : k >= 50 ? '<g stroke="#5a1038" stroke-width="5" fill="none" stroke-linecap="round"><path d="M78 118q10-14 20 0"/><path d="M142 118q10-14 20 0"/></g>'
        : '<g fill="#5a1038"><circle cx="88" cy="112" r="7"/><circle cx="152" cy="112" r="7"/></g>';
      const mouth = k >= 10 ? '<path d="M104 130q16 30 32 0z" fill="#5a1038"/><ellipse cx="120" cy="143" rx="8" ry="5" fill="#ff5a8a"/>'
        : '<path d="M108 134q12 12 24 0" stroke="#5a1038" stroke-width="5" fill="none" stroke-linecap="round"/>';
      return `${eyes}<ellipse cx="62" cy="134" rx="13" ry="8" fill="#ff5a8a" opacity=".6"/><ellipse cx="178" cy="134" rx="13" ry="8" fill="#ff5a8a" opacity=".6"/>${mouth}`;
    };
    face.innerHTML = faceFor(0);
    const hit = () => {
      n++; cnt.textContent = n; fx('squish'); face.innerHTML = faceFor(n);
      const m = M.find(x => x[0] === n);
      if (m) { msg.textContent = m[1]; fx('win'); if (n >= 100 && !reduce) burst(); }
      if (!reduce && n % 4 === 0) {
        const h = document.createElement('span'); h.className = 'sqheart'; h.textContent = pick(Math.random, ['♥', '✦', '♡']);
        h.style.cssText = `left:${30 + Math.random() * 40}%;color:${pick(Math.random, PAL)}`; wrap.appendChild(h); h.addEventListener('animationend', () => h.remove());
      }
    };
    btn.addEventListener('pointerdown', () => { btn.classList.add('down'); hit(); });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => btn.addEventListener(ev, () => btn.classList.remove('down')));
    btn.addEventListener('keydown', e => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); btn.classList.add('down'); hit(); } });
    btn.addEventListener('keyup', () => btn.classList.remove('down'));
  }

  /* ---------- Lettera che si scrive da sola ---------- */
  function initLetter() {
    const s = $('.letterSec'); if (!s) return;
    const env = $('.env', s), paper = $('.paper', s), typed = $('.typed', s), skip = $('.skip', s);
    const full = String(SITE.letter.text).trim() + (SITE.finalSign ? `\n\n${SITE.finalSign}` : '');
    $('.sr', s).textContent = full; let timer = 0, idx = 0;
    const finish = () => { clearInterval(timer); typed.textContent = full; paper.classList.add('done'); };
    env.addEventListener('click', () => {
      if (env.classList.contains('open')) return;
      env.classList.add('open'); fx('whoosh');
      setTimeout(() => {
        paper.hidden = false; paper.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
        if (reduce) { finish(); return; }
        timer = setInterval(() => {
          idx++; typed.textContent = full.slice(0, idx);
          if (idx % 28 === 0) fx('sparkle');
          if (idx >= full.length) finish();
        }, 24);
      }, reduce ? 0 : 750);
    });
    skip.addEventListener('click', finish);
  }

  function init() {
    const chapters = $$('.chapter');
    $$('.chapter[data-motif] .art svg').forEach(svg => {
      const c = svg.closest('.chapter');
      paint(svg, c.dataset.motif, +c.dataset.seed);
    });
    chapters.forEach((c, i) => stickers(c, i + 1));

    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('in')), { threshold: .35 });
    chapters.forEach(c => io.observe(c));

    const stops = [$('.hero'), ...chapters];
    const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
    const colors = stops.map(s => hex(s.dataset.color));
    const ages = stops.map(s => +s.dataset.age);
    const body = document.body, stageEl = $('#stage'), ageEl = $('#age'), bar = $('#bar'), theme = $('meta[name=theme-color]');
    const parallax = $$('.art svg .p');
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = scrollY, vh = innerHeight, mid = y + vh / 2;
      const centers = stops.map(s => s.offsetTop + s.offsetHeight / 2);
      let i = 0;
      while (i < centers.length - 2 && mid > centers[i + 1]) i++;
      const t = Math.min(1, Math.max(0, (mid - centers[i]) / (centers[i + 1] - centers[i])));
      const mix = colors[i].map((v, k) => Math.round(v + (colors[i + 1][k] - v) * t));
      const bg = `rgb(${mix})`;
      body.style.backgroundColor = bg; theme && (theme.content = bg);
      const label = stops[t < .5 ? i : i + 1].dataset.stage || '';
      if (stageEl.textContent !== label) stageEl.textContent = label;
      stageEl.hidden = !label;
      ageEl.textContent = Math.round(ages[i] + (ages[i + 1] - ages[i]) * t);
      bar.style.width = (y / (document.documentElement.scrollHeight - vh) * 100) + '%';
      if (reduce) return;
      parallax.forEach(g => {
        const b = g.parentNode.getBoundingClientRect();
        if (b.bottom < -100 || b.top > vh + 100) return;
        g.style.transform = `translateY(${((b.top + b.height / 2 - vh / 2) * (g.dataset.d - .5) * .25).toFixed(1)}px)`;
      });
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    update();
    document.documentElement.style.setProperty('--end', $$('[data-color]').pop().dataset.color);
    let leaving = false;
    $('#party').addEventListener('click', () => {
      if (leaving) return; leaving = true; fx('tada');
      if (!reduce) burst();
      document.body.classList.add('leaving');           // dissolvenza rosa
      try { if (musicAudio) sessionStorage.setItem('zaira-music-t', String(musicAudio.currentTime)); } catch (e) {}
      setTimeout(() => { location.href = 'regalo.html'; }, reduce ? 0 : 1500);
    });
    initCounter(); initCake(); initCoupons(); initMap(); initReasons(); initQuiz(); initSquishy(); initLetter(); initLightbox(); initTrail();
  }

  /* ---------- Coriandoli glitterati ---------- */
  const cv = $('#confetti'), ctx = cv.getContext('2d');
  let bits = [], raf = 0;
  const fit = () => { cv.width = innerWidth; cv.height = innerHeight; };
  fit(); addEventListener('resize', fit);
  const burst = () => {
    for (let i = 0; i < 180; i++) bits.push({
      x: innerWidth / 2, y: innerHeight * .7, vx: (Math.random() - .5) * 16, vy: -Math.random() * 18 - 4,
      s: Math.random() * 8 + 4, r: Math.random() * 6, vr: Math.random() * .3 - .15, c: PAL[i % PAL.length],
    });
    if (!raf) loop();
  };
  const loop = () => {
    ctx.clearRect(0, 0, cv.width, cv.height);
    bits.forEach(b => {
      b.vy += .35; b.x += b.vx; b.y += b.vy; b.r += b.vr;
      ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.r); ctx.fillStyle = b.c; ctx.fillRect(-b.s / 2, -b.s / 4, b.s, b.s / 2); ctx.restore();
    });
    bits = bits.filter(b => b.y < innerHeight + 30);
    raf = bits.length ? requestAnimationFrame(loop) : 0;
    if (!raf) ctx.clearRect(0, 0, cv.width, cv.height);
  };

  /* ---------- Giochino iniziale + password (controllo nel browser) ---------- */
  const SITE = window.SITE;
  const lock = $('#lock'), form = $('#lockForm'), err = $('#err');
  const KEY = 'zaira-unlocked';
  const norm = v => String(v).toLowerCase().replace(/[^a-z0-9]/g, '');
  paintDrip($('#lockDrip'), 5);

  $('#lockText').textContent = SITE.lockText || '';
  const total = (SITE.clues || []).length;
  let found = 0;
  const count = () => { $('#found').textContent = total ? `Indizi trovati: ${found} su ${total}` : ''; };
  (SITE.clues || []).forEach((t, i) => {
    const li = document.createElement('li'), b = document.createElement('button');
    b.type = 'button'; b.className = 'clue'; b.textContent = '?';
    b.setAttribute('aria-label', `Gira la carta ${i + 1}`);
    b.addEventListener('click', () => {
      if (b.classList.contains('open')) return;
      b.classList.add('open');
      b.innerHTML = esc(t).replace(/\{(.+?)\}/g, '<mark>$1</mark>');
      found++; count(); fx(found === total ? 'ding' : 'flip');
    });
    li.appendChild(b); $('#clues').appendChild(li);
  });
  count();

  const parseSpotify = v => {
    const m = String(v || '').match(/(?:open\.spotify\.com\/(?:intl-[a-z]+\/)?|spotify:)(track|album|playlist|episode|artist|show)[\/:]([A-Za-z0-9]+)/);
    return m ? { type: m[1], id: m[2] } : null;
  };
  let musicAudio = null;
  const setupMusic = () => {
    const m = SITE.music || {}, btn = $('#music'), panel = $('#musicPanel'), sp = parseSpotify(m.spotify);
    if (m.file) {
      const a = (musicAudio = new Audio(url(m.file))); a.loop = true; a.volume = .6; btn.hidden = false;
      const set = () => { btn.textContent = a.paused ? '♪' : '❚❚'; btn.classList.toggle('on', !a.paused); btn.setAttribute('aria-label', a.paused ? 'Riproduci la musica' : 'Metti in pausa la musica'); };
      btn.onclick = () => (a.paused ? a.play().catch(() => {}) : a.pause());
      a.addEventListener('play', set); a.addEventListener('pause', set); set();
      a.play().catch(() => {});   // parte da sola solo se arriva da un clic (il tasto "Apri")
    } else if (sp) {
      btn.hidden = false; btn.textContent = '♪'; btn.setAttribute('aria-label', 'Mostra o nascondi il lettore musicale');
      panel.innerHTML = `<iframe title="Spotify: ${esc(m.caption || 'la nostra canzone')}" src="https://open.spotify.com/embed/${sp.type}/${sp.id}?utm_source=generator&theme=0" width="100%" height="80" frameborder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
      panel.hidden = false; btn.onclick = () => { panel.hidden = !panel.hidden; };
    }
  };
  const start = () => { build(SITE); lock.hidden = true; document.body.classList.remove('locked'); scrollTo(0, 0); init(); };
  let remembered = false;
  try { remembered = sessionStorage.getItem(KEY) === '1'; } catch (e) {}
  /* ---------- Caricamento dopo la password giusta ---------- */
  const loader = $('#loader');
  const runLoader = done => {
    const msgs = SITE.loaderMessages && SITE.loaderMessages.length ? SITE.loaderMessages : ['Preparo ogni cosa…'];
    const ms = reduce ? 1200 : (SITE.loaderSeconds || 3.6) * 1000;
    const fill = $('#ldFill'), pct = $('#ldPct'), msg = $('#ldMsg');
    loader.hidden = false; let t0 = 0;
    const tick = t => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / ms), e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2, v = Math.round(e * 100);
      fill.style.width = v + '%'; pct.textContent = v + '%';
      const m = msgs[Math.min(msgs.length - 1, Math.floor(p * msgs.length))];
      if (msg.textContent !== m) { msg.textContent = m; fx('sparkle'); }
      if (p < 1) { requestAnimationFrame(tick); return; }
      done(); fx('tada'); loader.classList.add('out'); setTimeout(() => { loader.hidden = true; }, 800);
    };
    requestAnimationFrame(tick);
  };

  if (remembered) { setupMusic(); start(); } else { lock.hidden = false; $('#pw').focus(); }

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (norm($('#pw').value) === norm(SITE.password)) {
      try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
      setupMusic();                                           // parte col clic: così l'audio non viene bloccato
      $$('input, button', form).forEach(el => { el.disabled = true; });
      runLoader(start);
    } else {
      err.textContent = 'Password sbagliata. Riprova.'; fx('error');
      $('#pw').select();
    }
  });
})();
