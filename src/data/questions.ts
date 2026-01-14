

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
        question: "Lo lagi nunggu bus telat 30 menit di hujan. Lo?",
        options: [
            { id: '1A', text: 'Ngomel ke supir pas naik "lambat banget sih!"', scores: { darkTriad: 6, trauma: { fight: 5 }, emotionalHealth: 1 } },
            { id: '1B', text: 'Buka HP, scroll sampe lupa', scores: { darkTriad: 2, trauma: { flight: 6 }, emotionalHealth: 2 } },
            { id: '1C', text: 'Diam basah kuyup, dalem hati ngutuk', scores: { darkTriad: 3, trauma: { freeze: 5 }, emotionalHealth: 1 } },
            { id: '1D', text: 'Bantu orang lain yang kehujanan', scores: { darkTriad: 0, trauma: { fawn: 6 }, emotionalHealth: 3 } }
        ]
    },
    {
        id: 2,
        question: "Keluarga bandingin lo sama sepupu sukses. Lo jawab?",
        options: [
            { id: '2A', text: '"Gue lebih keren kok" dalem hati', scores: { darkTriad: 5, attachment: { avoidant: 5 }, emotionalHealth: 1 } },
            { id: '2B', text: 'Diam makan, pura-pura denger musik', scores: { darkTriad: 2, attachment: { anxious: 4 }, trauma: { freeze: 6 }, emotionalHealth: 2 } },
            { id: '2C', text: '"Iya nih, gue harus belajar"', scores: { darkTriad: 1, trauma: { fawn: 5 }, emotionalHealth: 3 } },
            { id: '2D', text: 'Balik tanya "lo dulu gimana?"', scores: { darkTriad: 4, attachment: { secure: 5 }, emotionalHealth: 4 } }
        ]
    },
    {
        id: 3,
        question: "Temen grup chat gosip lo di belakang. Lo tau dari mana?",
        options: [
            { id: '3A', text: 'Masuk grup, konfrontasi langsung', scores: { darkTriad: 5, trauma: { fight: 6 }, emotionalHealth: 1 } },
            { id: '3B', text: 'Keluar grup, cari circle baru', scores: { darkTriad: 3, attachment: { avoidant: 6 }, trauma: { flight: 4 }, emotionalHealth: 2 } },
            { id: '3C', text: 'Baca doang, simpen dendam', scores: { darkTriad: 4, attachment: { anxious: 5 }, trauma: { freeze: 5 }, emotionalHealth: 1 } },
            { id: '3D', text: 'Chat pribadi "eh itu beneran?"', scores: { darkTriad: 0, attachment: { secure: 6 }, emotionalHealth: 5 } }
        ]
    },
    {
        id: 4,
        question: "Lo gagal interview kerja impian. Malemnya?",
        options: [
            { id: '4A', text: '"Perusahaan bego nggak tau bakat gue"', scores: { darkTriad: 6, trauma: { fight: 4 }, emotionalHealth: 0 } },
            { id: '4B', text: 'Apply lagi besok, lupain cepet', scores: { darkTriad: 1, attachment: { avoidant: 5 }, trauma: { flight: 5 }, emotionalHealth: 3 } },
            { id: '4C', text: 'Nangis sambil liat CV', scores: { darkTriad: 2, attachment: { anxious: 6 }, trauma: { freeze: 4 }, emotionalHealth: 2 } },
            { id: '4D', text: 'Analisa kesalahan, plan ulang', scores: { darkTriad: 0, attachment: { secure: 6 }, emotionalHealth: 6 } }
        ]
    },
    {
        id: 5,
        question: "Di pesta, lo cornered sama orang boring. Lo?",
        options: [
            { id: '5A', text: 'Kasih excuse manipulatif kabur', scores: { darkTriad: 5, trauma: { flight: 5 }, emotionalHealth: 1 } },
            { id: '5B', text: 'Jawab pendek, liat HP', scores: { darkTriad: 3, attachment: { avoidant: 6 }, trauma: { freeze: 4 }, emotionalHealth: 2 } },
            { id: '5C', text: 'Dengerin sambil senyum paksa', scores: { darkTriad: 1, trauma: { fawn: 6 }, emotionalHealth: 2 } },
            { id: '5D', text: 'Alihin topik ke dia', scores: { darkTriad: 0, attachment: { secure: 5 }, emotionalHealth: 5 } }
        ]
    },
    {
        id: 6,
        question: "Lo beli gadget baru, tapi ternyata jelek. Lo?",
        options: [
            { id: '6A', text: 'Review negatif panjang, tag seller', scores: { darkTriad: 6, trauma: { fight: 5 }, emotionalHealth: 1 } },
            { id: '6B', text: 'Simpen aja, nggak dipake', scores: { darkTriad: 2, attachment: { avoidant: 5 }, trauma: { flight: 6 }, emotionalHealth: 1 } },
            { id: '6C', text: 'Chat temen "anjir nyesel"', scores: { darkTriad: 3, attachment: { anxious: 6 }, trauma: { fawn: 4 }, emotionalHealth: 2 } },
            { id: '6D', text: 'Return sopan, minta ganti', scores: { darkTriad: 0, attachment: { secure: 6 }, emotionalHealth: 5 } }
        ]
    },
    {
        id: 7,
        question: "Lo lagi sensi, orang asing tabrak di mall. Reaksi?",
        options: [
            { id: '7A', text: 'Marah gede "liat-liat dong!"', scores: { darkTriad: 5, trauma: { fight: 6 }, emotionalHealth: 0 } },
            { id: '7B', text: 'Bilang "gapapa" cepet minggir', scores: { darkTriad: 1, trauma: { fawn: 5 }, emotionalHealth: 3 } },
            { id: '7C', text: 'Tatap dingin, lanjut jalan', scores: { darkTriad: 4, attachment: { avoidant: 6 }, trauma: { freeze: 4 }, emotionalHealth: 1 } },
            { id: '7D', text: '"Sorry ya" padahal bukan salah lo', scores: { darkTriad: 2, attachment: { anxious: 5 }, trauma: { fawn: 5 }, emotionalHealth: 2 } }
        ]
    },
    {
        id: 8,
        question: "Target bulanan lo nggak kecapai. Lo bilang apa ke diri sendiri?",
        options: [
            { id: '8A', text: '"Tim gue yang payah"', scores: { darkTriad: 6, emotionalHealth: 1 } },
            { id: '8B', text: '"Next month aja deh"', scores: { darkTriad: 2, trauma: { flight: 5 }, emotionalHealth: 2 } },
            { id: '8C', text: '"Gue emang gagal terus"', scores: { darkTriad: 3, attachment: { anxious: 6 }, trauma: { freeze: 5 }, emotionalHealth: 1 } },
            { id: '8D', text: '"Apa yang bisa improve?"', scores: { darkTriad: 0, attachment: { secure: 6 }, emotionalHealth: 6 } }
        ]
    },
    {
        id: 9,
        question: "Lo menang game online, tim lo noob. Lo?",
        options: [
            { id: '9A', text: 'Toxic chat "lo semua sampah"', scores: { darkTriad: 6, trauma: { fight: 5 }, emotionalHealth: 1 } },
            { id: '9B', text: 'Mute all, main solo', scores: { darkTriad: 3, attachment: { avoidant: 6 }, emotionalHealth: 2 } },
            { id: '9C', text: '"Next round yuk guys"', scores: { darkTriad: 0, trauma: { fawn: 6 }, emotionalHealth: 4 } },
            { id: '9D', text: 'Leave queue, cari tim baru', scores: { darkTriad: 2, trauma: { flight: 5 }, emotionalHealth: 3 } }
        ]
    },
    {
        id: 10,
        question: "Ibu lo suruh makan sehat, lo lagi craving junk. Lo?",
        options: [
            { id: '10A', text: '"Ibu gaptek nutrisi" dalem hati', scores: { darkTriad: 5, trauma: { fight: 4 }, emotionalHealth: 1 } },
            { id: '10B', text: 'Makan sembunyi-sembunyi', scores: { darkTriad: 4, attachment: { avoidant: 5 }, trauma: { fawn: 5 }, emotionalHealth: 1 } },
            { id: '10C', text: 'Debat "kenapa sih?"', scores: { darkTriad: 2, attachment: { anxious: 6 }, trauma: { fight: 5 }, emotionalHealth: 2 } },
            { id: '10D', text: '"Oke bu, besok ya"', scores: { darkTriad: 1, attachment: { secure: 5 }, emotionalHealth: 4 } }
        ]
    },
    {
        id: 11,
        question: "Lo liat postingan motivasi \"be positive\". Lo pikir?",
        options: [
            { id: '11A', text: '"Omong doang, hidup gue berantakan"', scores: { darkTriad: 4, trauma: { freeze: 6 }, emotionalHealth: 0 } },
            { id: '11B', text: 'Share biar keliatan', scores: { darkTriad: 3, trauma: { fawn: 5 }, emotionalHealth: 2 } },
            { id: '11C', text: 'Scroll cepet, realita beda', scores: { darkTriad: 2, attachment: { avoidant: 6 }, trauma: { flight: 4 }, emotionalHealth: 2 } },
            { id: '11D', text: 'Coba apply hari ini', scores: { darkTriad: 0, attachment: { secure: 6 }, emotionalHealth: 6 } }
        ]
    },
    {
        id: 12,
        question: "Rekan kerja ambil kredit ide lo. Lo?",
        options: [
            { id: '12A', text: 'Sabotase subtle kerjaan dia', scores: { darkTriad: 6, trauma: { fight: 5 }, emotionalHealth: 1 } },
            { id: '12B', text: 'Diam, catet buat nanti', scores: { darkTriad: 4, trauma: { freeze: 6 }, emotionalHealth: 1 } },
            { id: '12C', text: 'Bilang "eh itu ide gue"', scores: { darkTriad: 2, attachment: { anxious: 5 }, trauma: { fawn: 4 }, emotionalHealth: 3 } },
            { id: '12D', text: 'Diskusi privat "next time credit ya"', scores: { darkTriad: 0, attachment: { secure: 6 }, emotionalHealth: 5 } }
        ]
    },
    {
        id: 13,
        question: "Lo insomnia gara-gara overthink besok. Lo?",
        options: [
            { id: '13A', text: 'Minum kopi lagi biar fokus', scores: { darkTriad: 3, trauma: { flight: 5 }, emotionalHealth: 1 } },
            { id: '13B', text: 'Scroll Twitter sampe pagi', scores: { darkTriad: 2, attachment: { anxious: 6 }, trauma: { freeze: 6 }, emotionalHealth: 0 } },
            { id: '13C', text: 'Meditasi atau journaling', scores: { darkTriad: 0, attachment: { secure: 6 }, emotionalHealth: 6 } },
            { id: '13D', text: 'Chat bot atau AI curhat', scores: { darkTriad: 1, trauma: { fawn: 5 }, emotionalHealth: 3 } }
        ]
    },
    {
        id: 14,
        question: "Di keramaian konser, lo ngerasa?",
        options: [
            { id: '14A', text: 'Pushed orang biar depan', scores: { darkTriad: 5, trauma: { fight: 6 }, emotionalHealth: 1 } },
            { id: '14B', text: 'Cari pojok aman', scores: { darkTriad: 3, attachment: { avoidant: 6 }, trauma: { freeze: 4 }, emotionalHealth: 2 } },
            { id: '14C', text: 'Ikut moshing biar lepas', scores: { darkTriad: 2, attachment: { anxious: 5 }, trauma: { flight: 5 }, emotionalHealth: 2 } },
            { id: '14D', text: 'Nikmatin aja bareng crowd', scores: { darkTriad: 0, attachment: { secure: 6 }, emotionalHealth: 5 } }
        ]
    },
    {
        id: 15,
        question: "Lo dapet feedback jelek dari coach gym. Lo?",
        options: [
            { id: '15A', text: '"Coach iri badan gue"', scores: { darkTriad: 6, emotionalHealth: 0 } },
            { id: '15B', text: 'Skip gym minggu ini', scores: { darkTriad: 2, trauma: { flight: 6 }, emotionalHealth: 1 } },
            { id: '15C', text: 'Latihan lebih keras diam-diam', scores: { darkTriad: 1, attachment: { avoidant: 5, secure: 5 }, emotionalHealth: 4 } },
            { id: '15D', text: 'Tanya detail "gimana caranya?"', scores: { darkTriad: 0, trauma: { fawn: 4 }, emotionalHealth: 5 } }
        ]
    }
];
