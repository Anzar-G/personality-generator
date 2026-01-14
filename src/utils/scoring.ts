import type { Scores } from '../data/questions';

export const calculateScores = (answers: Record<number, Scores>): Scores => {
    const totalScores: Scores = {
        darkTriad: 0,
        emotionalHealth: 0,
        attachment: { secure: 0, anxious: 0, avoidant: 0, fearfulAvoidant: 0 },
        trauma: { fight: 0, flight: 0, freeze: 0, fawn: 0 }
    };

    // Aggregate scores safely
    Object.values(answers).forEach((score) => {
        if (score.darkTriad) totalScores.darkTriad = (totalScores.darkTriad || 0) + score.darkTriad;
        if (score.emotionalHealth) totalScores.emotionalHealth = (totalScores.emotionalHealth || 0) + score.emotionalHealth;

        if (score.attachment) {
            if (!totalScores.attachment) totalScores.attachment = { secure: 0, anxious: 0, avoidant: 0, fearfulAvoidant: 0 };
            totalScores.attachment.secure = (totalScores.attachment.secure || 0) + (score.attachment.secure || 0);
            totalScores.attachment.anxious = (totalScores.attachment.anxious || 0) + (score.attachment.anxious || 0);
            totalScores.attachment.avoidant = (totalScores.attachment.avoidant || 0) + (score.attachment.avoidant || 0);
            totalScores.attachment.fearfulAvoidant = (totalScores.attachment.fearfulAvoidant || 0) + (score.attachment.fearfulAvoidant || 0);
        }

        if (score.trauma) {
            if (!totalScores.trauma) totalScores.trauma = { fight: 0, flight: 0, freeze: 0, fawn: 0 };
            totalScores.trauma.fight = (totalScores.trauma.fight || 0) + (score.trauma.fight || 0);
            totalScores.trauma.flight = (totalScores.trauma.flight || 0) + (score.trauma.flight || 0);
            totalScores.trauma.freeze = (totalScores.trauma.freeze || 0) + (score.trauma.freeze || 0);
            totalScores.trauma.fawn = (totalScores.trauma.fawn || 0) + (score.trauma.fawn || 0);
        }
    });

    return totalScores;
};

export const determineArchetype = (scores: Scores): string => {
    // Safety defaults
    const dt = scores.darkTriad || 0;
    const eh = scores.emotionalHealth || 0;
    const att = scores.attachment || { secure: 0, anxious: 0, avoidant: 0, fearfulAvoidant: 0 };
    const tra = scores.trauma || { fight: 0, flight: 0, freeze: 0, fawn: 0 };

    // Normalize stats to 0-100 (Max predicted score ~90)
    const stats = {
        darkTriad: Math.min((dt / 90) * 100, 100),
        emoHealth: Math.min((eh / 90) * 100, 100),
        secure: ((att.secure || 0) / ((att.secure || 0) + (att.anxious || 0) + (att.avoidant || 0) + (att.fearfulAvoidant || 0) || 1)) * 100,
        anxious: ((att.anxious || 0) / ((att.secure || 0) + (att.anxious || 0) + (att.avoidant || 0) + (att.fearfulAvoidant || 0) || 1)) * 100,
        avoidant: ((att.avoidant || 0) / ((att.secure || 0) + (att.anxious || 0) + (att.avoidant || 0) + (att.fearfulAvoidant || 0) || 1)) * 100,
        fearful: ((att.fearfulAvoidant || 0) / ((att.secure || 0) + (att.anxious || 0) + (att.avoidant || 0) + (att.fearfulAvoidant || 0) || 1)) * 100,
        fight: ((tra.fight || 0) / ((tra.fight || 0) + (tra.flight || 0) + (tra.freeze || 0) + (tra.fawn || 0) || 1)) * 100,
        flight: ((tra.flight || 0) / ((tra.fight || 0) + (tra.flight || 0) + (tra.freeze || 0) + (tra.fawn || 0) || 1)) * 100,
        freeze: ((tra.freeze || 0) / ((tra.fight || 0) + (tra.flight || 0) + (tra.freeze || 0) + (tra.fawn || 0) || 1)) * 100,
        fawn: ((tra.fawn || 0) / ((tra.fight || 0) + (tra.flight || 0) + (tra.freeze || 0) + (tra.fawn || 0) || 1)) * 100,
    };

    // === PRIORITY SYSTEM ===
    // Filter candidates based on dominant traits to prevent "Safe" results for "Dark" users.

    let allowedArchetypes: string[] = [];

    // TIER 1: HIGH DARK TRIAD (> 65%)
    // If user is toxic, force them into a toxic archetype.
    if (stats.darkTriad > 65) {
        allowedArchetypes = [
            'emotional-manipulator',
            'calculated-detacher',
            'adaptive-chameleon', // Often high Machiavellianism
            'stoic-protector' // Can be dark if defense mechanisms are extreme
        ];
    }
    // TIER 2: HIGH TRAUMA / LOW HEALTH (< 40%)
    // If user is clearly struggling, don't give them "Integrated Self".
    else if (stats.emoHealth < 40) {
        allowedArchetypes = [
            'self-saboteur',
            'chaotic-empath',
            'numb-survivor',
            'overthinking-analyzer',
            'emotional-manipulator' // Low health sometimes manifests as manipulation (survival)
        ];
    }
    // TIER 3: BALANCED / GENERAL
    else {
        // Allow all archetypes if stats are moderate
        allowedArchetypes = [
            'emotional-manipulator', 'silent-observer', 'integrated-self', 'self-saboteur',
            'stoic-protector', 'chaotic-empath', 'calculated-detacher', 'overthinking-analyzer',
            'numb-survivor', 'adaptive-chameleon', 'wounded-healer', 'shadow-worker'
        ];
    }

    // === SCORING LOGIC ===
    const archetypes = [
        {
            id: 'emotional-manipulator',
            score: (stats.darkTriad * 2) + (stats.anxious * 1.5) - stats.secure
        },
        {
            id: 'silent-observer',
            score: (stats.avoidant * 2) + Math.min(stats.emoHealth, 80) - stats.anxious
        },
        {
            id: 'integrated-self',
            score: (stats.secure * 2) + (stats.emoHealth * 1.5) - stats.darkTriad
        },
        {
            id: 'self-saboteur',
            score: (stats.anxious * 1.5) + Math.max(stats.fight, stats.fawn) * 1.5 - stats.emoHealth
        },
        {
            id: 'stoic-protector',
            score: (stats.avoidant * 1.5) + Math.max(stats.flight, stats.freeze) * 1.5
        },
        {
            id: 'chaotic-empath',
            score: (stats.anxious * 2) + (stats.fawn * 2) - stats.secure
        },
        {
            id: 'calculated-detacher',
            score: (stats.avoidant * 1.5) + (stats.darkTriad * 1.5) - stats.anxious
        },
        {
            id: 'overthinking-analyzer',
            score: (stats.anxious * 1.5) + (stats.freeze * 2) + (stats.emoHealth * 0.5)
        },
        {
            id: 'numb-survivor',
            score: Math.max(stats.freeze, stats.flight) * 2 - stats.emoHealth
        },
        {
            id: 'adaptive-chameleon',
            score: (stats.fawn * 2) + stats.darkTriad - stats.secure
        },
        {
            id: 'wounded-healer',
            score: (stats.secure * 1.5) + (stats.emoHealth * 1.5) + (stats.fawn * 0.5)
        },
        {
            id: 'shadow-worker',
            score: stats.darkTriad + stats.emoHealth + stats.secure
        }
    ];

    // Filter candidates based on Priority Tier
    const candidates = archetypes.filter(arch => allowedArchetypes.includes(arch.id));

    // Sort valid candidates by score
    candidates.sort((a, b) => b.score - a.score);

    // Fallback if filtering removed everyone (unlikely but safe)
    if (candidates.length === 0) {
        archetypes.sort((a, b) => b.score - a.score);
        return archetypes[0].id;
    }

    // Debugging
    console.log("Stats:", stats);
    console.log("Tier allowed:", allowedArchetypes);
    console.log("Winner:", candidates[0].id, candidates[0].score);

    return candidates[0].id;
};
