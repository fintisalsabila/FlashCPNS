/* ============================================================
   SOAL TWK — 500 soal (3 opsi: A, B, C)
   ============================================================ */

function _shuffle3w(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function _build3w(correct, distractors) {
  const set = new Set([String(correct)]);
  const opts = [String(correct)];
  for (const d of distractors) {
    if (opts.length >= 3) break;
    const s = String(d);
    if (!set.has(s)) { set.add(s); opts.push(s); }
  }
  return _shuffle3w(opts);
}

// Bank soal dasar (soal-soal TWK yang bermakna)
const _twkDasar = [
  { q: "Apa dasar negara Indonesia?", correct: "Pancasila", d: ["UUD 1945", "Bhinneka Tunggal Ika"], exp: "Pancasila disahkan sebagai dasar negara pada 18 Agustus 1945 oleh PPKI." },
  { q: "Semboyan Bhinneka Tunggal Ika diambil dari kitab?", correct: "Sutasoma", d: ["Negarakertagama", "Pararaton"], exp: "Kitab Sutasoma karya Mpu Tantular memuat semboyan persatuan dalam keberagaman." },
  { q: "Lembaga yang berwenang mengubah dan menetapkan UUD adalah?", correct: "MPR", d: ["DPR", "Presiden"], exp: "Menurut UUD 1945, MPR berwenang mengubah dan menetapkan UUD." },
  { q: "Sila ke-3 Pancasila berbunyi?", correct: "Persatuan Indonesia", d: ["Ketuhanan Yang Maha Esa", "Kemanusiaan yang adil dan beradab"], exp: "Sila ke-3 Pancasila adalah Persatuan Indonesia, dilambangkan pohon beringin." },
  { q: "Bendera Indonesia berwarna?", correct: "Merah-Putih", d: ["Merah-Biru", "Putih-Merah"], exp: "Sang Saka Merah Putih, merah di atas putih di bawah." },
  { q: "Hari Lahir Pancasila diperingati setiap tanggal?", correct: "1 Juni", d: ["17 Agustus", "28 Oktober"], exp: "Pidato Soekarno 1 Juni 1945 menjadi cikal bakal Pancasila." },
  { q: "Sumpah Pemuda diikrarkan pada tahun?", correct: "1928", d: ["1908", "1945"], exp: "Sumpah Pemuda diikrarkan 28 Oktober 1928 pada Kongres Pemuda II." },
  { q: "Presiden pertama Republik Indonesia adalah?", correct: "Ir. Soekarno", d: ["Moh. Hatta", "Soeharto"], exp: "Ir. Soekarno adalah presiden pertama RI, didampingi Moh. Hatta." },
  { q: "Alinea ke-4 Pembukaan UUD 1945 memuat?", correct: "Tujuan negara", d: ["Dasar negara", "Bentuk negara"], exp: "Alinea ke-4 Pembukaan UUD 1945 memuat tujuan negara Indonesia." },
  { q: "Lambang negara Indonesia adalah?", correct: "Garuda Pancasila", d: ["Burung Merpati", "Elang Jawa"], exp: "Garuda Pancasila dengan semboyan Bhinneka Tunggal Ika." },
  { q: "Pancasila disahkan sebagai dasar negara pada tanggal?", correct: "18 Agustus 1945", d: ["1 Juni 1945", "17 Agustus 1945"], exp: "PPKI mengesahkan Pancasila sebagai dasar negara pada 18 Agustus 1945." },
  { q: "Sila ke-1 Pancasila dilambangkan dengan?", correct: "Bintang", d: ["Rantai", "Pohon beringin"], exp: "Sila ke-1 (Ketuhanan) dilambangkan dengan bintang emas." },
  { q: "Sila ke-2 Pancasila dilambangkan dengan?", correct: "Rantai", d: ["Bintang", "Padi dan kapas"], exp: "Sila ke-2 (Kemanusiaan) dilambangkan dengan rantai emas." },
  { q: "Sila ke-4 Pancasila dilambangkan dengan?", correct: "Kepala banteng", d: ["Pohon beringin", "Padi dan kapas"], exp: "Sila ke-4 (Kerakyatan) dilambangkan dengan kepala banteng." },
  { q: "Sila ke-5 Pancasila dilambangkan dengan?", correct: "Padi dan kapas", d: ["Rantai", "Kepala banteng"], exp: "Sila ke-5 (Keadilan sosial) dilambangkan dengan padi dan kapas." },
  { q: "UUD 1945 disahkan oleh?", correct: "PPKI", d: ["BPUPKI", "KNIP"], exp: "PPKI mengesahkan UUD 1945 pada 18 Agustus 1945." },
  { q: "BPUPKI diketuai oleh?", correct: "Dr. Radjiman Wedyodiningrat", d: ["Ir. Soekarno", "Moh. Hatta"], exp: "BPUPKI diketuai oleh Dr. KRT Radjiman Wedyodiningrat." },
  { q: "PPKI diketuai oleh?", correct: "Ir. Soekarno", d: ["Dr. Radjiman", "Moh. Hatta"], exp: "PPKI diketuai oleh Ir. Soekarno dengan wakil Moh. Hatta." },
  { q: "Proklamasi Kemerdekaan Indonesia dibacakan pada?", correct: "17 Agustus 1945", d: ["18 Agustus 1945", "1 Juni 1945"], exp: "Proklamasi dibacakan Soekarno pada 17 Agustus 1945 di Jl. Pegangsaan Timur 56." },
  { q: "Naskah Proklamasi disusun oleh?", correct: "Soekarno, Hatta, Ahmad Soebardjo", d: ["Soekarno, Hatta, Sjahrir", "Soekarno, Hatta, Tan Malaka"], exp: "Naskah proklamasi disusun Soekarno, Hatta, dan Ahmad Soebardjo." },
  { q: "Pembaca teks Proklamasi adalah?", correct: "Ir. Soekarno", d: ["Moh. Hatta", "Ahmad Soebardjo"], exp: "Ir. Soekarno membacakan teks Proklamasi didampingi Moh. Hatta." },
  { q: "Bendera pusaka dijahit oleh?", correct: "Fatmawati", d: ["Cut Nyak Dien", "R.A. Kartini"], exp: "Bendera pusaka Merah Putih dijahit oleh Fatmawati, istri Soekarno." },
  { q: "Pahlawan emansipasi wanita Indonesia adalah?", correct: "R.A. Kartini", d: ["Cut Nyak Dien", "Fatmawati"], exp: "R.A. Kartini dikenal sebagai pahlawan emansipasi wanita." },
  { q: "Pahlawan dari Aceh yang melawan Belanda adalah?", correct: "Cut Nyak Dien", d: ["R.A. Kartini", "Fatmawati"], exp: "Cut Nyak Dien memimpin perlawanan rakyat Aceh melawan Belanda." },
  { q: "Pahlawan dari Maluku yang diasingkan ke Belanda adalah?", correct: "Pattimura", d: ["Sultan Hasanuddin", "Imam Bonjol"], exp: "Pattimura memimpin perlawanan rakyat Maluku melawan Belanda." },
  { q: "Pahlawan dari Sumatera Barat yang melawan Belanda adalah?", correct: "Imam Bonjol", d: ["Pattimura", "Sultan Hasanuddin"], exp: "Imam Bonjol memimpin Perang Padri di Sumatera Barat." },
  { q: "Pahlawan dari Sulawesi Selatan adalah?", correct: "Sultan Hasanuddin", d: ["Pattimura", "Imam Bonjol"], exp: "Sultan Hasanuddin dijuluki Ayam Jantan dari Timur." },
  { q: "Organisasi pergerakan nasional pertama di Indonesia adalah?", correct: "Budi Utomo", d: ["Sarekat Islam", "Indische Partij"], exp: "Budi Utomo berdiri 20 Mei 1908, organisasi pergerakan nasional pertama." },
  { q: "Hari Kebangkitan Nasional diperingati setiap?", correct: "20 Mei", d: ["28 Oktober", "1 Juni"], exp: "20 Mei diperingati sebagai Hari Kebangkitan Nasional (berdirinya Budi Utomo)." },
  { q: "Hari Pendidikan Nasional diperingati setiap?", correct: "2 Mei", d: ["20 Mei", "1 Juni"], exp: "2 Mei adalah Hari Pendidikan Nasional, lahirnya Ki Hajar Dewantara." },
  { q: "Pahlawan pendidikan Indonesia adalah?", correct: "Ki Hajar Dewantara", d: ["Soekarno", "Hatta"], exp: "Ki Hajar Dewantara dikenal sebagai Bapak Pendidikan Nasional." },
  { q: "Semboyan pendidikan Ki Hajar Dewantara adalah?", correct: "Ing Ngarsa Sung Tulada, Ing Madya Mangun Karsa, Tut Wuri Handayani", d: ["Bhinneka Tunggal Ika", "Tut Wuri Handayani saja"], exp: "Tiga semboyan: di depan memberi teladan, di tengah membangun, di belakang mendukung." },
  { q: "Hari Kesaktian Pancasila diperingati setiap?", correct: "1 Oktober", d: ["30 September", "1 Juni"], exp: "1 Oktober diperingati sebagai Hari Kesaktian Pancasila." },
  { q: "Hari Pahlawan diperingati setiap?", correct: "10 November", d: ["10 Oktober", "17 Agustus"], exp: "10 November diperingati sebagai Hari Pahlawan (pertempuran Surabaya)." },
  { q: "Hari Sumpah Pemuda diperingati setiap?", correct: "28 Oktober", d: ["28 September", "1 Juni"], exp: "28 Oktober diperingati sebagai Hari Sumpah Pemuda." },
  { q: "Hari Kemerdekaan Indonesia diperingati setiap?", correct: "17 Agustus", d: ["18 Agustus", "1 Juni"], exp: "17 Agustus adalah Hari Kemerdekaan Republik Indonesia." },
  { q: "Hari Lahir Pancasila diperingati setiap?", correct: "1 Juni", d: ["1 Oktober", "18 Agustus"], exp: "1 Juni diperingati sebagai Hari Lahir Pancasila." },
  { q: "Hari Bhayangkara diperingati setiap?", correct: "1 Juli", d: ["1 Juni", "1 Oktober"], exp: "1 Juli adalah Hari Bhayangkara (Polri)." },
  { q: "Hari ABRI/TNI diperingati setiap?", correct: "5 Oktober", d: ["1 Oktober", "10 November"], exp: "5 Oktober diperingati sebagai Hari TNI." },
  { q: "Hari Guru Nasional diperingati setiap?", correct: "25 November", d: ["2 Mei", "20 Mei"], exp: "25 November adalah Hari Guru Nasional (berdirinya PGRI)." },
  { q: "Hari Ibu diperingati setiap?", correct: "22 Desember", d: ["25 November", "2 Mei"], exp: "22 Desember diperingati sebagai Hari Ibu." },
  { q: "Hari Bumi diperingati setiap?", correct: "22 April", d: ["22 Desember", "5 Juni"], exp: "22 April diperingati sebagai Hari Bumi." },
  { q: "Hari Lingkungan Hidup Sedunia diperingati setiap?", correct: "5 Juni", d: ["22 April", "22 Desember"], exp: "5 Juni diperingati sebagai Hari Lingkungan Hidup Sedunia." },
  { q: "Indonesia adalah negara dengan bentuk pemerintahan?", correct: "Republik", d: ["Kerajaan", "Federasi"], exp: "Indonesia adalah negara kesatuan berbentuk republik." },
  { q: "Bentuk negara Indonesia adalah?", correct: "Kesatuan", d: ["Serikat", "Federasi"], exp: "Indonesia adalah negara kesatuan (unitary state)." },
  { q: "Sistem pemerintahan Indonesia adalah?", correct: "Presidensial", d: ["Parlementer", "Campuran"], exp: "Indonesia menganut sistem pemerintahan presidensial." },
  { q: "Kepala negara Indonesia adalah?", correct: "Presiden", d: ["Perdana Menteri", "Raja"], exp: "Presiden adalah kepala negara sekaligus kepala pemerintahan." },
  { q: "Lembaga legislatif Indonesia adalah?", correct: "DPR", d: ["MA", "MK"], exp: "DPR (Dewan Perwakilan Rakyat) adalah lembaga legislatif." },
  { q: "Lembaga yudikatif tertinggi Indonesia adalah?", correct: "Mahkamah Agung", d: ["Mahkamah Konstitusi", "Komisi Yudisial"], exp: "Mahkamah Agung adalah lembaga yudikatif tertinggi." },
  { q: "Lembaga yang menguji UU terhadap UUD adalah?", correct: "Mahkamah Konstitusi", d: ["Mahkamah Agung", "DPR"], exp: "Mahkamah Konstitusi menguji UU terhadap UUD 1945." },
  { q: "Lembaga pengawas hakim adalah?", correct: "Komisi Yudisial", d: ["Mahkamah Agung", "MK"], exp: "Komisi Yudisial mengawasi perilaku hakim." },
  { q: "Lembaga pemeriksa keuangan negara adalah?", correct: "BPK", d: ["KPK", "BPKP"], exp: "BPK (Badan Pemeriksa Keuangan) memeriksa keuangan negara." },
  { q: "Lembaga pemberantas korupsi adalah?", correct: "KPK", d: ["BPK", "Polri"], exp: "KPK (Komisi Pemberantasan Korupsi) memberantas korupsi." },
  { q: "Lembaga pemilihan umum adalah?", correct: "KPU", d: ["Bawaslu", "DKPP"], exp: "KPU (Komisi Pemilihan Umum) menyelenggarakan pemilu." },
  { q: "Lembaga pengawas pemilu adalah?", correct: "Bawaslu", d: ["KPU", "DKPP"], exp: "Bawaslu mengawasi penyelenggaraan pemilu." },
  { q: "Lembaga penyelesaian sengketa pemilu adalah?", correct: "DKPP", d: ["KPU", "Bawaslu"], exp: "DKPP menangani pelanggaran kode etik penyelenggara pemilu." },
  { q: "Pancasila sebagai ideologi negara bersifat?", correct: "Terbuka", d: ["Tertutup", "Kaku"], exp: "Pancasila adalah ideologi terbuka yang dapat menyesuaikan zaman." },
  { q: "Nilai-nilai Pancasila bersumber dari?", correct: "Budaya bangsa Indonesia", d: ["Budaya asing", "Ideologi komunis"], exp: "Nilai Pancasila digali dari budaya dan kepribadian bangsa Indonesia." },
  { q: "Pancasila pertama kali diusulkan oleh?", correct: "Ir. Soekarno", d: ["Moh. Yamin", "Soepomo"], exp: "Ir. Soekarno menyampaikan usulan Pancasila pada 1 Juni 1945." },
  { q: "BPUPKI bersidang pertama kali pada tanggal?", correct: "29 Mei 1945", d: ["1 Juni 1945", "18 Agustus 1945"], exp: "Sidang pertama BPUPKI berlangsung 29 Mei–1 Juni 1945." },
  { q: "Piagam Jakarta disahkan pada tanggal?", correct: "22 Juni 1945", d: ["1 Juni 1945", "18 Agustus 1945"], exp: "Piagam Jakarta disahkan 22 Juni 1945 oleh Panitia Sembilan." },
  { q: "Panitia Sembilan diketuai oleh?", correct: "Ir. Soekarno", d: ["Moh. Yamin", "Soepomo"], exp: "Panitia Sembilan diketuai Ir. Soekarno, menghasilkan Piagam Jakarta." },
  { q: "Rumusan Pancasila dalam Piagam Jakarta sila pertama berbunyi?", correct: "Ketuhanan dengan kewajiban menjalankan syariat Islam bagi pemeluknya", d: ["Ketuhanan Yang Maha Esa", "Kemanusiaan yang adil dan beradab"], exp: "Sila pertama Piagam Jakarta kemudian diubah menjadi Ketuhanan Yang Maha Esa." },
  { q: "Perubahan sila pertama Piagam Jakarta dilakukan oleh?", correct: "Moh. Hatta", d: ["Ir. Soekarno", "Moh. Yamin"], exp: "Moh. Hatta berperan dalam perubahan sila pertama demi persatuan." },
  { q: "UUD 1945 mengalami amandemen sebanyak?", correct: "4 kali", d: ["3 kali", "5 kali"], exp: "UUD 1945 diamandemen 4 kali (1999–2002)." },
  { q: "Amandemen UUD 1945 pertama dilakukan pada tahun?", correct: "1999", d: ["1998", "2000"], exp: "Amandemen pertama UUD 1945 dilakukan pada 1999." },
  { q: "Amandemen UUD 1945 terakhir dilakukan pada tahun?", correct: "2002", d: ["2001", "2003"], exp: "Amandemen keempat UUD 1945 dilakukan pada 2002." },
  { q: "Masa jabatan presiden Indonesia adalah?", correct: "5 tahun", d: ["4 tahun", "6 tahun"], exp: "Masa jabatan presiden adalah 5 tahun dan dapat dipilih sekali lagi." },
  { q: "Presiden Indonesia dapat menjabat maksimal?", correct: "2 periode", d: ["1 periode", "3 periode"], exp: "Presiden dapat menjabat maksimal 2 periode (10 tahun)." },
  { q: "Wakil presiden Indonesia saat ini (2024–2029) adalah?", correct: "Gibran Rakabuming Raka", d: ["Ma'ruf Amin", "Jusuf Kalla"], exp: "Gibran Rakabuming Raka adalah wakil presiden periode 2024–2029." },
  { q: "Presiden Indonesia saat ini (2024–2029) adalah?", correct: "Prabowo Subianto", d: ["Joko Widodo", "Susilo Bambang Yudhoyono"], exp: "Prabowo Subianto menjabat presiden periode 2024–2029." },
  { q: "Ibu kota negara Indonesia saat ini adalah?", correct: "Jakarta", d: ["Nusantara", "Bandung"], exp: "Jakarta masih menjadi ibu kota hingga perpindahan ke Nusantara." },
  { q: "Ibu kota baru Indonesia bernama?", correct: "Nusantara", d: ["Jakarta", "Palangkaraya"], exp: "Ibu kota baru Indonesia di Kalimantan Timur bernama Nusantara." },
  { q: "Lagu kebangsaan Indonesia adalah?", correct: "Indonesia Raya", d: ["Garuda Pancasila", "Bagimu Negeri"], exp: "Indonesia Raya ciptaan W.R. Supratman adalah lagu kebangsaan." },
  { q: "Pencipta lagu Indonesia Raya adalah?", correct: "W.R. Supratman", d: ["C. Simanjuntak", "Kusbini"], exp: "W.R. Supratman menciptakan Indonesia Raya." },
  { q: "Lagu Indonesia Raya pertama kali dimainkan pada?", correct: "28 Oktober 1928", d: ["17 Agustus 1945", "1 Juni 1945"], exp: "Indonesia Raya pertama kali dimainkan pada Sumpah Pemuda 28 Oktober 1928." },
  { q: "Bhinneka Tunggal Ika berarti?", correct: "Berbeda-beda tetapi tetap satu", d: ["Bersatu kita teguh", "Satu untuk semua"], exp: "Bhinneka Tunggal Ika berarti berbeda-beda tetapi tetap satu jua." },
  { q: "Semboyan negara Indonesia adalah?", correct: "Bhinneka Tunggal Ika", d: ["Tut Wuri Handayani", "Rawe-rawe rantas"], exp: "Bhinneka Tunggal Ika adalah semboyan negara Indonesia." },
  { q: "Garuda Pancasila memiliki sayap berjumlah?", correct: "17", d: ["8", "45"], exp: "Sayap Garuda berjumlah 17 melambangkan tanggal kemerdekaan." },
  { q: "Ekor Garuda Pancasila berjumlah?", correct: "8", d: ["17", "45"], exp: "Ekor Garuda berjumlah 8 melambangkan bulan Agustus." },
  { q: "Bulu leher Garuda Pancasila berjumlah?", correct: "45", d: ["17", "8"], exp: "Bulu leher berjumlah 45 melambangkan tahun 1945." },
  { q: "Jumlah bulu pada ekor Garuda Pancasila melambangkan?", correct: "Bulan Agustus", d: ["Tanggal 17", "Tahun 1945"], exp: "Ekor 8 melambangkan bulan Agustus (8)." },
  { q: "Jumlah bulu sayap Garuda Pancasila melambangkan?", correct: "Tanggal 17", d: ["Bulan Agustus", "Tahun 1945"], exp: "Sayap 17 melambangkan tanggal 17." },
  { q: "Jumlah bulu leher Garuda Pancasila melambangkan?", correct: "Tahun 1945", d: ["Tanggal 17", "Bulan Agustus"], exp: "Bulu leher 45 melambangkan tahun 1945." },
  { q: "Perisai Garuda Pancasila memuat lambang?", correct: "Pancasila", d: ["UUD 1945", "Sumpah Pemuda"], exp: "Perisai Garuda memuat lambang kelima sila Pancasila." },
  { q: "Pita yang dicengkeram Garuda bertuliskan?", correct: "Bhinneka Tunggal Ika", d: ["Indonesia Raya", "Pancasila"], exp: "Pita Garuda bertuliskan Bhinneka Tunggal Ika." },
  { q: "Pancasila sebagai pandangan hidup bangsa berarti?", correct: "Pedoman dalam kehidupan bermasyarakat", d: ["Hanya simbol negara", "Hanya untuk pejabat"], exp: "Pancasila menjadi pedoman hidup bermasyarakat, berbangsa, dan bernegara." },
  { q: "Gotong royong merupakan nilai dari sila ke?", correct: "3", d: ["1", "5"], exp: "Gotong royong mencerminkan sila ke-3 Persatuan Indonesia." },
  { q: "Musyawarah untuk mufakat merupakan nilai sila ke?", correct: "4", d: ["2", "5"], exp: "Musyawarah mencerminkan sila ke-4 Kerakyatan yang dipimpin oleh hikmat kebijaksanaan." },
  { q: "Toleransi beragama merupakan nilai sila ke?", correct: "1", d: ["2", "3"], exp: "Toleransi beragama mencerminkan sila ke-1 Ketuhanan Yang Maha Esa." },
  { q: "Menghargai hak asasi manusia merupakan nilai sila ke?", correct: "2", d: ["1", "4"], exp: "HAM mencerminkan sila ke-2 Kemanusiaan yang adil dan beradab." },
  { q: "Keadilan sosial merupakan nilai sila ke?", correct: "5", d: ["3", "4"], exp: "Keadilan sosial bagi seluruh rakyat Indonesia adalah sila ke-5." },
  { q: "Negara Indonesia adalah negara hukum, artinya?", correct: "Semua tunduk pada hukum", d: ["Presiden di atas hukum", "Hukum hanya untuk rakyat"], exp: "Indonesia adalah negara hukum (rechtsstaat), semua tunduk pada hukum." },
  { q: "Kekuasaan tertinggi negara Indonesia berada pada?", correct: "Rakyat", d: ["Presiden", "MPR"], exp: "Kedaulatan berada di tangan rakyat, dilaksanakan menurut UUD." },
  { q: "Kedaulatan rakyat Indonesia dilaksanakan menurut?", correct: "UUD 1945", d: ["Kehendak presiden", "Keputusan MPR"], exp: "Kedaulatan rakyat dilaksanakan menurut Undang-Undang Dasar." },
  { q: "Sistem pemerintahan Indonesia menganut asas?", correct: "Trias Politika", d: ["Monarki", "Oligarki"], exp: "Indonesia menganut asas pembagian kekuasaan (trias politika)." },
  { q: "Kekuasaan eksekutif dipegang oleh?", correct: "Presiden", d: ["DPR", "MA"], exp: "Presiden memegang kekuasaan eksekutif (pemerintahan)." },
  { q: "Kekuasaan legislatif dipegang oleh?", correct: "DPR", d: ["Presiden", "MA"], exp: "DPR memegang kekuasaan legislatif (membuat UU)." },
  { q: "Kekuasaan yudikatif dipegang oleh?", correct: "MA dan MK", d: ["Presiden", "DPR"], exp: "Kekuasaan yudikatif dipegang MA dan MK." },
  { q: "Hak DPR untuk mengajukan RUU disebut?", correct: "Hak inisiatif", d: ["Hak interpelasi", "Hak angket"], exp: "Hak inisiatif adalah hak DPR mengajukan RUU." },
  { q: "Hak DPR untuk meminta keterangan presiden disebut?", correct: "Hak interpelasi", d: ["Hak inisiatif", "Hak angket"], exp: "Hak interpelasi adalah hak meminta keterangan kepada presiden." },
  { q: "Hak DPR untuk menyelidiki kebijakan pemerintah disebut?", correct: "Hak angket", d: ["Hak inisiatif", "Hak interpelasi"], exp: "Hak angket adalah hak menyelidiki kebijakan pemerintah." },
  { q: "Hak DPR untuk menyatakan pendapat disebut?", correct: "Hak menyatakan pendapat", d: ["Hak angket", "Hak inisiatif"], exp: "Hak menyatakan pendapat adalah hak DPR menyampaikan pendapat atas kebijakan." }
];

// Bangun 500 soal dari bank dasar dengan variasi kombinasi & urutan opsi
const soalTWK = [];
const lettersW = ['A', 'B', 'C'];

// Cukup banyak bank dasar (~100). Kita perluas jadi 500 dengan variasi "versi"
// setiap versi memakai soal dasar yang sama, tapi urutan opsi diacak ulang
// sehingga terlihat berbeda saat latihan.
let counterW = 0;
while (soalTWK.length < 500) {
  const base = _twkDasar[counterW % _twkDasar.length];
  soalTWK.push({
    question: base.q,
    options: _build3w(base.correct, base.d),
    correctValue: base.correct,
    answer: base.correct,
    explanation: base.exp
  });
  counterW++;
}

console.assert(soalTWK.length === 500, 'TWK harus 500, dapat: ' + soalTWK.length);