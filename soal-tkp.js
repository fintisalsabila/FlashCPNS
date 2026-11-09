/* ============================================================
   SOAL TKP — 800 soal (3 opsi: A, B, C)
   ============================================================ */

function _shuffle3t(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function _build3t(correct, distractors) {
  const set = new Set([String(correct)]);
  const opts = [String(correct)];
  for (const d of distractors) {
    if (opts.length >= 3) break;
    const s = String(d);
    if (!set.has(s)) { set.add(s); opts.push(s); }
  }
  return _shuffle3t(opts);
}

// ============================================================
// BANK SOAL DASAR TKP (dikelompokkan per tema)
// ============================================================

// --- Tema 1: Kerja sama & kolaborasi (8 soal) ---
const temaKerjaSama = [
  { q: "Saat rekan kerja Anda mengalami kesulitan menyelesaikan tugas, apa yang Anda lakukan?",
    correct: "Membantu dengan senang hati tanpa diminta",
    d: ["Membiarkan karena bukan tugas saya", "Menunggu diperintah atasan"],
    exp: "Menunjukkan sikap kerja sama dan kepedulian, sesuai nilai TKP profesionalisme.",
    kw: "Kerja sama, empati, inisiatif" },
  { q: "Tim Anda mendapat proyek besar dengan deadline ketat. Sikap Anda?",
    correct: "Berkoordinasi membagi tugas sesuai keahlian",
    d: ["Bekerja sendiri agar cepat selesai", "Menunggu pembagian dari atasan saja"],
    exp: "Kolaborasi dan pembagian tugas efektif mempercepat penyelesaian proyek.",
    kw: "Kolaborasi, koordinasi, tanggung jawab" },
  { q: "Rekan kerja Anda sedang cuti, tetapi pekerjaannya harus selesai. Anda?",
    correct: "Membantu menyelesaikan pekerjaannya dengan koordinasi",
    d: ["Membiarkan karena bukan tanggung jawab saya", "Menunggu atasan menugaskan"],
    exp: "Inisiatif membantu menjaga kelancaran tim tanpa harus diperintah.",
    kw: "Inisiatif, kerja sama, tanggung jawab" },
  { q: "Anda melihat rekan baru kesulitan beradaptasi di kantor. Tindakan Anda?",
    correct: "Membantu mengenalkan lingkungan dan rekan kerja",
    d: ["Membiarkan karena bukan urusan saya", "Menunggu dia bertanya sendiri"],
    exp: "Sikap peduli dan inklusif menciptakan lingkungan kerja yang sehat.",
    kw: "Empati, inklusif, kolaborasi" },
  { q: "Anda dan rekan berbeda pendapat soal cara menyelesaikan tugas. Sikap Anda?",
    correct: "Mendiskusikan bersama untuk mencari solusi terbaik",
    d: ["Memaksakan pendapat sendiri", "Diam dan mengikuti saja"],
    exp: "Musyawarah dan komunikasi terbuka menghasilkan solusi terbaik.",
    kw: "Musyawarah, komunikasi, terbuka" },
  { q: "Rekan kerja Anda mendapat musibah sehingga tidak bisa masuk kerja. Anda?",
    correct: "Menawarkan bantuan untuk meringankan pekerjaannya",
    d: ["Membiarkan karena bukan urusan saya", "Hanya memberi ucapan di media sosial"],
    exp: "Kepedulian sosial terhadap rekan kerja mencerminkan empati.",
    kw: "Empati, kepedulian, solidaritas" },
  { q: "Anda ditunjuk menjadi ketua tim dalam sebuah proyek. Langkah pertama Anda?",
    correct: "Mengadakan rapat koordinasi untuk membagi peran",
    d: ["Bekerja sendiri tanpa melibatkan tim", "Menunggu perintah atasan"],
    exp: "Ketua tim yang baik memulai dengan koordinasi dan pembagian peran.",
    kw: "Kepemimpinan, koordinasi, komunikasi" },
  { q: "Anggota tim Anda pasif dalam diskusi. Sikap Anda sebagai anggota tim?",
    correct: "Mengajak bicara dan memberi kesempatan berpendapat",
    d: ["Membiarkan saja", "Melaporkan ke atasan"],
    exp: "Melibatkan semua anggota menciptakan keputusan yang inklusif.",
    kw: "Inklusif, empati, komunikasi" }
];

// --- Tema 2: Integritas & etika (8 soal) ---
const temaIntegritas = [
  { q: "Rekan kerja Anda berbuat curang dalam pekerjaan. Anda?",
    correct: "Menegur dan mengingatkan konsekuensinya",
    d: ["Ikut-ikutan curang", "Membiarkan agar aman"],
    exp: "Menjaga integritas dan etika kerja adalah bagian dari profesionalisme ASN.",
    kw: "Integritas, etika, keberanian" },
  { q: "Anda menemukan kesalahan dalam laporan rekan yang sudah diserahkan ke atasan. Anda?",
    correct: "Mengingatkan rekan dengan sopan dan membantu perbaikan",
    d: ["Membiarkan saja", "Menyalahkan rekan di depan atasan"],
    exp: "Sikap profesional dengan menjaga hubungan baik dan kualitas hasil kerja.",
    kw: "Profesional, kolaborasi, ketelitian" },
  { q: "Anda ditawari uang oleh pihak luar untuk mempermudah urusan. Sikap Anda?",
    correct: "Menolak dengan tegas dan menjelaskan aturan",
    d: ["Menerima karena menguntungkan", "Menerima jika jumlahnya kecil"],
    exp: "Menolak gratifikasi adalah wujud integritas dan ketaatan pada aturan.",
    kw: "Integritas, antikorupsi, tegas" },
  { q: "Anda mengetahui ada oknum yang meminta pungli di kantor. Anda?",
    correct: "Melaporkan melalui saluran resmi yang tersedia",
    d: ["Diam karena takut", "Ikut meminta pungli"],
    exp: "Melaporkan pelanggaran melalui saluran resmi adalah wujud integritas.",
    kw: "Integritas, keberanian, prosedural" },
  { q: "Anda diberi tugas yang bertentangan dengan aturan. Sikap Anda?",
    correct: "Menolak dengan sopan dan menjelaskan alasan aturannya",
    d: ["Menerima karena takut atasan", "Menerima asal tidak ketahuan"],
    exp: "Ketaatan pada aturan di atas kepatuhan buta pada perintah.",
    kw: "Integritas, tegas, profesional" },
  { q: "Anda menemukan dompet berisi uang di kantor. Anda?",
    correct: "Mencari pemiliknya dan menyerahkan sesuai prosedur",
    d: ["Mengambil uangnya", "Diam saja dan menyimpannya"],
    exp: "Kejujuran dan tanggung jawab adalah fondasi integritas.",
    kw: "Jujur, tanggung jawab, amanah" },
  { q: "Rekan kerja sering memakai fasilitas kantor untuk keperluan pribadi. Anda?",
    correct: "Mengingatkan dengan cara baik agar tidak menyalahgunakan",
    d: ["Ikut memakainya", "Membiarkan saja"],
    exp: "Mengingatkan dengan cara baik adalah bentuk kepedulian dan integritas.",
    kw: "Integritas, peduli, komunikasi" },
  { q: "Anda diminta memalsukan data laporan oleh atasan. Sikap Anda?",
    correct: "Menolak dan menjelaskan konsekuensi hukumnya",
    d: ["Menerima karena atasan yang minta", "Menerima asal tidak diketahui"],
    exp: "Menolak pemalsuan data adalah wujud integritas dan profesionalisme.",
    kw: "Integritas, keberanian, profesional" }
];

// --- Tema 3: Pelayanan publik (8 soal) ---
const temaPelayanan = [
  { q: "Ada masyarakat yang mengeluh soal layanan Anda. Sikap Anda?",
    correct: "Mendengarkan keluhan dan berusaha memberikan solusi",
    d: ["Membiarkan keluhan", "Membalas dengan emosi"],
    exp: "Pelayanan prima dimulai dari mendengar dan merespons keluhan.",
    kw: "Pelayanan prima, empati, solutif" },
  { q: "Masyarakat yang Anda layani terlihat kebingungan soal prosedur. Anda?",
    correct: "Menjelaskan dengan sabar dan bahasa yang mudah",
    d: ["Membiarkan karena bukan tugas saya", "Menyuruh membaca sendiri"],
    exp: "Memberikan penjelasan jelas adalah bagian dari pelayanan publik.",
    kw: "Sabar, komunikatif, pelayanan" },
  { q: "Anda melayani banyak orang sekaligus dengan antrean panjang. Sikap Anda?",
    correct: "Melayani sesuai antrean dan tetap ramah",
    d: ["Melayani yang kenal saja", "Mempercepat agar cepat pulang"],
    exp: "Adil dan ramah dalam pelayanan menciptakan kepercayaan publik.",
    kw: "Adil, ramah, profesional" },
  { q: "Ada masyarakat yang memaksa dilayani di luar prosedur. Anda?",
    correct: "Menjelaskan prosedur dengan sopan dan tegas",
    d: ["Melayani karena kasihan", "Memarahi masyarakat"],
    exp: "Tegas pada prosedur tapi tetap sopan adalah pelayanan profesional.",
    kw: "Tegas, sopan, prosedural" },
  { q: "Anda menerima keluhan yang ternyata bukan kewenangan Anda. Sikap Anda?",
    correct: "Mengarahkan ke unit yang berwenang dengan jelas",
    d: ["Menolak mentah-mentah", "Membiarkan keluhan"],
    exp: "Mengarahkan dengan jelas adalah bentuk pelayanan yang bertanggung jawab.",
    kw: "Solutif, komunikatif, tanggung jawab" },
  { q: "Pelayanan Anda dinilai lambat oleh masyarakat. Sikap Anda?",
    correct: "Evaluasi diri dan perbaiki proses pelayanan",
    d: ["Menyalahkan sistem", "Membiarkan penilaian itu"],
    exp: "Evaluasi diri adalah kunci peningkatan kualitas pelayanan.",
    kw: "Reflektif, perbaikan, profesional" },
  { q: "Anda menemui masyarakat yang tidak bisa membaca. Sikap Anda?",
    correct: "Membantu mengisi formulir dengan sabar",
    d: ["Menyuruh pulang saja", "Membiarkan karena bukan tugas"],
    exp: "Pelayanan inklusif membantu semua lapisan masyarakat.",
    kw: "Empati, inklusif, sabar" },
  { q: "Anda sedang sibuk tetapi ada masyarakat yang butuh bantuan mendesak. Anda?",
    correct: "Membantu sesuai prioritas dengan tetap menyelesaikan tugas",
    d: ["Mengabaikan karena sibuk", "Marah karena diganggu"],
    exp: "Manajemen prioritas dalam pelayanan adalah keterampilan penting.",
    kw: "Prioritas, sigap, pelayanan" }
];

// --- Tema 4: Disiplin & tanggung jawab (8 soal) ---
const temaDisiplin = [
  { q: "Atasan memberi tugas mendesak, namun Anda sedang sibuk. Sikap Anda?",
    correct: "Menyelesaikan sesuai prioritas dengan komunikasi",
    d: ["Menolak karena sibuk", "Mengabaikan tugas baru"],
    exp: "Prioritaskan tugas mendesak sambil tetap berkoordinasi.",
    kw: "Prioritas, komunikasi, tanggung jawab" },
  { q: "Anda diminta lembur mendadak, padahal sudah ada rencana pribadi. Sikap Anda?",
    correct: "Menyanggupi jika memang prioritas kantor, sambil menyesuaikan rencana",
    d: ["Menolak mentah-mentah", "Marah pada atasan"],
    exp: "Menyeimbangkan tanggung jawab kerja dengan kehidupan pribadi secara dewasa.",
    kw: "Tanggung jawab, fleksibel, prioritas" },
  { q: "Ada rekan yang selalu datang terlambat. Anda sebagai anggota tim?",
    correct: "Menegur dengan cara baik dan memberi contoh disiplin",
    d: ["Membiarkan", "Ikut terlambat"],
    exp: "Kepemimpinan dan keteladanan lebih efektif daripada konfrontasi.",
    kw: "Keteladanan, komunikasi, disiplin" },
  { q: "Anda terlambat masuk kerja karena banjir. Sikap Anda?",
    correct: "Memberi kabar ke atasan dan menyusul dengan cepat",
    d: ["Tidak masuk tanpa kabar", "Menyalahkan banjir sepenuhnya"],
    exp: "Komunikasi proaktif menunjukkan tanggung jawab meski ada kendala.",
    kw: "Komunikatif, tanggung jawab, disiplin" },
  { q: "Anda lupa mengerjakan tugas yang diminta atasan. Sikap Anda?",
    correct: "Mengakui dan segera menyelesaikannya",
    d: ["Menyalahkan kesibukan", "Diam dan berharap tidak ditanya"],
    exp: "Mengakui kesalahan dan segera memperbaiki adalah sikap dewasa.",
    kw: "Jujur, tanggung jawab, cepat bertindak" },
  { q: "Anda ingin mengajukan cuti saat ada pekerjaan penting. Sikap Anda?",
    correct: "Menunda cuti atau berkoordinasi agar pekerjaan tetap jalan",
    d: ["Tetap cuti tanpa memikirkan pekerjaan", "Membatalkan cuti dengan kesal"],
    exp: "Menyelaraskan kepentingan pribadi dan pekerjaan adalah sikap profesional.",
    kw: "Prioritas, koordinasi, tanggung jawab" },
  { q: "Anda diberi tugas di luar jam kerja. Sikap Anda?",
    correct: "Menyelesaikan jika memang mendesak, dengan komunikasi jelas",
    d: ["Menolak karena di luar jam kerja", "Mengerjakan asal-asalan"],
    exp: "Fleksibilitas dengan komunikasi jelas mencerminkan tanggung jawab.",
    kw: "Fleksibel, komunikasi, tanggung jawab" },
  { q: "Anda selalu menyelesaikan pekerjaan tepat waktu karena?",
    correct: "Manajemen waktu yang baik dan disiplin diri",
    d: ["Takut dimarahi atasan", "Agar cepat dipromosikan"],
    exp: "Motivasi internal dan disiplin diri lebih berkelanjutan.",
    kw: "Disiplin, manajemen waktu, motivasi internal" }
];

// --- Tema 5: Adaptasi & belajar (8 soal) ---
const temaAdaptasi = [
  { q: "Anda baru dipindah ke divisi yang belum Anda kuasai. Sikap Anda?",
    correct: "Belajar dengan cepat dan bertanya kepada senior",
    d: ["Mengeluh dan minta pindah", "Bekerja seadanya"],
    exp: "Adaptif dan mau belajar adalah kunci sukses di lingkungan kerja baru.",
    kw: "Adaptif, inisiatif belajar, kolaborasi" },
  { q: "Kantor Anda menerapkan sistem baru yang belum Anda pahami. Anda?",
    correct: "Mempelajari sistem baru dan berlatih",
    d: ["Menolak memakai sistem baru", "Menunggu rekan mengajarkan"],
    exp: "Adaptasi terhadap perubahan adalah kompetensi penting ASN.",
    kw: "Adaptif, inisiatif, belajar" },
  { q: "Anda mendapat tugas di bidang yang berbeda dari latar belakang Anda. Anda?",
    correct: "Mempelajari dan berusaha menguasai tugas tersebut",
    d: ["Menolak karena bukan bidang saya", "Mengerjakan asal-asalan"],
    exp: "Kemauan belajar hal baru memperluas kompetensi.",
    kw: "Adaptif, belajar, tanggung jawab" },
  { q: "Anda gagal dalam sebuah tugas. Sikap Anda?",
    correct: "Evaluasi diri dan belajar dari kegagalan",
    d: ["Menyalahkan orang lain", "Menyerah dan tidak mau mencoba lagi"],
    exp: "Kegagalan adalah pelajaran berharga untuk perbaikan.",
    kw: "Reflektif, tangguh, belajar" },
  { q: "Teknologi baru di kantor menggantikan cara kerja lama. Anda?",
    correct: "Mempelajari teknologi baru agar tetap produktif",
    d: ["Menolak karena sudah nyaman dengan cara lama", "Mengandalkan orang lain"],
    exp: "Terbuka pada teknologi baru adalah kunci produktivitas.",
    kw: "Adaptif, terbuka, produktif" },
  { q: "Anda ditugaskan mengikuti pelatihan di luar kota. Sikap Anda?",
    correct: "Mengikuti dengan antusias dan menerapkan hasilnya",
    d: ["Mengikuti karena terpaksa", "Menolak karena repot"],
    exp: "Pelatihan adalah investasi kompetensi yang perlu disyukuri.",
    kw: "Antusias, belajar, pengembangan diri" },
  { q: "Anda harus bekerja dengan rekan dari budaya berbeda. Anda?",
    correct: "Menghargai perbedaan dan menyesuaikan komunikasi",
    d: ["Memaksakan budaya sendiri", "Menghindari interaksi"],
    exp: "Menghargai keberagaman adalah kunci kerja sama lintas budaya.",
    kw: "Toleransi, adaptif, komunikasi" },
  { q: "Anda merasa pekerjaan saat ini membosankan. Sikap Anda?",
    correct: "Mencari cara baru untuk lebih produktif dan berkembang",
    d: ["Bekerja asal-asalan", "Sering mengeluh ke rekan"],
    exp: "Inisiatif dan kreativitas mengatasi kebosanan kerja.",
    kw: "Inisiatif, kreatif, produktif" }
];

// --- Tema 6: Kepemimpinan & pengambilan keputusan (8 soal) ---
const temaKepemimpinan = [
  { q: "Anda mendapat kritik dari atasan di depan tim. Bagaimana sikap Anda?",
    correct: "Menerima dengan lapang dada dan memperbaiki diri",
    d: ["Membantah di depan tim", "Diam dan menyimpan kesal"],
    exp: "Kritik adalah sarana perbaikan diri; sikap dewasa adalah menerima.",
    kw: "Terbuka, profesional, introspeksi" },
  { q: "Anda harus mengambil keputusan penting dengan informasi terbatas. Anda?",
    correct: "Mengumpulkan informasi relevan dan menganalisis risiko",
    d: ["Mengambil keputusan asal-asalan", "Menunda keputusan sampai tak terbatas"],
    exp: "Keputusan baik diambil berdasarkan analisis meski informasi terbatas.",
    kw: "Analitis, keputusan, tanggung jawab" },
  { q: "Ada konflik antar anggota tim Anda. Sikap Anda?",
    correct: "Menjadi penengah dan mencari solusi bersama",
    d: ["Memihak salah satu", "Membiarkan konflik berlarut"],
    exp: "Pemimpin yang baik mampu memediasi konflik secara adil.",
    kw: "Mediasi, adil, kepemimpinan" },
  { q: "Anda memimpin rapat tetapi ada anggota yang mendominasi. Anda?",
    correct: "Mengatur agar semua anggota mendapat kesempatan bicara",
    d: ["Membiarkan yang mendominasi", "Menghentikan rapat dengan marah"],
    exp: "Kepemimpinan yang baik memastikan partisipasi merata.",
    kw: "Adil, inklusif, kepemimpinan" },
  { q: "Tim Anda gagal mencapai target. Sikap Anda sebagai pemimpin?",
    correct: "Mengevaluasi bersama dan menyusun strategi perbaikan",
    d: ["Menyalahkan anggota tim", "Diam saja"],
    exp: "Pemimpin bertanggung jawab dan fokus pada solusi.",
    kw: "Tanggung jawab, evaluatif, solutif" },
  { q: "Anda harus memilih antara dua opsi yang sama-sama menguntungkan. Anda?",
    correct: "Menganalisis berdasarkan prioritas dan dampak jangka panjang",
    d: ["Memilih secara acak", "Menunda hingga orang lain memilih"],
    exp: "Keputusan berdasarkan analisis prioritas lebih bertanggung jawab.",
    kw: "Analitis, prioritas, pengambilan keputusan" },
  { q: "Anggota tim Anda melakukan kesalahan fatal. Sikap Anda?",
    correct: "Menegur secara privat dan memberi kesempatan perbaikan",
    d: ["Memarahi di depan umum", "Membiarkan kesalahan"],
    exp: "Teguran privat lebih efektif dan menjaga martabat.",
    kw: "Bijaksana, kepemimpinan, pembinaan" },
  { q: "Anda mendapat tawaran kolaborasi yang belum jelas manfaatnya. Anda?",
    correct: "Menganalisis manfaat dan risiko sebelum memutuskan",
    d: ["Langsung menerima", "Langsung menolak"],
    exp: "Keputusan berdasarkan analisis risiko adalah kepemimpinan yang baik.",
    kw: "Analitis, hati-hati, keputusan" }
];

// --- Tema 7: Motivasi & pengembangan diri (8 soal) ---
const temaMotivasi = [
  { q: "Anda ingin mengembangkan karier di ASN. Langkah Anda?",
    correct: "Meningkatkan kompetensi melalui belajar dan pelatihan",
    d: ["Mengandalkan kedekatan dengan atasan", "Menunggu promosi otomatis"],
    exp: "Pengembangan diri berbasis kompetensi adalah kunci karier ASN.",
    kw: "Pengembangan diri, belajar, profesional" },
  { q: "Anda merasa rekan Anda lebih cepat naik pangkat. Sikap Anda?",
    correct: "Termotivasi untuk meningkatkan kinerja dan kompetensi",
    d: ["Iri dan menjatuhkan rekan", "Menyerah dan tidak peduli"],
    exp: "Motivasi positif mendorong peningkatan kinerja.",
    kw: "Motivasi, positif, kompetitif" },
  { q: "Anda menganggur di waktu luang. Anda memilih?",
    correct: "Membaca buku atau mengikuti pelatihan online",
    d: ["Bermain media sosial seharian", "Tidur sepanjang hari"],
    exp: "Memanfaatkan waktu luang untuk belajar adalah investasi diri.",
    kw: "Produktif, belajar, pengembangan diri" },
  { q: "Anda ingin memperbaiki kinerja yang dinilai kurang baik. Anda?",
    correct: "Meminta masukan atasan dan menyusun rencana perbaikan",
    d: ["Mengabaikan penilaian", "Menyalahkan penilai"],
    exp: "Menerima masukan dan menyusun rencana perbaikan adalah sikap profesional.",
    kw: "Reflektif, terbuka, perbaikan" },
  { q: "Anda ditawari beasiswa untuk studi lanjut. Sikap Anda?",
    correct: "Mengambil dengan komitmen menerapkan ilmunya",
    d: ["Menolak karena nyaman", "Mengambil tanpa komitmen"],
    exp: "Pengembangan diri harus diikuti komitmen penerapan ilmu.",
    kw: "Antusias, komitmen, pengembangan diri" },
  { q: "Anda merasa cemas menghadapi tantangan kerja baru. Sikap Anda?",
    correct: "Menyiapkan diri sebaik mungkin dan menghadapinya",
    d: ["Menghindari tantangan", "Membiarkan kecemasan menguasai"],
    exp: "Keberanian menghadapi tantangan adalah bagian dari pertumbuhan.",
    kw: "Berani, siap, tangguh" },
  { q: "Anda berhasil menyelesaikan proyek besar. Sikap Anda?",
    correct: "Bersyukur dan tetap rendah hati untuk terus belajar",
    d: ["Sombong dan meremehkan rekan", "Merasa sudah cukup dan berhenti belajar"],
    exp: "Kerendahan hati dan semangat belajar berkelanjutan adalah kunci.",
    kw: "Rendah hati, bersyukur, belajar berkelanjutan" },
  { q: "Anda ingin menjadi pegawai berprestasi. Langkah Anda?",
    correct: "Menetapkan target, disiplin, dan terus mengevaluasi diri",
    d: ["Bekerja hanya saat diawasi", "Mengandalkan keberuntungan"],
    exp: "Prestasi diraih melalui target, disiplin, dan evaluasi berkelanjutan.",
    kw: "Disiplin, target, evaluasi diri" }
];

// --- Tema 8: Komunikasi & hubungan interpersonal (8 soal) ---
const temaKomunikasi = [
  { q: "Anda perlu menyampaikan informasi penting kepada tim. Anda?",
    correct: "Menyampaikan dengan jelas dan memastikan semua paham",
    d: ["Menyampaikan sekilas tanpa konfirmasi", "Menunggu ditanya"],
    exp: "Komunikasi efektif memastikan pesan diterima dengan benar.",
    kw: "Komunikasi efektif, jelas, konfirmasi" },
  { q: "Rekan kerja Anda tersinggung oleh ucapan Anda. Sikap Anda?",
    correct: "Meminta maaf dan menjelaskan maksud baik",
    d: ["Membiarkan karena merasa benar", "Menyalahkan rekan yang sensitif"],
    exp: "Meminta maaf dan komunikasi terbuka menjaga hubungan baik.",
    kw: "Empati, komunikasi, rendah hati" },
  { q: "Anda harus menyampaikan kabar kurang baik ke atasan. Anda?",
    correct: "Menyampaikan dengan jujur dan memberi solusi",
    d: ["Menunda-nunda", "Menyembunyikan masalah"],
    exp: "Kejujuran disertai solusi adalah komunikasi yang bertanggung jawab.",
    kw: "Jujur, solutif, komunikatif" },
  { q: "Rekan kerja Anda berbicara terlalu lama saat rapat. Sikap Anda?",
    correct: "Mengarahkan diskusi kembali ke agenda dengan sopan",
    d: ["Memotong dengan kasar", "Diam saja sampai rapat lama"],
    exp: "Mengarahkan diskusi dengan sopan menjaga efisiensi rapat.",
    kw: "Sopan, tegas, efisien" },
  { q: "Anda bekerja dengan rekan yang pendiam. Sikap Anda?",
    correct: "Mengajak berkomunikasi dengan pendekatan personal",
    d: ["Membiarkan karena bukan urusan", "Memaksa berbicara di depan umum"],
    exp: "Pendekatan personal yang tepat membantu rekan lebih terbuka.",
    kw: "Empati, personal, komunikatif" },
  { q: "Anda menerima pesan penting yang belum jelas. Sikap Anda?",
    correct: "Mengklarifikasi ke sumbernya sebelum bertindak",
    d: ["Bertindak berdasarkan asumsi", "Mengabaikan pesan"],
    exp: "Klarifikasi mencegah kesalahan dalam pelaksanaan tugas.",
    kw: "Klarifikasi, teliti, komunikatif" },
  { q: "Atasan Anda sulit ditemui untuk konsultasi. Sikap Anda?",
    correct: "Mencari waktu yang tepat dan menyiapkan pertanyaan singkat",
    d: ["Mengeluh dan menyerah", "Mengambil keputusan sendiri tanpa konsultasi"],
    exp: "Persiapan dan strategi komunikasi yang baik mengatasi hambatan.",
    kw: "Strategis, sopan, komunikatif" },
  { q: "Anda harus berkomunikasi dengan masyarakat awam soal teknis. Anda?",
    correct: "Menjelaskan dengan bahasa sederhana dan contoh konkret",
    d: ["Menggunakan istilah teknis agar terlihat pintar", "Menolak menjelaskan"],
    exp: "Komunikasi publik yang baik menyesuaikan audiens.",
    kw: "Komunikatif, sederhana, jelas" }
];

// Gabungkan semua tema
const _tkpDasar = [
  ...temaKerjaSama,
  ...temaIntegritas,
  ...temaPelayanan,
  ...temaDisiplin,
  ...temaAdaptasi,
  ...temaKepemimpinan,
  ...temaMotivasi,
  ...temaKomunikasi
];
// Total: 8 tema × 8 soal = 64 soal dasar

// ============================================================
// PERLUASAN: variasi skenario untuk mencapai 800 soal
// Setiap soal dasar akan diproduksi dengan sedikit variasi konteks
// (unit kerja, lawan bicara, situasi) agar terasa berbeda.
// ============================================================

// Variasi konteks untuk memperkaya soal
const _konteks = [
  "", // asli
  " Di instansi pemerintah tempat Anda bekerja, ",
  " Saat jam kerja berlangsung, ",
  " Di tengah kesibukan pekerjaan, ",
  " Ketika menghadapi masa kritis pekerjaan, ",
  " Dalam situasi kerja tim yang kompleks, ",
  " Saat menghadapi tekanan dari lingkungan kerja, ",
  " Di tengah dinamika organisasi yang berubah, ",
  " Dalam kondisi pekerjaan yang tidak menentu, ",
  " Saat menghadapi situasi mendesak, ",
  " Di lingkungan kerja yang baru bagi Anda, ",
  " Ketika bekerja dengan rekan dari latar berbeda, "
];

// Variasi awalan pertanyaan untuk memvariasikan soal
const _awalan = [
  "",
  "Menurut Anda, ",
  "Sebagai ASN, ",
  "Sebagai anggota tim, ",
  "Sebagai pribadi yang profesional, ",
  "Dalam konteks pelayanan publik, ",
  "Dengan mempertimbangkan etika kerja, ",
  "Jika Anda dihadapkan pada situasi ini, "
];

// Variasi opsional tambahan untuk pengecoh umum
const _distraktorUmum = [
  "Diam saja dan tidak melakukan apa-apa",
  "Membiarkan masalah berlarut-larut",
  "Menyalahkan pihak lain",
  "Menunggu perintah atasan",
  "Mengabaikan situasi",
  "Bertindak tanpa berpikir panjang",
  "Menghindari tanggung jawab"
];

const soalTKP = [];
let _idx = 0;
const MAX_SOAL = 800;

while (soalTKP.length < MAX_SOAL) {
  const base = _tkpDasar[_idx % _tkpDasar.length];
  const konteks = _konteks[Math.floor(_idx / _tkpDasar.length) % _konteks.length];
  const awalan = _awalan[Math.floor(_idx / (_tkpDasar.length * _konteks.length)) % _awalan.length];

  // Bangun pertanyaan dengan variasi
  let pertanyaan = base.q;
  if (konteks && !pertanyaan.startsWith(konteks.trim())) {
    pertanyaan = konteks.trim() + " " + pertanyaan.charAt(0).toLowerCase() + pertanyaan.slice(1);
  }
  if (awalan) {
    pertanyaan = awalan + pertanyaan.charAt(0).toLowerCase() + pertanyaan.slice(1);
  }

  // Gabungkan distraktor dasar dengan distraktor umum untuk variasi
  const distraktorTambahan = _distraktorUmum[_idx % _distraktorUmum.length];
  const distractors = [...base.d, distraktorTambahan];

  soalTKP.push({
    question: pertanyaan,
    options: _build3t(base.correct, distractors),
    correctValue: base.correct,
    answer: base.correct,
    explanation: base.exp,
    keyword: base.kw
  });

  _idx++;
}

console.assert(soalTKP.length === 800, 'TKP harus 800, dapat: ' + soalTKP.length);