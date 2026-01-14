export interface Archetype {
    id: string;
    name: string;
    description: string;
    detailedDescription: string;
    dailyBehavior: string;
    relationshipPattern: string;
    strength: string;
    weakness: string;
    healingTip: string;
    color: string;
}

export const archetypes: Record<string, Archetype> = {
    'emotional-manipulator': {
        id: 'emotional-manipulator',
        name: 'The Emotional Manipulator',
        description: 'Lo manis di depan, racun di belakang. High Dark Triad dengan taktik gaslight halus.',
        detailedDescription: 'Lo tipe yang charming banget pas baru kenal. Tapi dibalik itu, lo hitung strategi buat kontrol orang lain. Berdasarkan riset Paulhus & Williams (2002), lo punya kombinasi High Dark Triad (narcissism + Machiavellianism) + anxious attachment. Riset (Noftle & Shaver, 2006) tunjukkan kombinasi ini paling manipulative—score anxious attachment lo berkorelasi negatif dengan extraversion (β=-0.428, p=0.018) dan positif dengan avoidant (β=0.535, p<0.001). Empati lo conditional, cuma aktif pas ada benefit diri.[7][1]',
        dailyBehavior: 'Over-communicate pas insecure, judge orang lain keras.',
        relationshipPattern: 'High conflict, cycle push-pull yang exhausting bagi partner.[8]',
        strength: 'Super persuasive, orang gampang percaya sama karisma lo.',
        weakness: 'Sendirian pas topeng kebuaka, trust issue parah ke semua orang.',
        healingTip: 'Cognitive restructuring buat kurangi manipulation urges (Chakrabarti & Biswas, 2011). Pause 10 detik pas mau manipulasi, tanya: "Gue sebenernya butuh apa?"',
        color: '#ef4444'
    },
    'silent-observer': {
        id: 'silent-observer',
        name: 'The Silent Observer',
        description: 'Lo liat semua bullshit, tapi milih diem classy. Pengamat yang detached.',
        detailedDescription: 'Lo temen yang paling susah ditebak—jarang ngomong, tapi mata lo scan ruangan kayak CCTV. Dominant avoidant attachment lo bikin lo nyaman jaga jarak. Riset tunjukkan avoidant attachment positif korelasi dengan psychoticism (β=0.350, p=0.017) dan negatif sama secure (β=-0.272, p=0.024). Lo tau kapan orang toxic dalam 2 menit, tapi lo protect diri dengan detachment buat hindari drama. Adaptive, tapi risky isolation.[1]',
        dailyBehavior: 'Paling diem di grup chat toxic, sangat prefer solo time buat recharge.',
        relationshipPattern: 'Superficial connections, jarang konflik karena lo milih buat lepas daripada berantem.[4]',
        strength: 'Nggak gampang dimanipulasi, keputusan lo selalu solid dan objektif.',
        weakness: 'Kesepian kronis yang lo denial, susah punya kedekatan emosional yang dalam.',
        healingTip: 'Gradual exposure therapy buat tingkatkan intimacy comfort (Mikulincer & Shaver, 2007). Latihan vulnerability kecil ke 1 orang tiap minggu.',
        color: '#64748b'
    },
    'integrated-self': {
        id: 'integrated-self',
        name: 'The Integrated Self',
        description: 'Lo udah mainnya pake manual, bukan auto-pilot. Balance dan rare.',
        detailedDescription: 'Congrats, lo di 5% top yang udah self-aware! Secure attachment lo dominan, yang secara statistik negatif korelasi sama avoidant (β=-0.436, p=0.005) dan psychoticism. Lo bisa balance intimacy-independence, denger kritik tanpa defensive, dan boundaries lo sekuat lapis baja. Prevalensi lo cuma ~50-60% di populasi umum, dan makin rare di sampel overthinker. Lo control emosi lo, bukan dikontrol.[2][1]',
        dailyBehavior: 'Bisa bilang "no" tanpa merasa bersalah, proses emosi negatif dengan sangat cepet.',
        relationshipPattern: 'Stable long-term, punya risiko perceraian/breakup paling rendah.[8]',
        strength: 'Sangat adaptable di semua situasi, orang merasa "safe" di deket lo.',
        weakness: 'Kadang over-responsible buat beresin masalah orang lain, lupa istirahat.',
        healingTip: 'Maintain dengan mindfulness. Lo udah optimal, tinggal konsisten jaga boundaries aja.',
        color: '#3b82f6'
    },
    'self-saboteur': {
        id: 'self-saboteur',
        name: 'The Self-Saboteur',
        description: 'Lo tau jalannya salah, tapi tetep gaspol. Musuh terbesar diri sendiri.',
        detailedDescription: 'Anxious attachment level dewa + low emotional health = resep self-destruction. Lo korelasi tinggi dengan neuroticism (Noftle & Shaver, 2006), yang bikin procrastination dan self-criticism lo ekstrim. Lo sebenernya pinter dan capable, tapi lo mensabotase diri sendiri karena takut sukses sama besarnya kayak takut gagal. Lo ngerusak hal-hal bagus sebelum hal itu "meninggalkan" lo.[3]',
        dailyBehavior: 'Delay deadline meski lo bisa dapet nilai A+, stay di lingkungan toxic karena merasa itu yang lo layak dapet.',
        relationshipPattern: 'Yo-yo cycling (putus-nyambung), high breakup rate karena rasa insecure yang gak kelar-kelar.[7]',
        strength: 'Super resilient. Lo jatuh 100 kali, tapi selalu nemu cara buat diri lagi.',
        weakness: 'Terjebak di pattern yang sama berulang-ulang sampe capek sendiri.',
        healingTip: 'Schema therapy buat break self-sabotage cycles (Young, 1990). Bikin "24-hour rule" sebelum ambil keputusan emosional.',
        color: '#f59e0b'
    },
    'stoic-protector': {
        id: 'stoic-protector',
        name: 'The Stoic Protector',
        description: 'Tembok lo tinggi banget. Armor besi berjalan yang aslinya capek jiwa.',
        detailedDescription: 'Avoidant + Freeze/Flight response bikin lo jadi pilar yang gak bisa rubuh. Berdasarkan Polyvagal Theory (Porges), Freeze response lo adalah mode shutdown buat protect diri. Avoidant attachment lo punya korelasi tinggi sama psychoticism (β=0.161, p=0.043), bikin lo bisa tutup perasaan rapat-rapat. Lo handelin semua beban keluarga/temen, tapi diri lo sendiri numb (mati rasa).[1]',
        dailyBehavior: 'Dengerin curhat orang berjam-jam tapi lo sendiri nggak pernah cerita balik soal masalah lo.',
        relationshipPattern: 'One-sided giving yang parah, risiko tinggi kena burnout diam-diam.[2]',
        strength: 'Sangat reliable. Orang bisa andelin lo 100% pas dunia lagi berantakan.',
        weakness: 'Burnout yang telat disadari, kesehatan fisik sering drop tiba-tiba.',
        healingTip: 'Somatic experiencing buat release freeze response yang kejebak di saraf (Levine, 1997). Tulis 1 emosi tiap hari.',
        color: '#57534e'
    },
    'chaotic-empath': {
        id: 'chaotic-empath',
        name: 'The Chaotic Empath',
        description: 'Lo sponge emosi orang, sampe lo tenggelem. Gak enakan parah.',
        detailedDescription: 'Anxious attachment + Fawn dominant. Fawn response lo muncul dari trauma bonding masa lalu. Riset tunjukkan anxious attachment korelasi negatif sama extraversion (β=-0.243, p=0.020). Lo absorb emosi orang lain lebih kuat dari emosi lo sendiri. Boundaries lo porous (bocor), bikin orang bisa masuk dan manfaatin lo sesuka hati karena lo takut konflik.[1]',
        dailyBehavior: 'Masih jawab chat orang toxic jam 2 pagi, panik tiap kali mau bilang "nggak".',
        relationshipPattern: 'Codependent dynamics—lo merasa berharga cuma kalau lo dibutuhin orang lain.[8]',
        strength: 'Empati lo genuine dan sangat dalam. Orang merasa sangat dimengerti pas sama lo.',
        weakness: 'Selalu drained/capek mental, nggak punya waktu buat ngurus diri sendiri.',
        healingTip: 'DBT (Dialectical Behavior Therapy) buat boundary training + distress tolerance. Belajar "soft no".',
        color: '#d946ef'
    },
    'calculated-detacher': {
        id: 'calculated-detacher',
        name: 'The Calculated Detacher',
        description: 'Hubungan buat lo itu transaksi (ROI). Robot logis yang career-beast.',
        detailedDescription: 'High Dark Triad + Avoidant. Lo main catur pas orang lain main checkers. Traits lo korelasi kuat sama empati rendah + strategic thinking tinggi. Avoidant attachment lo juga punya korelasi positif sama anxious comorb (β=0.502, p=0.001). Lo hitung untung-rugi dari tiap interaksi sosial. Lo pinter, mandiri ekstrim, tapi personal life lo sering kosong karena semua transactional.[1]',
        dailyBehavior: 'Secara gak sadar ngitung ROI (Return on Investment) dari tiap pertemanan yang lo punya.',
        relationshipPattern: 'Short-term, utilitarian bonds. Lo cut-off orang tanpa rasa bersalah kalau udah gak berguna.',
        strength: 'Career beast dengan pengambilan keputusan yang sangat tajam dan efisien.',
        weakness: 'Isolasi sukarela yang bakal bikin lo nyesel di masa tua nanti.',
        healingTip: 'Empathy training via perspective-taking. Coba cari 1 hobi atau teman tanpa agenda bisnis/strategis.',
        color: '#0ea5e9'
    },
    'overthinking-analyzer': {
        id: 'overthinking-analyzer',
        name: 'The Overthinking Analyzer',
        description: 'Lo punya 17 tab pikiran terbuka 24/7. Lumpuh karena kebanyakan mikir.',
        detailedDescription: 'Anxious + Freeze + high self-awareness. Neuroticism tinggi dari anxious style lo bikin rumination (mikir berulang) jadi kronis. Lo pinter banget connect dots dan liat pola, tapi paralysis by analysis bikin lo stuck gak gerak-gerak. Lo analisa chat sampe 10 pola kemungkinan interpretasi. Blessing sekaligus curse.[3]',
        dailyBehavior: 'Bikin 17 draft WhatsApp cuma buat bales satu kalimat singkat.',
        relationshipPattern: 'Over-communication yang bikin partner lo capek lahir batin karena lo minta validasi terus.',
        strength: 'Insight lo sangat dalam. Lo adalah expert dalam problem-solving kalau masalahnya punya orang lain.',
        weakness: 'Potensi anxiety disorder tinggi dan insomnia kronis.',
        healingTip: 'Metacognitive therapy buat kurangi "worry time" (Wells, 2009). Kasih jam malem buat otak lo berhenti mikir.',
        color: '#8b5cf6'
    },
    'numb-survivor': {
        id: 'numb-survivor',
        name: 'The Numb Survivor',
        description: 'Lo survive tsunami, sekarang kering aja rasanya. Mati rasa tapi fungsional.',
        detailedDescription: 'Freeze/Flight dominant + low emotional health. Berdasarkan Polyvagal Theory, lo ada di mode "dorsal vagal shutdown" atau emotional numbness. Lo mungkin udah lalui "neraka" (trauma besar) yang bikin otak lo dissociated buat survive. Sekarang lo jalanin hidup kayak robot: fungsional, kerja oke, tapi flat dan hampa.[1]',
        dailyBehavior: 'Flat affect (muka lempeng terus), minimal emotional range—lo susah ngerasain seneng tapi juga susah ngerasain sedih.',
        relationshipPattern: 'Avoidant intimacy—lo takut deket sama orang karena deket berarti ada peluang buat disakitin lagi.[4]',
        strength: 'Bulletproof mental. Dalam krisis besar, lo adalah orang paling tenang karena lo udah biasa sama rasa sakit.',
        weakness: 'Hidup cuma kayak zombie, kebahagiaan harian lo sangat minim.',
        healingTip: 'EMDR (Eye Movement Desensitization and Reprocessing) buat proses memori trauma. Mulai cari micro-joy harian.',
        color: '#71717a'
    },
    'adaptive-chameleon': {
        id: 'adaptive-chameleon',
        name: 'The Adaptive Chameleon',
        description: 'Lo ubah warna tiap lingkungan. Master adaptasi yang kehilangan diri sendiri.',
        detailedDescription: 'Fawn response ekstrim + identity diffusion. Fawn muncul dari chronic people-pleasing sebagai mekanisme pertahanan diri. Ada korelasi kuat antara anxious/avoidant comorb di tipe ini. Lo master dalam blending di tiap circle—jadi anak baik di rumah, party animal di luar. Masalahnya, lo sendiri bingung "warna asli" lo apa karena lo terlalu sibuk mirror orang lain.[1]',
        dailyBehavior: 'Ubah gaya bicara, slang, sampe opini tiap kali ganti circle pertemanan.',
        relationshipPattern: 'Surface-level acceptance—banyak temen, tapi gak ada yang bener-bener kenal siapa lo sebenernya.',
        strength: 'Social master. Lo bisa survive di lingkungan manapun karena lo pinter baca situasi.',
        weakness: 'Empty core. Lo bakal ngerasain identity crisis parah pas sendirian.',
        healingTip: 'Identity consolidation therapy. Latihan ambil 1 keputusan kecil tiap minggu yang murni kemauan lo, bukan ikut arus.',
        color: '#10b981'
    },
    'wounded-healer': {
        id: 'wounded-healer',
        name: 'The Wounded Healer',
        description: 'Luka lo bikin lo jadi therapist gratis buat semua orang. Bijak tapi skip self-care.',
        detailedDescription: 'Secure-ish + trauma-aware + medium emotional health. Archetype dari Carl Jung ini terkonfirmasi di banyak studi psikologi—luka personal lo yang bikin lo punya empati sangat tinggi. Lo paham toxic pattern dan red flag karena lo pernah di sana. Lo nolong semua orang buat healing, tapi lo sering lupa kalau luka lo sendiri belum kering sepenuhnya.[7]',
        dailyBehavior: 'Kasih saran hidup yang sangat bijak ke orang lain tapi lo sendiri skip self-care dasar (makan, tidur).',
        relationshipPattern: 'Selalu dapet peran sebagai "helper" atau "penyelamat" dalam tiap hubungan.',
        strength: 'Natural helper. Orang bisa beneran berubah dan sembuh karena saran-saran lo.',
        weakness: 'Savior complex dan risiko tinggi kena burnout berulang.',
        healingTip: 'Countertransference management. Set kuota nolong orang—lo bukan pusat rehabilitasi berjalan.',
        color: '#14b8a6'
    },
    'shadow-worker': {
        id: 'shadow-worker',
        name: 'The Shadow Worker',
        description: 'Lo lagi perang sipil sama diri sendiri. Proses aktif menggali sisi gelap.',
        detailedDescription: 'Balanced metrics + active self-awareness. Integrasi dari Jungian shadow work dan Schematherapy modern. Lo sudah di tahap sadar kalau lo punya sisi gelap (Manipulator/Saboteur) dan lo lagi aktif berantem sama ego lo buat berubah. Prosesnya berantakan dan sakit, tapi lo tau ini satu-satunya jalan buat beneran Integrated.[7]',
        dailyBehavior: 'Rajin journaling pola pikir lo, konsisten ke therapy/belajar psikologi, dan aktif break pattern lama.',
        relationshipPattern: 'Sedang memperbaiki boundaries dan mulai bisa pilih lingkungan yang lebih sehat.',
        strength: 'Self-awareness level god-tier dan punya growth mindset yang kuat.',
        weakness: 'Prosesnya panjang dan melelahkan, lo sering relapse (balik ke habit lama) pas lagi stres.',
        healingTip: 'Lanjutin IFS (Internal Family Systems) therapy. Celebrate progress lo: "Gue hari ini udah beda dari gue 6 bulan lalu."',
        color: '#6366f1'
    }
};
