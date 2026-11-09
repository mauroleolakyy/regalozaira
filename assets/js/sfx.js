/* Suoni sintetizzati (nessun file audio da caricare). Uso: SFX.pop(), SFX.squish(), ... */
(() => {
  let ac = null, master = null, muted = false;
  try { muted = localStorage.getItem('zaira-mute') === '1'; } catch (e) {}
  const last = {};

  const ctx = () => {
    if (!ac) {
      const A = window.AudioContext || window.webkitAudioContext; if (!A) return null;
      ac = new A(); master = ac.createGain(); master.gain.value = .5; master.connect(ac.destination);
    }
    if (ac.state === 'suspended') ac.resume();
    return ac;
  };
  const env = (g, t, a, d, peak) => {
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(.0001, t + a + d);
  };
  const tone = (f0, f1, dur, type = 'sine', peak = .3, delay = 0) => {
    const c = ctx(); if (!c) return;
    const t = c.currentTime + delay, o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(f0, t);
    if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    env(g, t, .01, dur, peak); o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + .05);
  };
  const noise = (dur, type, f0, f1, peak = .3, delay = 0, q = 1) => {
    const c = ctx(); if (!c) return;
    const t = c.currentTime + delay, n = Math.floor(c.sampleRate * dur), buf = c.createBuffer(1, n, c.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    s.buffer = buf; f.type = type; f.Q.value = q; f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    env(g, t, .01, dur, peak); s.connect(f); f.connect(g); g.connect(master); s.start(t);
  };

  // Ogni suono ha un tempo minimo tra due ripetizioni, così non diventa fastidioso
  const defs = {
    pop:     [60,  () => tone(520, 900, .12, 'sine', .35)],
    squish:  [90,  () => { tone(430, 150, .17, 'sine', .35); noise(.12, 'lowpass', 900, 200, .12); }],
    flip:    [60,  () => { noise(.08, 'bandpass', 2000, 3600, .16); tone(660, 990, .1, 'triangle', .14, .04); }],
    ding:    [120, () => { tone(880, 880, .55, 'sine', .22); tone(1320, 1320, .5, 'sine', .14, .02); }],
    blow:    [50,  () => noise(.28, 'bandpass', 1800, 500, .22, 0, .8)],
    scratch: [70,  () => noise(.07, 'bandpass', 3400, 2400, .07, 0, 1.5)],
    whoosh:  [150, () => noise(.32, 'bandpass', 400, 2600, .16, 0, .7)],
    sparkle: [80,  () => { const f = 1500 + Math.random() * 1500; tone(f, f * 1.2, .16, 'sine', .1); tone(f * 1.5, f * 1.5, .12, 'sine', .06, .05); }],
    error:   [200, () => { tone(230, 140, .26, 'sawtooth', .1); }],
    win:     [200, () => { [784, 988, 1175].forEach((f, i) => tone(f, f, .3, 'triangle', .18, i * .07)); }],
    tada:    [400, () => { [523, 659, 784, 1047].forEach((f, i) => tone(f, f, .38, 'triangle', .2, i * .09)); tone(1047, 1047, .7, 'sine', .15, .36); noise(.5, 'highpass', 4000, 6000, .05, .3); }],
  };
  const SFX = { isMuted: () => muted, unlock: ctx };
  Object.keys(defs).forEach(name => {
    SFX[name] = () => {
      if (muted) return;
      const now = performance.now(); if (now - (last[name] || 0) < defs[name][0]) return;
      last[name] = now; try { defs[name][1](); } catch (e) {}
    };
  });
  window.SFX = SFX;

  // Il browser permette l'audio solo dopo un tocco: lo "sblocchiamo" al primo
['pointerdown', 'touchstart', 'click'].forEach(ev => addEventListener(ev, () => ctx(), { once: true, passive: true }));

  // Pulsante per silenziare i suoni
  const wire = () => {
    const b = document.getElementById('sfx'); if (!b) return;
    const set = () => {
      b.textContent = muted ? '🔇' : '🔊'; b.setAttribute('aria-pressed', String(!muted));
      b.setAttribute('aria-label', muted ? 'Attiva i suoni' : 'Disattiva i suoni');
    };
    b.addEventListener('click', () => {
      muted = !muted; try { localStorage.setItem('zaira-mute', muted ? '1' : '0'); } catch (e) {}
      set(); if (!muted) SFX.pop();
    });
    set();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wire); else wire();
})();
