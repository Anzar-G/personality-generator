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
        // TIER 1: HIGH DARK TRIAD (> 65%)
        if (stats.darkTriad > 65) {
            allowedArchetypes = ['emotional-manipulator', 'calculated-detacher', 'adaptive-chameleon', 'stoic-protector'];
        } else if (stats.emoHealth < 40) {
            allowedArchetypes = ['self-saboteur', 'chaotic-empath', 'numb-survivor', 'overthinking-analyzer', 'emotional-manipulator'];
        } else {
            allowedArchetypes = [
                'emotional-manipulator', 'silent-observer', 'integrated-self-dark', 'self-saboteur',
                'stoic-protector', 'chaotic-empath', 'calculated-detacher', 'overthinking-analyzer',
                'numb-survivor', 'adaptive-chameleon', 'wounded-healer-dark', 'shadow-worker-dark'
            ];
        }
    } else {
        // Light Path - Tiers based on Growth and Resilience
        if (stats.growth > 70 && stats.sa > 70) {
            allowedArchetypes = ['visionary-trailblazer', 'wise-strategist', 'insightful-mentor', 'evolving-sage'];
        } else if (stats.resil < 40) {
            allowedArchetypes = ['balanced-harmonizer', 'radiant-nurturer', 'authentic-grounded', 'joyful-catalyst'];
        } else {
            allowedArchetypes = [
                'visionary-trailblazer', 'empathic-connector', 'resilient-phoenix', 'wise-strategist',
                'balanced-harmonizer', 'authentic-grounded', 'joyful-catalyst', 'quiet-powerhouse',
                'insightful-mentor', 'adaptive-innovator', 'radiant-nurturer', 'evolving-sage'
            ];
        }
    }

    // === SCORING LOGIC ===
    const archetypeScores = [
        // Dark
        { id: 'emotional-manipulator', score: (stats.darkTriad * 2) + (stats.anxious * 1.5) - stats.secure },
        { id: 'silent-observer', score: (stats.avoidant * 2) + Math.min(stats.emoHealth, 80) - stats.anxious },
        { id: 'integrated-self-dark', score: (stats.secure * 2) + (stats.emoHealth * 1.5) - stats.darkTriad },
        { id: 'self-saboteur', score: (stats.anxious * 1.5) + Math.max(stats.fight, stats.fawn) * 1.5 - stats.emoHealth },
        { id: 'stoic-protector', score: (stats.avoidant * 1.5) + Math.max(stats.flight, stats.freeze) * 1.5 },
        { id: 'chaotic-empath', score: (stats.anxious * 2) + (stats.fawn * 2) - stats.secure },
        { id: 'calculated-detacher', score: (stats.avoidant * 1.5) + (stats.darkTriad * 1.5) - stats.anxious },
        { id: 'overthinking-analyzer', score: (stats.anxious * 1.5) + (stats.freeze * 2) + (stats.emoHealth * 0.5) },
        { id: 'numb-survivor', score: Math.max(stats.freeze, stats.flight) * 2 - stats.emoHealth },
        { id: 'adaptive-chameleon', score: (stats.fawn * 2) + stats.darkTriad - stats.secure },
        { id: 'wounded-healer-dark', score: (stats.secure * 1.5) + (stats.emoHealth * 1.5) + (stats.fawn * 0.5) },
        { id: 'shadow-worker-dark', score: stats.darkTriad + stats.emoHealth + stats.secure },
        // Light
        { id: 'visionary-trailblazer', score: (stats.opt * 2) + (stats.growth * 2) + stats.sa },
        { id: 'empathic-connector', score: (stats.emp * 2) + (stats.secure * 2) + stats.growth },
        { id: 'resilient-phoenix', score: (stats.resil * 2) + (stats.opt * 2) + stats.growth },
        { id: 'wise-strategist', score: (stats.sa * 2) + (stats.growth * 2) + stats.opt },
        { id: 'balanced-harmonizer', score: (stats.bal * 2) + (stats.secure * 2) + stats.emp },
        { id: 'authentic-grounded', score: (stats.opt * 2) + (stats.sa * 2) + stats.bal },
        { id: 'joyful-catalyst', score: (stats.emp * 2) + (stats.resil * 2) + stats.opt },
        { id: 'quiet-powerhouse', score: (stats.resil * 2) + (stats.growth * 2) + stats.bal },
        { id: 'insightful-mentor', score: (stats.sa * 2) + (stats.emp * 2) + stats.growth },
        { id: 'adaptive-innovator', score: (stats.opt * 2) + (stats.bal * 2) + stats.growth },
        { id: 'radiant-nurturer', score: (stats.emp * 2) + (stats.secure * 2) + stats.bal },
        { id: 'evolving-sage', score: (stats.growth * 2) + (stats.sa * 2) + stats.opt },
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
