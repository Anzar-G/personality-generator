export interface Archetype {
    id: string;
    name: string;
    description: string;
    color: string; // Hex code or tailwind class for dynamic styling
}

export const archetypes: Record<string, Archetype> = {
    'emotional-manipulator': {
        id: 'emotional-manipulator',
        name: 'The Emotional Manipulator',
        description: 'Lo pinter mainin perasaan orang lain buat keuntungan lo sendiri. Air mata lo senjata, tapi hati lo dingin. Lo butuh validasi konstan tapi kasih affection yang conditional.',
        color: '#ef4444' // Red
    },
    'silent-observer': {
        id: 'silent-observer',
        name: 'The Silent Observer',
        description: 'Lo ngamatin semua dari jauh. Lo tau mana yang fake, mana yang real, tapi lo milih buat diem. Bukan karena takut, tapi karena lo males drama. Detached, analitis, tapi sebenernya peduli.',
        color: '#64748b' // Slate
    },
    'integrated-self': {
        id: 'integrated-self',
        name: 'The Integrated Self',
        description: 'Lo udah damai sama sisi gelap lo. Lo sadar lo nggak sempurna, tapi lo manage itu dengan sehat. Lo tegas tanpa kasar, peduli tanpa jadi doormat. Rare specimen.',
        color: '#3b82f6' // Blue
    },
    'self-saboteur': {
        id: 'self-saboteur',
        name: 'The Self-Saboteur',
        description: 'Setiap ada peluang bagus, alam bawah sadar lo nemu cara buat ngerusaknya. Lo takut sukses sama besarnya kayak lo takut gagal. Siklus toxic ini lo ulang terus.',
        color: '#f59e0b' // Amber
    },
    'stoic-protector': {
        id: 'stoic-protector',
        name: 'The Stoic Protector',
        description: 'Tembok lo tinggi banget. Lo ngelindungin diri dan orang yang lo sayang dengan nutup emosi. Keliatannya kuat, padahal dalemnya capek nahan beban sendirian.',
        color: '#57534e' // Stone
    },
    'chaotic-empath': {
        id: 'chaotic-empath',
        name: 'The Chaotic Empath',
        description: 'Lo nyerap emosi orang lain kayak spons sampe lo sendiri kebanjiran. Lo mau nolong semua orang tapi lupa nolong diri sendiri. Batas diri lo blur, bikin lo gampang dimanfaatin.',
        color: '#d946ef' // Fuchsia
    },
    'calculated-detacher': {
        id: 'calculated-detacher',
        name: 'The Calculated Detacher',
        description: 'Hubungan buat lo itu transaksi. Kalau nggak untung, cut off. Lo logis banget sampe lupa kalau manusia itu punya perasaan. Dingin, efisien, tapi kesepian.',
        color: '#0ea5e9' // Sky
    },
    'overthinking-analyzer': {
        id: 'overthinking-analyzer',
        name: 'The Overthinking Analyzer',
        description: 'Otak lo nggak pernah berhenti. Lo analisis satu chat sampe 3 jam. Lo hidup di skenario "what if" yang lo bikin sendiri. Pinter, tapi lumpuh karena kebanyakan mikir.',
        color: '#8b5cf6' // Violet
    },
    'numb-survivor': {
        id: 'numb-survivor',
        name: 'The Numb Survivor',
        description: 'Lo udah ngelewatin banyak hal sampe lo mati rasa. Mode survival lo nyala terus. Lo jalanin hidup kayak robot, efisien tapi kosong. Ngerasain sakit lebih baik daripada nggak ngerasa apa-apa.',
        color: '#71717a' // Zinc
    },
    'adaptive-chameleon': {
        id: 'adaptive-chameleon',
        name: 'The Adaptive Chameleon',
        description: 'Lo bisa jadi siapa aja yang orang mau. Lo jago blending in, tapi lo lupa warna asli lo apa. People-pleasing itu cara lo survive biar nggak ditolak.',
        color: '#10b981' // Emerald
    },
    'wounded-healer': {
        id: 'wounded-healer',
        name: 'The Wounded Healer',
        description: 'Luka masa lalu bikin lo peka sama rasa sakit orang lain. Lo adalah terapis buat temen-temen lo, tapi luka lo sendiri kadang masih basah. Lo nyembuhin orang sambil nyembuhin diri sendiri.',
        color: '#14b8a6' // Teal
    },
    'shadow-worker': {
        id: 'shadow-worker',
        name: 'The Shadow Worker',
        description: 'Lo lagi aktif ngegali sisi gelap lo buat bertumbuh. Prosesnya berantakan, sakit, tapi lo tau ini perlu. Lo nggak denial sama kekurangan lo, lo hadapin head-on.',
        color: '#6366f1' // Indigo
    }
};
