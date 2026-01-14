export const quotes: Record<string, string[]> = {
    'silent-observer': [
        "Lo diem bukan karna takut, tapi karna tau omongan mereka sampah.",
        "Observe dulu, baru decide. Chaos mereka bukan urusan lo.",
        "Silent mode: on. Biar mereka capek sendiri ngomong.",
        "Lo liat semuanya, tapi milih nggak ikut main."
    ],
    'emotional-manipulator': [
        "Air mata lo senjata, tapi hati lo dingin kayak es.",
        "Lo butuh dia, tapi dia yang bakal nyesel.",
        "Cinta lo manis, tapi racunnya nempel lama.",
        "Overthink? Itu strategi lo buat menang."
    ],
    'wounded-healer': [
        "Luka lo bikin lo paham orang lain. Tapi jangan lupa heal diri sendiri.",
        "Gue rusak dulu, sekarang bantu lo biar nggak sama.",
        "Trauma lo superpower, asal lo control."
    ],
    'self-saboteur': [
        "Lo tau ini toxic, tapi lo pilih tetep nyanyi lagu lama.",
        "Self-love? Nanti aja, sekarang gue hancurin dulu.",
        "Anjir, kenapa gue selalu gini sih? Repeat."
    ],
    'stoic-protector': [
        "Lo jaga tembok tinggi, biar nggak ada yang masuk... atau keluar.",
        "Emosi? Gue simpen buat darurat aja.",
        "Lo kuat sendirian, tapi kadang capek pura-pura."
    ],
    'chaotic-empath': [
        "Lo rasain semua, sampe lo sendiri hancur.",
        "Want close, tapi takut deket. Classic gue.",
        "Empati lo unlimited, batas lo nol."
    ],
    'calculated-detacher': [
        "Hubungan? Buat orang lemah. Lo main sendiri.",
        "Lo detach bukan dingin, tapi smart.",
        "Empati? Optional, hasil lebih penting."
    ],
    'overthinking-analyzer': [
        "Lo pikirin 100 skenario sebelum tidur. Capek nggak?",
        "Overthink = lo selangkah di depan. Atau 10 langkah ke belakang.",
        "Analisis lo detail, hidup lo freeze."
    ],
    'numb-survivor': [
        "Lo survive apa aja, tapi rasanya kosong.",
        "Numb bukan lemah, itu armor lo.",
        "Hidup lo auto-pilot, mati rasa mode."
    ],
    'adaptive-chameleon': [
        "Lo ubah warna biar disuka semua orang. Asli lo mana?",
        "People-pleaser? Itu survival skill lo.",
        "Iya deh lo bener, padahal gue sebel."
    ],
    'integrated-self': [
        "Lo balance, nggak perfect tapi real.",
        "Dark side ada, tapi lo boss-nya.",
        "Healthy? Gue lagi proses, lo juga bisa."
    ],
    'shadow-worker': [
        "Lo liat sisi gelap lo, dan lo peluk dia.",
        "Aware of the mess, tapi lo clean up sendiri.",
        "Shadow work: susah, tapi lo makin kuat."
    ]
};

export const getRandomQuote = (archetypeId: string): string => {
    const pool = quotes[archetypeId] || quotes['silent-observer'];
    return pool[Math.floor(Math.random() * pool.length)];
};
