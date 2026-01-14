

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
    }
];
