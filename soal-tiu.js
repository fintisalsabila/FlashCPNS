/* ============================================================
   SOAL TIU — 500 soal (3 opsi: A, B, C)
   ============================================================ */

function _shuffle3(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Bikin 3 opsi (1 benar + 2 pengecoh unik)
function _build3Options(correct, distractors) {
  const set = new Set([String(correct)]);
  const opts = [String(correct)];
  for (const d of distractors) {
    if (opts.length >= 3) break;
    const s = String(d);
    if (!set.has(s)) { set.add(s); opts.push(s); }
  }
  let offset = 1;
  while (opts.length < 3) {
    const cand = String(Number(correct) + offset);
    if (!set.has(cand)) { set.add(cand); opts.push(cand); }
    offset++;
  }
  return _shuffle3(opts);
}

const soalTIU = [];

// --- Tipe 1: Persamaan linear (100 soal) ---
for (let i = 0; i < 100; i++) {
  const a = 2 + (i % 8);
  const x = 1 + (i % 15);
  const b = (i * 3) % 20;
  const c = a * x + b;
  const correct = x;
  soalTIU.push({
    question: `Jika ${a}x + ${b} = ${c}, berapakah nilai x?`,
    options: _build3Options(correct, [x + 1, x - 1, x + 2, Math.floor(c / a)]),
    correctValue: String(correct),
    answer: `x = ${correct}`,
    explanation: `Kurangi ${b} dari kedua ruas: ${a}x = ${c - b}. Bagi dengan ${a}: x = ${correct}.`,
    formula: `ax + b = c → x = (c − b) / a`
  });
}

// --- Tipe 2: Persentase (100 soal) ---
for (let i = 0; i < 100; i++) {
  const pct = [10, 15, 20, 25, 30, 40, 50, 60, 75, 80][i % 10];
  const total = 20 + ((i * 7) % 200);
  const correct = Math.round((pct / 100) * total);
  soalTIU.push({
    question: `Berapakah ${pct}% dari ${total}?`,
    options: _build3Options(correct, [correct + 5, correct - 5, total - correct, correct + 10]),
    correctValue: String(correct),
    answer: `${correct}`,
    explanation: `${pct}% = ${pct}/100. Maka (${pct}/100) × ${total} = ${correct}.`,
    formula: `Persen → (p/100) × total`
  });
}

// --- Tipe 3: Deret aritmatika (100 soal) ---
for (let i = 0; i < 100; i++) {
  const start = 2 + (i % 10);
  const diff = 2 + (i % 7);
  const terms = [start, start + diff, start + 2 * diff, start + 3 * diff, start + 4 * diff];
  const next = start + 5 * diff;
  soalTIU.push({
    question: `Deret: ${terms.join(', ')}, ... Berapakah suku berikutnya?`,
    options: _build3Options(next, [next + 1, next - 1, next + diff, next - diff]),
    correctValue: String(next),
    answer: `${next}`,
    explanation: `Beda antar suku tetap = ${diff}. Suku berikutnya = ${terms[4]} + ${diff} = ${next}.`,
    formula: `Un = a + (n−1)b`
  });
}

// --- Tipe 4: Perbandingan (100 soal) ---
for (let i = 0; i < 100; i++) {
  const r1 = 2 + (i % 5);
  const r2 = 3 + (i % 6);
  const factor = 2 + (i % 10);
  const val1 = r1 * factor;
  const correct = r2 * factor;
  soalTIU.push({
    question: `Jika ${r1} : ${r2} = ${val1} : x, berapakah nilai x?`,
    options: _build3Options(correct, [correct + 1, correct - 1, val1, correct + factor]),
    correctValue: String(correct),
    answer: `x = ${correct}`,
    explanation: `Perbandingan senilai: (${r1}/${r2}) = (${val1}/x). Maka x = ${correct}.`,
    formula: `a : b = c : d → d = (b × c) / a`
  });
}

// --- Tipe 5: Aritmatika campuran (100 soal) ---
for (let i = 0; i < 100; i++) {
  const a = 4 + (i % 10);
  const b = 3 + (i % 8);
  const c = 2 + (i % 5);
  const mode = i % 4;
  let question, correct, explanation, formula;
  if (mode === 0) {
    correct = a * b + c;
    question = `Berapakah hasil dari ${a} × ${b} + ${c}?`;
    explanation = `${a}×${b}=${a*b}, lalu +${c} = ${correct}.`;
    formula = `× dan ÷ dikerjakan lebih dulu`;
  } else if (mode === 1) {
    correct = a * (b + c);
    question = `Berapakah hasil dari ${a} × (${b} + ${c})?`;
    explanation = `Dalam kurung: ${b}+${c}=${b+c}, lalu ${a}×${b+c}=${correct}.`;
    formula = `Kurung dikerjakan pertama`;
  } else if (mode === 2) {
    correct = a * b - c;
    question = `Berapakah hasil dari ${a} × ${b} − ${c}?`;
    explanation = `${a}×${b}=${a*b}, lalu −${c} = ${correct}.`;
    formula = `× / ÷ sebelum + / −`;
  } else {
    correct = Math.floor((a * b) / c);
    question = `Berapakah hasil dari (${a} × ${b}) ÷ ${c}?`;
    explanation = `${a}×${b}=${a*b}, lalu ÷${c} = ${correct}.`;
    formula = `Kurung → kali/bagi → tambah/kurang`;
  }
  soalTIU.push({
    question,
    options: _build3Options(correct, [correct + 1, correct - 1, correct + 2, correct - 2]),
    correctValue: String(correct),
    answer: `${correct}`,
    explanation,
    formula
  });
}

console.assert(soalTIU.length === 500, 'TIU harus 500, dapat: ' + soalTIU.length);