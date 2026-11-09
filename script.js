/* ============================================================
   LOGIKA UTAMA FLASHCARD — mendukung opsi teks & opsi gambar (SVG)
   ============================================================ */

const flashcardsData = {
  tiu: soalTIU,
  tiuFigural: soalTIUFigural,
  twk: soalTWK,
  tkp: soalTKP,
  mixed: soalCampuran
};

// ---------- Update jumlah soal di menu ----------
const _setCount = (id, val) => {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
};
_setCount('countTiu', soalTIU.length);
_setCount('countTiuFigural', soalTIUFigural.length);
_setCount('countTwk', soalTWK.length);
_setCount('countTkp', soalTKP.length);

// ---------- STATE ----------
let currentCategory = 'tiu';
let currentIndex = 0;
let currentDeck = [...soalTIU];
let answered = false;

// ---------- DOM ----------
const card = document.getElementById('flashcard');
const questionText = document.getElementById('questionText');
const framesContainer = document.getElementById('framesContainer');
const optionsContainer = document.getElementById('optionsContainer');
const answerText = document.getElementById('answerText');
const explanationText = document.getElementById('explanationText');
const formulaText = document.getElementById('formulaText');
const keywordText = document.getElementById('keywordText');
const categoryBadge = document.getElementById('categoryBadge');
const backBadge = document.getElementById('backBadge');
const cardCounter = document.getElementById('cardCounter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const flipBtn = document.getElementById('flipBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const explanationBox = document.getElementById('explanationBox');
const formulaBox = document.getElementById('formulaBox');
const keywordBox = document.getElementById('keywordBox');
const frontHint = document.getElementById('frontHint');

// ---------- UTIL ----------
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const LABEL = { tiu: 'TIU', tiuFigural: 'TIU FIGURAL', twk: 'TWK', tkp: 'TKP', mixed: 'CAMPURAN' };

// Deteksi apakah soal ini bertipe figural
function isFiguralItem(item) {
  return (
    Array.isArray(item.frames) &&
    Array.isArray(item.options) &&
    item.options.length > 0 &&
    typeof item.options[0] === 'object' &&
    item.options[0] !== null &&
    'svg' in item.options[0]
  );
}

// ---------- RENDER: FRAME (khusus figural) ----------
function renderFrames(item) {
  if (!isFiguralItem(item)) {
    framesContainer.innerHTML = '';
    framesContainer.style.display = 'none';
    return;
  }
  framesContainer.style.display = 'flex';
  let html = '';
  item.frames.forEach(svg => {
    html += `<div class="frame-item">${svg}</div>`;
  });
  html += `<div class="frame-item is-question">?</div>`;
  framesContainer.innerHTML = html;
}

// ---------- RENDER: OPSI (teks atau SVG) ----------
function renderOptions(item) {
  optionsContainer.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D', 'E'];

  if (isFiguralItem(item)) {
    // Opsi figural: setiap item.options[i] = { value, svg }
    item.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn has-svg';
      btn.type = 'button';
      btn.dataset.value = opt.value;
      btn.innerHTML = `<span class="opt-letter">${letters[idx]}</span>${opt.svg}`;
      btn.addEventListener('click', () => handleAnswer(btn, opt.value, item));
      optionsContainer.appendChild(btn);
    });
  } else {
    // Opsi teks biasa
    item.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.type = 'button';
      btn.dataset.value = opt;
      btn.innerHTML = `<span class="opt-letter">${letters[idx]}</span><span>${opt}</span>`;
      btn.addEventListener('click', () => handleAnswer(btn, opt, item));
      optionsContainer.appendChild(btn);
    });
  }
}

// ---------- RENDER UTAMA ----------
function updateCardDisplay() {
  const item = currentDeck[currentIndex];
  if (!item) {
    questionText.textContent = 'Tidak ada soal di kategori ini.';
    optionsContainer.innerHTML = '';
    framesContainer.innerHTML = '';
    card.classList.remove('is-figural');
    return;
  }

  card.classList.toggle('is-figural', isFiguralItem(item));

  const badgeLabel = LABEL[currentCategory] || currentCategory.toUpperCase();
  categoryBadge.textContent = badgeLabel;
  backBadge.textContent = badgeLabel;

  questionText.textContent = item.question || '—';

  renderFrames(item);
  renderOptions(item);

  answered = false;
  card.classList.remove('flipped');
  frontHint.textContent = 'Pilih salah satu jawaban di atas';

  // Back side
  const jawabanTampil = isFiguralItem(item)
    ? 'Lihat pada gambar jawaban yang disorot hijau'
    : 'Jawaban: ' + (item.answer || item.correctValue || '—');
  answerText.textContent = jawabanTampil;
  explanationText.textContent = item.explanation || 'Tidak ada penjelasan.';

  if (item.formula) {
    formulaText.textContent = item.formula;
    formulaBox.style.display = 'flex';
  } else {
    formulaBox.style.display = 'none';
  }

  if (item.keyword) {
    keywordText.textContent = item.keyword;
    keywordBox.style.display = 'flex';
  } else {
    keywordBox.style.display = 'none';
  }
  explanationBox.style.display = 'flex';

  cardCounter.textContent = `${currentIndex + 1} / ${currentDeck.length}`;
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === currentDeck.length - 1;
}

// ---------- JAWABAN ----------
function handleAnswer(clickedBtn, chosenValue, item) {
  if (answered) return;
  answered = true;

  const correctValue = String(item.correctValue);
  const chosen = String(chosenValue);
  const buttons = optionsContainer.querySelectorAll('.option-btn');

  buttons.forEach(btn => {
    const val = String(btn.dataset.value);
    if (val === correctValue) {
      btn.classList.add('correct');
    } else if (btn === clickedBtn && val !== correctValue) {
      btn.classList.add('wrong');
    }
    btn.disabled = true;
  });

  if (chosen === correctValue) {
    frontHint.textContent = '✅ Jawaban benar! Klik "Lihat Jawaban" untuk pembahasan.';
  } else {
    frontHint.textContent = '❌ Jawaban salah. Jawaban benar disorot hijau. Klik "Lihat Jawaban".';
  }

  setTimeout(() => card.classList.add('flipped'), 700);
}

// ---------- KATEGORI ----------
function loadCategory(category) {
  currentCategory = category;
  const deck = flashcardsData[category] || [];
  currentDeck = shuffleArray(deck);
  currentIndex = 0;
  answered = false;

  document.querySelectorAll('.menu-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === category);
  });
  updateCardDisplay();
}

document.querySelectorAll('.menu-btn').forEach(btn => {
  btn.addEventListener('click', (e) => loadCategory(e.currentTarget.dataset.category));
});

// ---------- NAVIGASI ----------
prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCardDisplay();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < currentDeck.length - 1) {
    currentIndex++;
    updateCardDisplay();
  }
});

flipBtn.addEventListener('click', () => card.classList.toggle('flipped'));

// ---------- ACAK ----------
shuffleBtn.addEventListener('click', () => {
  if (currentDeck.length === 0) return;
  currentDeck = shuffleArray(currentDeck);
  currentIndex = 0;
  answered = false;
  updateCardDisplay();
  frontHint.textContent = '🎲 Soal telah diacak. Mulai dari kartu pertama.';
});

// Klik kartu (selain opsi) untuk flip
card.addEventListener('click', (e) => {
  if (e.target.closest('.option-btn')) return;
  card.classList.toggle('flipped');
});

// ---------- SHORTCUT KEYBOARD ----------
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'ArrowRight') nextBtn.click();
  if (e.key === ' ' || e.key === 'Space') {
    e.preventDefault();
    flipBtn.click();
  }
  if (e.key === '1') loadCategory('tiu');
  if (e.key === '2') loadCategory('tiuFigural');
  if (e.key === '3') loadCategory('twk');
  if (e.key === '4') loadCategory('tkp');
  if (e.key === '5') loadCategory('mixed');
  if (e.key.toLowerCase() === 'r') shuffleBtn.click();
});

// ---------- INIT ----------
loadCategory('tiu');
console.log(
  '✅ CPNS Flashcard siap. TIU:', soalTIU.length,
  '| TIU Figural:', soalTIUFigural.length,
  '| TWK:', soalTWK.length,
  '| TKP:', soalTKP.length,
  '| Campuran:', soalCampuran.length
);