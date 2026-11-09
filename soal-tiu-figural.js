/* ============================================================
   SOAL TIU FIGURAL (SERIAL) — 500 soal (3 opsi: A, B, C)
   Semua gambar dibuat dari kode (SVG string), tanpa file gambar.
   Muat file ini SEBELUM script.js.
   ============================================================ */

const _HURUF = ['A', 'B', 'C', 'D'];
const _INSTRUKSI = 'Pilihlah gambar (A), (B), atau (C) untuk melanjutkan pola gambar yang tersedia!';
const _INK = '#222';

/* ---------- Helper umum ---------- */

function _shuffle3(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const _key = (s) => JSON.stringify(s);
const _mod360 = (a) => ((a % 360) + 360) % 360;
const _range = (a, b) => { const r = []; for (let k = a; k <= b; k++) r.push(k); return r; };

function _build4Options(correct, distractors) {
  const seen = new Set([_key(correct)]);
  const opts = [correct];
  for (const d of distractors) {
    if (opts.length >= 3) break;
    const k = _key(d);
    if (!seen.has(k)) { seen.add(k); opts.push(d); }
  }
  if (opts.length < 3) throw new Error('Pengecoh unik kurang untuk: ' + _key(correct));
  return _shuffle3(opts);
}

/* ---------- Helper SVG ---------- */

function _svg(inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">` +
    `<rect x="1" y="1" width="98" height="98" fill="#fff" stroke="${_INK}" stroke-width="2"/>${inner}</svg>`;
}

function _vtx(n, k, cx, cy, r, rot = -90) {
  const a = ((rot + (360 * k) / n) * Math.PI) / 180;
  return [+(cx + r * Math.cos(a)).toFixed(1), +(cy + r * Math.sin(a)).toFixed(1)];
}

function _pts(n, cx, cy, r, rot = -90) {
  return _range(0, n - 1).map(k => _vtx(n, k, cx, cy, r, rot).join(',')).join(' ');
}

function _shape(kind, cx, cy, r, fill = '#fff') {
  const st = `fill="${fill}" stroke="${_INK}" stroke-width="2"`;
  switch (kind) {
    case 'circle':   return `<circle cx="${cx}" cy="${cy}" r="${r}" ${st}/>`;
    case 'square':   return `<polygon points="${_pts(4, cx, cy, r, -45)}" ${st}/>`;
    case 'diamond':  return `<polygon points="${_pts(4, cx, cy, r, -90)}" ${st}/>`;
    case 'triangle': return `<polygon points="${_pts(3, cx, cy, r, -90)}" ${st}/>`;
    case 'pentagon': return `<polygon points="${_pts(5, cx, cy, r, -90)}" ${st}/>`;
    case 'hexagon':  return `<polygon points="${_pts(6, cx, cy, r, 0)}" ${st}/>`;
  }
}

/* ---------- Penampung soal ---------- */

const soalTIUFigural = [];

function _pushSoal({ type, frames, correct, distractors, render, explanation, formula }) {
  const opts = _build4Options(correct, distractors);
  const options = opts.map(o => ({ value: _key(o), svg: render(o) }));
  const correctValue = _key(correct);
  const idx = options.findIndex(o => o.value === correctValue);
  soalTIUFigural.push({
    type,
    question: _INSTRUKSI,
    frames: frames.map(f => render(f)),
    options,
    correctValue,
    answer: _HURUF[idx],
    explanation,
    formula
  });
}

/* ---------- Tipe 1: Rotasi (100 soal) ---------- */
const _arrowVariants = [
  `<circle cx="50" cy="84" r="5" fill="${_INK}"/>`,
  `<line x1="40" y1="68" x2="60" y2="68" stroke="${_INK}" stroke-width="4"/>`,
  `<rect x="55" y="38" width="10" height="10" fill="${_INK}"/>`
];
function _arrowSvg(angle, v) {
  return _svg(
    `<g transform="rotate(${angle} 50 50)">` +
    `<line x1="50" y1="80" x2="50" y2="30" stroke="${_INK}" stroke-width="4"/>` +
    `<polygon points="50,14 38,34 62,34" fill="${_INK}"/>${_arrowVariants[v]}</g>`
  );
}
const _steps = [45, 90, 135, -45, -90, -135];
for (let i = 0; i < 100; i++) {
  const start = 45 * (i % 8);
  const step = _steps[Math.floor(i / 8) % 6];
  const v = Math.floor(i / 48) % 3;
  const at = t => _mod360(start + t * step);
  const arah = step > 0 ? 'searah' : 'berlawanan';
  _pushSoal({
    type: 'rotasi',
    frames: [at(0), at(1), at(2)],
    correct: at(3),
    distractors: [
      at(2), at(4), _mod360(start - 3 * step),
      ..._range(1, 7).map(k => _mod360(at(3) + 45 * k))
    ],
    render: a => _arrowSvg(a, v),
    explanation: `Gambar diputar ${Math.abs(step)}° ${arah} jarum jam pada tiap langkah: ${at(0)}° → ${at(1)}° → ${at(2)}° → ${at(3)}°.`,
    formula: `Rotasi: θn = θ0 + n × Δθ (Δθ = ${step}°)`
  });
}

/* ---------- Tipe 2: Titik pada sudut (100 soal) ---------- */
for (let i = 0; i < 100; i++) {
  const N = 4 + (i % 3);
  const mode = Math.floor(i / 3) % 2;
  const dir = Math.floor(i / 6) % 2 ? -1 : 1;
  const s = Math.floor(i / 12) % N;
  const arah = dir > 0 ? 'searah' : 'berlawanan';
  const v = t => (((s + dir * t) % N) + N) % N;
  const set = (from, count) =>
    [...new Set(_range(0, count - 1).map(k => v(from + k)))].sort((a, b) => a - b);
  const render = dots => _svg(
    `<polygon points="${_pts(N, 50, 50, 34)}" fill="#fff" stroke="${_INK}" stroke-width="3"/>` +
    dots.map(k => { const [x, y] = _vtx(N, k, 50, 50, 34); return `<circle cx="${x}" cy="${y}" r="7" fill="${_INK}"/>`; }).join('')
  );
  if (mode === 0) {
    const c0 = 1 + (Math.floor(i / 12) % (N - 3));
    _pushSoal({
      type: 'titik-sudut',
      frames: [set(0, c0), set(0, c0 + 1), set(0, c0 + 2)],
      correct: set(0, c0 + 3),
      distractors: [set(0, c0 + 2), set(1, c0 + 3), set(0, c0 + 1), set(2, c0 + 3),
                    set(-1, c0 + 3), set(1, c0 + 2), set(2, c0 + 2)],
      render,
      explanation: `Setiap gambar menambah 1 titik pada sudut berikutnya (${arah} jarum jam): ${c0}, ${c0 + 1}, ${c0 + 2} titik → gambar berikutnya ${c0 + 3} titik.`,
      formula: `Jumlah titik: Un = U1 + (n−1)·1`
    });
  } else {
    const m = 1 + (Math.floor(i / 12) % 2);
    const pos = t => (m === 1 ? [v(t)] : [v(t), v(t + 1)].sort((a, b) => a - b));
    _pushSoal({
      type: 'titik-sudut',
      frames: [pos(0), pos(1), pos(2)],
      correct: pos(3),
      distractors: [pos(2), pos(4), pos(1), pos(5), pos(-1), pos(0)],
      render,
      explanation: `${m === 1 ? 'Titik' : 'Pasangan titik'} berpindah 1 sudut ${arah} jarum jam pada setiap gambar.`,
      formula: `Posisi: pn = (p0 ± n) mod jumlah sudut`
    });
  }
}

/* ---------- Tipe 3: Bangun bersarang berkurang (100 soal) ---------- */
const _pool = ['circle', 'square', 'diamond', 'triangle', 'hexagon', 'pentagon'];
for (let i = 0; i < 100; i++) {
  const k = 4 + (i % 3);
  const off = Math.floor(i / 3) % 6;
  const kinds = _range(0, k - 1).map(j => _pool[(off + j) % 6]);
  const dalam = Math.floor(i / 18) % 2 === 0;
  const render = idx => _svg(idx.map(j => _shape(kinds[j], 50, 50, 44 - j * 7)).join(''));
  const state = t => (dalam ? _range(0, k - 1 - t) : _range(t, k - 1));
  const other = t => (dalam ? _range(t, k - 1) : _range(0, k - 1 - t));
  _pushSoal({
    type: 'bangun-berkurang',
    frames: [state(0), state(1), state(2)],
    correct: state(3),
    distractors: [state(2), other(3), state(4), state(1), other(2)],
    render,
    explanation: `Setiap gambar kehilangan satu bangun ${dalam ? 'terdalam' : 'terluar'}: ${k}, ${k - 1}, ${k - 2} bangun → gambar berikutnya ${k - 3} bangun.`,
    formula: `Jumlah bangun: Un = U1 − (n−1)`
  });
}

/* ---------- Tipe 4: Isi baris (100 soal) ---------- */
const _rowPool = ['circle', 'diamond', 'square'];
const _rowName = ['atas', 'tengah', 'bawah'];
for (let i = 0; i < 100; i++) {
  const inc = i % 3;
  const dec = (inc + 1 + (Math.floor(i / 3) % 2)) % 3;
  const stat = 3 - inc - dec;
  const a = Math.floor(i / 6) % 2;
  const b = 3 + (Math.floor(i / 12) % 2);
  const cS = Math.floor(i / 24) % 5;
  const off = Math.floor(i / 48) % 3;
  const kinds = [0, 1, 2].map(r => _rowPool[(r + off) % 3]);
  const render = c => _svg(
    _range(0, 2).map(r => _range(0, 3).map(col =>
      _shape(kinds[r], 17 + col * 22, 22 + r * 28, 9, col < c[r] ? '#888' : '#fff')
    ).join('')).join('')
  );
  const at = t => { const c = [0, 0, 0]; c[inc] = a + t; c[dec] = b - t; c[stat] = cS; return c; };
  const next = at(3);
  const alt = (idx, val) => { const c = [...next]; c[idx] = val; return c; };
  const swapped = (() => { const c = [...next]; c[inc] = b - 3; c[dec] = a + 3; return c; })();
  _pushSoal({
    type: 'isi-baris',
    frames: [at(0), at(1), at(2)],
    correct: next,
    distractors: [
      at(2), swapped, alt(inc, next[inc] - 1), alt(dec, next[dec] + 1),
      alt(stat, cS < 4 ? cS + 1 : cS - 1),
      alt(inc, Math.min(4, next[inc] + 1)), alt(dec, Math.max(0, next[dec] - 1))
    ],
    render,
    explanation: `Baris ${_rowName[inc]} bertambah 1 bangun abu-abu tiap gambar (${a} → ${a + 3}), baris ${_rowName[dec]} berkurang 1 (${b} → ${b - 3}), baris ${_rowName[stat]} tetap (${cS}).`,
    formula: `Baris naik: +1, baris turun: −1, baris lain: konstan`
  });
}

/* ---------- Tipe 5: Sisi bangun bertambah + warna selang-seling (100 soal) ---------- */
for (let i = 0; i < 100; i++) {
  const s0 = 3 + (i % 4);
  const f0 = Math.floor(i / 4) % 2;
  const rot = [-90, 90, 0][Math.floor(i / 8) % 3];
  const at = t => ({ n: s0 + t, f: (f0 + t) % 2 });
  const render = st => _svg(
    `<polygon points="${_pts(st.n, 50, 50, 42, rot)}" fill="#fff" stroke="${_INK}" stroke-width="3"/>` +
    `<polygon points="${_pts(st.n, 50, 50, 18, rot)}" fill="${st.f ? _INK : '#fff'}" stroke="${_INK}" stroke-width="2"/>`
  );
  const c = at(3);
  const flip = 1 - c.f;
  _pushSoal({
    type: 'sisi-warna',
    frames: [at(0), at(1), at(2)],
    correct: c,
    distractors: [
      { n: c.n, f: flip }, { n: c.n - 1, f: c.f }, { n: c.n + 1, f: c.f },
      { n: c.n + 1, f: flip }, { n: c.n - 1, f: flip }
    ],
    render,
    explanation: `Jumlah sisi bertambah 1 tiap gambar (${s0}, ${s0 + 1}, ${s0 + 2}) dan warna bangun dalam berganti hitam–putih. Berikutnya: ${c.n} sisi, bangun dalam ${c.f ? 'hitam' : 'putih'}.`,
    formula: `Sisi: Un = U1 + (n−1); warna: berganti tiap gambar`
  });
}

console.assert(soalTIUFigural.length === 500, 'TIU figural harus 500, dapat: ' + soalTIUFigural.length);
if (typeof module !== 'undefined') module.exports = soalTIUFigural;