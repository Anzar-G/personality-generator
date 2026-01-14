import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, archetype } = req.body;

    if (!email || !name || !archetype) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Paham Diam <onboarding@resend.dev>',
            to: [email],
            subject: `Hasil Psikometri Lo: ${archetype.name}`,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #020617; color: white; padding: 40px; border-radius: 24px;">
          <h1 style="color: #7c3aed; font-size: 32px; margin-bottom: 24px;">Halo, ${name}!</h1>
          <p style="font-size: 18px; line-height: 1.6; color: rgba(255,255,255,0.8);">
            Analisis psikometri lo udah kelar. Berdasarkan pola yang lo tunjukin, archetype lo adalah:
          </p>
          <div style="background: rgba(124,58,237,0.1); border: 1px solid rgba(124,58,237,0.2); padding: 30px; border-radius: 20px; margin: 32px 0; text-align: center;">
            <h2 style="font-size: 36px; margin: 0; color: #7c3aed; text-transform: uppercase; letter-spacing: 2px;">${archetype.name}</h2>
            <p style="font-style: italic; color: rgba(255,255,255,0.6); margin-top: 12px;">"${archetype.description.substring(0, 100)}..."</p>
          </div>
          <p style="line-height: 1.6; color: rgba(255,255,255,0.7);">
            Lo bisa liat detail lengkapnya, download kartu identity lo, dan liat "Shadow Work" tip di dashboard kuis lo.
          </p>
          <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 40px 0;" />
          <p style="font-size: 12px; color: rgba(255,255,255,0.4); text-align: center; letter-spacing: 2px; text-transform: uppercase;">
            Paham Diam Labs // Psy-Unit 12-B
          </p>
        </div>
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
