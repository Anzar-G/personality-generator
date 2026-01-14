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

    // Calculate "Affinity Score" for each archetype
    // We sum up the relevant traits. The one with the highest affinity wins.
    const archetypes = [
        {
            id: 'emotional-manipulator',
            score: stats.darkTriad + stats.anxious + (stats.emoHealth < 40 ? 30 : 0)
        },
        {
            id: 'silent-observer',
            score: stats.avoidant + stats.emoHealth + (stats.darkTriad < 50 ? 20 : 0)
        },
        {
            id: 'integrated-self',
            score: stats.secure + stats.emoHealth + (stats.darkTriad < 30 ? 40 : 0)
        },
        {
            id: 'self-saboteur',
            score: stats.anxious + Math.max(stats.fight, stats.fawn) + (stats.emoHealth < 40 ? 30 : 0)
        },
        {
            id: 'stoic-protector',
            score: stats.avoidant + Math.max(stats.flight, stats.freeze) + (stats.darkTriad < 60 && stats.darkTriad > 30 ? 30 : 0)
        },
        {
            id: 'chaotic-empath',
            score: stats.anxious + stats.fawn + (stats.secure < 30 ? 40 : 0)
        },
        {
            id: 'calculated-detacher',
            score: stats.avoidant + stats.darkTriad + (stats.emoHealth < 50 ? 20 : 0)
        },
        {
            id: 'overthinking-analyzer',
            score: stats.anxious + stats.freeze + (stats.emoHealth > 40 ? 20 : 0)
        },
        {
            id: 'numb-survivor',
            score: Math.max(stats.freeze, stats.flight) + (stats.emoHealth < 30 ? 50 : 0)
        },
        {
            id: 'adaptive-chameleon',
            score: stats.fawn + (stats.darkTriad > 30 ? 30 : 0) + (stats.secure < 40 ? 20 : 0)
        },
        {
            id: 'wounded-healer',
            score: stats.secure + stats.emoHealth + (stats.darkTriad < 20 ? 30 : 0)
        },
        {
            id: 'shadow-worker',
            score: stats.darkTriad + stats.emoHealth + (stats.secure > 30 ? 30 : 0)
        }
    ];

    // Sort by specific score descending
    archetypes.sort((a, b) => b.score - a.score);

    // Debugging (Visible in console if user inspects)
    console.log("Archetype Matches:", archetypes.slice(0, 3));

    return archetypes[0].id;
};
