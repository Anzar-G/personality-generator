
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
        question: "Tiba-tiba bos ngechat, 'Kerja lo mantap, bulan depan naik gaji & posisi.' Reaksi lo?",
        options: [
            { id: '2A', text: 'Celebrate kecil, langsung susun strategi ke depan', scores: { optimism: 6, attachment: { secure: 5 }, resilience: 6 } },
            { id: '2B', text: 'Bilang ke tim, "Ini hasil kerja kita bareng-bareng"', scores: { empathy: 6, growth: 6, emotionalIntelligence: 5 } },
            { id: '2C', text: 'Analisa, "Kenapa gue bisa sukses? Pola apa yang gue pake?"', scores: { selfAwareness: 6, attachment: { secure: 5 }, optimism: 5 } },
            { id: '2D', text: 'Beli reward yang bermakna buat diri sendiri (self-love)', scores: { balance: 6, resilience: 5, emotionalIntelligence: 6 } }
        ]
    },
    {
        id: 3,
        question: "Keluarga lagi bandingin lo sama sepupu yang 'katanya' lebih sukses. Jawaban lo?",
        options: [
            { id: '3A', text: '"Yaelah, gue sebenernya lebih keren kok," (dalem hati)', scores: { darkTriad: 5, attachment: { avoidant: 5 }, emotionalHealth: 1 } },
            { id: '3B', text: 'Diem, lanjut makan, pura-pura denger musik', scores: { darkTriad: 2, attachment: { anxious: 4 }, trauma: { freeze: 6 }, emotionalHealth: 2 } },
            { id: '3C', text: '"Iya nih, doain ya gue bisa nyusul," (senyum pepsodent)', scores: { darkTriad: 1, trauma: { fawn: 5 }, emotionalHealth: 3 } },
            { id: '3D', text: 'Balik nanya santai, "Emang dia sekarang sibuk apa?"', scores: { darkTriad: 4, attachment: { secure: 5 }, emotionalHealth: 4 } }
        ]
    },
    {
        id: 4,
        question: "Bestie lo baru aja beli mobil/rumah impian hasil kerja keras dia. Perasaan lo?",
        options: [
            { id: '4A', text: '"Gue juga pasti bisa!" - merasa sangat terinspirasi', scores: { growth: 6, optimism: 6, resilience: 5 } },
            { id: '4B', text: 'Kasih selamat yang tulus, terus tanya tipsnya', scores: { empathy: 6, attachment: { secure: 6 }, growth: 5 } },
            { id: '4C', text: 'Refleksi, "Kira-kira gue masih kurang di mana?"', scores: { selfAwareness: 6, optimism: 5, resilience: 5 } },
            { id: '4D', text: 'Ikut seneng buat dia, lanjut hari dengan tenang', scores: { balance: 5, emotionalIntelligence: 6, attachment: { secure: 5 } } }
        ]
    },
    {
        id: 5,
        question: "Temen di grup chat ngegosipin lo di belakang. Lo taunya dari screenshot orang lain. Lo bakal?",
        options: [
            { id: '5A', text: 'Langsung labrak di grup, "Maksud lo apa ngomong gini?"', scores: { darkTriad: 5, trauma: { fight: 6 }, emotionalHealth: 1 } },
            { id: '5B', text: 'Left group tanpa pamit, cari circle baru', scores: { darkTriad: 3, attachment: { avoidant: 6 }, trauma: { flight: 4 }, emotionalHealth: 2 } },
            { id: '5C', text: 'Cuma di-read, tapi simpen dendam sampe mati', scores: { darkTriad: 4, attachment: { anxious: 5 }, trauma: { freeze: 5 }, emotionalHealth: 1 } },
            { id: '5D', text: 'Chat pribadi orangnya, "Eh, ini beneran lo ngomong gini?"', scores: { darkTriad: 0, attachment: { secure: 6 }, emotionalHealth: 5 } }
        ]
    },
    {
        id: 6,
        question: "Lo gagal di satu project tapi dapet banyak pelajaran. Bagaimana sikap lo?",
        options: [
            { id: '6A', text: '"Lesson learned, gue bakal level up di next round"', scores: { resilience: 6, growth: 6, optimism: 5 } },
            { id: '6B', text: 'Share ceritanya ke orang lain biar mereka juga belajar', scores: { empathy: 6, attachment: { secure: 5 }, emotionalIntelligence: 6 } },
            { id: '6C', text: 'Catat semua insight yang lo dapet di jurnal', scores: { selfAwareness: 6, growth: 5, resilience: 5 } },
            { id: '6D', text: 'Istirahat dulu buat recharge mental dan fisik', scores: { balance: 6, emotionalIntelligence: 6, optimism: 4 } }
        ]
    },
    {
        id: 7,
        question: "Lo gagal interview di perusahaan impian lo. Malemnya lo ngapain?",
        options: [
            { id: '7A', text: '"HRD-nya bego, gak bisa liat potensi gue"', scores: { darkTriad: 6, trauma: { fight: 4 }, emotionalHealth: 0 } },
            { id: '7B', text: 'Langsung apply tempat lain, pura-pura gak sedih', scores: { darkTriad: 1, attachment: { avoidant: 5 }, trauma: { flight: 5 }, emotionalHealth: 3 } },
            { id: '7C', text: 'Overthinking sambil nangis liatin CV', scores: { darkTriad: 2, attachment: { anxious: 6 }, trauma: { freeze: 4 }, emotionalHealth: 2 } },
            { id: '7D', text: 'Evaluasi jawaban tadi, siapin strategi buat next interview', scores: { darkTriad: 0, attachment: { secure: 6 }, emotionalHealth: 6 } }
        ]
    },
    {
        id: 8,
        question: "Hari ini lo ngerasa produktif dan efektif banget. Lo bakal?",
        options: [
            { id: '8A', text: 'Refleksi, "Kenapa hari ini bisa mantap? Kondisinya gimana?"', scores: { selfAwareness: 6, growth: 6, optimism: 5 } },
            { id: '8B', text: 'Traktir tim atau temen kopi biar vibesnya asik terus', scores: { empathy: 6, attachment: { secure: 6 }, resilience: 5 } },
            { id: '8C', text: 'Langsung bikin rencana biar besok lebih baik lagi', scores: { optimism: 6, growth: 5, balance: 5 } },
            { id: '8D', text: 'Nikmatin momen puasnya, apresiasi diri sendiri', scores: { balance: 6, emotionalIntelligence: 6, attachment: { secure: 5 } } }
        ]
    },
    {
        id: 9,
        question: "Di pesta, lo kejebak ngobrol sama orang yang super ngebosenin. Lo?",
        options: [
            { id: '9A', text: 'Bikin alesan bohong biar bisa kabur', scores: { darkTriad: 5, trauma: { flight: 5 }, emotionalHealth: 1 } },
            { id: '9B', text: 'Jawab singkat-singkat sambil main HP', scores: { darkTriad: 3, attachment: { avoidant: 6 }, trauma: { freeze: 4 }, emotionalHealth: 2 } },
            { id: '9C', text: 'Dengerin terus sambil senyum (padahal mati gaya)', scores: { darkTriad: 1, trauma: { fawn: 6 }, emotionalHealth: 2 } },
            { id: '9D', text: 'Coba alihin topik ke hal yang dia suka biar seru', scores: { darkTriad: 0, attachment: { secure: 5 }, emotionalHealth: 5 } }
        ]
    },
    {
        id: 10,
        question: "Lagi buru-buru, eh liat kakek-kakek keberatan bawa belanjaan pas mau nyebrang. Lo?",
        options: [
            { id: '10A', text: 'Bantuin nyebrang & bawain belanjaannya sampe tuntas', scores: { empathy: 6, growth: 5, attachment: { secure: 6 } } },
            { id: '10B', text: 'Lanjut jalan tapi tetep doain dlm hati biar sehat', scores: { optimism: 6, resilience: 6, emotionalIntelligence: 5 } },
            { id: '10C', text: 'Mikir, "Kasian ya, tapi gue telat banget nih"', scores: { selfAwareness: 6, attachment: { secure: 5 }, growth: 5 } },
            { id: '10D', text: 'Tanya tawarin bantuan singkat sesuai kapasitas', scores: { balance: 6, emotionalIntelligence: 6, resilience: 5 } }
        ]
    },
    {
        id: 11,
        question: "Beli barang mahal, pas dateng ternyata barangnya cacat. Reaksi lo?",
        options: [
            { id: '11A', text: 'Kasih bintang 1, maki-maki seller di review', scores: { darkTriad: 6, trauma: { fight: 5 }, emotionalHealth: 1 } },
            { id: '11B', text: 'Simpen aja di gudang, males ribut', scores: { darkTriad: 2, attachment: { avoidant: 5 }, trauma: { flight: 6 }, emotionalHealth: 1 } },
            { id: '11C', text: 'Curhat ke temen, "Sial banget sih gue hari ini"', scores: { darkTriad: 3, attachment: { anxious: 6 }, trauma: { fawn: 4 }, emotionalHealth: 2 } },
            { id: '11D', text: 'Ajukan retur baik-baik sesuai posedur', scores: { darkTriad: 0, attachment: { secure: 6 }, emotionalHealth: 5 } }
        ]
    },
    {
        id: 12,
        question: "Lo akhirnya berhasil rutin bangun pagi & workout selama seminggu. Perasaan lo?",
        options: [
            { id: '12A', text: '"Ini bukti kalau gue sebenernya mampu disiplin!"', scores: { resilience: 6, optimism: 6, growth: 5 } },
            { id: '12B', text: 'Posting di story biar temen ikutan semangat', scores: { empathy: 6, attachment: { secure: 6 }, emotionalIntelligence: 5 } },
            { id: '12C', text: 'Cek progress, "Next week targetnya apa lagi ya?"', scores: { selfAwareness: 6, growth: 6, optimism: 5 } },
            { id: '12D', text: 'Self-reward kopi enak buat apresiasi effort diri', scores: { balance: 6, emotionalIntelligence: 6, resilience: 5 } }
        ]
    },
    {
        id: 13,
        question: "Lagi bad mood, tiba-tiba ditabrak orang asing di mall. Lo?",
        options: [
            { id: '13A', text: 'Ngasih tatapan maut, "Punya mata dipake dong!"', scores: { darkTriad: 5, trauma: { fight: 6 }, emotionalHealth: 0 } },
            { id: '13B', text: 'Bilang "Gapapa kok," terus buru-buru pergi', scores: { darkTriad: 1, trauma: { fawn: 5 }, emotionalHealth: 3 } },
            { id: '13C', text: 'Diem, tatap dingin, lanjut jalan', scores: { darkTriad: 4, attachment: { avoidant: 6 }, trauma: { freeze: 4 }, emotionalHealth: 1 } },
            { id: '13D', text: 'Minta maaf reflektif, padahal dia yang nabrak', scores: { darkTriad: 2, attachment: { anxious: 5 }, trauma: { fawn: 5 }, emotionalHealth: 2 } }
        ]
    },
    {
        id: 14,
        question: "Komunitas atau circle lo ngasih apresiasi ke lo karena lo reliable. Jawaban lo?",
        options: [
            { id: '14A', text: '"Thanks, yuk kita lanjutin gerakannya bareng!"', scores: { growth: 6, optimism: 6, attachment: { secure: 5 } } },
            { id: '14B', text: 'Ngasih feedback balik ke mereka yang juga hebat', scores: { empathy: 6, attachment: { secure: 6 }, resilience: 5 } },
            { id: '14C', text: 'Refleksi, "Apa sih yang bikin mereka apresiasi gue?"', scores: { selfAwareness: 6, growth: 5, emotionalIntelligence: 6 } },
            { id: '14D', text: 'Tetep santai & humble, nggak jadi gila hormat', scores: { balance: 6, emotionalIntelligence: 6, optimism: 5 } }
        ]
    },
    {
        id: 15,
        question: "Target bulanan lo gak kecapai. Apa yang lo bilang ke diri sendiri?",
        options: [
            { id: '15A', text: '"Ini pasti gara-gara tim gue yang lelet"', scores: { darkTriad: 6, emotionalHealth: 1 } },
            { id: '15B', text: '"Ah udahlah, bulan depan aja dipikirin"', scores: { darkTriad: 2, trauma: { flight: 5 }, emotionalHealth: 2 } },
            { id: '15C', text: '"Gue emang gak becus, selalu gagal"', scores: { darkTriad: 3, attachment: { anxious: 6 }, trauma: { freeze: 5 }, emotionalHealth: 1 } },
            { id: '15D', text: '"Oke, salahnya dimana? Apa yang bisa diperbaikin?"', scores: { darkTriad: 0, attachment: { secure: 6 }, emotionalHealth: 6 } }
        ]
    },
    {
        id: 16,
        question: "Musuh bebuyutan lo tiba-tiba ngechat 'Ping', trus minta maaf tulus soal drama taun lalu. Lo?",
        options: [
            { id: '16A', text: '"Gue udah maafin kok, lo sehat-sehat ya"', scores: { resilience: 6, growth: 6, optimism: 6 } },
            { id: '16B', text: 'Ngajak ketemu dlm waktu deket buat silaturahmi', scores: { empathy: 6, attachment: { secure: 6 }, emotionalIntelligence: 5 } },
            { id: '16C', text: 'Mikir, "Eh iya ya, kenapa dulu gue se-emosi itu?"', scores: { selfAwareness: 6, resilience: 5, growth: 5 } },
            { id: '16D', text: 'Maafin secara mental, tapi tetep jaga jarak aman', scores: { balance: 6, emotionalIntelligence: 6, attachment: { secure: 5 } } }
        ]
    },
    {
        id: 17,
        question: "Main game online, satu tim sama beban (noob). Reaksi lo?",
        options: [
            { id: '17A', text: 'Toxic di chat, "Hapus game aja lo!"', scores: { darkTriad: 6, trauma: { fight: 5 }, emotionalHealth: 1 } },
            { id: '17B', text: 'Mute semua, main bodo amat sendirian', scores: { darkTriad: 3, attachment: { avoidant: 6 }, emotionalHealth: 2 } },
            { id: '17C', text: '"Gapapa guys, next round kita coba lagi," (sabar)', scores: { darkTriad: 0, trauma: { fawn: 6 }, emotionalHealth: 4 } },
            { id: '17D', text: 'Langsung quit match, cari tim baru', scores: { darkTriad: 2, trauma: { flight: 5 }, emotionalHealth: 3 } }
        ]
    },
    {
        id: 18,
        question: "Lagi asik banget ngerjain hobi (flow state). Apa yang lo dapet setelahnya?",
        options: [
            { id: '18A', text: 'Energi lo jadi full lagi, siap hadapin kenyataan', scores: { optimism: 6, growth: 6, resilience: 5 } },
            { id: '18B', text: 'Cerita seru ke orang lain soal apa yg lo bikin', scores: { empathy: 6, attachment: { secure: 5 }, emotionalIntelligence: 6 } },
            { id: '18C', text: 'Tau apa trigger yang bikin lo bisa sefokus itu', scores: { selfAwareness: 6, growth: 5, optimism: 5 } },
            { id: '18D', text: 'Bisa bagi waktu antara passion & kewajiban', scores: { balance: 6, emotionalIntelligence: 6, attachment: { secure: 5 } } }
        ]
    },
    {
        id: 19,
        question: "Ibu lo nyuruh diet makan sehat, padahal lo lagi pengen banget junk food. Lo?",
        options: [
            { id: '19A', text: '"Ibu tau apa soal nutrisi?" (ngedumel dalem hati)', scores: { darkTriad: 5, trauma: { fight: 4 }, emotionalHealth: 1 } },
            { id: '19B', text: 'Iya-iya aja, tapi makan junk food diem-diem', scores: { darkTriad: 4, attachment: { avoidant: 5 }, trauma: { fawn: 5 }, emotionalHealth: 1 } },
            { id: '19C', text: 'Debat panjang, "Kenapa sih ngatur-ngatur?"', scores: { darkTriad: 2, attachment: { anxious: 6 }, trauma: { fight: 5 }, emotionalHealth: 2 } },
            { id: '19D', text: '"Oke Bu, mulai besok ya," (kompromi)', scores: { darkTriad: 1, attachment: { secure: 5 }, emotionalHealth: 4 } }
        ]
    },
    {
        id: 20,
        question: "Adek kelas yang dulu lo bimbing sekarang jadi CEO muda sukses. Pas ketemu lo...",
        options: [
            { id: '20A', text: 'Bangga & terharu liat dia tumbuh se-oke itu', scores: { growth: 6, empathy: 6, attachment: { secure: 6 } } },
            { id: '20B', text: 'Ngobrolin strategi & pattern sukses dia', scores: { selfAwareness: 6, optimism: 6, resilience: 5 } },
            { id: '20C', text: 'Ajak lunch bareng buat denger critanya', scores: { empathy: 6, emotionalIntelligence: 6, balance: 5 } },
            { id: '20D', text: 'Tawarin bantuan link atau mentor kalo dia butuh', scores: { optimism: 6, growth: 5, attachment: { secure: 5 } } }
        ]
    },
    {
        id: 21,
        question: "Liat postingan motivasi 'Be Positive' di sosmed pas hidup lo lagi hancur. Pikiran lo?",
        options: [
            { id: '21A', text: '"Bacot doang, hidup gue gak segampang itu"', scores: { darkTriad: 4, trauma: { freeze: 6 }, emotionalHealth: 0 } },
            { id: '21B', text: 'Repost di story biar keliatan bijak', scores: { darkTriad: 3, trauma: { fawn: 5 }, emotionalHealth: 2 } },
            { id: '21C', text: 'Skip/Scroll cepet, males liat gituan', scores: { darkTriad: 2, attachment: { avoidant: 6 }, trauma: { flight: 4 }, emotionalHealth: 2 } },
            { id: '21D', text: 'Ambil positifnya, siapa tau ada yang bisa dipake', scores: { darkTriad: 0, attachment: { secure: 6 }, emotionalHealth: 6 } }
        ]
    },
    {
        id: 22,
        question: "Lo berhasil lewatin minggu yang super hectic (deadline numpuk). Apa pikiran lo?",
        options: [
            { id: '22A', text: '"Gue ngerasa jauh lebih tangguh sekarang"', scores: { resilience: 6, optimism: 6, growth: 5 } },
            { id: '22B', text: 'Mikirin support system yang udah bantu lo', scores: { empathy: 6, attachment: { secure: 6 }, emotionalIntelligence: 6 } },
            { id: '22C', text: 'Analisa apa yg bisa di-prevent biar gak hectic lagi', scores: { selfAwareness: 6, growth: 6, resilience: 5 } },
            { id: '22D', text: 'Langsung matiin HP & self-care total', scores: { balance: 6, emotionalIntelligence: 6, optimism: 5 } }
        ]
    },
    {
        id: 23,
        question: "Rekan kerja ngaku-ngaku ide lo sebagai ide dia. Lo?",
        options: [
            { id: '23A', text: 'Sabotase kerjaan dia diem-diem biar gagal', scores: { darkTriad: 6, trauma: { fight: 5 }, emotionalHealth: 1 } },
            { id: '23B', text: 'Diem aja, tapi catet kesalahannya buat lapor nanti', scores: { darkTriad: 4, trauma: { freeze: 6 }, emotionalHealth: 1 } },
            { id: '23C', text: 'Nyeletuk kikuk, "Eh itu kan saran gue kemaren..."', scores: { darkTriad: 2, attachment: { anxious: 5 }, trauma: { fawn: 4 }, emotionalHealth: 3 } },
            { id: '23D', text: 'Ajak ngobrol berdua, "Bro, next time credit ya"', scores: { darkTriad: 0, attachment: { secure: 6 }, emotionalHealth: 5 } }
        ]
    },
    {
        id: 24,
        question: "Liat progress lo satu tahun terakhir dlm hal emosi / karir. Perasaan lo?",
        options: [
            { id: '24A', text: 'Bersyukur & excited buat kembangin diri lagi', scores: { optimism: 6, growth: 6, emotionalIntelligence: 6 } },
            { id: '24B', text: 'Inget orang-orang yang udah berjasa di balik itu', scores: { empathy: 6, attachment: { secure: 6 }, resilience: 5 } },
            { id: '24C', text: 'Bikin resolusi baru yang lebih terukur', scores: { selfAwareness: 6, growth: 5, optimism: 6 } },
            { id: '24D', text: 'Ngerasa hidup lo skrng lebih balance & tenang', scores: { balance: 6, emotionalIntelligence: 6, attachment: { secure: 5 } } }
        ]
    },
    {
        id: 25,
        question: "Besok ada acara penting, tapi lo malah overthinking dan gak bisa tidur (insomnia). Lo?",
        options: [
            { id: '25A', text: 'Minum kopi lagi, "Sekalian gadang dah!"', scores: { darkTriad: 3, trauma: { flight: 5 }, emotionalHealth: 1 } },
            { id: '25B', text: 'Scrolling Twitter/Tiktok sampe pagi', scores: { darkTriad: 2, attachment: { anxious: 6 }, trauma: { freeze: 6 }, emotionalHealth: 0 } },
            { id: '25C', text: 'Coba meditasi atau nulis jurnal buat nurunin cemas', scores: { darkTriad: 0, attachment: { secure: 6 }, emotionalHealth: 6 } },
            { id: '25D', text: 'Chat bot AI atau curhat random di sosmed', scores: { darkTriad: 1, trauma: { fawn: 5 }, emotionalHealth: 3 } }
        ]
    },
    {
        id: 26,
        question: "Lo nemuin hobi baru yang ternyata lo berbakat di situ. Sikap lo?",
        options: [
            { id: '26A', text: 'Langsung deep dive belajar teknik expert-nya', scores: { growth: 6, optimism: 6, selfAwareness: 5 } },
            { id: '26B', text: 'Share ke temen biar bisa seru-seruan bareng', scores: { empathy: 6, attachment: { secure: 6 }, resilience: 5 } },
            { id: '26C', text: 'Jadwalin rutin biar gak ganggu prioritas lain', scores: { balance: 6, emotionalIntelligence: 6, optimism: 5 } },
            { id: '26D', text: '"Puas banget, ternyata gue punya bakat tersembunyi"', scores: { resilience: 6, growth: 5, attachment: { secure: 5 } } }
        ]
    },
    {
        id: 27,
        question: "Lagi di konser yang super padet dan desak-desakan. Perasaan lo?",
        options: [
            { id: '27A', text: 'Dorong orang depan biar dapet view enak', scores: { darkTriad: 5, trauma: { fight: 6 }, emotionalHealth: 1 } },
            { id: '27B', text: 'Mundur cari pojokan yang sepi', scores: { darkTriad: 3, attachment: { avoidant: 6 }, trauma: { freeze: 4 }, emotionalHealth: 2 } },
            { id: '27C', text: 'Ikut lompat-lompat (moshing) buat lepasin stres', scores: { darkTriad: 2, attachment: { anxious: 5 }, trauma: { flight: 5 }, emotionalHealth: 2 } },
            { id: '27D', text: 'Santai aja, nikmatin vibe bareng crowd', scores: { darkTriad: 0, attachment: { secure: 6 }, emotionalHealth: 5 } }
        ]
    },
    {
        id: 28,
        question: "Ada junior atau temen yang minta advice soal goals hidup. Lo share apa?",
        options: [
            { id: '28A', text: 'Ceritain kegagalan & cara lo bangkit lagi', scores: { empathy: 6, growth: 6, attachment: { secure: 5 } } },
            { id: '28B', text: 'Bikin dia percaya kalo dia punya potensi gede', scores: { optimism: 6, resilience: 6, selfAwareness: 5 } },
            { id: '28C', text: 'Tanya detail goals-nya dulu biar tepat sasaran', scores: { selfAwareness: 6, empathy: 5, emotionalIntelligence: 6 } },
            { id: '28D', text: 'Ingetin buat kembangin diri dikit-dikit asal konsisten', scores: { balance: 6, growth: 5, attachment: { secure: 6 } } }
        ]
    },
    {
        id: 29,
        question: "Personal Trainer (Coach) gym lo bilang progress lo lambat. Reaksi lo?",
        options: [
            { id: '29A', text: '"Halah, dia sebenernya iri aja sama badan gue"', scores: { darkTriad: 6, emotionalHealth: 0 } },
            { id: '29B', text: 'Males latihan, bolos gym seminggu', scores: { darkTriad: 2, trauma: { flight: 6 }, emotionalHealth: 1 } },
            { id: '29C', text: 'Latihan lebih keras pas gak ada dia (pembuktian)', scores: { darkTriad: 1, attachment: { avoidant: 5, secure: 5 }, emotionalHealth: 4 } },
            { id: '29D', text: 'Tanya detail, "Oke Coach, apa yang perlu diubah?"', scores: { darkTriad: 0, trauma: { fawn: 4 }, emotionalHealth: 5 } }
        ]
    },
    {
        id: 30,
        question: "Lo akhirnya sukses dapet ritme hidup yang sehat dlm hal mental & kerjaan. Langkah lo?",
        options: [
            { id: '30A', text: 'Kunci sistem ini biar gak rusak sama distraksi', scores: { balance: 6, emotionalIntelligence: 6, optimism: 6 } },
            { id: '30B', text: 'Bantu orang sekitar biar dapet ritme yg sama', scores: { empathy: 6, attachment: { secure: 6 }, growth: 5 } },
            { id: '30C', text: 'Evaluasi bagian mana yg paling krusial dlm proses ini', scores: { selfAwareness: 6, resilience: 6, optimism: 5 } },
            { id: '30D', text: 'Udah ngerasa "utuh" & siap hadapin next challenge', scores: { growth: 6, emotionalIntelligence: 5, attachment: { secure: 5 } } }
        ]
    }
];
