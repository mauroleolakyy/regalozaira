(() => {
  const screen = document.querySelector('#countdown');
  const settings = window.SITE && window.SITE.countdown;
  if (!screen || !settings || !settings.enabled) {
    if (screen) screen.hidden = true;
    return;
  }

  const pageContent = Array.from(document.body.children).filter(element => element !== screen);
  let isActive = false;
  const setActive = active => {
    screen.hidden = !active;
    document.body.classList.toggle('countdown-active', active);
    if (isActive === active) return;
    isActive = active;
    pageContent.forEach(element => { element.inert = active; });
  };
  const target = new Date(settings.unlockAt);
  const error = document.querySelector('#countdownError');
  const revealMessages = Array.isArray(settings.dailyReveals) ? settings.dailyReveals : [];
  if (Number.isNaN(target.getTime())) {
    document.querySelector('#countdownTitle').textContent = 'Countdown non disponibile';
    document.querySelector('#countdownDate').hidden = true;
    document.querySelector('.countdown-clock').hidden = true;
    document.querySelector('#countdownReveals').hidden = true;
    error.hidden = false;
    error.textContent = 'Controlla la data di sblocco in data.js.';
    setActive(true);
    return;
  }

  document.querySelector('#countdownDate').textContent =
    `Il sito si sblocca il ${target.toLocaleString('it-IT', {
      timeZone: 'Europe/Rome',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })}`;

  const values = {
    days: document.querySelector('[data-countdown="days"]'),
    hours: document.querySelector('[data-countdown="hours"]'),
    minutes: document.querySelector('[data-countdown="minutes"]'),
    seconds: document.querySelector('[data-countdown="seconds"]'),
  };
  const revealBox = document.querySelector('#countdownReveals');
  const revealTimer = document.querySelector('#countdownRevealTimer');
  const envelope = document.querySelector('#countdownEnvelope');
  const envelopeLabel = document.querySelector('#countdownEnvelopeLabel');
  const revealText = document.querySelector('#countdownRevealText');
  const revealTimerLabel = document.querySelector('#countdownRevealTimerLabel');
  revealBox.hidden = revealMessages.length === 0;
  const revealKey = `zaira-countdown-opened-${target.toISOString()}`;
  let openedCount = 0;
  try { openedCount = Number(localStorage.getItem(revealKey)) || 0; } catch (e) {}
  const romeParts = date => Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Rome',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date).filter(part => part.type !== 'literal').map(part => [part.type, Number(part.value)]));
  const romeDate = date => {
    const parts = romeParts(date);
    return Date.UTC(parts.year, parts.month - 1, parts.day);
  };
  const romeMidnight = date => {
    const parts = romeParts(date);
    const nextDay = new Date(Date.UTC(parts.year, parts.month - 1, parts.day + 1));
    const utcGuess = nextDay.getTime();
    const atGuess = romeParts(new Date(utcGuess));
    const representedAsUtc = Date.UTC(atGuess.year, atGuess.month - 1, atGuess.day, atGuess.hour, atGuess.minute, atGuess.second);
    return utcGuess + utcGuess - representedAsUtc;
  };
  const updateReveals = now => {
    if (!revealMessages.length) return;
    const nowRomeDate = romeDate(now);
    const targetRomeDate = romeDate(target);
    const daysRemaining = Math.ceil((targetRomeDate - nowRomeDate) / 86400000);
    const availableCount = Math.max(0, Math.min(revealMessages.length, revealMessages.length - daysRemaining));
    const seconds = Math.max(0, Math.floor((romeMidnight(now) - now.getTime()) / 1000));
    revealTimer.textContent = `${pad(Math.floor(seconds / 3600))}:${pad(Math.floor((seconds % 3600) / 60))}:${pad(seconds % 60)}`;
    const ready = availableCount > openedCount;
    envelope.disabled = !ready;
    envelopeLabel.textContent = ready
      ? `Apri la busta di oggi · ${availableCount} di ${revealMessages.length}`
      : availableCount
        ? `Busta di oggi aperta · ${availableCount} di ${revealMessages.length}`
        : 'La prima busta si apre a mezzanotte';
    if (!ready && openedCount >= availableCount && availableCount > 0) {
      revealText.hidden = false;
      revealText.textContent = revealMessages[availableCount - 1];
      envelope.setAttribute('aria-expanded', 'true');
    } else {
      revealText.hidden = true;
      envelope.setAttribute('aria-expanded', 'false');
    }
  };
  envelope.addEventListener('click', () => {
    const now = new Date();
    const today = romeDate(now);
    const targetDay = romeDate(target);
    const daysRemaining = Math.ceil((targetDay - today) / 86400000);
    const availableCount = Math.max(0, Math.min(revealMessages.length, revealMessages.length - daysRemaining));
    if (availableCount <= openedCount) return;
    openedCount = availableCount;
    try { localStorage.setItem(revealKey, String(openedCount)); } catch (e) {}
    revealText.textContent = revealMessages[availableCount - 1];
    revealText.hidden = false;
    envelope.disabled = true;
    envelope.setAttribute('aria-expanded', 'true');
    envelopeLabel.textContent = `Busta di oggi aperta · ${availableCount} di ${revealMessages.length}`;
  });
  const pad = value => String(value).padStart(2, '0');
  let timer;

  const update = () => {
    const remaining = target.getTime() - Date.now();
    if (remaining <= 0) {
      setActive(false);
      window.clearInterval(timer);
      return;
    }

    const totalSeconds = Math.floor(remaining / 1000);
    values.days.textContent = String(Math.floor(totalSeconds / 86400));
    values.hours.textContent = pad(Math.floor((totalSeconds % 86400) / 3600));
    values.minutes.textContent = pad(Math.floor((totalSeconds % 3600) / 60));
    values.seconds.textContent = pad(totalSeconds % 60);
    updateReveals(new Date());
    setActive(true);
  };

  update();
  if (!screen.hidden) timer = window.setInterval(update, 1000);
})();
