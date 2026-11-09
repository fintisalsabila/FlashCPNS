/* ============================================================
   LOGIKA UTAMA FLASHCARD (dengan fitur Acak yang diperbaiki)
   ============================================================ */

const flashcardsData = {
  tiu: soalTIU,
  twk: soalTWK,
  tkp: soalTKP,
  mixed: soalCampuran
};

// Update jumlah soal di menu
document.getElementById('countTiu').textContent = soalTIU.length;
document.getElementById('countTwk').textContent = soalTWK.length;
document.getElementById('countTkp').textContent = soalTKP.length;

// ---------- STATE ----------
let currentCategory = 'tiu';
let currentIndex = 0;
let currentDeck = [...soalTIU];
let answered = false;

// ---------- DOM ----------
const card = document.getElementById('flashcard');
const questionText = document.getElementById('questionText');
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

// ---------- UTIL: Fisher–Yates shuffle ----------
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------- RENDER ----------
function updateCardDisplay() {
  const item = currentDeck[currentIndex];
  if (!item) return;

  const cat = currentCategory;
  const badgeLabel = cat === 'mixed' ? 'CAMPURAN' : cat.toUpperCase();
  categoryBadge.textContent = badgeLabel;
  backBadge.textContent = badgeLabel;

  questionText.textContent = item.question || '—';

  // Render 3 opsi (A, B, C)
  optionsContainer.innerHTML = '';
  const letters = ['A', 'B', 'C'];
  item.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.type = 'button';
    btn.innerHTML = `<span class="opt-letter">${letters[idx]}</span><span>${opt}</span>`;
    btn.dataset.value = opt;
    btn.addEventListener('click', () => handleAnswer(btn, opt, item));
    optionsContainer.appendChild(btn);
  });

  answered = false;
  card.classList.remove('flipped');
  frontHint.textContent = 'Pilih salah satu jawaban di atas';

  answerText.textContent = 'Jawaban: ' + (item.answer || item.correctValue || '—');
  explanationText.textContent = item.explanation || 'Tidak ada penjelasan.';

  // Rumus cepat (TIU)
  if (item.formula) {
    formulaText.textContent = item.formula;
    formulaBox.style.display = 'flex';
  } else {
    formulaBox.style.display = 'none';
  }

  // Kata kunci (TKP)
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
  const buttons = optionsContainer.querySelectorAll('.option-btn');

  buttons.forEach(btn => {
    const val = String(btn.dataset.value);
    if (val === correctValue) {
      btn.classList.add('correct');
    } else if (btn === clickedBtn) {
      btn.classList.add('wrong');
    }
    btn.disabled = true;
  });

  if (String(chosenValue) === correctValue) {
    frontHint.textContent = '✅ Jawaban benar! Klik "Lihat Jawaban" untuk pembahasan.';
  } else {
    frontHint.textContent = `❌ Salah. Jawaban benar: ${correctValue}. Klik "Lihat Jawaban".`;
  }

  setTimeout(() => card.classList.add('flipped'), 700);
}

// ---------- KATEGORI ----------
function loadCategory(category) {
  currentCategory = category;
  // Acak deck saat pertama kali dimuat agar variatif
  currentDeck = shuffleArray(flashcardsData[category]);
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

// ---------- FITUR ACAK (DIPERBAIKI) ----------
// Sekarang: acak seluruh deck -> reset ke kartu pertama -> render ulang
// Efeknya user melihat kartu acak baru setiap kali tombol Acak diklik.
shuffleBtn.addEventListener('click', () => {
  currentDeck = shuffleArray(currentDeck);
  currentIndex = 0;
  answered = false;
  updateCardDisplay();
  // Feedback singkat
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
  if (e.key === '2') loadCategory('twk');
  if (e.key === '3') loadCategory('tkp');
  if (e.key === '4') loadCategory('mixed');
  if (e.key.toLowerCase() === 'r') shuffleBtn.click();
});

// ---------- INIT ----------
loadCategory('tiu');
console.log(
  '✅ CPNS Flashcard siap. TIU:', soalTIU.length,
  '| TWK:', soalTWK.length,
  '| TKP:', soalTKP.length,
  '| Campuran:', soalCampuran.length
);