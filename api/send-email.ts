import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, archetype, scores } = req.body;

    if (!email || !name || !archetype || !scores) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Normalization logic consistent with scoring.ts
    const norm = (val: number | undefined) => Math.min(((val || 0) / 90) * 100, 100);

    const darkScore = Math.round(norm(scores.darkTriad));
    const lightMetrics = [
        scores.optimism, scores.resilience, scores.growth,
        scores.empathy, scores.selfAwareness, scores.balance,
        scores.emotionalIntelligence, scores.emotionalHealth
    ];
    const lightScore = Math.round(lightMetrics.reduce((a, b) => a + norm(b), 0) / lightMetrics.length);

    // Dynamic URLs (Fallback to production if origin is missing)
    // IMPORTANT: Gmail often flags localhost links as dangerous. 
    // We try to use a reliable host to make sure links are absolute and valid.
    const host = req.headers.host || 'paham-diam.vercel.app';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;

    // Use the actual origin if available, otherwise build from host
    const origin = req.headers.origin || baseUrl;

    // RE-ENCODE PAYLOAD TO MATCH ResultPage.tsx EXPECTATIONS
    const payload = { name, email, scores };
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64');

    const resultUrl = `${origin}/result/${archetype.id}?d=${encodedPayload}`;
    const dashboardUrl = origin;
    const downloadUrl = resultUrl;

    try {
        const { data, error } = await resend.emails.send({
            from: 'Paham Diam <onboarding@resend.dev>',
            to: [email],
            subject: `Identity Dossier lo udah siap, ${name}.`,
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Identity Dossier</title>
</head>
<body style="margin: 0; padding: 0; background-color: #020617; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #f8fafc;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #020617;">
        <tr>
            <td align="center" style="padding: 40px 0 60px 0;">
                <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #0f172a; border-radius: 24px; border: 1px solid #1e293b; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
                    <!-- Header Image / Banner -->
                    <tr>
                        <td align="center" style="padding: 40px 40px 20px 40px;">
                            <!-- We use a styled div with a text symbol as a fallback for the logo -->
                            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #7c3aed, #4f46e5); border-radius: 16px; margin-bottom: 24px; line-height: 60px; text-align: center;">
                                <span style="font-size: 30px; color: white;">✦</span>
                            </div>
                            <h1 style="font-size: 28px; font-weight: 800; margin: 0; letter-spacing: -0.02em; color: #f8fafc;">IDENTITY REVEALED.</h1>
                            <p style="text-transform: uppercase; letter-spacing: 0.3em; font-size: 10px; color: #7c3aed; font-weight: 700; margin-top: 8px;">Dossier Archive // Unit 12-B</p>
                        </td>
                    </tr>

                    <!-- Introduction -->
                    <tr>
                        <td style="padding: 20px 40px 40px 40px;">
                            <p style="font-size: 16px; line-height: 1.6; color: #94a3b8; margin: 0;">
                                Halo <strong>${name}</strong>,<br><br>
                                Lo baru aja nuker kejujuran lo sama insight yang mahal. 30 pertanyaan tadi bukan cuma kuis, tapi pembedahan psikometri buat ngeliat apa yang selama ini lo sembunyiin di bawah radar.
                                <br><br>
                                Ini jackpot self-awareness lo hari ini.
                            </p>
                        </td>
                    </tr>

                    <!-- Result Card -->
                    <tr>
                        <td style="padding: 0 40px;">
                            <div style="background: linear-gradient(160deg, #1e1b4b 0%, #0f172a 100%); border: 1px solid rgba(124,58,237,0.3); border-radius: 20px; padding: 40px; text-align: center; box-shadow: inset 0 0 20px rgba(124,58,237,0.1);">
                                <span style="font-size: 12px; font-weight: 700; color: #a1a1aa; letter-spacing: 0.2em; text-transform: uppercase;">Your Primary Archetype</span>
                                <h2 style="font-size: 36px; font-weight: 900; color: #7c3aed; margin: 10px 0 5px 0; letter-spacing: -0.01em;">${archetype.name}</h2>
                                <p style="font-size: 14px; font-weight: 600; color: #6366f1; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 0.1em;">${archetype.mbti} Shadow Logic</p>
                                
                                <div style="display: inline-block; padding: 6px 16px; background: rgba(124,58,237,0.2); border-radius: 30px; border: 1px solid rgba(124,58,237,0.3);">
                                    <span style="font-size: 12px; color: #c4b5fd; font-weight: 600;">Rarity: ${archetype.rarity}</span>
                                </div>
                                
                                <p style="font-size: 18px; font-style: italic; font-weight: 400; color: #e2e8f0; margin: 30px 0 0 0; line-height: 1.5;">
                                    "${archetype.tagline}"
                                </p>
                            </div>
                        </td>
                    </tr>

                    <!-- Stats / Radar Section -->
                    <tr>
                        <td style="padding: 40px 40px 20px 40px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="48%" style="background: #1e293b; border-radius: 12px; padding: 20px; border: 1px solid #334155;">
                                        <div style="font-size: 10px; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.1em;">Shadow Depth</div>
                                        <div style="font-size: 24px; font-weight: 800; color: #f43f5e; margin: 5px 0;">${darkScore}%</div>
                                        <div style="height: 4px; background: #334155; border-radius: 2px; margin-top: 5px;">
                                            <div style="width: ${darkScore}%; height: 100%; background: #f43f5e; border-radius: 2px;"></div>
                                        </div>
                                    </td>
                                    <td width="4%"></td>
                                    <td width="48%" style="background: #1e293b; border-radius: 12px; padding: 20px; border: 1px solid #334155;">
                                        <div style="font-size: 10px; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.1em;">Light Potential</div>
                                        <div style="font-size: 24px; font-weight: 800; color: #10b981; margin: 5px 0;">${lightScore}%</div>
                                        <div style="height: 4px; background: #334155; border-radius: 2px; margin-top: 5px;">
                                            <div style="width: ${lightScore}%; height: 100%; background: #10b981; border-radius: 2px;"></div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Detailed Analysis Table -->
                    <tr>
                        <td style="padding: 20px 40px;">
                            <table width="100%" cellpadding="15" cellspacing="0" style="background: #0f172a; border-radius: 16px; border: 1px solid #1e293b;">
                                <tr>
                                    <td style="border-bottom: 1px solid #1e293b;">
                                        <span style="color: #6366f1; font-size: 11px; font-weight: 700; text-transform: uppercase;">Core Drive</span>
                                        <p style="margin: 5px 0 0 0; color: #e2e8f0; font-size: 14px;">${archetype.coreDrive}</p>
                                    </td>
                                    <td style="border-bottom: 1px solid #1e293b;">
                                        <span style="color: #6366f1; font-size: 11px; font-weight: 700; text-transform: uppercase;">Stress Mode</span>
                                        <p style="margin: 5px 0 0 0; color: #e2e8f0; font-size: 14px;">${archetype.stressMode}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="border-bottom: 1px solid #1e293b;">
                                        <span style="color: #6366f1; font-size: 11px; font-weight: 700; text-transform: uppercase;">Relational Pattern</span>
                                        <p style="margin: 5px 0 0 0; color: #e2e8f0; font-size: 14px;">${archetype.relPattern}</p>
                                    </td>
                                    <td style="border-bottom: 1px solid #1e293b;">
                                        <span style="color: #6366f1; font-size: 11px; font-weight: 700; text-transform: uppercase;">Primary Power</span>
                                        <p style="margin: 5px 0 0 0; color: #e2e8f0; font-size: 14px;">${archetype.power}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span style="color: #6366f1; font-size: 11px; font-weight: 700; text-transform: uppercase;">Work Style</span>
                                        <p style="margin: 5px 0 0 0; color: #e2e8f0; font-size: 14px;">${archetype.workStyle}</p>
                                    </td>
                                    <td>
                                        <span style="color: #6366f1; font-size: 11px; font-weight: 700; text-transform: uppercase;">Social Strategy</span>
                                        <p style="margin: 5px 0 0 0; color: #e2e8f0; font-size: 14px;">${archetype.socialStyle}</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- The Warning Sign -->
                    <tr>
                        <td style="padding: 20px 40px;">
                            <div style="background: rgba(244, 63, 94, 0.1); border: 1px solid rgba(244, 63, 94, 0.2); border-radius: 12px; padding: 20px;">
                                <div style="display: flex; align-items: center;">
                                    <span style="color: #f43f5e; font-weight: 800; font-size: 14px; text-transform: uppercase;">⚠️ Shadow Warning Sign</span>
                                </div>
                                <p style="margin: 10px 0 0 0; font-size: 15px; line-height: 1.5; color: #fda4af;">
                                    "${archetype.warningSign}"
                                </p>
                            </div>
                        </td>
                    </tr>

                    <!-- Superpower & Action -->
                    <tr>
                        <td style="padding: 20px 40px;">
                            <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 15px;">Shadow Work Starter Pack</h3>
                            <div style="background: #1e293b; border-radius: 16px; padding: 24px;">
                                <div style="margin-bottom: 20px;">
                                    <div style="font-size: 11px; font-weight: 700; color: #10b981; text-transform: uppercase; letter-spacing: 0.1em;">Hidden Superpower</div>
                                    <p style="margin: 5px 0 0 0; font-size: 15px; color: #e2e8f0;">${archetype.superpower}</p>
                                </div>
                                <div style="margin-bottom: 20px;">
                                    <div style="font-size: 11px; font-weight: 700; color: #fbbf24; text-transform: uppercase; letter-spacing: 0.1em;">Immediate Challenge</div>
                                    <p style="margin: 5px 0 0 0; font-size: 15px; color: #e2e8f0;">${archetype.challenge1}</p>
                                </div>
                                <div style="padding-top: 15px; border-top: 1px solid #334155;">
                                    <div style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em;">Journal Prompt</div>
                                    <p style="margin: 5px 0 0 0; font-size: 15px; color: #e2e8f0; font-style: italic;">"${archetype.journalPrompt}"</p>
                                </div>
                            </div>
                        </td>
                    </tr>

                    <!-- Call to Action -->
                    <tr>
                        <td align="center" style="padding: 40px;">
                            <a href="${dashboardUrl}" style="display: inline-block; background: linear-gradient(to right, #7c3aed, #4f46e5); color: white; padding: 18px 40px; border-radius: 14px; text-decoration: none; font-weight: 700; font-size: 16px; box-shadow: 0 10px 20px rgba(124,58,237,0.3);">Masuk ke Dashboard Lo</a>
                            <div style="margin-top: 24px;">
                                <a href="${downloadUrl}" style="color: #94a3b8; text-decoration: underline; font-size: 13px; font-weight: 500;">Download Identity Card (PDF)</a>
                            </div>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 40px; background-color: #020617; border-top: 1px solid #0f172a;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="color: #64748b; font-size: 13px; line-height: 1.6;">
                                        "Belajar adalah perjalanannya, kebijaksanaan adalah detaknya."<br>
                                        <strong>— ${archetype.quote}</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-top: 30px; font-size: 11px; color: #334155; text-transform: uppercase; letter-spacing: 0.2em;">
                                        PAHAM DIAM LABS // DEPT. PSYCHOMETRICS<br>
                                        Joined by 2,847 others this week.
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
      `,
        });

        if (error) {
            return res.status(400).json({ error });
        }

        return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json({ error: (error as Error).message });
    }
}
