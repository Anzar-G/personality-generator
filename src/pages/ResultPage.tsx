import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { archetypes } from '../data/archetypes';
import { getRandomQuote } from '../data/quotes';
import type { Scores } from '../data/questions';
import { Download, Share2, Zap, FileText } from 'lucide-react';
import html2canvas from 'html2canvas';
import { supabase } from '../supabaseClient';

export const ResultPage = () => {
    const { archetypeId } = useParams<{ archetypeId: string }>();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const cardRef = useRef<HTMLDivElement>(null);

    // Parse user data from URL (useMemo to avoid re-parsing)
    const userData = useMemo(() => {
        const dataParam = searchParams.get('d');
        if (!dataParam) return null;
        try {
            return JSON.parse(atob(dataParam)) as { name: string; scores: Scores };
        } catch (e) {
            console.error("Failed to parse data", e);
            return null;
        }
    }, [searchParams]);

    // Get archetype (useMemo to make it reactive)
    const archetype = useMemo(() => {
        if (!archetypeId) return undefined;
        return archetypes[archetypeId];
    }, [archetypeId]);

    const accentColor = archetype?.color || '#9d4edd';

    // Generate quote (useMemo to avoid re-generating)
    const quote = useMemo(() => {
        if (!archetype) return '';
        return getRandomQuote(archetype.id);
    }, [archetype]);

    // Save to Supabase on mount
    useEffect(() => {
        if (userData && archetype) {
            const saveData = async () => {
                const { error } = await supabase
                    .from('quiz_results')
                    .insert([
                        {
                            name: userData.name,
                            archetype: archetype.name,
                            scores: userData.scores
                        },
                    ]);
                if (error) console.error('Error saving result:', error);
            };
            saveData();
        }

        // Simulate loading
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, [userData, archetype]);

    const handleDownload = async () => {
        if (cardRef.current) {
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
        alert('Link tersalin! Bagikan journey lo.');
    };

    const handleJoinChallenge = async () => {
        const emailInput = document.getElementById('email-input') as HTMLInputElement;
        const email = emailInput?.value;

        if (email && userData) {
            const { error } = await supabase
                .from('leads')
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

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-background-dark flex items-center justify-center flex-col gap-4" style={{ '--accent': accentColor } as React.CSSProperties}>
                <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin border-[var(--accent)]"></div>
                <p className="animate-pulse tracking-widest uppercase text-sm text-white/70">Menganalisis Jiwa...</p>
            </div>
        );
    }

    // Error: Missing archetype
    if (!archetypeId || !archetype) {
        return (
            <div className="min-h-screen bg-background-dark flex items-center justify-center">
                <div className="text-center">
                    <p className="text-white text-xl mb-4">Archetype tidak ditemukan</p>
                    <p className="text-white/50 text-sm mb-6">ID: {archetypeId || 'undefined'}</p>
                    <Link to="/" className="text-primary hover:underline">Kembali ke Quiz</Link>
                </div>
            </div>
        );
    }

    // Error: Missing user data
    if (!userData) {
        return (
            <div className="min-h-screen bg-background-dark flex items-center justify-center">
                <div className="text-center">
                    <p className="text-white text-xl mb-4">Data Invalid</p>
                    <p className="text-white/50 text-sm mb-6">Silakan isi quiz lagi</p>
                    <Link to="/" className="text-primary hover:underline">Kembali ke Quiz</Link>
                </div>
            </div>
        );
    }

    // Safe Accessors
    const scores = userData.scores || {};

    // Dynamic Stats based on Archetype Type
    const isLight = archetype.type === 'light';

    const primaryLabel = isLight ? 'Growth Potential' : 'Sisi Gelap';
    const secondaryLabel = isLight ? 'Emotional Intel' : 'Kesehatan Emosi';

    const primaryVal = isLight ? (scores.growth || 0) : (scores.darkTriad || 0);
    const secondaryVal = isLight ? (scores.emotionalIntelligence || 0) : (scores.emotionalHealth || 0);

    // Normalize (max 15q * 6 = 90)
    const primaryPercent = Math.min(Math.round((primaryVal / 90) * 100), 100);
    const secondaryPercent = Math.min(Math.round((secondaryVal / 90) * 100), 100);

    const trauma = scores.trauma || { fight: 0, flight: 0, freeze: 0, fawn: 0 };
    const sortedTrauma = Object.entries(trauma).sort(([, a], [, b]) => (b || 0) - (a || 0));
    const primaryTrauma = sortedTrauma[0] ? sortedTrauma[0][0] : 'None';

    const attachment = scores.attachment || { secure: 0, anxious: 0, avoidant: 0, fearfulAvoidant: 0 };
    const attTotal = (attachment.secure || 0) + (attachment.anxious || 0) + (attachment.avoidant || 0) + (attachment.fearfulAvoidant || 0) || 1;
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
                            <h1 className="text-3xl md:text-3xl font-bold text-center leading-[0.9] tracking-tighter uppercase italic mb-2 break-words max-w-full text-white drop-shadow-md">
                                {archetype.name}
                            </h1>
                            <div className="h-0.5 w-12 rounded-full mb-3 bg-[var(--accent)]"></div>
                            <p className="text-white/40 text-[10px] uppercase tracking-widest">Subjek: {userData.name}</p>
                        </div>

                        {/* Card Middle: Stats */}
                        <div className="flex flex-col gap-6 z-10">
                            {/* Primary Metric */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] uppercase tracking-widest text-white/60">{primaryLabel}</span>
                                    <span className="font-bold text-lg leading-none text-[var(--accent)]">{primaryPercent}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]/50" style={{ width: `${primaryPercent}%` }}></div>
                                </div>
                            </div>

                            {/* Secondary Metric */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] uppercase tracking-widest text-white/60">{secondaryLabel}</span>
                                    <span className="font-bold text-lg leading-none text-emerald-400">{secondaryPercent}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: `${secondaryPercent}%` }}></div>
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

            {/* Detailed Deep Dive Section */}
            <section className="w-full bg-white/[0.02] border-t border-white/5 py-20 px-6 lg:px-20 relative z-10">
                <div className="max-w-4xl mx-auto space-y-20">

                    {/* Who You Are */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
                            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-[var(--accent)]">Who You Are</h3>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
                        </div>
                        <p className="text-xl md:text-2xl font-light leading-relaxed text-white/90 text-center italic">
                            {archetype.detailedDescription}
                        </p>
                    </div>

                    {/* Traits Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white/[0.03] border border-white/5 p-8 rounded-2xl space-y-4 hover:bg-white/[0.05] transition-all">
                            <h4 className="text-emerald-400 font-bold uppercase tracking-widest text-xs">The Light (Strength)</h4>
                            <p className="text-white/80 leading-relaxed font-medium text-lg">
                                {archetype.strength}
                            </p>
                        </div>
                        <div className="bg-white/[0.03] border border-white/5 p-8 rounded-2xl space-y-4 hover:bg-white/[0.05] transition-all">
                            <h4 className="text-rose-400 font-bold uppercase tracking-widest text-xs">The Shadow (Weakness)</h4>
                            <p className="text-white/80 leading-relaxed font-medium text-lg">
                                {archetype.weakness}
                            </p>
                        </div>
                    </div>

                    {/* Behavioral Insights */}
                    <div className="bg-white/[0.01] border border-white/5 rounded-3xl overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/5 space-y-4">
                                <h4 className="text-white/40 font-bold uppercase tracking-[0.2em] text-[10px]">Behavior Harian</h4>
                                <p className="text-xl text-white/90 leading-relaxed">
                                    {archetype.dailyBehavior}
                                </p>
                            </div>
                            <div className="p-8 lg:p-12 space-y-4">
                                <h4 className="text-white/40 font-bold uppercase tracking-[0.2em] text-[10px]">Pattern Relasi</h4>
                                <p className="text-xl text-white/90 leading-relaxed">
                                    {archetype.relationshipPattern}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* The Hard Truth / Healing Tip */}
                    <div className="bg-gradient-to-br from-[var(--accent)]/20 to-transparent border border-[var(--accent)]/20 p-8 md:p-12 rounded-3xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Zap className="w-32 h-32 text-[var(--accent)]" />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <h4 className="text-[var(--accent)] font-black uppercase tracking-[0.2em] text-sm">The Hard Truth / Healing Tip</h4>
                            <p className="text-2xl md:text-3xl font-bold text-white leading-tight">
                                {archetype.healingTip}
                            </p>
                        </div>
                    </div>

                    {/* Footer Insight */}
                    <div className="text-center pt-10">
                        <p className="text-white/30 text-xs uppercase tracking-[0.5em]">Tanggapi dengan bijak. Identitas ini bukan vonis, melainkan cermin.</p>
                    </div>
                </div>
            </section>

            {/* Background Decorative Elements */}
            <div className="fixed top-1/4 -left-20 w-80 h-80 rounded-full blur-[120px] -z-10 opacity-30 bg-[var(--accent)]"></div>
            <div className="fixed bottom-1/4 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-[140px] -z-10 opacity-20"></div>
        </div>
    );
};

export default ResultPage;
