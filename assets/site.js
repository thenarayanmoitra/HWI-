/* Han Wong International — site behaviour.
   All changeable content lives in assets/content.js (window.HWI).
   This file turns that content into page sections and adds the motion. */
(function () {
  'use strict';

  var root = document.documentElement;
  var C = window.HWI;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches || root.classList.contains('still');
  var FLAG_BASE = 'https://cdn.jsdelivr.net/npm/flag-icons@7.5.0/flags/4x3/';

  /* ------------------------------------------------------------ helpers */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function get(path) {
    return path.split('.').reduce(function (o, k) { return o == null ? undefined : o[k]; }, C);
  }
  function list(v) { return Array.isArray(v) ? v : []; }
  function fmt(n) { return Number(n).toLocaleString('en-GB'); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function safe(name, fn) {
    try { fn(); } catch (e) { if (window.console) console.warn('[HWI] could not show “' + name + '”:', e); }
  }

  var regionNames = null;
  try { regionNames = new Intl.DisplayNames(['en'], { type: 'region' }); } catch (e) { /* older browser */ }
  var SPECIAL = { 'gb-sct': 'Scotland', 'gb-eng': 'England', 'gb-wls': 'Wales', 'gb-nir': 'Northern Ireland', 'xk': 'Kosovo' };
  function code(c) { return String(c || '').toLowerCase().trim(); }
  function countryName(c) {
    c = code(c);
    if (!c) return '';
    if (SPECIAL[c]) return SPECIAL[c];
    try { return (regionNames && regionNames.of(c.toUpperCase())) || c.toUpperCase(); } catch (e) { return c.toUpperCase(); }
  }
  function flag(c, cls, eager) {
    c = code(c);
    if (!/^[a-z]{2}(-[a-z]{3})?$/.test(c)) return '';
    var n = esc(countryName(c));
    return '<img class="' + (cls || 'flag-img') + '" src="' + FLAG_BASE + c + '.svg" alt="' + n + '" title="' + n + '" width="28" height="21"' + (eager ? '' : ' loading="lazy"') + ' decoding="async">';
  }
  function ytId(link) {
    link = String(link || '').trim();
    if (/^[\w-]{11}$/.test(link)) return link;
    var m = link.match(/(?:[?&]v=|youtu\.be\/|embed\/|shorts\/|live\/)([\w-]{11})/);
    return m ? m[1] : '';
  }
  function isImage(path) { return /\.(jpe?g|png|webp|gif|avif)(\?.*)?$/i.test(String(path || '')); }
  function fileType(path) {
    var m = String(path || '').match(/\.([a-z0-9]{2,4})(\?.*)?$/i);
    return m ? m[1].toUpperCase() : '';
  }

  var ARROW = '<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var DOWNLOAD = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>';
  var PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l13-7.5z"/></svg>';
  var CAMERA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>';

  /* ------------------------------------------------------------ content missing */
  if (!C) {
    root.classList.add('no-content');
    if (window.console) console.error('[HWI] assets/content.js did not load or has a mistake. Open check.html to see where.');
  }

  /* ------------------------------------------------------------ links + text */
  function event() { return (C && C.event) || {}; }
  function registerOpen() { return event().registrationOpen !== false; }
  function registerHref() {
    var L = C.links || {};
    return registerOpen() ? (event().registerLink || L.register) : (L.whatsappGroup || L.whatsappChat);
  }

  function bindLinks() {
    var L = C.links || {};
    $$('[data-link]').forEach(function (a) {
      var key = a.getAttribute('data-link');
      var v = L[key];
      if (!v) return;
      if (key === 'email') { a.href = 'mailto:' + v; if (a.hasAttribute('data-show')) a.textContent = v; return; }
      a.href = v;
      if (a.hasAttribute('data-show')) a.textContent = key === 'whatsappChat' ? (L.phone || v) : v;
    });
    $$('[data-text]').forEach(function (el) {
      var v = get(el.getAttribute('data-text'));
      if (v != null && v !== '') el.textContent = v;
    });
    var href = registerHref();
    $$('[data-register]').forEach(function (a) {
      if (href) a.href = href;
      if (!registerOpen()) {
        var l = $('.lbl', a);
        if (l) l.textContent = a.getAttribute('data-closed-label') || 'Get notified';
      }
    });
  }

  /* ------------------------------------------------------------ event + countdown */
  function deadline() {
    var d = String(event().closes || '').trim();
    if (!d) return null;
    var t = new Date(/^\d{4}-\d{2}-\d{2}$/.test(d) ? d + 'T23:59:59' : d);
    return isNaN(t.getTime()) ? null : t;
  }

  function statusText() {
    var t = deadline();
    if (t) {
      var ms = t - Date.now();
      if (ms <= 0) return 'Entries closed';
      var days = Math.ceil(ms / 86400000);
      return days <= 1 ? 'Last day to enter' : 'Entries close in ' + days + ' days';
    }
    return event().status || '';
  }

  function renderEventPill() {
    var pill = $('#event-pill');
    if (!pill || !event().name) return;
    var s = statusText();
    pill.innerHTML = '<b>Next:</b> ' + esc(event().name) + (s ? ' · ' + esc(s.charAt(0).toLowerCase() + s.slice(1)) : '');
  }

  function renderEvent() {
    var box = $('#event');
    if (!box) return;
    var ev = event();

    var nm = $('.event-name', box);
    if (nm && (ev.fullName || ev.name)) nm.textContent = ev.fullName || ev.name;

    var st = $('[data-ev-status]', box);
    if (st) st.textContent = statusText() || 'Coming up';

    var dl = $('#event-details');
    if (dl) {
      dl.innerHTML = list(ev.details).filter(function (d) { return d && d[0]; }).map(function (d) {
        return '<div><dt>' + esc(d[0]) + '</dt><dd>' + esc(d[1]) + '</dd></div>';
      }).join('');
    }

    function download(el, file, label) {
      if (!el) return;
      if (file) {
        el.href = file;
        el.classList.remove('is-soon');
        el.removeAttribute('aria-disabled');
        if (/^https?:/i.test(file)) { el.target = '_blank'; el.rel = 'noopener'; el.removeAttribute('download'); }
        else el.setAttribute('download', '');
        var t = fileType(file);
        el.innerHTML = DOWNLOAD + '<span class="dl-txt"><span>' + label + '</span><small>' + (t && !/^https?:/i.test(file) ? t + ' file' : 'Opens in a new tab') + '</small></span>';
      } else {
        el.removeAttribute('href');
        el.classList.add('is-soon');
        el.setAttribute('aria-disabled', 'true');
        el.innerHTML = DOWNLOAD + '<span class="dl-txt"><span>' + label + '</span><small>Coming soon</small></span>';
      }
    }
    download($('#dl-guidelines'), ev.guidelines, 'Download guidelines');
    download($('#dl-poster'), ev.poster, 'Download poster');

    var poster = $('#event-poster');
    if (poster) {
      if (isImage(ev.poster)) {
        poster.innerHTML = '<a href="' + esc(ev.poster) + '" target="_blank" rel="noopener" aria-label="Open the ' + esc(ev.name) + ' poster"><img src="' + esc(ev.poster) + '" alt="' + esc(ev.name) + ' poster" loading="lazy"></a>';
      } else {
        var words = esc(ev.name || 'Next championship').split(' ');
        var last = words.pop();
        poster.innerHTML =
          '<div class="poster-ph">' +
            '<div class="ph-top"><span class="ph-mark">HW.</span><span class="ph-tag">Online championship</span></div>' +
            '<div class="ph-name">' + words.join(' ') + ' <em>' + last + '</em></div>' +
            '<div class="ph-meta"><span>' + (ev.poster ? 'Poster ready to download' : 'Poster coming soon') + '</span><span>100% to charity</span></div>' +
          '</div>';
      }
    }

    var cd = $('#countdown');
    var t = deadline();
    if (cd && t && t > Date.now()) {
      cd.hidden = false;
      var cells = $$('b', cd);
      var tick = function () {
        var ms = Math.max(0, t - Date.now());
        var s = Math.floor(ms / 1000);
        var v = [Math.floor(s / 86400), Math.floor(s % 86400 / 3600), Math.floor(s % 3600 / 60), s % 60];
        cells.forEach(function (c, i) { c.textContent = i === 0 ? v[0] : pad(v[i]); });
        if (ms <= 0) { clearInterval(timer); renderEventPill(); var s2 = $('[data-ev-status]', box); if (s2) s2.textContent = 'Entries closed'; }
      };
      var timer = setInterval(tick, 1000);
      tick();
    }
  }

  /* ------------------------------------------------------------ stats + flags */
  function renderStats() {
    var grid = $('#stats-grid');
    if (!grid) return;
    grid.innerHTML = list(C.stats).map(function (s, i) {
      var n = Number(s.number) || 0;
      return '<div class="stat" data-reveal style="--d:' + (i * 90) + 'ms"><div class="stat-num"><span class="count" data-to="' + n + '">' + fmt(n) + '</span><em>' + esc(s.after || '') + '</em></div><div class="stat-lbl">' + esc(s.label) + '</div></div>';
    }).join('');
  }

  function renderFlags() {
    var track = $('#flag-track');
    if (!track) return;
    var seen = {};
    var codes = String(C.flags || '').toLowerCase().split(/[\s,]+/).filter(function (c) {
      if (!/^[a-z]{2}(-[a-z]{3})?$/.test(c) || seen[c]) return false;
      return (seen[c] = true);
    });
    var chips = codes.map(function (c) {
      return '<span class="flag-chip">' + flag(c, 'flag-img', true) + '<span>' + esc(countryName(c)) + '</span></span>';
    }).join('');
    track.innerHTML = '<div class="marquee-group">' + chips + '</div><div class="marquee-group" aria-hidden="true">' + chips + '</div>';
    track.style.setProperty('--dur', Math.max(40, codes.length * 2.4) + 's');
    var lbl = $('#flag-count');
    if (lbl) lbl.textContent = codes.length;
  }

  /* ------------------------------------------------------------ join section */
  function renderCalendar() {
    var box = $('#calendar');
    if (!box) return;
    box.innerHTML = list(C.calendar).map(function (c) {
      var tagCls = c.highlight ? 'tag tag-next' : (c.faded ? 'tag tag-done' : 'tag');
      return '<div class="cal-row"><div class="cal-month">' + esc(c.month) + '</div><div class="cal-name">' + esc(c.name) +
        '<small>' + esc(c.note) + '</small></div>' + (c.tag ? '<span class="' + tagCls + '">' + esc(c.tag) + '</span>' : '<span></span>') + '</div>';
    }).join('');
    var cats = $('#categories');
    if (cats) cats.innerHTML = list(C.categories).map(function (c) { return '<span class="chip">' + esc(c) + '</span>'; }).join('');
  }

  /* ------------------------------------------------------------ charity */
  function renderCharity() {
    var box = $('#mosaic');
    if (!box) return;
    var ch = C.charity || {};
    var photos = list(ch.photos).slice(0, 5);
    var fb = (C.links || {}).facebookPhotos || (C.links || {}).facebook || '#';
    box.innerHTML = photos.map(function (p, i) {
      var more = i === photos.length - 1 && photos.length > 1
        ? '<a class="more-tile" href="' + esc(fb) + '" target="_blank" rel="noopener">' + CAMERA + '<b>' + esc(ch.morePhotos ? ch.morePhotos + ' more' : 'More photos') + '</b><span>on Facebook</span></a>' : '';
      return '<figure data-reveal-img style="--d:' + (i * 110) + 'ms"><img src="' + esc(p.src) + '" alt="' + esc(p.alt || p.caption || 'Charity work') + '" loading="lazy">' +
        (p.caption && !more ? '<figcaption>' + esc(p.caption) + '</figcaption>' : '') + more + '</figure>';
    }).join('');
    var btn = $('#more-photos');
    if (btn) {
      btn.href = fb;
      var l = $('.lbl', btn);
      if (l) l.textContent = ch.morePhotos ? 'View ' + ch.morePhotos + ' more photos on Facebook' : 'View more photos on Facebook';
    }
  }

  /* ------------------------------------------------------------ results / leaderboard */
  var ORD = ['1st', '2nd', '3rd'];
  function renderResults(box) {
    var r = C.results || {};
    var teams = list(r.teams).filter(function (t) { return t && t.dojang; });
    if (!teams.length) { box.closest('section') && box.closest('section').classList.add('is-empty'); return; }
    var max = Math.max.apply(null, teams.map(function (t) { return Number(t.medals) || 0; })) || 1;

    var podium = teams.slice(0, 3).map(function (t, i) {
      return '<article class="pod pod-' + (i + 1) + '" data-reveal style="--d:' + [120, 0, 240][i] + 'ms">' +
        '<div class="pod-card">' +
          '<div class="pod-head"><span class="medal medal-' + (i + 1) + '" aria-label="' + ORD[i] + ' place">' + (i + 1) + '</span>' +
          '<span class="pod-country">' + flag(t.country) + esc(countryName(t.country)) + '</span></div>' +
          '<h3 class="pod-name">' + esc(t.dojang) + '</h3>' +
          '<div class="pod-coach">' + esc(t.coach || '') + '</div>' +
          '<div class="pod-stats"><div><b class="count" data-to="' + (Number(t.medals) || 0) + '">' + (Number(t.medals) || 0) + '</b><span>' + (Number(t.medals) === 1 ? 'medal' : 'medals') + '</span></div>' +
          '<div><b>' + esc(t.athletes) + '</b><span>' + (Number(t.athletes) === 1 ? 'athlete' : 'athletes') + '</span></div></div>' +
        '</div>' +
        '<div class="pod-step" aria-hidden="true">' + ORD[i] + '</div>' +
      '</article>';
    }).join('');

    var rows = teams.slice(3).map(function (t, i) {
      var pos = i + 4;
      var w = Math.max(4, Math.round((Number(t.medals) || 0) / max * 100));
      return '<li class="lb-row" data-reveal style="--d:' + Math.min(i * 60, 420) + 'ms">' +
        '<span class="lb-pos">' + pad(pos) + '</span>' +
        '<span class="lb-team">' + flag(t.country) + '<span><b>' + esc(t.dojang) + '</b><small>' + esc(t.coach || '') + (t.coach ? ' · ' : '') + esc(countryName(t.country)) + '</small></span></span>' +
        '<span class="lb-ath"><b>' + esc(t.athletes) + '</b><small>' + (Number(t.athletes) === 1 ? 'athlete' : 'athletes') + '</small></span>' +
        '<span class="lb-medals"><span class="lb-bar"><i style="--w:' + w + '%"></i></span><b>' + esc(t.medals) + '</b></span>' +
      '</li>';
    }).join('');

    box.innerHTML = '<div class="podium">' + podium + '</div>' +
      (rows ? '<div class="lb-head" aria-hidden="true"><span>Pos</span><span>Dojang</span><span class="lb-ath">Athletes</span><span>Medals</span></div><ol class="lb-list" start="4">' + rows + '</ol>' : '');
  }

  function renderTeams() {
    var box = $('#teams');
    if (!box) return;
    box.innerHTML = list(C.winningTeams).map(function (t, i) {
      return '<figure class="team-card" data-reveal style="--d:' + (i % 3 * 100) + 'ms"><img src="' + esc(t.photo) + '" alt="' + esc(t.name) + ' team with their medals" loading="lazy">' +
        '<figcaption>' + esc(t.name) + '<span>' + flag(t.country, 'flag-img sm') + esc(countryName(t.country)) + '</span></figcaption></figure>';
    }).join('');
  }

  /* ------------------------------------------------------------ people */
  function masterCard(a, i) {
    return '<article class="master" data-reveal style="--d:' + (i % 4 * 90) + 'ms">' +
      '<div class="master-img"><img src="' + esc(a.photo) + '" alt="' + esc(a.name) + '" loading="lazy"><span class="flag">' + flag(a.country) + '</span></div>' +
      '<div class="master-body"><div class="master-name">' + esc(a.name) + '</div>' +
      '<div class="master-role">' + esc(countryName(a.country)) + (a.role ? ' · ' + esc(a.role) : '') + '</div>' +
      '<p class="master-quote">' + esc(a.line || '') + '</p></div></article>';
  }
  function renderPeople() {
    var amb = list(C.ambassadors);
    var featured = $('#masters-grid');
    if (featured) featured.innerHTML = amb.filter(function (a) { return a.featured; }).slice(0, 4).map(masterCard).join('');
    var all = $('#ambassadors-grid');
    if (all) all.innerHTML = amb.map(masterCard).join('');

    function hofCard(tag) {
      return function (h, i) {
        return '<article class="hof-card" data-reveal style="--d:' + (i % 3 * 90) + 'ms"><div class="hof-img"><img src="' + esc(h.photo) + '" alt="' + esc(h.name) + '" loading="lazy"><span class="flag">' + flag(h.country) + '</span></div>' +
          '<div class="hof-body"><div class="hof-tag">' + tag + '</div><h3 class="hof-name">' + esc(h.name) + '</h3>' +
          '<div class="hof-meta">' + esc(countryName(h.country)) + (h.meta ? ' · ' + esc(h.meta) : '') + '</div><p>' + esc(h.bio || '') + '</p></div></article>';
      };
    }
    var hof = $('#hof-grid');
    if (hof) hof.innerHTML = list(C.hallOfFame).map(hofCard('Hall of Fame')).join('');
    var ach = $('#achievers-grid');
    if (ach) ach.innerHTML = list(C.achievers).map(hofCard('Achievers Award')).join('');
    $$('[data-count-of]').forEach(function (el) { el.textContent = list(C[el.getAttribute('data-count-of')]).length; });
  }

  /* ------------------------------------------------------------ testimonials */
  function renderTestimonials() {
    var box = $('#tslider');
    if (!box) return;
    var items = list(C.testimonials).filter(function (t) { return t && t.quote; });
    if (!items.length) { box.closest('section').classList.add('is-empty'); return; }

    $('.t-slides', box).innerHTML = items.map(function (t, i) {
      return '<figure class="t-slide' + (i === 0 ? ' is-active' : '') + '" role="group" aria-roledescription="slide" aria-label="' + (i + 1) + ' of ' + items.length + '"' + (i ? ' aria-hidden="true"' : '') + '>' +
        (t.photo ? '<div class="t-photo"><img src="' + esc(t.photo) + '" alt="' + esc(t.name) + '" loading="lazy"></div>' : '<div class="t-photo t-initials">' + esc(String(t.name || '?').replace(/^(GM|Master|Grand Master)\s+/i, '').split(' ').map(function (w) { return w[0]; }).join('').slice(0, 2)) + '</div>') +
        '<div class="t-body"><blockquote class="t-quote">' + esc(t.quote) + '</blockquote>' +
        '<figcaption class="t-cite"><b>' + esc(t.name) + '</b><span>' + flag(t.country, 'flag-img sm') + esc([t.role, countryName(t.country)].filter(Boolean).join(', ')) + '</span></figcaption></div></figure>';
    }).join('');

    var slides = $$('.t-slide', box);
    var dots = $('.t-dots', box);
    var count = $('.t-count', box);
    dots.innerHTML = slides.map(function (_, i) {
      return '<button class="t-dot' + (i === 0 ? ' is-active' : '') + '" type="button" aria-label="Show testimonial ' + (i + 1) + '"><i></i></button>';
    }).join('');
    var dotEls = $$('.t-dot', dots);
    var cur = 0;
    var auto = !reduceMotion && slides.length > 1;
    if (!auto) box.classList.add('static');
    if (slides.length < 2) $('.t-controls', box).hidden = true;

    function show(n) {
      cur = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) {
        var on = i === cur;
        s.classList.toggle('is-active', on);
        if (on) s.removeAttribute('aria-hidden'); else s.setAttribute('aria-hidden', 'true');
      });
      dotEls.forEach(function (d, i) { d.classList.toggle('is-active', i === cur); });
      if (count) count.textContent = (cur + 1) + ' / ' + slides.length;
    }
    show(0);
    $('[data-t="prev"]', box).addEventListener('click', function () { show(cur - 1); });
    $('[data-t="next"]', box).addEventListener('click', function () { show(cur + 1); });
    dotEls.forEach(function (d, i) {
      d.addEventListener('click', function () { show(i); });
      d.addEventListener('animationend', function () { if (auto && i === cur) show(cur + 1); });
    });
    function pause() { box.classList.add('paused'); }
    function play() { box.classList.remove('paused'); }
    box.addEventListener('mouseenter', pause);
    box.addEventListener('mouseleave', play);
    box.addEventListener('focusin', pause);
    box.addEventListener('focusout', play);
    // Only run while visible
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { box.classList.toggle('offscreen', !e[0].isIntersecting); }, { threshold: 0.25 }).observe(box);
    }
    // Swipe on phones
    var x0 = null;
    box.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; pause(); }, { passive: true });
    box.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1));
      x0 = null; play();
    });
  }

  /* ------------------------------------------------------------ videos */
  function renderVideos() {
    var box = $('#videos');
    if (!box) return;
    var vids = list(C.videos).map(function (v) { return { id: ytId(v.link), title: v.title || 'Championship video', date: v.date || '' }; });
    if (!vids.length) { box.closest('section').classList.add('is-empty'); return; }
    var main = $('#vmain-frame', box);
    var title = $('#vmain-title', box);
    var date = $('#vmain-date', box);
    var listEl = $('#vlist', box);
    var first = 0;
    for (var k = 0; k < vids.length; k++) { if (vids[k].id) { first = k; break; } }

    var n = vids.filter(function (v) { return v.id; }).length;
    var cnt = $('#vcount', box);
    if (cnt) cnt.textContent = n + (n === 1 ? ' video' : ' videos');

    listEl.innerHTML = vids.map(function (v, i) {
      var inner = '<span class="vthumb' + (v.id ? '' : ' soon') + '">' +
        (v.id ? '<img src="https://i.ytimg.com/vi/' + v.id + '/mqdefault.jpg" alt="" loading="lazy"><span class="vplay">' + PLAY + '</span>' : '<span>Coming soon</span>') +
        '</span><span class="vtext"><b>' + esc(v.title) + '</b><span>' + esc(v.date) + '</span></span>';
      return '<li>' + (v.id
        ? '<button type="button" class="vitem" data-i="' + i + '"' + (i === first ? ' aria-current="true"' : '') + '>' + inner + '</button>'
        : '<div class="vitem is-soon">' + inner + '</div>') + '</li>';
    }).join('');

    function load(i, play) {
      var v = vids[i];
      if (!v || !v.id) return;
      title.textContent = v.title;
      date.textContent = v.date;
      $$('.vitem[data-i]', listEl).forEach(function (b) {
        if (+b.getAttribute('data-i') === i) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current');
      });
      if (play) {
        var f = document.createElement('iframe');
        f.src = 'https://www.youtube-nocookie.com/embed/' + v.id + '?autoplay=1&rel=0';
        f.title = v.title;
        f.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen';
        f.allowFullscreen = true;
        main.replaceChildren(f);
      } else {
        main.innerHTML = '<button class="yt" type="button" aria-label="Play: ' + esc(v.title) + '"><img src="https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg" alt="" loading="lazy"><span class="play">' + PLAY + '</span></button>';
        $('.yt', main).addEventListener('click', function () { load(i, true); });
      }
    }
    load(first, false);
    listEl.addEventListener('click', function (e) {
      var b = e.target.closest('.vitem[data-i]');
      if (!b) return;
      load(+b.getAttribute('data-i'), true);
      var r = main.getBoundingClientRect();
      if (r.top < 70 || r.bottom > window.innerHeight) main.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    });
  }

  /* ------------------------------------------------------------ render everything */
  if (C) {
    safe('links', bindLinks);
    safe('event', renderEventPill);
    safe('event section', renderEvent);
    safe('numbers', renderStats);
    safe('flags', renderFlags);
    safe('calendar', renderCalendar);
    safe('charity photos', renderCharity);
    safe('results', function () { $$('[data-results]').forEach(renderResults); });
    safe('team photos', renderTeams);
    safe('people', renderPeople);
    safe('testimonials', renderTestimonials);
    safe('videos', renderVideos);
  }

  /* ------------------------------------------------------------ land on #section links correctly
     (sections above fill in after the browser's first jump, so jump again) */
  function toHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    var t = id && document.getElementById(id);
    if (t) t.scrollIntoView({ behavior: 'instant', block: 'start' });
  }
  if (location.hash) {
    var moved = false;
    ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach(function (ev) {
      window.addEventListener(ev, function () { moved = true; }, { once: true, passive: true });
    });
    toHash();
    window.addEventListener('load', function () { if (!moved) toHash(); });
  }

  /* ------------------------------------------------------------ motion: reveal + count-up */
  function countUp(el) {
    if (el.__done) return;
    el.__done = true;
    var to = Number(el.getAttribute('data-to')) || 0;
    if (reduceMotion || to === 0) { el.textContent = fmt(to); return; }
    var dur = 1600, t0 = null;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / dur);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(to * e));
      if (p < 1) requestAnimationFrame(step);
    }
    el.textContent = '0';
    requestAnimationFrame(step);
  }

  var targets = $$('[data-reveal], [data-reveal-img]');
  var counts = $$('.count[data-to]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    targets.forEach(function (el) { io.observe(el); });

    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        countUp(en.target);
        cio.unobserve(en.target);
      });
    }, { threshold: 0.6 });
    counts.forEach(function (el) { cio.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add('in'); });
  }

  /* ------------------------------------------------------------ header, progress, menu */
  var header = $('.site-header');
  var bar = $('.progress i');
  var ticking = false;
  function onScroll() {
    ticking = false;
    var y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 8);
    if (bar) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, y / h) : 0) + ')';
    }
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  var btn = $('.menu-btn');
  var menu = $('#mobile-nav');
  function setMenu(open) {
    if (!btn || !menu) return;
    btn.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('open', open);
    $('.menu-label', btn).textContent = open ? 'Close' : 'Menu';
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (btn && menu) {
    btn.addEventListener('click', function () { setMenu(btn.getAttribute('aria-expanded') !== 'true'); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 1240) setMenu(false); });
  }

  /* ------------------------------------------------------------ email signup (Formspree) */
  $$('form[data-signup]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var box = form.closest('.signup');
      var submit = form.querySelector('button[type="submit"]');
      var label = submit.querySelector('.lbl');
      submit.disabled = true;
      label.textContent = 'Sending…';
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(); box.classList.add('done'); })
        .catch(function () {
          submit.disabled = false;
          label.textContent = 'Try again';
          alert('Sorry, that did not go through. Please try again, or email ' + ((C && C.links && C.links.email) || 'director@hanwonginternational.org'));
        });
    });
  });

  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  window.__hwiReady = true;
})();
