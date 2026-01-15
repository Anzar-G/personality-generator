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
    // Normalization to 0-100 (Based on 35 questions, max 7 points per answer)
    // Average max score per metric: ~122.5 (35 × 7 ÷ 2)
    const norm = (val: number | undefined) => Math.min(((val || 0) / 122.5) * 100, 100);

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

    // === SIMPLIFIED TIER SYSTEM (2 Tiers per Path) ===
    let allowedArchetypes: string[] = [];

    if (path === 'dark') {
        // Dark Path - Specialized vs General
        if (stats.darkTriad > 60 || stats.emoHealth < 35) {
            // Specialized: High shadow or low emotional health
            allowedArchetypes = [
                'emotional-manipulator', 'calculated-detacher', 'self-saboteur',
                'numb-survivor', 'overthinking-analyzer', 'shadow-worker-dark'
            ];
        } else {
            // General: All dark archetypes compete
            allowedArchetypes = [
                'emotional-manipulator', 'silent-observer', 'integrated-self-dark', 'self-saboteur',
                'stoic-protector', 'chaotic-empath', 'calculated-detacher', 'overthinking-analyzer',
                'numb-survivor', 'adaptive-chameleon', 'wounded-healer-dark', 'shadow-worker-dark'
            ];
        }
    } else {
        // Light Path - Specialized vs General
        if (stats.growth > 70 || stats.bal > 70) {
            // Specialized: High growth or balance
            allowedArchetypes = [
                'visionary-trailblazer', 'wise-strategist', 'balanced-harmonizer',
                'evolving-sage', 'adaptive-innovator', 'quiet-powerhouse'
            ];
        } else {
            // General: All light archetypes compete
            allowedArchetypes = [
                'visionary-trailblazer', 'empathic-connector', 'resilient-phoenix', 'wise-strategist',
                'balanced-harmonizer', 'authentic-grounded', 'joyful-catalyst', 'quiet-powerhouse',
                'insightful-mentor', 'adaptive-innovator', 'radiant-nurturer', 'evolving-sage'
            ];
        }
    }

    // === REBALANCED SCORING FORMULAS (All coefficients 1.0-2.0) ===
    const archetypeScores = [
        // --- DARK ARCHETYPES (12) ---
        { id: 'emotional-manipulator', score: (stats.darkTriad * 1.7) + (stats.fawn * 1.4) + (stats.ei * 0.8) },
        { id: 'silent-observer', score: (stats.avoidant * 1.6) + (stats.freeze * 1.3) + (stats.sa * 0.9) },
        { id: 'integrated-self-dark', score: (stats.secure * 1.5) + (stats.darkTriad * 1.3) + (stats.sa * 1.2) },
        { id: 'self-saboteur', score: (stats.anxious * 1.6) + (stats.fight * 1.3) + (100 - stats.resil) * 0.8 },
        { id: 'stoic-protector', score: (stats.avoidant * 1.4) + (stats.resil * 1.4) + (stats.freeze * 1.2) },
        { id: 'chaotic-empath', score: (stats.anxious * 1.4) + (stats.emp * 1.5) + (stats.fawn * 1.1) },
        { id: 'calculated-detacher', score: (stats.darkTriad * 1.5) + (stats.avoidant * 1.4) + (stats.ei * 1.0) },
        { id: 'overthinking-analyzer', score: (stats.anxious * 1.3) + (stats.freeze * 1.2) + (stats.sa * 1.4) },
        { id: 'numb-survivor', score: (stats.freeze * 1.7) + (stats.flight * 1.3) + (100 - stats.opt) * 0.8 },
        { id: 'adaptive-chameleon', score: (stats.fawn * 1.7) + (stats.darkTriad * 1.1) + (stats.ei * 1.0) },
        { id: 'wounded-healer-dark', score: (stats.emp * 1.6) + (stats.anxious * 1.2) + (stats.resil * 1.2) },
        { id: 'shadow-worker-dark', score: (stats.sa * 1.6) + (stats.darkTriad * 1.3) + (stats.growth * 1.1) },

        // --- LIGHT ARCHETYPES (12) ---
        { id: 'visionary-trailblazer', score: (stats.growth * 1.7) + (stats.opt * 1.5) + (stats.resil * 1.0) },
        { id: 'empathic-connector', score: (stats.emp * 1.7) + (stats.secure * 1.5) + (stats.ei * 1.0) },
        { id: 'resilient-phoenix', score: (stats.resil * 1.7) + (stats.growth * 1.4) + (stats.opt * 1.1) },
        { id: 'wise-strategist', score: (stats.sa * 1.7) + (stats.bal * 1.4) + (stats.ei * 1.1) },
        { id: 'balanced-harmonizer', score: (stats.bal * 1.8) + (stats.ei * 1.4) + (stats.secure * 1.0) },
        { id: 'authentic-grounded', score: (stats.sa * 1.5) + (stats.secure * 1.5) + (stats.bal * 1.2) },
        { id: 'joyful-catalyst', score: (stats.opt * 1.7) + (stats.ei * 1.3) + (stats.emp * 1.2) },
        { id: 'quiet-powerhouse', score: (stats.growth * 1.5) + (stats.resil * 1.5) + (stats.sa * 1.2) },
        { id: 'insightful-mentor', score: (stats.emp * 1.5) + (stats.sa * 1.5) + (stats.ei * 1.2) },
        { id: 'adaptive-innovator', score: (stats.growth * 1.7) + (stats.bal * 1.4) + (stats.opt * 1.1) },
        { id: 'radiant-nurturer', score: (stats.emp * 1.7) + (stats.bal * 1.3) + (stats.secure * 1.1) },
        { id: 'evolving-sage', score: (stats.growth * 1.8) + (stats.sa * 1.6) + (stats.bal * 1.0) },
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
