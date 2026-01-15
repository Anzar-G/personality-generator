import type { Scores } from '../data/questions';

export const calculateScores = (answers: Record<number, Scores>): Scores => {
    const totalScores: Scores = {
        darkTriad: 0,
        emotionalHealth: 0,
        attachment: { secure: 0, anxious: 0, avoidant: 0, fearfulAvoidant: 0 },
        trauma: { fight: 0, flight: 0, freeze: 0, fawn: 0 },
        optimism: 0,
        resilience: 0,
        growth: 0,
        empathy: 0,
        selfAwareness: 0,
        balance: 0,
        emotionalIntelligence: 0
    };

    // Aggregate scores safely
    Object.values(answers).forEach((score) => {
        if (score.darkTriad !== undefined) totalScores.darkTriad = (totalScores.darkTriad || 0) + score.darkTriad;
        if (score.emotionalHealth !== undefined) totalScores.emotionalHealth = (totalScores.emotionalHealth || 0) + score.emotionalHealth;

        // Light Metrics
        if (score.optimism !== undefined) totalScores.optimism = (totalScores.optimism || 0) + score.optimism;
        if (score.resilience !== undefined) totalScores.resilience = (totalScores.resilience || 0) + score.resilience;
        if (score.growth !== undefined) totalScores.growth = (totalScores.growth || 0) + score.growth;
        if (score.empathy !== undefined) totalScores.empathy = (totalScores.empathy || 0) + score.empathy;
        if (score.selfAwareness !== undefined) totalScores.selfAwareness = (totalScores.selfAwareness || 0) + score.selfAwareness;
        if (score.balance !== undefined) totalScores.balance = (totalScores.balance || 0) + score.balance;
        if (score.emotionalIntelligence !== undefined) totalScores.emotionalIntelligence = (totalScores.emotionalIntelligence || 0) + score.emotionalIntelligence;

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
    // Normalization to 0-100 (Based on 15 questions per category, max ~90)
    const norm = (val: number | undefined) => Math.min(((val || 0) / 90) * 100, 100);

    const att = scores.attachment || { secure: 0, anxious: 0, avoidant: 0, fearfulAvoidant: 0 };
    const tra = scores.trauma || { fight: 0, flight: 0, freeze: 0, fawn: 0 };
    const attTotal = (att.secure || 0) + (att.anxious || 0) + (att.avoidant || 0) + (att.fearfulAvoidant || 0) || 1;
    const traTotal = (tra.fight || 0) + (tra.flight || 0) + (tra.freeze || 0) + (tra.fawn || 0) || 1;

    const stats = {
        // Dark
        darkTriad: norm(scores.darkTriad),
        emoHealth: norm(scores.emotionalHealth),
        anxious: ((att.anxious || 0) / attTotal) * 100,
        avoidant: ((att.avoidant || 0) / attTotal) * 100,
        fight: ((tra.fight || 0) / traTotal) * 100,
        flight: ((tra.flight || 0) / traTotal) * 100,
        freeze: ((tra.freeze || 0) / traTotal) * 100,
        fawn: ((tra.fawn || 0) / traTotal) * 100,
        // Light
        secure: ((att.secure || 0) / attTotal) * 100,
        opt: norm(scores.optimism),
        resil: norm(scores.resilience),
        growth: norm(scores.growth),
        emp: norm(scores.empathy),
        sa: norm(scores.selfAwareness),
        bal: norm(scores.balance),
        ei: norm(scores.emotionalIntelligence),
    };

    // Calculate Global Averages
    const darkAvg = (stats.darkTriad + (100 - stats.emoHealth) + stats.anxious + stats.avoidant) / 4;
    const lightAvg = (stats.secure + stats.opt + stats.resil + stats.growth + stats.emp + stats.sa + stats.bal + stats.ei) / 8;

    // PATH SELECTION: Light or Dark?
    const path = lightAvg > darkAvg ? 'light' : 'dark';

    // === PRIORITY SYSTEM ===
    let allowedArchetypes: string[] = [];

    if (path === 'dark') {
        // Dark Path - Tiers based on Dark Triad and Emotional Health
        if (stats.darkTriad > 65) {
            allowedArchetypes = ['emotional-manipulator', 'calculated-detacher', 'adaptive-chameleon', 'shadow-worker-dark'];
        } else if (stats.emoHealth < 40) {
            allowedArchetypes = ['self-saboteur', 'chaotic-empath', 'numb-survivor', 'overthinking-analyzer', 'silent-observer'];
        } else {
            // General inclusion for balanced dark stats
            allowedArchetypes = [
                'emotional-manipulator', 'silent-observer', 'integrated-self-dark', 'self-saboteur',
                'stoic-protector', 'chaotic-empath', 'calculated-detacher', 'overthinking-analyzer',
                'numb-survivor', 'adaptive-chameleon', 'wounded-healer-dark', 'shadow-worker-dark'
            ];
        }
    } else {
        // Light Path - Tiers based on Growth and Resilience
        if (stats.growth > 75 && stats.sa > 75) {
            allowedArchetypes = ['visionary-trailblazer', 'wise-strategist', 'evolving-sage', 'quiet-powerhouse'];
        } else if (stats.resil > 75) {
            allowedArchetypes = ['resilient-phoenix', 'adaptive-innovator', 'authentic-grounded', 'insightful-mentor'];
        } else {
            allowedArchetypes = [
                'visionary-trailblazer', 'empathic-connector', 'resilient-phoenix', 'wise-strategist',
                'balanced-harmonizer', 'authentic-grounded', 'joyful-catalyst', 'quiet-powerhouse',
                'insightful-mentor', 'adaptive-innovator', 'radiant-nurturer', 'evolving-sage'
            ];
        }
    }

    // === SCORING LOGIC ===
    // Every archetype has a formula based on their core psychological markers.
    // Multipliers are balanced to ensure no single archetype dominates.
    const archetypeScores = [
        // --- DARK ARCHETYPES (12) ---
        { id: 'emotional-manipulator', score: (stats.darkTriad * 1.8) + (stats.fawn * 1.5) - stats.secure },
        { id: 'silent-observer', score: (stats.avoidant * 1.8) + (stats.freeze * 1.2) + (stats.bal * 0.5) },
        { id: 'integrated-self-dark', score: (stats.secure * 1.8) + (stats.darkTriad * 1.2) + (stats.sa * 0.5) },
        { id: 'self-saboteur', score: (stats.anxious * 1.8) + (stats.fight * 1.2) - stats.resil },
        { id: 'stoic-protector', score: (stats.avoidant * 1.5) + (stats.resil * 1.5) + (stats.freeze * 1.0) },
        { id: 'chaotic-empath', score: (stats.anxious * 1.5) + (stats.emp * 1.5) + (stats.fawn * 1.0) },
        { id: 'calculated-detacher', score: (stats.darkTriad * 1.5) + (stats.avoidant * 1.5) + (stats.ei * 0.5) },
        { id: 'overthinking-analyzer', score: (stats.anxious * 1.2) + (stats.freeze * 1.2) + (stats.sa * 1.5) },
        { id: 'numb-survivor', score: (stats.freeze * 1.8) + (stats.flight * 1.2) - stats.opt },
        { id: 'adaptive-chameleon', score: (stats.fawn * 1.8) + (stats.darkTriad * 1.0) + (stats.growth * 0.5) },
        { id: 'wounded-healer-dark', score: (stats.emp * 1.8) + (stats.resil * 1.2) + (stats.anxious * 0.5) },
        { id: 'shadow-worker-dark', score: (stats.sa * 1.8) + (stats.darkTriad * 1.2) + (stats.growth * 1.0) },

        // --- LIGHT ARCHETYPES (12) ---
        { id: 'visionary-trailblazer', score: (stats.growth * 1.8) + (stats.opt * 1.5) + (stats.resil * 0.5) },
        { id: 'empathic-connector', score: (stats.emp * 1.8) + (stats.secure * 1.5) + (stats.ei * 0.5) },
        { id: 'resilient-phoenix', score: (stats.resil * 1.8) + (stats.growth * 1.2) + (stats.opt * 1.0) },
        { id: 'wise-strategist', score: (stats.sa * 1.8) + (stats.bal * 1.2) + (stats.ei * 1.0) },
        { id: 'balanced-harmonizer', score: (stats.bal * 1.8) + (stats.ei * 1.2) + (stats.secure * 1.0) },
        { id: 'authentic-grounded', score: (stats.sa * 1.5) + (stats.secure * 1.5) + (stats.bal * 1.0) },
        { id: 'joyful-catalyst', score: (stats.opt * 1.8) + (stats.ei * 1.2) + (stats.emp * 1.0) },
        { id: 'quiet-powerhouse', score: (stats.growth * 1.5) + (stats.resil * 1.5) + (stats.sa * 1.0) },
        { id: 'insightful-mentor', score: (stats.emp * 1.5) + (stats.sa * 1.5) + (stats.ei * 1.0) },
        { id: 'adaptive-innovator', score: (stats.growth * 1.8) + (stats.bal * 1.2) + (stats.opt * 0.5) },
        { id: 'radiant-nurturer', score: (stats.emp * 1.8) + (stats.bal * 1.2) + (stats.secure * 0.5) },
        { id: 'evolving-sage', score: (stats.growth * 2.0) + (stats.sa * 1.5) - stats.darkTriad },
    ];

    // Filter candidates based on Path and Tier
    const candidates = archetypeScores.filter(arch => allowedArchetypes.includes(arch.id));

    // Sort valid candidates by score
    candidates.sort((a, b) => b.score - a.score);

    // Fallback if filtering removed everyone
    if (candidates.length === 0) {
        archetypeScores.sort((a, b) => b.score - a.score);
        return archetypeScores[0].id;
    }

    console.log("Stats:", stats);
    console.log("Path:", path, "Winner:", candidates[0].id, candidates[0].score);

    return candidates[0].id;
};
