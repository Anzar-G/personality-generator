import React, { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { archetypes } from '../data/archetypes';
import { getRandomQuote } from '../data/quotes';
import type { Scores } from '../data/questions'; // Type-only import
import { Download, Share2, Zap, FileText } from 'lucide-react';
import html2canvas from 'html2canvas';
import { supabase } from '../supabaseClient';

export const ResultPage = () => {
    const { archetypeId } = useParams<{ archetypeId: string }>();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const cardRef = useRef<HTMLDivElement>(null);
    const [userData, setUserData] = useState<{ name: string; scores: Scores } | null>(null);
    const [quote, setQuote] = useState('');

    const archetype = archetypes[archetypeId || 'silent-observer'];
    // Default color if undefined
    const accentColor = archetype?.color || '#9d4edd';

    // 1. Initial Load: Parse Data & Save to Supabase
    useEffect(() => {
        const dataParam = searchParams.get('data');
        if (dataParam) {
            try {
                const parsed = JSON.parse(atob(dataParam));
                setUserData(parsed);

                // Save to Supabase (only if parsed successfully)
                const saveData = async () => {
                    if (!parsed.scores) return;
                    const { error } = await supabase
                        .from('quiz_results')
                        .insert([
                            {
                                name: parsed.name,
                                archetype: archetype?.name || 'Unknown',
                                scores: parsed.scores
                            },
                        ]);

                    if (error) {
                        console.error('Error saving result:', error);
                    }
                };
                saveData();

            } catch (e) {
                console.error("Failed to parse data", e);
            }
        }

        if (archetype) {
            setQuote(getRandomQuote(archetype.id));
        }

        // Simulate analysis loading
        setTimeout(() => setLoading(false), 2000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [archetypeId]); // Run once when archetypeId changes

    const handleDownload = async () => {
        if (cardRef.current) {
            // Wait for fonts to load or layout to stabilize
            await new Promise(resolve => setTimeout(resolve, 100));
            const canvas = await html2canvas(cardRef.current, {
                backgroundColor: '#0a0a0a',
                scale: 2,
                useCORS: true
            });
            const link = document.createElement('a');
            link.download = `paham-diam-${archetype?.id}.png`;
            link.href = canvas.toDataURL();
            link.click();
        }
    };

    const handleShare = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        alert('Link tersalin! Sebarkan kegelapan lo.');
    };

    const handleJoinChallenge = async () => {
        const emailInput = document.getElementById('email-input') as HTMLInputElement;
        const email = emailInput?.value;

        if (email && userData) {
            const { error } = await supabase
                .from('leads') // Asumsi ada tabel 'leads'
                .upsert([
                    { email: email, name: userData.name, archetype: archetype?.name }
                ]);

            if (!error) {
                alert(`Mantap! Challenge dikirim ke ${email}.`);
            } else {
                console.error(error);
                alert("Gagal save email. Cek koneksi Supabase lo dan pastikan tabel 'leads' ada.");
            }
        } else {
            alert("Isi email dulu bos.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background-dark flex items-center justify-center flex-col gap-4" style={{ '--accent': accentColor } as React.CSSProperties}>
                <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin border-[var(--accent)]"></div>
                <p className="animate-pulse tracking-widest uppercase text-sm text-white/70">Menganalisis Jiwa...</p>
            </div>
        );
    }

    if (!archetype || !userData) return <div className="text-white text-center pt-20">Archetype Tidak Ditemukan atau Data Invalid</div>;

    // Safe Accessors
    const scores = userData.scores || {};
    const darkTriadVal = scores.darkTriad || 0;
    const ehVal = scores.emotionalHealth || 0;

    // Normalize to 0-100 based on max 90 (15 questions * 6 max score)
    const darkTriadPercent = Math.min(Math.round((darkTriadVal / 90) * 100), 100);
    const emoHealthPercent = Math.min(Math.round((ehVal / 90) * 100), 100);

    const trauma = scores.trauma || { fight: 0, flight: 0, freeze: 0, fawn: 0 };
    // Sort trauma entries to find Top 1 (Primary)
    const sortedTrauma = Object.entries(trauma).sort(([, a], [, b]) => (b || 0) - (a || 0));
    const primaryTrauma = sortedTrauma[0] ? sortedTrauma[0][0] : 'None';

    const attachment = scores.attachment || { secure: 0, anxious: 0, avoidant: 0, fearfulAvoidant: 0 };
    const attTotal = (attachment.secure || 0) + (attachment.anxious || 0) + (attachment.avoidant || 0) + (attachment.fearfulAvoidant || 0) || 1;
    // Find dominant attachment
    const sortedAtt = Object.entries(attachment).sort(([, a], [, b]) => (b || 0) - (a || 0));
    const domAtt = sortedAtt[0] ? sortedAtt[0][0] : 'Secure';
    const domAttPct = Math.round(((sortedAtt[0]?.[1] || 0) / attTotal) * 100);

    const containerStyle = { '--accent': accentColor } as React.CSSProperties;

    return (
        <div style={containerStyle} className="font-display bg-background-light dark:bg-background-dark text-white min-h-screen relative selection:bg-white/20 selection:text-white overflow-x-hidden">
            {/* Custom Header */}
            <header className="flex items-center justify-between border-b border-white/10 px-6 py-4 lg:px-20 relative z-20">
                <div className="flex items-center gap-3">
                    <Zap className="w-6 h-6 text-[var(--accent)]" />
                    <h2 className="text-lg font-bold tracking-tighter uppercase italic">@paham.diam</h2>
                </div>
                <nav className="hidden md:flex items-center gap-10">
                    <button onClick={() => alert("Segera: Library 12 archetype lengkap.")} className="text-sm font-medium hover:text-white transition-colors uppercase tracking-widest bg-transparent border-none cursor-pointer text-white/60">Archetypes</button>
                    <button onClick={() => alert("Segera: Metodologi di balik Paham Diam.")} className="text-sm font-medium hover:text-white transition-colors uppercase tracking-widest bg-transparent border-none cursor-pointer text-white/60">The Science</button>
                    <Link to="/" className="text-white px-6 py-2 rounded-lg font-bold text-sm tracking-wide transition-all uppercase hover:scale-105 bg-[var(--accent)]">
                        Tes Ulang
                    </Link>
                </nav>
            </header>

            <main className="flex-1 flex flex-col lg:flex-row items-center justify-center p-6 lg:p-20 gap-12 lg:gap-24 relative z-10 w-full max-w-7xl mx-auto">
                {/* Personality Card Centerpiece */}
                <div className="relative group perspective-1000">
                    <div className="absolute -inset-1 rounded-xl blur-2xl opacity-50 group-hover:opacity-75 transition duration-1000 bg-[var(--accent)]"></div>

                    {/* CARD CAPTURE TARGET */}
                    <div ref={cardRef} className="relative w-[340px] md:w-[380px] h-[640px] bg-gradient-to-br from-[#121212] to-[#000000] border border-white/10 rounded-xl p-8 flex flex-col justify-between overflow-hidden shadow-2xl">

                        {/* Dynamic Background Gradient */}
                        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-20 -z-10 pointer-events-none bg-[var(--accent)]"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[80px] opacity-10 -z-10 pointer-events-none bg-[var(--accent)]"></div>

                        {/* Card Top */}
                        <div className="flex flex-col items-center z-10">
                            <div className="mb-6 p-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                                <Zap className="w-10 h-10 text-[var(--accent)]" />
                            </div>
                            <p className="text-[10px] tracking-[0.4em] font-bold uppercase mb-3 text-white/50">Dossier Psikologis</p>
                            <h1 className="text-3xl md:text-3xl font-bold text-center leading-[0.9] tracking-tighter uppercase italic mb-2 break-words max-w-full text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                                {archetype.name}
                            </h1>
                            <div className="h-0.5 w-12 rounded-full mb-3 bg-[var(--accent)]"></div>
                            <p className="text-white/40 text-[10px] uppercase tracking-widest">Subjek: {userData.name}</p>
                        </div>

                        {/* Card Middle: Stats */}
                        <div className="flex flex-col gap-6 z-10">
                            {/* Dark Triad Bar */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] uppercase tracking-widest text-white/60">Sisi Gelap</span>
                                    <span className="font-bold text-lg leading-none text-[var(--accent)]">{darkTriadPercent}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]/50" style={{ width: `${darkTriadPercent}%` }}></div>
                                </div>
                            </div>

                            {/* Emotional Health Bar */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] uppercase tracking-widest text-white/60">Kesehatan Emosi</span>
                                    <span className="font-bold text-lg leading-none text-emerald-400">{emoHealthPercent}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: `${emoHealthPercent}%` }}></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-2">
                                <div className="bg-white/5 p-3 rounded border border-white/5 backdrop-blur-md">
                                    <p className="text-[8px] uppercase tracking-widest text-white/40 mb-1">Trauma Response</p>
                                    <p className="text-xs font-bold uppercase text-white">{primaryTrauma}</p>
                                </div>
                                <div className="bg-white/5 p-3 rounded border border-white/5 backdrop-blur-md">
                                    <p className="text-[8px] uppercase tracking-widest text-white/40 mb-1">Attachment</p>
                                    <div className="flex justify-between items-center">
                                        <p className="text-xs font-bold uppercase text-white">{domAtt}</p>
                                        <span className="text-[10px] text-white/50">{domAttPct}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card Bottom */}
                        <div className="space-y-6 z-10">
                            <div className="relative">
                                <span className="absolute -top-3 -left-2 text-4xl opacity-20 font-serif text-[var(--accent)]">"</span>
                                <p className="text-md font-medium leading-snug italic text-white/90 relative z-10 pl-4">
                                    {quote}
                                </p>
                            </div>
                            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                                <span className="text-[8px] uppercase tracking-[0.2em] text-white/30">Gene: {new Date().toLocaleDateString('id-ID')}</span>
                                <span className="text-[8px] uppercase tracking-[0.2em] text-white/30 font-bold">@paham.diam</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* UI Controls Sidebar */}
                <div className="max-w-md w-full flex flex-col gap-10">
                    <div className="space-y-4">
                        <h3 className="text-3xl font-bold tracking-tighter uppercase italic text-[var(--accent)]">Identitas Bayangan Lo.</h3>
                        <p className="text-white/70 leading-relaxed font-light text-md">
                            {archetype?.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button onClick={handleDownload} className="flex items-center justify-center gap-2 text-white px-6 py-4 rounded-lg font-bold uppercase tracking-wider hover:brightness-110 transition-all shadow-lg bg-[var(--accent)]">
                            <Download className="w-5 h-5" />
                            <span>Simpan Kartu</span>
                        </button>
                        <button onClick={handleShare} className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-6 py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-white/10 transition-all">
                            <Share2 className="w-5 h-5" />
                            <span>Share Link</span>
                        </button>
                    </div>

                    {/* Email Capture */}
                    <div className="bg-card-dark p-8 rounded-xl border border-white/5 space-y-6 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <FileText className="w-16 h-16" />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold uppercase tracking-tight mb-2 text-white">Tantangan Paham Diri</h4>
                            <p className="text-sm text-white/50">Mau analisis lebih dalem soal tipe <span className="text-[var(--accent)]">{archetype?.name}</span>? Dapatkan email series 7 hari khusus buat lo.</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <input
                                className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all font-display placeholder:text-white/20 focus:ring-[var(--accent)] focus:border-[var(--accent)]"
                                placeholder="email@lo.com"
                                type="email"
                                id="email-input"
                            />
                            <button
                                onClick={handleJoinChallenge}
                                className="w-full bg-white/5 border border-white/10 text-white/80 py-3 rounded-lg font-bold uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all"
                            >
                                Join Challenge
                            </button>
                        </div>
                        <p className="text-[10px] text-center text-white/30 uppercase tracking-widest">No spam. Just hard truths.</p>
                    </div>
                </div>
            </main>

            {/* Background Decorative Elements */}
            <div className="fixed top-1/4 -left-20 w-80 h-80 rounded-full blur-[120px] -z-10 opacity-30 bg-[var(--accent)]"></div>
            <div className="fixed bottom-1/4 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-[140px] -z-10 opacity-20"></div>
        </div>
    );
};

export default ResultPage;
