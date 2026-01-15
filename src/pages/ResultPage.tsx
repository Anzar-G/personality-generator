import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { archetypes } from '../data/archetypes';
import { getRandomQuote } from '../data/quotes';
import type { Scores } from '../data/questions';
import { Download, Share2, Zap, Database, Shield, Fingerprint, Brain } from 'lucide-react';
import html2canvas from 'html2canvas';
import { supabase } from '../supabaseClient';
import Layout from '../layouts/Layout';

export const ResultPage = () => {
    const { archetypeId } = useParams<{ archetypeId: string }>();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [analysisStep, setAnalysisStep] = useState(0);
    const cardRef = useRef<HTMLDivElement>(null);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Parse user data from URL
    const userData = useMemo(() => {
        const dataParam = searchParams.get('d');
        if (!dataParam) return null;
        try {
            return JSON.parse(atob(dataParam)) as { name: string; email: string; scores: Scores };
        } catch (e) {
            console.error("Failed to parse data", e);
            return null;
        }
    }, [searchParams]);

    const archetype = useMemo(() => {
        if (!archetypeId) return undefined;
        return archetypes[archetypeId];
    }, [archetypeId]);

    const accentColor = archetype?.color || '#9d4edd';
    const quote = useMemo(() => (archetype ? getRandomQuote(archetype.id) : ''), [archetype]);

    useEffect(() => {
        if (userData && archetype) {
            const saveData = async () => {
                // 1. Simpan Lead (Nama, Email, Archetype)
                const { error: leadsError } = await supabase
                    .from('leads')
                    .insert([{
                        name: userData.name,
                        email: userData.email,
                        archetype: archetype.name
                    }]);
                if (leadsError) {
                    console.error('Error saving to leads:', leadsError);
                    alert(`Gagal simpan ke leads: ${leadsError.message}`);
                }

                // 2. Simpan Hasil Kuis Lengkap (Nama, Archetype, Scores)
                const { error: resultsError } = await supabase
                    .from('quiz_result')
                    .insert([{
                        name: userData.name,
                        archetype: archetype.name,
                        scores: userData.scores
                    }]);
                if (resultsError) {
                    console.error('Error saving to quiz_result:', resultsError);
                    alert(`Gagal simpan skor ke quiz_result: ${resultsError.message}`);
                }
            };
            saveData();
        }

        // Cinematic Loading Sequence
        const intervals = [800, 1600, 2400, 3200];
        intervals.forEach((time, index) => {
            setTimeout(() => setAnalysisStep(index + 1), time);
        });

        const timer = setTimeout(() => {
            setLoading(false);
            window.scrollTo(0, 0);
        }, 4000);
        return () => clearTimeout(timer);
    }, [userData, archetype]);

    const handleDownload = async () => {
        if (cardRef.current) {
            const canvas = await html2canvas(cardRef.current, { backgroundColor: '#0a0a0a', scale: 2, useCORS: true });
            const link = document.createElement('a');
            link.download = `paham-diam-${archetype?.id}.png`;
            link.href = canvas.toDataURL();
            link.click();
        }
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Link tersalin! Bagikan journey lo.');
    };

    const analysisTexts = [
        "Scanning neural pathways...",
        "Identifying shadow patterns...",
        "Measuring emotional resilience...",
        "Generating psychological profile...",
        "Analysis Complete."
    ];

    if (loading) {
        return (
            <Layout backgroundTheme="neutral">
                <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
                    <div className="relative size-32 mb-12">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border-2 border-dashed border-primary/30 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-4 border border-indigo-500/20 rounded-full"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Brain className="w-12 h-12 text-primary animate-pulse" />
                        </div>
                    </div>

                    <div className="space-y-4 max-w-xs mx-auto">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={analysisStep}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="font-mono text-xs tracking-[0.3em] uppercase text-white/40"
                            >
                                {analysisTexts[analysisStep]}
                            </motion.p>
                        </AnimatePresence>
                        <div className="h-1 w-48 bg-white/5 rounded-full overflow-hidden mx-auto">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(analysisStep / 4) * 100}%` }}
                                className="h-full bg-primary"
                            />
                        </div>
                    </div>

                    <div className="mt-20 grid grid-cols-2 gap-x-12 gap-y-4 opacity-20 font-mono text-[8px] uppercase tracking-widest text-left">
                        <div className="flex items-center gap-2"><Database className="size-3" /> Data Encrypted</div>
                        <div className="flex items-center gap-2"><Shield className="size-3" /> Privacy Secured</div>
                        <div className="flex items-center gap-2"><Fingerprint className="size-3" /> Biometric Sync</div>
                        <div className="flex items-center gap-2"><Zap className="size-3" /> Neural Linked</div>
                    </div>
                </div>
            </Layout>
        );
    }

    if (!archetype || !userData) {
        return (
            <Layout backgroundTheme="neutral">
                <div className="text-center py-20">
                    <p className="text-white text-xl mb-4">Data tidak valid</p>
                    <Link to="/" className="text-primary hover:underline">Kembali ke Quiz</Link>
                </div>
            </Layout>
        );
    }

    const scores = userData.scores || {};
    const isLight = archetype.type === 'light';
    const primaryLabel = isLight ? 'Growth Potential' : 'Sisi Gelap';
    const secondaryLabel = isLight ? 'Emotional Intel' : 'Kesehatan Emosi';
    const primaryVal = isLight ? (scores.growth || 0) : (scores.darkTriad || 0);
    const secondaryVal = isLight ? (scores.emotionalIntelligence || 0) : (scores.emotionalHealth || 0);
    const primaryPercent = Math.min(Math.round((primaryVal / 90) * 100), 100);
    const secondaryPercent = Math.min(Math.round((secondaryVal / 90) * 100), 100);

    const trauma = scores.trauma || { fight: 0, flight: 0, freeze: 0, fawn: 0 };
    const sortedTrauma = Object.entries(trauma).sort(([, a], [, b]) => (b || 0) - (a || 0));
    const primaryTrauma = sortedTrauma[0]?.[0] || 'None';

    const attachment = scores.attachment || { secure: 0, anxious: 0, avoidant: 0, fearfulAvoidant: 0 };
    const sortedAtt = Object.entries(attachment).sort(([, a], [, b]) => (b || 0) - (a || 0));
    const domAtt = sortedAtt[0]?.[0] || 'Secure';

    return (
        <Layout backgroundTheme={isLight ? 'light' : 'dark'}>
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col lg:flex-row items-center justify-center p-6 lg:p-20 gap-12 lg:gap-24 w-full"
            >
                {/* 3D TILT CARD */}
                <div
                    className="relative group perspective-2000"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <motion.div
                        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 rounded-[2.5rem] blur-3xl opacity-20 group-hover:opacity-40 transition duration-1000" style={{ background: accentColor }}></div>

                        {/* CARD CONTENT */}
                        <div ref={cardRef} className="relative w-[340px] md:w-[380px] h-[640px] bg-gradient-to-br from-[#0c0c0c] to-[#000000] border border-white/10 rounded-[2rem] p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
                            {/* Inner Glows */}
                            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-20 -z-10" style={{ background: accentColor }}></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[100px] opacity-10 -z-10" style={{ background: accentColor }}></div>

                            {/* Card Header */}
                            <div className="flex flex-col items-center z-10 text-center">
                                <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                                    <Zap className="w-8 h-8" style={{ color: accentColor }} />
                                </div>
                                <p className="text-[10px] tracking-[0.4em] font-bold uppercase mb-3 text-white/40 font-mono">Psych-Profile // V2.0</p>
                                <h1 className="text-3xl font-serif font-black italic uppercase tracking-tighter leading-none mb-2" style={{ color: 'white' }}>
                                    {archetype.name}
                                </h1>
                                <div className="h-0.5 w-12 rounded-full mb-3" style={{ background: accentColor }}></div>
                                <p className="text-white/30 text-[9px] uppercase tracking-[0.3em] font-mono">Subject: {userData.name.substring(0, 15)}</p>
                            </div>

                            {/* Card Stats */}
                            <div className="flex flex-col gap-6 z-10">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[9px] uppercase tracking-widest text-white/40 font-mono">{primaryLabel}</span>
                                        <span className="font-bold text-lg leading-none" style={{ color: accentColor }}>{primaryPercent}%</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${primaryPercent}%` }} transition={{ duration: 1.5, delay: 0.5 }} className="h-full rounded-full" style={{ background: accentColor }} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[9px] uppercase tracking-widest text-white/40 font-mono">{secondaryLabel}</span>
                                        <span className="font-bold text-lg leading-none text-emerald-400">{secondaryPercent}%</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${secondaryPercent}%` }} transition={{ duration: 1.5, delay: 0.7 }} className="h-full bg-emerald-500 rounded-full" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mt-2 font-mono">
                                    <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                        <p className="text-[7px] uppercase tracking-widest text-white/30 mb-1">Trauma-Resp</p>
                                        <p className="text-[10px] font-bold uppercase text-white">{primaryTrauma}</p>
                                    </div>
                                    <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                                        <p className="text-[7px] uppercase tracking-widest text-white/30 mb-1">Attachment</p>
                                        <p className="text-[10px] font-bold uppercase text-white">{domAtt}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Card Quote */}
                            <div className="space-y-6 z-10">
                                <div className="relative">
                                    <span className="absolute -top-4 -left-2 text-5xl opacity-10 font-serif" style={{ color: accentColor }}>"</span>
                                    <p className="text-[15px] font-medium leading-relaxed italic text-white/80 relative z-10 pl-4 font-serif">
                                        {quote}
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-white/5 flex justify-between items-center font-mono opacity-20">
                                    <span className="text-[7px] uppercase tracking-widest">{new Date().toLocaleDateString('id-ID')}</span>
                                    <span className="text-[7px] uppercase tracking-widest">@paham.diam</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* SIDEBAR TOOLS */}
                <div className="max-w-md w-full flex flex-col gap-10">
                    <div className="space-y-6">
                        <div className="inline-flex px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Analysis Result</div>
                        <h3 className="text-4xl md:text-5xl font-serif font-black tracking-tighter uppercase italic leading-[0.8]" style={{ color: accentColor }}>Identitas<br />Bayangan Lo.</h3>
                        <p className="text-white/60 leading-relaxed font-light text-lg">
                            {archetype?.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button onClick={handleDownload} className="group flex items-center justify-center gap-3 text-white px-8 py-5 rounded-2xl font-bold uppercase tracking-widest transition-all shadow-2xl relative overflow-hidden" style={{ background: accentColor }}>
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform" />
                            <Download className="w-5 h-5 relative z-10" />
                            <span className="relative z-10">Unduh Kartu</span>
                        </button>
                        <button onClick={handleShare} className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white px-8 py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                            <Share2 className="w-5 h-5" />
                            <span>Share Link</span>
                        </button>
                    </div>
                </div>
            </motion.main>

            <section className="w-full bg-white/[0.01] border-t border-white/5 py-32 px-6">
                <div className="max-w-4xl mx-auto space-y-32">
                    {/* Detailed Section */}
                    <div className="space-y-12 text-center">
                        <div className="flex items-center gap-8 justify-center">
                            <div className="h-px w-12 bg-white/10" />
                            <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-primary font-bold">Comprehensive Dossier</span>
                            <div className="h-px w-12 bg-white/10" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-serif font-bold italic tracking-tight leading-relaxed max-w-2xl mx-auto">
                            {archetype.detailedDescription}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { label: 'The Light', color: 'text-emerald-400', content: archetype.strength },
                            { label: 'The Shadow', color: 'text-rose-400', content: archetype.weakness }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white/[0.02] backdrop-blur-md border border-white/5 p-10 rounded-[2rem] space-y-4 group hover:border-white/20 transition-all">
                                <span className={`font-mono text-[10px] uppercase tracking-widest font-bold ${item.color}`}>{item.label}</span>
                                <p className="text-xl text-white/80 leading-relaxed font-light">{item.content}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="p-12 border-b lg:border-b-0 lg:border-r border-white/5 space-y-6">
                                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold">Daily Dynamics</span>
                                <p className="text-lg md:text-xl text-white/80 leading-relaxed font-serif">{archetype.dailyBehavior}</p>
                            </div>
                            <div className="p-12 space-y-6">
                                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold">Relational Core</span>
                                <p className="text-lg md:text-xl text-white/80 leading-relaxed font-serif">{archetype.relationshipPattern}</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative p-12 md:p-20 rounded-[3rem] overflow-hidden text-center group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent -z-10" />
                        <div className="absolute inset-0 border border-primary/20 rounded-[3rem] -z-10" />
                        <Zap className="w-16 h-16 mx-auto mb-10 text-primary opacity-50 group-hover:scale-110 transition-transform duration-500" />
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.5em] text-primary font-bold mb-8">The Hard Truth</h4>
                        <p className="text-2xl md:text-3xl font-serif font-bold italic tracking-tight text-white leading-relaxed">
                            {archetype.healingTip}
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-12 pt-20">
                        <Link to="/" className="group relative px-12 py-5 bg-white/5 border border-white/10 rounded-full overflow-hidden transition-all hover:bg-white/10 active:scale-95">
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
                            <span className="relative text-xs font-bold uppercase tracking-[0.4em] text-white/60 group-hover:text-white transition-colors">Ulangi Perjalanan Lo</span>
                        </Link>
                        <p className="text-white/10 font-mono text-[9px] uppercase tracking-[0.5em]">Paham Diam Labs // Psy-Unit 12-B</p>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default ResultPage;
