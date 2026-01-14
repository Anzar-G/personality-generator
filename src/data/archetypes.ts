export interface Archetype {
    id: string;
    name: string;
    description: string;
    detailedDescription: string;
    strength: string;
    weakness: string;
    healingTip: string;
    color: string;
}

export const archetypes: Record<string, Archetype> = {
    'emotional-manipulator': {
        id: 'emotional-manipulator',
        name: 'The Emotional Manipulator',
        description: 'Lo pinter mainin perasaan orang lain buat keuntungan lo sendiri. Air mata lo senjata, tapi hati lo dingin.',
        detailedDescription: 'Lo tipe yang charming banget pas baru kenal—senyum manis, kata-kata genit, bikin orang klepek-klepek. Tapi dalem hati? Lo hitung strategi biar orang nurut keinginan lo. Anxious attachment bikin lo butuh validasi terus, makanya lo pake taktik halus: guilt-trip "lo nggak sayang gue ya?", gaslight "gue nggak bilang gitu kok", sampe bikin orang ragu sama ingatan mereka sendiri. Dark Triad lo tinggi, empati ada tapi conditional—cuma buat orang yang berguna. Di relasi? Lo magnet buat drama, tapi lo selalu keliatan jadi korban.',
        strength: 'Super persuasive, orang gampang percaya lo.',
        weakness: 'Sendirian pas ketahuan, trust issue parah.',
        healingTip: 'Track kapan lo mulai manipulasi (misal pas insecure), pause 10 detik, tanya diri "gue butuh apa sebenarnya?"',
        color: '#ef4444'
    },
    'silent-observer': {
        id: 'silent-observer',
        name: 'The Silent Observer',
        description: 'Lo ngamatin semua dari jauh. Lo tau mana yang fake, mana yang real, tapi lo milih buat diem.',
        detailedDescription: 'Lo temen yang paling susah ditebak—jarang ngomong, tapi mata lo scan ruangan kayak CCTV. Avoidant attachment bikin lo nyaman jaga jarak, lo tau kapan orang toxic dari cara mereka ngomong 2 menit. Emosi lo terkendali, jarang overreact, orang bilang lo "cool" atau "dingin". Lo nggak butuh validasi sosial, lebih suka observe dari pinggir. Dark side? Kadang lo judge orang dalem hati tanpa kasih kesempatan. Relasi lo stabil tapi dangkal, lo protect diri dengan detachment.',
        strength: 'Nggak gampang dimanipulasi, decision lo solid.',
        weakness: 'Kesepian kronis, susah deket beneran.',
        healingTip: 'Tiap minggu, chat 1 orang "lo lagi apa?" tanpa agenda, latihan vulnerability kecil.',
        color: '#64748b'
    },
    'integrated-self': {
        id: 'integrated-self',
        name: 'The Integrated Self',
        description: 'Lo udah damai sama sisi gelap lo. Lo sadar lo nggak sempurna, tapi lo manage itu dengan sehat.',
        detailedDescription: 'Congrats, lo di 5% top yang udah self-aware banget! Secure attachment bikin lo comfortable intimacy TAPI independence. Lo bisa bilang "gue kesel" tanpa ngamuk, bisa denger kritik tanpa defensive. Dark Triad lo rendah, empati genuine, boundaries kuat. Lo ngerti trauma response lo (mungkin Fight pas deadline, Fawn pas keluarga), tapi lo control bukan dikontrol. Relasi lo healthy—nggak clingy, nggak ghosting. Lo masih punya bad day, tapi lo process cepet.',
        strength: 'Adaptable semua situasi, orang nyaman deket lo.',
        weakness: 'Kadang over-responsible, lupa isthiraht.',
        healingTip: 'Celebrate small win mingguan, lo deserve pat on the back.',
        color: '#3b82f6'
    },
    'self-saboteur': {
        id: 'self-saboteur',
        name: 'The Self-Saboteur',
        description: 'Setiap ada peluang bagus, alam bawah sadar lo nemu cara buat ngerusaknya. Lo takut sukses.',
        detailedDescription: 'Anxious attachment level dewa + low emotional health = resep self-destruction. Lo overthink "gue nggak cukup", makanya lo stay di toxic job/relasi/friendship. Pas stres, lo Fight (ngamuk random) atau Fawn (people-pleasing sampe burnout). Lo capable banget, tapi sabotase diri: procrastination, revenge shopping, revenge dating. Dark Triad lo medium, lo judge diri sendiri keras banget. Relasi? Yo-yo pattern: kejar-kejaran terus ditinggal.',
        strength: 'Super resilient, balik lagi tiap jatuh.',
        weakness: 'Pattern berulang, capek sendiri.',
        healingTip: 'Bikin "pause rule"—pas mau keputusan besar, tunggu 24 jam.',
        color: '#f59e0b'
    },
    'stoic-protector': {
        id: 'stoic-protector',
        name: 'The Stoic Protector',
        description: 'Tembok lo tinggi banget. Lo ngelindungin diri dan orang yang lo sayang dengan nutup emosi.',
        detailedDescription: 'Avoidant + Freeze/Flight response = lo armor besi berjalan. Lo reliable banget—temen curhat jam 2 pagi? Lo dengerin. Keluarga butuh? Lo yang handle. Tapi dalem hati, lo numb. Lo suppress semua feeling biar "kuat", orang bilang lo "pilar keluarga" padahal lo capek jiwa raga. Dark Triad medium bikin lo cynical tapi fair. Relasi lo one-sided, lo kasih banyak tapi terima sedikit.',
        strength: 'Orang bisa andelin lo 100%.',
        weakness: 'Burnout diam-diam, health drop.',
        healingTip: 'Tiap hari tulis 1 emosi yang lo rasain hari itu (mad, sad, glad).',
        color: '#57534e'
    },
    'chaotic-empath': {
        id: 'chaotic-empath',
        name: 'The Chaotic Empath',
        description: 'Lo nyerap emosi orang lain kayak spons sampe lo sendiri kebanjiran. Gak enakan parah.',
        detailedDescription: 'Anxious + Fawn response = lo emotional dumpster semua orang. Temen curhat? Lo nangis bareng. Kenalan toxic? Lo tetep chat balik. Lo rasain emosi orang lain lebih kuat dari emosi lo sendiri, makanya lo gampang overwhelmed. Boundaries lo kayak pasir, orang masuk seenaknya. Dark Triad rendah, empati lo unlimited (termasuk empati salah). Relasi lo chaos—lo butuh closeness tapi takut konflik.',
        strength: 'Orang sayang lo karna genuine caring.',
        weakness: 'Drained terus, susah bilang "no".',
        healingTip: 'Practice "soft no": "Gue denger lo, tapi sekarang gue lagi full."',
        color: '#d946ef'
    },
    'calculated-detacher': {
        id: 'calculated-detacher',
        name: 'The Calculated Detacher',
        description: 'Hubungan buat lo itu transaksi. Kalau nggak untung, cut off. Dingin, efisien, tapi kesepian.',
        detailedDescription: 'High Dark Triad + Avoidant = lo main chess, orang lain main checkers. Lo hitung risk-benefit tiap interaksi, empati lo selective—cuma buat yang strategic value tinggi. Lo independent ekstrim, nggak butuh validation, fokus goal. Relasi lo transactional, lo excel karir tapi kosong personal life. Lo bisa charming pas mau, tapi pas udah dapet? Detach clean.',
        strength: 'Career beast, decision tajam.',
        weakness: 'Isolation voluntary, regret nanti umur 40.',
        healingTip: 'Cari 1 hubungan non-transactional (temen/hobi), no agenda.',
        color: '#0ea5e9'
    },
    'overthinking-analyzer': {
        id: 'overthinking-analyzer',
        name: 'The Overthinking Analyzer',
        description: 'Otak lo nggak pernah berhenti. Lo analisis satu chat sampe 3 jam. Lumpuh karena mikir.',
        detailedDescription: 'Anxious attachment + Freeze response + high self-awareness = blessing and curse. Lo analisa semua: "kenapa dia bales telat?", "apa gue salah omong?", "gimana masa depan?". Lo pinter banget connect dots, tapi paralysis by analysis bikin lo stuck. Dark Triad rendah, lo self-critical ekstrim. Relasi lo exhausting—lo overcommunicate biar aman.',
        strength: 'Insight lo dalam, problem-solving expert.',
        weakness: 'Anxiety disorder potensial, insomnia kronis.',
        healingTip: 'Set "thinking curfew" jam 9 malem, tulis worry di kertas, buang besok.',
        color: '#8b5cf6'
    },
    'numb-survivor': {
        id: 'numb-survivor',
        name: 'The Numb Survivor',
        description: 'Lo udah ngelewatin banyak hal sampe lo mati rasa. Mode survival lo nyala terus. Kosong.',
        detailedDescription: 'Freeze/Flight dominant + low emotional health = survival mode permanent. Lo udah lalui hell (trauma besar), sekarang auto-pilot: kerja, makan, tidur, repeat. Emosi lo offline, orang bilang lo "flat" atau "depresi". Dark Triad medium, lo protective diri dengan numbness. Relasi lo minimum effort, lo takut deket bikin sakit lagi.',
        strength: 'Bulletproof mental, crisis? Lo handle.',
        weakness: 'Hidup kayak zombie, joy minim.',
        healingTip: 'Start micro-joy: 5 menit denger lagu favorit, no overthink.',
        color: '#71717a'
    },
    'adaptive-chameleon': {
        id: 'adaptive-chameleon',
        name: 'The Adaptive Chameleon',
        description: 'Lo bisa jadi siapa aja yang orang mau. Lo jago blending in, tapi lo lupa warna asli lo apa.',
        detailedDescription: 'Fawn response ekstrim + identity diffusion. Lo master adaptasi—di kantor formal, sama temen party animal, sama keluarga anak baik. Orang suka lo karna "easy going", tapi lo sendiri bingung "gue sebenernya siapa?". Boundaries nol, lo mirror orang biar disukai. Dark Triad medium, lo avoid konflik dengan blending.',
        strength: 'Social chameleon, survive semua circle.',
        weakness: 'Empty core, identity crisis umur 30.',
        healingTip: 'Tiap minggu 1 keputusan "gue style" (baju, opini), nggak ikut mayoritas.',
        color: '#10b981'
    },
    'wounded-healer': {
        id: 'wounded-healer',
        name: 'The Wounded Healer',
        description: 'Luka masa lalu bikin lo peka sama rasa sakit orang lain. Lo nyembuhin orang sambil terluka.',
        detailedDescription: 'Secure-ish attachment + medium emotional health + trauma-aware. Lo udah healing lumayan, sekarang bantu orang lain (temen curhat, kasih saran bijak). Pengalaman lo jadi superpower: lo paham toxic pattern, attachment style, red flag. Tapi lo masih struggle boundaries—lo nolong orang sampe lupa diri. Dark Triad rendah, empati tinggi tapi risky.',
        strength: 'Natural helper, orang healing karna lo.',
        weakness: 'Savior complex, burnout berulang.',
        healingTip: 'Set "helper quota" 3 orang/minggu, sisanya self-care.',
        color: '#14b8a6'
    },
    'shadow-worker': {
        id: 'shadow-worker',
        name: 'The Shadow Worker',
        description: 'Lo lagi aktif ngegali sisi gelap lo buat bertumbuh. Prosesnya berantakan, tapi lo jujur.',
        detailedDescription: 'Balanced metrics + aware dark side = lo di tengah journey. Lo udah kenal semua archetype lo (Anxious kadang, Avoidant kadang), lagi aktif shadow work: journaling, therapy, break pattern. Dark Triad medium, tapi lo aware dan mau ubah. Relasi lo improving, boundaries lagi dibangun. Lo masih jatuh, tapi bangun lebih cepet.',
        strength: 'Self-awareness level expert, growth mindset.',
        weakness: 'Proses panjang, kadang relapse.',
        healingTip: 'Track progress bulanan, celebrate "gue udah beda dari 6 bulan lalu".',
        color: '#6366f1'
    }
};
