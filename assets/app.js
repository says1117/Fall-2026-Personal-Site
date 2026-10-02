/* ===========================================================================
   app.js — renders PROFILE and TABS from data.js.
   You shouldn't need to touch this file to add content.
   =========================================================================== */

(function () {
  'use strict';

  const $ = (sel) => document.querySelector(sel);

  /* ---------------------------------------------------------------- utils */

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  };

  const slug = (s) =>
    String(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const ARROW_ICON =
    '<svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">' +
    '<path d="M1 9L9 1M9 1H2.5M9 1V7.5" stroke="currentColor" stroke-width="1.3" ' +
    'stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* ----------------------------------------------------------------- hero */

  function renderHero() {
    $('#heroKicker').textContent = PROFILE.kicker || '';

    const name = $('#heroName');
    name.append(document.createTextNode(PROFILE.firstName || ''));
    if (PROFILE.lastName) name.append(el('em', null, PROFILE.lastName));

    $('#heroTagline').textContent = PROFILE.tagline || '';

    const links = $('#heroLinks');
    (PROFILE.links || []).forEach((link) => {
      const a = el('a', 'hero__link');
      a.href = link.url;
      if (!/^(mailto|tel):/.test(link.url)) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      a.append(el('span', 'mono', link.label));
      a.append(document.createTextNode(link.text || link.url));
      links.append(a);
    });

    if (PROFILE.resume && PROFILE.resume.url) {
      const a = el('a', 'hero__link hero__resume', PROFILE.resume.label || 'Résumé');
      a.href = PROFILE.resume.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      links.append(a);
    }
  }

  /* ---------------------------------------------------------------- entry */

  function renderEntry(entry, index) {
    const wrap = el('article', 'entry');
    wrap.style.setProperty('--i', index + 1);

    wrap.append(el('div', 'entry__index', String(index + 1).padStart(2, '0')));

    const body = el('div', 'entry__body');

    const head = el('div', 'entry__head');
    head.append(el('h3', 'entry__title', entry.title || ''));
    if (entry.meta) head.append(el('span', 'entry__meta', entry.meta));
    body.append(head);

    if (entry.subtitle) body.append(el('p', 'entry__subtitle', entry.subtitle));

    if (entry.tags && entry.tags.length) {
      const ul = el('ul', 'entry__tags');
      entry.tags.forEach((t) => ul.append(el('li', 'tag', t)));
      body.append(ul);
    }

    if (entry.points && entry.points.length) {
      const ul = el('ul', 'entry__points');
      entry.points.forEach((p) => ul.append(el('li', null, p)));
      body.append(ul);
    }

    if (entry.links && entry.links.length) {
      const row = el('div', 'entry__links');
      entry.links.forEach((link) => {
        const a = el('a', 'entry__link');
        a.href = link.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.append(document.createTextNode(link.label || 'Link'));
        a.insertAdjacentHTML('beforeend', ARROW_ICON);
        row.append(a);
      });
      body.append(row);
    }

    wrap.append(body);
    return wrap;
  }

  function renderAboutText(block){
    return el('p', 'about__text', block.text);
  }

  function renderAboutPhotos(block){

    const strip = el('div', 'about__photos');
    if(block.variant) {
      strip.classList.add('about__photos--' + block.variant);
    }
    (block.photos || []).forEach((photo) => {
      const figure = el('figure', 'about__photo');
      const img = el('img');
      img.src = photo.src;
      img.alt = photo.alt || '';
      img.loading = 'lazy';
      figure.append(img);
      if(photo.caption)
        figure.append(el('figcaption', null, photo.caption));
      strip.append(figure);
    });
    //initializes array of photos
    initPhotoFocus(strip);
    return strip;
  }

  function renderAboutSpotify(){
    const box = el('div', 'about__spotify');
    box.textContent = 'Loading recent tracks...';

    fetch('assets/spotify.json')
      .then((res) => res.json())
      .then((tracks) => {
        box.textContent = '';
        if (!tracks || !tracks.length) {
          box.textContent = 'No recent tracks.';
          return;
        }
        tracks.forEach((track) => {
          const a = el('a', 'about__track');
          a.href = track.url;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';

          if (track.album_art) {
            const img = el('img', 'about__track-art');
            img.src = track.album_art;
            img.alt = '';
            img.loading = 'lazy';
            a.append(img);
          }

          const info = el('div', 'about__track-info');
          info.append(el('span', 'about__track-name', track.name));
          info.append(el('span', 'about__track-artist', track.artist));
          a.append(info);

          box.append(a);
        });
      })
      .catch(() => {
        box.textContent = 'Couldn\'t load recent tracks.';
      });

    return box;
  }

  function renderAbout(about){
    const wrap = el('div', 'about');
    (about.content || []).forEach((block) => {
      if(block.type === 'text'){
        wrap.append(renderAboutText(block));
      }
      else if(block.type === 'photos'){
        wrap.append(renderAboutPhotos(block));
      }
      else if(block.type === 'spotify'){
        wrap.append(renderAboutSpotify());
      }
    });
    return wrap;
  }

  function initPhotoFocus(strip){
    const items = Array.from(strip.children);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-active', entry.intersectionRatio > 0.6);
      });
    }, { root: strip, threshold: [0, 0.25, 0.5, 0.6, 0.75, 1]
    });
    items.forEach((item) => {
      observer.observe(item);
      item.addEventListener('click', () => {
        item.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest'});
      });
    });
  }

  /* ----------------------------------------------------------------- tabs */

  const tabsEl = $('#tabs');
  const panelsEl = $('#panels');
  const indicator = $('#tabIndicator');
  const buttons = [];
  const panels = [];
  let active = 0;

  function build() {
    TABS.forEach((tab, i) => {
      const id = tab.id || slug(tab.label) || 'tab-' + i;

      const btn = el('button', 'tab', tab.label);
      btn.type = 'button';
      btn.id = 'tab-' + id;
      btn.role = 'tab';
      btn.setAttribute('aria-controls', 'panel-' + id);
      btn.setAttribute('aria-selected', 'false');
      btn.tabIndex = -1;
      btn.dataset.id = id;
      btn.addEventListener('click', () => select(i, true));
      tabsEl.append(btn);
      buttons.push(btn);

      const panel = el('section', 'panel');
      panel.id = 'panel-' + id;
      panel.role = 'tabpanel';
      panel.setAttribute('aria-labelledby', 'tab-' + id);
      panel.tabIndex = 0;
      panel.hidden = true;

      // keeps the heading order h1 -> h2 -> h3 for screen readers
      panel.append(el('h2', 'visually-hidden', tab.label));

      if (tab.note) panel.append(el('p', 'panel__note', tab.note));
      if (tab.about){
        panel.append(renderAbout(tab.about));
      }
      else{
        (tab.entries || []).forEach((entry, n) => panel.append(renderEntry(entry, n)));
      }

      panelsEl.append(panel);
      panels.push(panel);
    });
  }

  function moveIndicator() {
    const btn = buttons[active];
    if (!btn) return;
    indicator.style.width = btn.offsetWidth + 'px';
    indicator.style.transform = 'translateX(' + btn.offsetLeft + 'px)';
    indicator.dataset.ready = 'true';
  }

  function select(index, fromUser) {
    if (index < 0 || index >= buttons.length) return;
    // already showing (e.g. popstate + hashchange both firing) — nothing to redo
    if (index === active && !panels[index].hidden && !fromUser) return;
    active = index;

    buttons.forEach((btn, i) => {
      const on = i === index;
      btn.setAttribute('aria-selected', String(on));
      btn.tabIndex = on ? 0 : -1;
      panels[i].hidden = !on;
      panels[i].removeAttribute('data-animate');
    });

    // restart the stagger reveal on the newly shown panel
    void panels[index].offsetWidth;
    panels[index].setAttribute('data-animate', 'true');

    moveIndicator();
    buttons[index].scrollIntoView({ block: 'nearest', inline: 'nearest' });

    const id = buttons[index].dataset.id;
    if (fromUser) {
      // pushState (not replaceState) so the back button walks tab history
      if (location.hash !== '#' + id) history.pushState({ tab: id }, '', '#' + id);
      buttons[index].focus({ preventScroll: true });
    }
  }

  function onKeydown(e) {
    const keys = { ArrowLeft: -1, ArrowRight: 1, Home: 'first', End: 'last' };
    if (!(e.key in keys)) return;
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea') return;
    e.preventDefault();

    const move = keys[e.key];
    if (move === 'first') return select(0, true);
    if (move === 'last') return select(buttons.length - 1, true);
    select((active + move + buttons.length) % buttons.length, true);
  }

  function initialTab() {
    const hash = decodeURIComponent(location.hash.replace('#', ''));
    const i = buttons.findIndex((b) => b.dataset.id === hash);
    return i >= 0 ? i : 0;
  }

  /* ---------------------------------------------------------------- theme */

  function initTheme() {
    const root = document.documentElement;
    const toggle = $('#themeToggle');
    const label = $('#themeLabel');
    const sync = () => (label.textContent = root.getAttribute('data-theme'));

    sync();
    toggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      sync();
    });
  }

  /* ----------------------------------------------------------------- boot */

  renderHero();
  build();
  initTheme();
  $('#year').textContent = new Date().getFullYear();

  const first = initialTab();
  select(first, false);
  history.replaceState({ tab: buttons[first].dataset.id }, '', location.hash || location.pathname);
  requestAnimationFrame(moveIndicator);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveIndicator);

  window.addEventListener('resize', moveIndicator);
  window.addEventListener('keydown', onKeydown);
  window.addEventListener('hashchange', () => select(initialTab(), false));
  window.addEventListener('popstate', () => select(initialTab(), false));
})();
