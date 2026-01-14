
export interface Scores {
    darkTriad?: number;
    emotionalHealth?: number;
    attachment?: {
        secure?: number;
        anxious?: number;
        avoidant?: number;
        fearfulAvoidant?: number;
    };
    trauma?: {
        fight?: number;
        flight?: number;
        freeze?: number;
        fawn?: number;
    };
    // Light Metrics
    optimism?: number;
    resilience?: number;
    growth?: number;
    empathy?: number;
    selfAwareness?: number;
    balance?: number;
    emotionalIntelligence?: number;
}

export interface Option {
    id: string;
    text: string;
    scores: Partial<Scores>;
}

export interface Question {
    id: number;
    question: string;
    options: Option[];
}

export const questions: Question[] = [
    {
        id: 1,
        question: "Bus yang lo tunggu telat 30 menit pas lagi hujan deres. Reaksi lo?",
        options: [
            { id: '1A', text: 'Ngomel ke supir pas naik, "Lama banget sih, Pak!"', scores: { darkTriad: 6, trauma: { fight: 5 }, emotionalHealth: 1 } },
            { id: '1B', text: 'Buka HP, scrolling medsos sampe lupa waktu', scores: { darkTriad: 2, trauma: { flight: 6 }, emotionalHealth: 2 } },
            { id: '1C', text: 'Diem aja sambil basah kuyup, ngutuk dalem hati', scores: { darkTriad: 3, trauma: { freeze: 5 }, emotionalHealth: 1 } },
            { id: '1D', text: 'Bantu orang lain yang juga kehujanan', scores: { darkTriad: 0, trauma: { fawn: 6 }, emotionalHealth: 3 } }
        ]
    },
    {
        id: 2,
        question: "Keluarga lagi bandingin lo sama sepupu yang 'katanya' lebih sukses. Jawaban lo?",
        options: [
            { id: '2A', text: '"Yaelah, gue sebenernya lebih keren kok," (dalem hati)', scores: { darkTriad: 5, attachment: { avoidant: 5 }, emotionalHealth: 1 } },
            { id: '2B', text: 'Diem, lanjut makan, pura-pura denger musik', scores: { darkTriad: 2, attachment: { anxious: 4 }, trauma: { freeze: 6 }, emotionalHealth: 2 } },
            { id: '2C', text: '"Iya nih, doain ya gue bisa nyusul," (senyum pepsodent)', scores: { darkTriad: 1, trauma: { fawn: 5 }, emotionalHealth: 3 } },
            { id: '2D', text: 'Balik nanya santai, "Emang dia sekarang sibuk apa?"', scores: { darkTriad: 4, attachment: { secure: 5 }, emotionalHealth: 4 } }
        ]
    },
    {
        id: 3,
        question: "Temen di grup chat ngegosipin lo di belakang. Lo taunya dari screenshot orang lain. Lo bakal?",
        options: [
            { id: '3A', text: 'Langsung labrak di grup, "Maksud lo apa ngomong gini?"', scores: { darkTriad: 5, trauma: { fight: 6 }, emotionalHealth: 1 } },
            { id: '3B', text: 'Left group tanpa pamit, cari circle baru', scores: { darkTriad: 3, attachment: { avoidant: 6 }, trauma: { flight: 4 }, emotionalHealth: 2 } },
            { id: '3C', text: 'Cuma di-read, tapi simpen dendam sampe mati', scores: { darkTriad: 4, attachment: { anxious: 5 }, trauma: { freeze: 5 }, emotionalHealth: 1 } },
            { id: '3D', text: 'Chat pribadi orangnya, "Eh, ini beneran lo ngomong gini?"', scores: { darkTriad: 0, attachment: { secure: 6 }, emotionalHealth: 5 } }
        ]
    },
    {
        id: 4,
        question: "Lo gagal interview di perusahaan impian lo. Malemnya lo ngapain?",
        options: [
            { id: '4A', text: '"HRD-nya bego, gak bisa liat potensi gue"', scores: { darkTriad: 6, trauma: { fight: 4 }, emotionalHealth: 0 } },
            { id: '4B', text: 'Langsung apply tempat lain, pura-pura gak sedih', scores: { darkTriad: 1, attachment: { avoidant: 5 }, trauma: { flight: 5 }, emotionalHealth: 3 } },
            { id: '4C', text: 'Overthinking sambil nangis liatin CV', scores: { darkTriad: 2, attachment: { anxious: 6 }, trauma: { freeze: 4 }, emotionalHealth: 2 } },
            { id: '4D', text: 'Evaluasi jawaban tadi, siapin strategi buat next interview', scores: { darkTriad: 0, attachment: { secure: 6 }, emotionalHealth: 6 } }
        ]
    },
    {
        id: 5,
        question: "Di pesta, lo kejebak ngobrol sama orang yang super ngebosenin. Lo?",
        options: [
            { id: '5A', text: 'Bikin alesan bohong biar bisa kabur', scores: { darkTriad: 5, trauma: { flight: 5 }, emotionalHealth: 1 } },
            { id: '5B', text: 'Jawab singkat-singkat sambil main HP', scores: { darkTriad: 3, attachment: { avoidant: 6 }, trauma: { freeze: 4 }, emotionalHealth: 2 } },
            { id: '5C', text: 'Dengerin terus sambil senyum (padahal mati gaya)', scores: { darkTriad: 1, trauma: { fawn: 6 }, emotionalHealth: 2 } },
            { id: '5D', text: 'Coba alihin topik ke hal yang dia suka biar seru', scores: { darkTriad: 0, attachment: { secure: 5 }, emotionalHealth: 5 } }
        ]
    },
    {
        id: 6,
        question: "Beli barang mahal, pas dateng ternyata barangnya cacat. Reaksi lo?",
        options: [
            { id: '6A', text: 'Kasih bintang 1, maki-maki seller di review', scores: { darkTriad: 6, trauma: { fight: 5 }, emotionalHealth: 1 } },
            { id: '6B', text: 'Simpen aja di gudang, males ribut', scores: { darkTriad: 2, attachment: { avoidant: 5 }, trauma: { flight: 6 }, emotionalHealth: 1 } },
            { id: '6C', text: 'Curhat ke temen, "Sial banget sih gue hari ini"', scores: { darkTriad: 3, attachment: { anxious: 6 }, trauma: { fawn: 4 }, emotionalHealth: 2 } },
            { id: '6D', text: 'Ajukan retur baik-baik sesuai posedur', scores: { darkTriad: 0, attachment: { secure: 6 }, emotionalHealth: 5 } }
        ]
    },
    {
        id: 7,
        question: "Lagi bad mood, tiba-tiba ditabrak orang asing di mall. Lo?",
        options: [
            { id: '7A', text: 'Ngasih tatapan maut, "Punya mata dipake dong!"', scores: { darkTriad: 5, trauma: { fight: 6 }, emotionalHealth: 0 } },
            { id: '7B', text: 'Bilang "Gapapa kok," terus buru-buru pergi', scores: { darkTriad: 1, trauma: { fawn: 5 }, emotionalHealth: 3 } },
            { id: '7C', text: 'Diem, tatap dingin, lanjut jalan', scores: { darkTriad: 4, attachment: { avoidant: 6 }, trauma: { freeze: 4 }, emotionalHealth: 1 } },
            { id: '7D', text: 'Minta maaf reflektif, padahal dia yang nabrak', scores: { darkTriad: 2, attachment: { anxious: 5 }, trauma: { fawn: 5 }, emotionalHealth: 2 } }
        ]
    },
    {
        id: 8,
        question: "Target bulanan lo gak kecapai. Apa yang lo bilang ke diri sendiri?",
        options: [
            { id: '8A', text: '"Ini pasti gara-gara tim gue yang lelet"', scores: { darkTriad: 6, emotionalHealth: 1 } },
            { id: '8B', text: '"Ah udahlah, bulan depan aja dipikirin"', scores: { darkTriad: 2, trauma: { flight: 5 }, emotionalHealth: 2 } },
            { id: '8C', text: '"Gue emang gak becus, selalu gagal"', scores: { darkTriad: 3, attachment: { anxious: 6 }, trauma: { freeze: 5 }, emotionalHealth: 1 } },
            { id: '8D', text: '"Oke, salahnya dimana? Apa yang bisa diperbaikin?"', scores: { darkTriad: 0, attachment: { secure: 6 }, emotionalHealth: 6 } }
        ]
    },
    {
        id: 9,
        question: "Main game online, satu tim sama beban (noob). Reaksi lo?",
        options: [
            { id: '9A', text: 'Toxic di chat, "Hapus game aja lo!"', scores: { darkTriad: 6, trauma: { fight: 5 }, emotionalHealth: 1 } },
            { id: '9B', text: 'Mute semua, main bodo amat sendirian', scores: { darkTriad: 3, attachment: { avoidant: 6 }, emotionalHealth: 2 } },
            { id: '9C', text: '"Gapapa guys, next round kita coba lagi," (sabar)', scores: { darkTriad: 0, trauma: { fawn: 6 }, emotionalHealth: 4 } },
            { id: '9D', text: 'Langsung quit match, cari tim baru', scores: { darkTriad: 2, trauma: { flight: 5 }, emotionalHealth: 3 } }
        ]
    },
    {
        id: 10,
        question: "Ibu lo nyuruh diet makan sehat, padahal lo lagi pengen banget junk food. Lo?",
        options: [
            { id: '10A', text: '"Ibu tau apa soal nutrisi?" (ngedumel dalem hati)', scores: { darkTriad: 5, trauma: { fight: 4 }, emotionalHealth: 1 } },
            { id: '10B', text: 'Iya-iya aja, tapi makan junk food diem-diem', scores: { darkTriad: 4, attachment: { avoidant: 5 }, trauma: { fawn: 5 }, emotionalHealth: 1 } },
            { id: '10C', text: 'Debat panjang, "Kenapa sih ngatur-ngatur?"', scores: { darkTriad: 2, attachment: { anxious: 6 }, trauma: { fight: 5 }, emotionalHealth: 2 } },
            { id: '10D', text: '"Oke Bu, mulai besok ya," (kompromi)', scores: { darkTriad: 1, attachment: { secure: 5 }, emotionalHealth: 4 } }
        ]
    },
    {
        id: 11,
        question: "Liat postingan motivasi 'Be Positive' di sosmed pas hidup lo lagi hancur. Pikiran lo?",
        options: [
            { id: '11A', text: '"Bacot doang, hidup gue gak segampang itu"', scores: { darkTriad: 4, trauma: { freeze: 6 }, emotionalHealth: 0 } },
            { id: '11B', text: 'Repost di story biar keliatan bijak', scores: { darkTriad: 3, trauma: { fawn: 5 }, emotionalHealth: 2 } },
            { id: '11C', text: 'Skip/Scroll cepet, males liat gituan', scores: { darkTriad: 2, attachment: { avoidant: 6 }, trauma: { flight: 4 }, emotionalHealth: 2 } },
            { id: '11D', text: 'Ambil positifnya, siapa tau ada yang bisa dipake', scores: { darkTriad: 0, attachment: { secure: 6 }, emotionalHealth: 6 } }
        ]
    },
    {
        id: 12,
        question: "Rekan kerja ngaku-ngaku ide lo sebagai ide dia. Lo?",
        options: [
            { id: '12A', text: 'Sabotase kerjaan dia diem-diem biar gagal', scores: { darkTriad: 6, trauma: { fight: 5 }, emotionalHealth: 1 } },
            { id: '12B', text: 'Diem aja, tapi catet kesalahannya buat lapor nanti', scores: { darkTriad: 4, trauma: { freeze: 6 }, emotionalHealth: 1 } },
            { id: '12C', text: 'Nyeletuk kikuk, "Eh itu kan saran gue kemaren..."', scores: { darkTriad: 2, attachment: { anxious: 5 }, trauma: { fawn: 4 }, emotionalHealth: 3 } },
            { id: '12D', text: 'Ajak ngobrol berdua, "Bro, next time credit ya"', scores: { darkTriad: 0, attachment: { secure: 6 }, emotionalHealth: 5 } }
        ]
    },
    {
        id: 13,
        question: "Besok ada acara penting, tapi lo malah overthinking dan gak bisa tidur (insomnia). Lo?",
        options: [
            { id: '13A', text: 'Minum kopi lagi, "Sekalian gadang dah!"', scores: { darkTriad: 3, trauma: { flight: 5 }, emotionalHealth: 1 } },
            { id: '13B', text: 'Scrolling Twitter/Tiktok sampe pagi', scores: { darkTriad: 2, attachment: { anxious: 6 }, trauma: { freeze: 6 }, emotionalHealth: 0 } },
            { id: '13C', text: 'Coba meditasi atau nulis jurnal buat nurunin cemas', scores: { darkTriad: 0, attachment: { secure: 6 }, emotionalHealth: 6 } },
            { id: '13D', text: 'Chat bot AI atau curhat random di sosmed', scores: { darkTriad: 1, trauma: { fawn: 5 }, emotionalHealth: 3 } }
        ]
    },
    {
        id: 14,
        question: "Lagi di konser yang super padet dan desak-desakan. Perasaan lo?",
        options: [
            { id: '14A', text: 'Dorong orang depan biar dapet view enak', scores: { darkTriad: 5, trauma: { fight: 6 }, emotionalHealth: 1 } },
            { id: '14B', text: 'Mundur cari pojokan yang sepi', scores: { darkTriad: 3, attachment: { avoidant: 6 }, trauma: { freeze: 4 }, emotionalHealth: 2 } },
            { id: '14C', text: 'Ikut lompat-lompat (moshing) buat lepasin stres', scores: { darkTriad: 2, attachment: { anxious: 5 }, trauma: { flight: 5 }, emotionalHealth: 2 } },
            { id: '14D', text: 'Santai aja, nikmatin vibe bareng crowd', scores: { darkTriad: 0, attachment: { secure: 6 }, emotionalHealth: 5 } }
        ]
    },
    {
        id: 15,
        question: "Personal Trainer (Coach) gym lo bilang progress lo lambat. Reaksi lo?",
        options: [
            { id: '15A', text: '"Halah, dia sebenernya iri aja sama badan gue"', scores: { darkTriad: 6, emotionalHealth: 0 } },
            { id: '15B', text: 'Males latihan, bolos gym seminggu', scores: { darkTriad: 2, trauma: { flight: 6 }, emotionalHealth: 1 } },
            { id: '15C', text: 'Latihan lebih keras pas gak ada dia (pembuktian)', scores: { darkTriad: 1, attachment: { avoidant: 5, secure: 5 }, emotionalHealth: 4 } },
            { id: '15D', text: 'Tanya detail, "Oke Coach, apa yang perlu diubah?"', scores: { darkTriad: 0, trauma: { fawn: 4 }, emotionalHealth: 5 } }
        ]
    },
    // POSITIVE GROWTH QUESTIONS (Questions 16-30)
    {
        id: 16,
        question: "Lo dapet promosi tak terduga. Apa langkah pertama lo?",
        options: [
            { id: '16A', text: 'Celebrate kecil, langsung susun strategi ke depan', scores: { optimism: 6, attachment: { secure: 5 }, resilience: 6 } },
            { id: '16B', text: 'Bilang ke tim, "Ini hasil kerja kita bareng-bareng"', scores: { empathy: 6, growth: 6, emotionalIntelligence: 5 } },
            { id: '16C', text: 'Analisa, "Kenapa gue bisa sukses? Pola apa yang gue pake?"', scores: { selfAwareness: 6, attachment: { secure: 5 }, optimism: 5 } },
            { id: '16D', text: 'Beli reward yang bermakna buat diri sendiri (self-love)', scores: { balance: 6, resilience: 5, emotionalIntelligence: 6 } }
        ]
    },
    {
        id: 17,
        question: "Temen deket lo baru aja capai sukses gede. Apa yang lo rasain?",
        options: [
            { id: '17A', text: '"Gue juga pasti bisa!" - merasa sangat terinspirasi', scores: { growth: 6, optimism: 6, resilience: 5 } },
            { id: '17B', text: 'Kasih selamat yang tulus, terus tanya tipsnya', scores: { empathy: 6, attachment: { secure: 6 }, growth: 5 } },
            { id: '17C', text: 'Refleksi, "Kira-kira gue masih kurang di mana?"', scores: { selfAwareness: 6, optimism: 5, resilience: 5 } },
            { id: '17D', text: 'Ikut seneng buat dia, lanjut hari dengan tenang', scores: { balance: 5, emotionalIntelligence: 6, attachment: { secure: 5 } } }
        ]
    },
    {
        id: 18,
        question: "Lo gagal di satu project tapi dapet banyak pelajaran. Bagaimana sikap lo?",
        options: [
            { id: '18A', text: '"Lesson learned, gue bakal level up di next round"', scores: { resilience: 6, growth: 6, optimism: 5 } },
            { id: '18B', text: 'Share ceritanya ke orang lain biar mereka juga belajar', scores: { empathy: 6, attachment: { secure: 5 }, emotionalIntelligence: 6 } },
            { id: '18C', text: 'Catat semua insight yang lo dapet di jurnal', scores: { selfAwareness: 6, growth: 5, resilience: 5 } },
            { id: '18D', text: 'Istirahat dulu buat recharge mental dan fisik', scores: { balance: 6, emotionalIntelligence: 6, optimism: 4 } }
        ]
    },
    {
        id: 19,
        question: "Hari ini lo ngerasa produktif dan efektif banget. Lo bakal?",
        options: [
            { id: '19A', text: 'Refleksi, "Kenapa hari ini bisa mantap? Kondisinya gimana?"', scores: { selfAwareness: 6, growth: 6, optimism: 5 } },
            { id: '19B', text: 'Traktir tim atau temen kopi biar vibesnya asik terus', scores: { empathy: 6, attachment: { secure: 6 }, resilience: 5 } },
            { id: '19C', text: 'Langsung bikin rencana biar besok lebih baik lagi', scores: { optimism: 6, growth: 5, balance: 5 } },
            { id: '19D', text: 'Nikmatin momen puasnya, apresiasi diri sendiri', scores: { balance: 6, emotionalIntelligence: 6, attachment: { secure: 5 } } }
        ]
    },
    {
        id: 20,
        question: "Lo spontan bantu orang asing yang kesulitan di jalan. Perasaan lo?",
        options: [
            { id: '20A', text: 'Merasa bermakna bisa membantu tanpa pamrih', scores: { empathy: 6, growth: 5, attachment: { secure: 6 } } },
            { id: '20B', text: 'Lanjutin hari dengan energi yang jauh lebih positif', scores: { optimism: 6, resilience: 6, emotionalIntelligence: 5 } },
            { id: '20C', text: 'Belajar sesuatu dari interaksi singkat tadi', scores: { selfAwareness: 6, attachment: { secure: 5 }, growth: 5 } },
            { id: '20D', text: 'Senang tapi tetep jaga batasan diri (boundaries)', scores: { balance: 6, emotionalIntelligence: 6, resilience: 5 } }
        ]
    },
    {
        id: 21,
        question: "Lo akhirnya berhasil capai goal harian (olahraga/baca). Reaksi lo?",
        options: [
            { id: '21A', text: '"Ini bukti kalau gue sebenernya mampu!"', scores: { resilience: 6, optimism: 6, growth: 5 } },
            { id: '21B', text: 'Cerita ke temen biar mereka ikut terinspirasi', scores: { empathy: 6, attachment: { secure: 6 }, emotionalIntelligence: 5 } },
            { id: '21C', text: 'Cek prosesnya, "Kira-kira apa yang bisa di-improve?"', scores: { selfAwareness: 6, growth: 6, optimism: 5 } },
            { id: '21D', text: 'Kasih reward yang sehat buat ngerayain', scores: { balance: 6, emotionalIntelligence: 6, resilience: 5 } }
        ]
    },
    {
        id: 22,
        question: "Komunitas atau circle lo ngasih apresiasi ke lo. Bagaimana respon lo?",
        options: [
            { id: '22A', text: '"Thanks, yuk kita lanjutin gerakannya bareng!"', scores: { growth: 6, optimism: 6, attachment: { secure: 5 } } },
            { id: '22B', text: 'Bales dengan kontribusi yang lebih banyak lagi', scores: { empathy: 6, attachment: { secure: 6 }, resilience: 5 } },
            { id: '22C', text: 'Refleksi soal dampak yang udah lo buat', scores: { selfAwareness: 6, growth: 5, emotionalIntelligence: 6 } },
            { id: '22D', text: 'Tetep grounded, nggak besar kepala', scores: { balance: 6, emotionalIntelligence: 6, optimism: 5 } }
        ]
    },
    {
        id: 23,
        question: "Lo memaafkan orang yang pernah menyakiti lo secara tulus. Rasanya?",
        options: [
            { id: '23A', text: '"Gue ngerasa plong banget, beban ilang"', scores: { resilience: 6, growth: 6, optimism: 6 } },
            { id: '23B', text: 'Hubungan jadi membaik dan lebih sehat', scores: { empathy: 6, attachment: { secure: 6 }, emotionalIntelligence: 5 } },
            { id: '23C', text: 'Mendapat insight kenapa dulu susah buat maafin', scores: { selfAwareness: 6, resilience: 5, growth: 5 } },
            { id: '23D', text: 'Maafin tapi tetep jaga boundaries yang kuat', scores: { balance: 6, emotionalIntelligence: 6, attachment: { secure: 5 } } }
        ]
    },
    {
        id: 24,
        question: "Lo lagi asik banget ngerjain hobi (flow state). Apa yang lo dapet?",
        options: [
            { id: '24A', text: 'Dapet momentum buat explore lebih jauh', scores: { optimism: 6, growth: 6, resilience: 5 } },
            { id: '24B', text: 'Nularin energi positif ke orang sekitar', scores: { empathy: 6, attachment: { secure: 5 }, emotionalIntelligence: 6 } },
            { id: '24C', text: 'Tau apa yang bikin lo bisa fokus (trigger flow)', scores: { selfAwareness: 6, growth: 5, optimism: 5 } },
            { id: '24D', text: 'Tau kapan harus berhenti buat istirahat', scores: { balance: 6, emotionalIntelligence: 6, attachment: { secure: 5 } } }
        ]
    },
    {
        id: 25,
        question: "Junior atau temen lo sukses gara-gara bimbingan lo. Lo merasa?",
        options: [
            { id: '25A', text: 'Bangga banget liat pertumbuhan mereka', scores: { growth: 6, empathy: 6, attachment: { secure: 6 } } },
            { id: '25B', text: '"Metode dan cara gue ternyata berhasil"', scores: { selfAwareness: 6, optimism: 6, resilience: 5 } },
            { id: '25C', text: 'Ngerayain bareng-bareng sama mereka', scores: { empathy: 6, emotionalIntelligence: 6, balance: 5 } },
            { id: '25D', text: 'Siap ngebimbing orang lain yang membutuhkan', scores: { optimism: 6, growth: 5, attachment: { secure: 5 } } }
        ]
    },
    {
        id: 26,
        question: "Lo berhasil lewatin minggu yang super berat dengan baik. Bagaimana pikiran lo?",
        options: [
            { id: '26A', text: '"Gue ngerasa jauh lebih kuat sekarang"', scores: { resilience: 6, optimism: 6, growth: 5 } },
            { id: '26B', text: 'Berkat bantuan orang terdekat juga', scores: { empathy: 6, attachment: { secure: 6 }, emotionalIntelligence: 6 } },
            { id: '26C', text: 'Analisa apa yang bikin minggu ini berat banget', scores: { selfAwareness: 6, growth: 6, resilience: 5 } },
            { id: '26D', text: 'Langsung ritual self-care buat pemulihan', scores: { balance: 6, emotionalIntelligence: 6, optimism: 5 } }
        ]
    },
    {
        id: 27,
        question: "Lo liat progress lo selama satu tahun terakhir. Apa yang lo rasain?",
        options: [
            { id: '27A', text: 'Bersyukur dan gak sabar buat tahun depan', scores: { optimism: 6, growth: 6, emotionalIntelligence: 6 } },
            { id: '27B', text: 'Berterima kasih sama orang-orang yang bantu', scores: { empathy: 6, attachment: { secure: 6 }, resilience: 5 } },
            { id: '27C', text: 'Bikin rencana buat evolusi berikutnya', scores: { selfAwareness: 6, growth: 5, optimism: 6 } },
            { id: '27D', text: 'Ngerayain dengan cara yang seimbang', scores: { balance: 6, emotionalIntelligence: 6, attachment: { secure: 5 } } }
        ]
    },
    {
        id: 28,
        question: "Lo nemuin passion baru yang bikin semangat. Langkah lo?",
        options: [
            { id: '28A', text: 'Deep dive riset soal bidang baru itu', scores: { growth: 6, optimism: 6, selfAwareness: 5 } },
            { id: '28B', text: 'Ajak temen-temen buat nyobain bareng', scores: { empathy: 6, attachment: { secure: 6 }, resilience: 5 } },
            { id: '28C', text: 'Coba sedikit-sedikit dulu biar teratur', scores: { balance: 6, emotionalIntelligence: 6, optimism: 5 } },
            { id: '28D', text: '"Inilah panggilan hidup gue yang baru!"', scores: { resilience: 6, growth: 5, attachment: { secure: 5 } } }
        ]
    },
    {
        id: 29,
        question: "Ada orang yang minta advice karir ke lo. Apa yang lo share?",
        options: [
            { id: '29A', text: 'Ceritain perjalanan lo naik turunnya', scores: { empathy: 6, growth: 6, attachment: { secure: 5 } } },
            { id: '29B', text: '"Lo pasti bisa kayak gue, semangat!"', scores: { optimism: 6, resilience: 6, selfAwareness: 5 } },
            { id: '29C', text: 'Tanya dulu apa tujuan dan goals dia', scores: { selfAwareness: 6, empathy: 5, emotionalIntelligence: 6 } },
            { id: '29D', text: '"Mulai aja dari hal kecil tapi konsisten"', scores: { balance: 6, growth: 5, attachment: { secure: 6 } } }
        ]
    },
    {
        id: 30,
        question: "Lo akhirnya dapet work-life balance yang pas. Apa langkah lo?",
        options: [
            { id: '30A', text: 'Jaga sistem ini biar terus berjalan', scores: { balance: 6, emotionalIntelligence: 6, optimism: 6 } },
            { id: '30B', text: 'Inspirasi circle lo buat capai hal yang sama', scores: { empathy: 6, attachment: { secure: 6 }, growth: 5 } },
            { id: '30C', text: 'Analisa bagian mana yang paling memicu hasil', scores: { selfAwareness: 6, resilience: 6, optimism: 5 } },
            { id: '30D', text: 'Nikmatin hidup yang lebih sustainable', scores: { growth: 6, emotionalIntelligence: 5, attachment: { secure: 5 } } }
        ]
    }
];
