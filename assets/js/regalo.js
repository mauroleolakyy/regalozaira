(() => {
  const $ = s => document.querySelector(s);
  const S = window.SITE || {}, g = S.gift || {};
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const PAL = ['#ff8fc7', '#ff4d9d', '#ffd1e8', '#ff5a6e', '#fff4e0', '#ffe36e'];
  const esc = v => String(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const url = s => { s = String(s).trim().replace(/\\/g, '/'); try { s = decodeURI(s); } catch (e) {} return encodeURI(s); };

  // Stesso colore dell'ultimo capitolo, così il passaggio dalla festa è morbido
  const end = (S.chapters && S.chapters.length ? S.chapters[S.chapters.length - 1].color : '#cf2269');
  document.body.style.backgroundColor = end;
  document.documentElement.style.setProperty('--end', end);
  document.title = `${g.title || 'Il regalo'} · ${S.name || ''}`;
  $('#teaser').textContent = g.teaser || 'Tocca il pacco per aprirlo.';

  // Contenuto del regalo (da data.js > gift)
  const link = g.link && g.link.url ? `<a class="btn" href="${esc(g.link.url)}" target="_blank" rel="noopener">${esc(g.link.label || 'Apri')}</a>` : '';
  const photo = g.image ? `<div class="polaroid" style="--r:-3deg"><div class="ph"><img src="${esc(url(g.image))}" alt="${esc(g.caption || '')}"></div><p class="cap">${esc(g.caption || '')}</p></div>` : '';
  $('#card').innerHTML = `${photo}<h1>${esc(g.title || 'Il tuo regalo')}</h1><p>${esc(g.text || '')}</p>${link}<p class="sign">${esc(S.finalSign || '')}</p>`;
  const img = $('#card img');
  if (img) img.addEventListener('error', () => { const ph = img.parentNode; ph.classList.add('empty'); ph.innerHTML = '<span>foto non trovata</span>'; });

  // Coriandoli
  const cv = $('#confetti'), ctx = cv.getContext('2d');
  let bits = [], raf = 0;
  const fit = () => { cv.width = innerWidth; cv.height = innerHeight; };
  fit(); addEventListener('resize', fit);
  const burst = () => {
    const b = $('#box').getBoundingClientRect(), cx = b.left + b.width / 2, cy = b.top + b.height * .4;
    for (let i = 0; i < 220; i++) bits.push({
      x: cx, y: cy, vx: (Math.random() - .5) * 18, vy: -Math.random() * 20 - 4,
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

  // Musica (stessa canzone della festa, oppure una diversa con gift.music in data.js)
  const m = g.music || S.music || {}, mb = $('#music'), mp = $('#musicPanel');
  const sp = (String(m.spotify || '').match(/(?:open\.spotify\.com\/(?:intl-[a-z]+\/)?|spotify:)(track|album|playlist|episode|artist|show)[\/:]([A-Za-z0-9]+)/) || []).slice(1);
  let audio = null, userPaused = false;
  if (m.file) {
    audio = new Audio(url(m.file)); audio.loop = true; audio.volume = .6; mb.hidden = false;
    let t = 0; try { t = parseFloat(sessionStorage.getItem('zaira-music-t')) || 0; } catch (e) {}
    if (t) audio.addEventListener('loadedmetadata', () => { try { audio.currentTime = audio.duration ? t % audio.duration : t; } catch (e) {} }, { once: true });
    const set = () => { mb.textContent = audio.paused ? '♪' : '❚❚'; mb.classList.toggle('on', !audio.paused); mb.setAttribute('aria-label', audio.paused ? 'Riproduci la musica' : 'Metti in pausa la musica'); };
    mb.onclick = () => { if (audio.paused) { userPaused = false; audio.play().catch(() => {}); } else { userPaused = true; audio.pause(); } };
    audio.addEventListener('play', set); audio.addEventListener('pause', set); set();
    audio.play().catch(() => {});          // se il browser blocca l'avvio automatico, parte al tocco sul pacco
  } else if (sp.length === 2) {
    mb.hidden = false; mb.setAttribute('aria-label', 'Mostra o nascondi il lettore musicale');
    mp.innerHTML = `<iframe title="Spotify" src="https://open.spotify.com/embed/${sp[0]}/${sp[1]}?utm_source=generator&theme=0" width="100%" height="80" frameborder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
    mp.hidden = false; mb.onclick = () => { mp.hidden = !mp.hidden; };
  }

  // Apertura del pacco
  const box = $('#box'), card = $('#card'), teaser = $('#teaser');
  box.addEventListener('click', () => {
    if (box.classList.contains('open')) return;
    box.classList.add('open'); box.setAttribute('aria-label', 'Regalo aperto');
    if (window.SFX) { SFX.whoosh(); setTimeout(() => SFX.tada(), 180); }
    if (audio && audio.paused && !userPaused) audio.play().catch(() => {});
    if (!reduce) burst();
    setTimeout(() => {
      card.hidden = false; teaser.hidden = true;
      card.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    }, reduce ? 0 : 700);
  });
})();
