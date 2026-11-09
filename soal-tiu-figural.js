/* ============================================================
   SOAL TIU FIGURAL (SERIAL) — 500 soal (4 opsi: A, B, C, D)
   Semua gambar dibuat dari kode (SVG string), tanpa file gambar.
   Muat file ini SEBELUM script.js.
   ============================================================ */

const _HURUF = ['A', 'B', 'C', 'D'];
const _INSTRUKSI = 'Pilihlah gambar (A), (B), (C), atau (D) untuk melanjutkan pola gambar yang tersedia!';
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

// Bikin 4 opsi (1 benar + 3 pengecoh unik). Nama _shuffle3 dipertahankan
// karena dipakai juga di tipe lain, fungsinya generic shuffle.
function _build4Options(correct, distractors) {
  const seen = new Set([_key(correct)]);
  const opts = [correct];
  for (const d of distractors) {
    if (opts.length >= 4) break;
    const k = _key(d);
    if (!seen.has(k)) { seen.add(k); opts.push(d); }
  }
  if (opts.length < 4) throw new Error('Pengecoh unik kurang untuk: ' + _key(correct));
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

/* ============================================================
   Tipe 1: Rotasi panah (50 soal)
   ============================================================ */
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
for (let i = 0; i < 50; i++) {
  const start = 45 * (i % 8);
  const step = _steps[Math.floor(i / 8) % 6];
  const v = Math.floor(i / 24) % 3;
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

/* ============================================================
   Tipe 2: Titik pada sudut bangun (50 soal)
   ============================================================ */
for (let i = 0; i < 50; i++) {
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

/* ============================================================
   Tipe 3: Bangun bersarang berkurang (50 soal)
   ============================================================ */
const _pool = ['circle', 'square', 'diamond', 'triangle', 'hexagon', 'pentagon'];
for (let i = 0; i < 50; i++) {
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

/* ============================================================
   Tipe 4: Isi baris bertambah/berkurang/tetap (50 soal)
   ============================================================ */
const _rowPool = ['circle', 'diamond', 'square'];
const _rowName = ['atas', 'tengah', 'bawah'];
for (let i = 0; i < 50; i++) {
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

/* ============================================================
   Tipe 5: Sisi bangun bertambah + warna selang-seling (50 soal)
   ============================================================ */
for (let i = 0; i < 50; i++) {
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

/* ============================================================
   Tipe 6: Bangun bergeser posisi (50 soal) — BARU
   Satu bangun kecil bergerak mengelilingi kotak luar.
   ============================================================ */
const _posGrid = [
  [20, 20], [50, 20], [80, 20],
  [80, 50], [80, 80], [50, 80],
  [20, 80], [20, 50]
];
const _posLabels = ['kiri-atas', 'atas-tengah', 'kanan-atas',
                    'kanan-tengah', 'kanan-bawah', 'bawah-tengah',
                    'kiri-bawah', 'kiri-tengah'];
const _bangunKecil = ['circle', 'triangle', 'square', 'diamond'];

for (let i = 0; i < 50; i++) {
  const dir = Math.floor(i / 4) % 2 ? -1 : 1;
  const s0 = i % 8;
  const kind = _bangunKecil[Math.floor(i / 8) % 4];
  const bigKind = ['square', 'circle', 'hexagon', 'pentagon'][Math.floor(i / 16) % 4];
  const pos = t => (((s0 + dir * t) % 8) + 8) % 8;
  const render = idx => {
    const [x, y] = _posGrid[idx];
    return _svg(_shape(bigKind, 50, 50, 40, '#fff') +
      _shape(kind, x, y, 8, _INK));
  };
  const arah = dir > 0 ? 'searah' : 'berlawanan';
  const c3 = pos(3);
  _pushSoal({
    type: 'geser-posisi',
    frames: [pos(0), pos(1), pos(2)],
    correct: c3,
    distractors: [
      pos(2), pos(4), pos(-1), pos(5),
      (c3 + 2) % 8, (c3 + 6) % 8
    ],
    render,
    explanation: `Bangun kecil bergeser 1 posisi ${arah} jarum jam di sekeliling bangun besar: ${_posLabels[pos(0)]} → ${_posLabels[pos(1)]} → ${_posLabels[pos(2)]} → ${_posLabels[c3]}.`,
    formula: `Posisi: pn = (p0 ± n) mod 8`
  });
}

/* ============================================================
   Tipe 7: Cermin / refleksi horizontal atau vertikal (50 soal) — BARU
   ============================================================ */
function _asymSvg(kind, mirror) {
  // Bangun asimetris: segitiga siku + titik penanda
  let inner = '';
  if (kind === 'L') {
    inner = `<polygon points="30,30 30,70 70,70" fill="#fff" stroke="${_INK}" stroke-width="3"/>` +
            `<circle cx="30" cy="30" r="4" fill="${_INK}"/>`;
  } else if (kind === 'arrow') {
    inner = `<polygon points="30,50 60,30 60,40 70,40 70,60 60,60 60,70" fill="#fff" stroke="${_INK}" stroke-width="2"/>` +
            `<circle cx="40" cy="50" r="4" fill="${_INK}"/>`;
  } else if (kind === 'F') {
    inner = `<rect x="30" y="30" width="10" height="40" fill="#fff" stroke="${_INK}" stroke-width="2"/>` +
            `<rect x="40" y="30" width="20" height="10" fill="#fff" stroke="${_INK}" stroke-width="2"/>` +
            `<rect x="40" y="45" width="15" height="10" fill="#fff" stroke="${_INK}" stroke-width="2"/>` +
            `<circle cx="35" cy="65" r="4" fill="${_INK}"/>`;
  } else { // 'flag'
    inner = `<line x1="35" y1="25" x2="35" y2="75" stroke="${_INK}" stroke-width="3"/>` +
            `<polygon points="35,25 75,35 35,45" fill="#fff" stroke="${_INK}" stroke-width="2"/>` +
            `<circle cx="65" cy="65" r="4" fill="${_INK}"/>`;
  }
  let transform = '';
  if (mirror === 'h') transform = `transform="translate(100,0) scale(-1,1)"`;
  if (mirror === 'v') transform = `transform="translate(0,100) scale(1,-1)"`;
  return _svg(`<g ${transform}>${inner}</g>`);
}

const _mirrorKinds = ['L', 'arrow', 'F', 'flag'];
for (let i = 0; i < 50; i++) {
  const kind = _mirrorKinds[i % 4];
  const axis = Math.floor(i / 4) % 2 === 0 ? 'h' : 'v';
  const render = st => _asymSvg(kind, st.mirror);
  const correct = { mirror: axis };
  const wrongAxis = axis === 'h' ? 'v' : 'h';
  const distractorStates = [
    { mirror: null },         // asli tanpa cermin
    { mirror: wrongAxis },    // cermin sumbu salah
    { mirror: null },         // duplikat (akan difilter)
    { mirror: 'rot180' }      // kita render sebagai "h lalu v" (≈ rotasi 180°)
  ];
  // Render rotasi 180 sebagai mirror bertumpuk
  const renderFull = st => {
    if (st.mirror === 'rot180') {
      // mirror h lalu v = rotasi 180
      return _svg(`<g transform="translate(100,100) scale(-1,-1)">${_asymSvg(kind, null).replace(/^<svg[^>]*>|<\/svg>$/g, '')}</g>`);
    }
    return _asymSvg(kind, st.mirror);
  };
  _pushSoal({
    type: 'cermin',
    frames: [renderFull({ mirror: null }), renderFull({ mirror: axis })],
    correct,
    distractors: distractorStates,
    render: renderFull,
    explanation: axis === 'h'
      ? `Pola: gambar dicerminkan terhadap sumbu vertikal (kiri-kanan). Gambar berikutnya adalah cermin kiri-kanan dari gambar kedua.`
      : `Pola: gambar dicerminkan terhadap sumbu horizontal (atas-bawah). Gambar berikutnya adalah cermin atas-bawah dari gambar kedua.`,
    formula: `Refleksi: (x,y) → (−x,y) untuk sumbu vertikal; (x,y) → (x,−y) untuk sumbu horizontal`
  });
}

/* ============================================================
   Tipe 8: Gabungan bangun (union / kombinasi) (50 soal) — BARU
   Gambar berikutnya = gabungan dari dua gambar sebelumnya.
   ============================================================ */
for (let i = 0; i < 50; i++) {
  const kindA = ['circle', 'square', 'triangle'][i % 3];
  const kindB = ['diamond', 'hexagon', 'pentagon'][Math.floor(i / 3) % 3];
  const kindC = ['triangle', 'circle', 'square'][Math.floor(i / 9) % 3];
  const cxA = 35, cyA = 40, rA = 20;
  const cxB = 65, cyB = 60, rB = 20;
  const cxC = 65, cyC = 40, rC = 20;

  // frame 1: A saja
  // frame 2: B saja
  // correct: A + B digabung
  const renderState = st => {
    let inner = '';
    if (st.includes('A')) inner += _shape(kindA, cxA, cyA, rA, '#fff');
    if (st.includes('B')) inner += _shape(kindB, cxB, cyB, rB, '#fff');
    if (st.includes('C')) inner += _shape(kindC, cxC, cyC, rC, '#fff');
    return _svg(inner);
  };

  const correct = ['A', 'B'];
  _pushSoal({
    type: 'gabungan',
    frames: [['A'], ['B']],
    correct,
    distractors: [
      ['A', 'C'],
      ['B', 'C'],
      ['A', 'B', 'C'],
      ['A'],
      ['B'],
      []
    ],
    render: renderState,
    explanation: `Gambar ketiga adalah gabungan dari gambar pertama dan gambar kedua (kedua bangun ditumpuk).`,
    formula: `Gabungan: state3 = state1 ∪ state2`
  });
}

/* ============================================================
   Tipe 9: Warna bergantian / berputar (50 soal) — BARU
   3 bentuk sama; warna isi bergilir pola 3-warna.
   ============================================================ */
const _warnaPool = ['#fff', '#888', '#222'];
const _warnaNama = ['putih', 'abu-abu', 'hitam'];
for (let i = 0; i < 50; i++) {
  const kind = ['circle', 'square', 'triangle'][i % 3];
  const period = 3;
  const start = i % 3;
  const shapeR = 30;
  const render = st => _svg(
    _shape(kind, 50, 50, shapeR, _warnaPool[st.f])
  );
  const at = t => ({ f: (start + t) % period });
  const c3 = at(3);
  _pushSoal({
    type: 'warna-putar',
    frames: [at(0), at(1), at(2)],
    correct: c3,
    distractors: [
      at(2), at(4), at(1),
      { f: (c3.f + 1) % 3 },
      { f: (c3.f + 2) % 3 }
    ],
    render,
    explanation: `Warna isi bangun bergilir dengan pola 3: ${_warnaNama[at(0).f]} → ${_warnaNama[at(1).f]} → ${_warnaNama[at(2).f]} → ${_warnaNama[c3.f]}.`,
    formula: `Warna: wn = (w0 + n) mod 3`
  });
}

/* ============================================================
   Tipe 10: Jumlah sisi bangun bertambah + rotasi (50 soal) — BARU
   Gabungan dua aturan: sisi +1 dan rotasi sudut tetap.
   ============================================================ */
for (let i = 0; i < 50; i++) {
  const s0 = 3 + (i % 3);
  const rot0 = [0, 30, 60, 90][Math.floor(i / 3) % 4];
  const dRot = [15, 30, 45, 60][Math.floor(i / 12) % 4];
  const at = t => ({ n: s0 + t, rot: (rot0 + t * dRot) % 360 });
  const render = st => _svg(
    `<g transform="rotate(${st.rot} 50 50)">` +
    `<polygon points="${_pts(st.n, 50, 50, 32)}" fill="#fff" stroke="${_INK}" stroke-width="3"/>` +
    `</g>`
  );
  const c3 = at(3);
  _pushSoal({
    type: 'sisi-rotasi',
    frames: [at(0), at(1), at(2)],
    correct: c3,
    distractors: [
      at(2),
      { n: c3.n, rot: (c3.rot + 180) % 360 },
      { n: c3.n - 1, rot: c3.rot },
      { n: c3.n + 1, rot: c3.rot },
      { n: c3.n, rot: (c3.rot + dRot) % 360 }
    ],
    render,
    explanation: `Jumlah sisi bertambah 1 tiap gambar (${s0} → ${s0 + 3}) dan bangun berputar ${dRot}° tiap langkah. Berikutnya: ${c3.n} sisi, rotasi ${c3.rot}°.`,
    formula: `Sisi: Un = U1 + (n−1); rotasi: θn = θ0 + n·Δθ`
  });
}

console.assert(soalTIUFigural.length === 500, 'TIU figural harus 500, dapat: ' + soalTIUFigural.length);
if (typeof module !== 'undefined') module.exports = soalTIUFigural;