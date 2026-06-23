// HWI site interactivity

document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.navlinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }

  // Countdown
  const cd = document.querySelector('[data-countdown]');
  if (cd) {
    const target = new Date(cd.dataset.countdown).getTime();
    const dEl = cd.querySelector('[data-d]');
    const hEl = cd.querySelector('[data-h]');
    const mEl = cd.querySelector('[data-m]');
    const sEl = cd.querySelector('[data-s]');
    const pad = (n) => String(Math.max(0, Math.floor(n))).padStart(2, '0');
    function tick() {
      let diff = Math.max(0, target - Date.now());
      const days = Math.floor(diff / 86400000); diff -= days * 86400000;
      const hours = Math.floor(diff / 3600000); diff -= hours * 3600000;
      const mins = Math.floor(diff / 60000); diff -= mins * 60000;
      const secs = Math.floor(diff / 1000);
      if (dEl) dEl.textContent = pad(days);
      if (hEl) hEl.textContent = pad(hours);
      if (mEl) mEl.textContent = pad(mins);
      if (sEl) sEl.textContent = pad(secs);
    }
    tick();
    setInterval(tick, 1000);
  }

  // Rank tabs (visual only)
  document.querySelectorAll('.rank-tabs').forEach((group) => {
    group.querySelectorAll('.rank-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        group.querySelectorAll('.rank-tab').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });
  });

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach((item) => {
    const q = item.querySelector('.faq-q');
    if (q) {
      q.addEventListener('click', () => {
        item.classList.toggle('open');
      });
    }
  });
});
