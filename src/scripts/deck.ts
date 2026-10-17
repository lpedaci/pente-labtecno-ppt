// Motor de la presentación: escalado del escenario, navegación (teclado, botones, deslizar),
// enlaces #sN, notas, cuadrícula, foto ampliada y lectura vertical en pantallas angostas.

const CFG = {
  scrollMaxWidth: 760,   // por debajo de este ancho, lectura vertical
  scrollMaxHeight: 500,  // celulares en horizontal (poca altura + táctil)
  stageMargin: 32,
  swipeThreshold: 50,
  hashPrefix: 's',
};

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const body = document.body;
const stage = $('stage');
const slides = Array.from(stage.querySelectorAll<HTMLElement>(':scope > .slide'));
const n = slides.length;
const css = getComputedStyle(document.documentElement);
const stageW = parseFloat(css.getPropertyValue('--stage-w'));
const stageH = parseFloat(css.getPropertyValue('--stage-h'));
let cur = 0;

const isScroll = () => body.classList.contains('m-scroll');
const pad = (k: number) => String(k).padStart(2, '0');

function mode() {
  const scroll =
    window.innerWidth < CFG.scrollMaxWidth ||
    (window.innerHeight < CFG.scrollMaxHeight && matchMedia('(pointer: coarse)').matches);
  body.classList.toggle('m-scroll', scroll);
  body.classList.toggle('m-deck', !scroll);
  slides.forEach((sl, k) => { sl.inert = !scroll && k !== cur; });
  if (!scroll) fit();
}

function fit() {
  const vp = $('viewport').getBoundingClientRect();
  const s = Math.min((vp.width - CFG.stageMargin) / stageW, (vp.height - CFG.stageMargin) / stageH);
  stage.style.transform = `translate(-50%,-50%) scale(${s})`;
}

function go(i: number, announce = true) {
  i = Math.max(0, Math.min(n - 1, i));
  slides.forEach((sl, k) => {
    sl.classList.toggle('is-active', k === i);
    sl.classList.toggle('is-prev', k < i);
    sl.inert = !isScroll() && k !== i;
  });
  cur = i;
  const title = slides[i].dataset.title ?? '';
  $('count').textContent = `${pad(i + 1)} / ${pad(n)}`;
  $('slideTitle').textContent = title;
  $('progress').style.transform = `scaleX(${(i + 1) / n})`;
  const nt = slides[i].querySelector('.notes');
  $('notesText').textContent = nt ? nt.textContent : '';
  if (announce) $('live').textContent = `Diapositiva ${i + 1} de ${n}: ${title}`;
  try { history.replaceState(null, '', `#${CFG.hashPrefix}${i + 1}`); } catch { /* file:// */ }
  document.querySelectorAll('.thumb').forEach((t, k) => t.classList.toggle('cur', k === i));
}

// En lectura vertical, solo animan las diapositivas visibles
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (es) => es.forEach((e) => e.target.classList.toggle('in-view', e.isIntersecting)),
    { rootMargin: '100px 0px' },
  );
  slides.forEach((sl) => io.observe(sl));
} else slides.forEach((sl) => sl.classList.add('in-view'));

// Cuadrícula de miniaturas
function buildGrid() {
  const w = $('gridWrap');
  w.innerHTML = '';
  slides.forEach((sl, k) => {
    const b = document.createElement('button');
    b.className = 'thumb';
    b.type = 'button';
    b.setAttribute('aria-label', `Ir a la diapositiva ${k + 1}: ${sl.dataset.title}`);
    const frame = document.createElement('div');
    frame.className = 'frame';
    frame.setAttribute('aria-hidden', 'true');
    const c = sl.cloneNode(true) as HTMLElement;
    c.classList.add('is-static', 'is-active');
    c.classList.remove('is-prev');
    c.inert = true;
    c.removeAttribute('aria-label');
    // ids propios de la miniatura, para que los recortes (clipPath) sigan funcionando
    c.querySelectorAll('[id]').forEach((e) => {
      const id = e.id, nid = `${id}-t${k}`;
      e.id = nid;
      c.querySelectorAll(`[clip-path="url(#${id})"]`).forEach((x) => x.setAttribute('clip-path', `url(#${nid})`));
    });
    c.querySelectorAll('.zoom').forEach((z) => {
      const s = document.createElement('span');
      s.className = 'zoom';
      s.append(...Array.from(z.childNodes));
      z.replaceWith(s);
    });
    c.querySelectorAll('img').forEach((img) => { img.loading = 'eager'; img.decoding = 'sync'; });
    // la miniatura ya es un botón: sin controles anidados ni reproducción
    c.querySelectorAll('.mg-toggle').forEach((b) => b.remove());
    c.querySelectorAll('video').forEach((v) => { v.removeAttribute('loop'); v.preload = 'none'; });
    frame.appendChild(c);
    b.appendChild(frame);
    b.append(`${pad(k + 1)} · ${sl.dataset.title}`);
    b.addEventListener('click', () => { toggleGrid(false); go(k); stage.focus(); });
    w.appendChild(b);
  });
  scaleThumbs();
}
function scaleThumbs() {
  document.querySelectorAll<HTMLElement>('.thumb .frame').forEach((f) => {
    const c = f.firstElementChild as HTMLElement | null;
    if (c) c.style.transform = `scale(${f.clientWidth / stageW})`;
  });
}
function toggleGrid(on?: boolean) {
  const el = $('grid');
  const show = on ?? el.hidden;
  el.hidden = !show;
  $('btnGrid').setAttribute('aria-pressed', String(show));
  stage.inert = show;
  if (show) {
    buildGrid();
    (document.querySelectorAll<HTMLElement>('.thumb')[cur])?.focus();
  }
}
function toggleNotes() {
  const el = $('notes');
  el.hidden = !el.hidden;
  $('btnNotes').setAttribute('aria-pressed', String(!el.hidden));
}
function fullscreen() {
  const d = document;
  if (!d.fullscreenElement) d.documentElement.requestFullscreen?.().catch(() => {});
  else d.exitFullscreen?.();
}

$('prev').addEventListener('click', () => go(cur - 1));
$('next').addEventListener('click', () => go(cur + 1));
$('btnGrid').addEventListener('click', () => toggleGrid());
$('btnNotes').addEventListener('click', toggleNotes);
$('btnFs').addEventListener('click', fullscreen);

// Foto ampliada: <dialog> modal (maneja foco y Escape)
const lb = $<HTMLDialogElement>('lightbox');
function openPhoto(btn: HTMLElement) {
  const img = btn.querySelector('img');
  const cap = btn.closest('figure')?.querySelector('figcaption');
  if (!img) return;
  const lbImg = $<HTMLImageElement>('lbImg');
  lbImg.src = btn.dataset.full || img.currentSrc || img.src;
  lbImg.alt = img.alt;
  $('lbCap').innerHTML = cap ? cap.innerHTML : '';
  lb.showModal();
  $('lbClose').focus();
}
document.addEventListener('click', (e) => {
  const z = (e.target as HTMLElement).closest<HTMLElement>('button.zoom');
  if (z && !z.closest('#grid')) openPhoto(z);
});
$('lbClose').addEventListener('click', () => lb.close());
lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });

document.addEventListener('keydown', (e) => {
  if (lb.open || isScroll() || e.metaKey || e.ctrlKey || e.altKey) return;
  const k = e.key;
  const active = document.activeElement as HTMLElement | null;
  if (!$('grid').hidden) {
    if (k === 'Escape' || k === 'g' || k === 'G') { toggleGrid(false); stage.focus(); e.preventDefault(); }
    return;
  }
  if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(k)) {
    if ((k === ' ' || k === 'Enter') && active && /^(BUTTON|A)$/.test(active.tagName)) return;
    go(cur + 1); e.preventDefault();
  } else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(k)) { go(cur - 1); e.preventDefault(); }
  else if (k === 'Home') go(0);
  else if (k === 'End') go(n - 1);
  else if (k === 'g' || k === 'G') toggleGrid(true);
  else if (k === 'n' || k === 'N') toggleNotes();
  else if (k === 'f' || k === 'F') fullscreen();
});

// Deslizar en pantallas táctiles
let x0: number | null = null;
const vp = $('viewport');
vp.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
vp.addEventListener('touchend', (e) => {
  if (x0 === null || isScroll()) return;
  const dx = e.changedTouches[0].clientX - x0;
  if (Math.abs(dx) > CFG.swipeThreshold) go(cur + (dx < 0 ? 1 : -1));
  x0 = null;
});

window.addEventListener('resize', () => { mode(); if (!$('grid').hidden) scaleThumbs(); });
const hashRe = new RegExp(`^#${CFG.hashPrefix}(\\d+)$`);
window.addEventListener('hashchange', () => {
  const h = hashRe.exec(location.hash);
  if (!h) return;
  const i = parseInt(h[1], 10) - 1;
  if (isScroll()) slides[i]?.scrollIntoView({ behavior: 'smooth' });
  else if (i !== cur) go(i);
});
mode();
const m = hashRe.exec(location.hash);
go(m ? parseInt(m[1], 10) - 1 : 0, false);
if (m && isScroll()) slides[cur].scrollIntoView();
requestAnimationFrame(() => requestAnimationFrame(() => body.classList.remove('preload')));
