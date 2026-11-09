/* ============================================================
   SOAL CAMPURAN (TIU + TWK + TKP) — 900 soal, 3 opsi
   ============================================================ */

function _shuffleMix(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Ambil proporsional: 300 TIU + 300 TWK + 300 TKP = 900
const _tiuPick = _shuffleMix(soalTIU).slice(0, 300);
const _twkPick = _shuffleMix(soalTWK).slice(0, 300);
const _tkpPick = _shuffleMix(soalTKP).slice(0, 300);

// Gabungkan lalu acak urutannya agar bervariasi
const soalCampuran = _shuffleMix([..._tiuPick, ..._twkPick, ..._tkpPick]);

console.assert(soalCampuran.length === 900, 'Campuran harus 900, dapat: ' + soalCampuran.length);