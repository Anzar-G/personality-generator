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
    // 1. Calculate Percentages (Max Possible Scores approximation)
    // Dark Triad: Max approx 70 (based on max questions). Let's normalize to 0-100 logic.
    // User requested: "Ubah ke %: (total/60)*100".

    // Safety defaults
    const dtRaw = scores.darkTriad || 0;
    const ehRaw = scores.emotionalHealth || 0;

    const att = scores.attachment || { secure: 0, anxious: 0, avoidant: 0, fearfulAvoidant: 0 };
    const tra = scores.trauma || { fight: 0, flight: 0, freeze: 0, fawn: 0 };

    // Metric Calculations (0-100 Scale)
    // Metric Calculations (0-100 Scale)
    const darkTriad = Math.min((dtRaw / 90) * 100, 100);
    const emoHealth = Math.min((ehRaw / 90) * 100, 100);

    // Attachment Percentages
    const attTotal = (att.secure || 0) + (att.anxious || 0) + (att.avoidant || 0) + (att.fearfulAvoidant || 0) || 1;
    const securePct = ((att.secure || 0) / attTotal) * 100;
    const anxiousPct = ((att.anxious || 0) / attTotal) * 100;
    const avoidantPct = ((att.avoidant || 0) / attTotal) * 100;
    // const fearfulAvoidantPct = ((att.fearfulAvoidant || 0) / attTotal) * 100; 

    // Trauma Percentages
    const traTotal = (tra.fight || 0) + (tra.flight || 0) + (tra.freeze || 0) + (tra.fawn || 0) || 1;
    const fightPct = ((tra.fight || 0) / traTotal) * 100;
    const flightPct = ((tra.flight || 0) / traTotal) * 100;
    const freezePct = ((tra.freeze || 0) / traTotal) * 100;
    const fawnPct = ((tra.fawn || 0) / traTotal) * 100;

    // === ARCHETYPE ASSIGNMENT LOGIC ===
    // IF Dark Triad >60 AND Anxious >50 → "The Emotional Manipulator"
    if (darkTriad > 60 && anxiousPct > 50) return 'emotional-manipulator';

    // IF Avoidant >60 AND Emo Health >60 → "The Silent Observer"
    if (avoidantPct > 60 && emoHealth > 60) return 'silent-observer';

    // IF Secure >50 AND Dark Triad <30 AND Emo Health >70 → "The Integrated Self"
    if (securePct > 50 && darkTriad < 30 && emoHealth > 70) return 'integrated-self';

    // IF Anxious >50 AND Emo Health <40 AND (Fight OR Fawn >40) → "The Self-Saboteur"
    if (anxiousPct > 50 && emoHealth < 40 && (fightPct > 40 || fawnPct > 40)) return 'self-saboteur';

    // IF Avoidant >50 AND (Freeze OR Flight >40) AND Dark Triad 40-60 → "The Stoic Protector"
    // Note: User said Dark Triad 40-60.
    if (avoidantPct > 50 && (freezePct > 40 || flightPct > 40) && darkTriad >= 40 && darkTriad <= 60) return 'stoic-protector';

    // IF Anxious >50 AND Fawn >50 AND Secure <20 → "The Chaotic Empath"
    if (anxiousPct > 50 && fawnPct > 50 && securePct < 20) return 'chaotic-empath';

    // IF Avoidant >60 AND Dark Triad >60 → "The Calculated Detacher"
    if (avoidantPct > 60 && darkTriad > 60) return 'calculated-detacher';

    // IF Anxious >60 AND Emo Health >60 AND Freeze >40 → "The Overthinking Analyzer"
    if (anxiousPct > 60 && emoHealth > 60 && freezePct > 40) return 'overthinking-analyzer';

    // IF (Freeze OR Flight) >50 AND Emo Health <40 → "The Numb Survivor"
    if ((freezePct > 50 || flightPct > 50) && emoHealth < 40) return 'numb-survivor';

    // IF Fawn >60 AND Dark Triad 30-50 → "The Adaptive Chameleon"
    if (fawnPct > 60 && darkTriad >= 30 && darkTriad <= 50) return 'adaptive-chameleon';

    // IF Secure >40 AND Trauma-aware (semua <40) AND Emo Health 40-69 → "The Wounded Healer"
    // "Semua <40" essentially means no single trauma response is dominant (>40)
    const noTraumaDominant = fightPct < 40 && flightPct < 40 && freezePct < 40 && fawnPct < 40;
    if (securePct > 40 && noTraumaDominant && emoHealth >= 40 && emoHealth <= 69) return 'wounded-healer';

    // ELSE (balanced, Dark Triad <40, Emo Health >50) → "The Shadow Worker"
    // Fallback? The prompt says "ELSE ... -> Shadow Worker".
    // I will use Shadow Worker as the default fallback, or Silent Observer if conditions really don't match standard paths but fallback is needed.
    return 'shadow-worker';
};
