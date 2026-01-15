import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../layouts/Layout';
import Button from '../components/Button';
import { questions, type Scores } from '../data/questions';
import { archetypes } from '../data/archetypes';
import { calculateScores, determineArchetype } from '../utils/scoring';
import type { BackgroundTheme } from '../components/DynamicBackground';
import { ChevronRight, ChevronLeft, Sparkles, AlertCircle } from 'lucide-react';

const QuizPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [step, setStep] = useState<'intro' | 'quiz' | 'finish'>('intro');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, Scores>>({});
    const [selectedOptionIds, setSelectedOptionIds] = useState<Record<number, string>>({});
    const navigate = useNavigate();

    // Calculate background theme based on current answers
    const backgroundTheme = useMemo((): BackgroundTheme => {
        if (step !== 'quiz' || Object.keys(answers).length === 0) return 'neutral';

        const currentScores = calculateScores(answers);

        // Simple heuristic for real-time background transition
        const lightScore = (currentScores.growth || 0) + (currentScores.optimism || 0) + (currentScores.empathy || 0);
        const darkScore = (currentScores.darkTriad || 0) + (currentScores.trauma?.fight || 0);

        if (lightScore > darkScore + 5) return 'light';
        if (darkScore > lightScore + 5) return 'dark';
        return 'neutral';
    }, [answers, step]);

    const handleOptionSelect = (questionId: number, optionId: string, scores: Partial<Scores>) => {
        setAnswers(prev => ({ ...prev, [questionId]: scores as Scores }));
        setSelectedOptionIds(prev => ({ ...prev, [questionId]: optionId }));

        // Auto-advance with delay for visual feedback
        setTimeout(() => {
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                setStep('finish');
            }
        }, 400);
    };

    const handleGenerate = async () => {
        if (!name.trim() || !email.trim()) return;

        const totalScores = calculateScores(answers);
        const archetypeId = determineArchetype(totalScores);
        const archetype = archetypes[archetypeId];
        const payload = { name, email, scores: totalScores };
        const encodedPayload = btoa(JSON.stringify(payload));

        // Fire and forget email sending
        fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, archetype })
        }).catch(err => {
            console.error("Email sending failed", err);
            // alert("Email gagal dikirim. Kalo ngetes lokal emang nggak jalan, harus di Vercel.");
        });

        navigate(`/result/${archetypeId}?d=${encodedPayload}`);
    };

    const progress = ((currentIndex + 1) / questions.length) * 100;

    return (
        <Layout backgroundTheme={backgroundTheme}>
            <div className="max-w-4xl mx-auto w-full min-h-[60vh] flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    {step === 'intro' && (
                        <motion.section
                            key="intro"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="text-center space-y-12"
                        >
                            <div className="space-y-6">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-[0.3em] uppercase text-primary"
                                >
                                    <Sparkles className="w-3 h-3" /> Psychometric Analysis 2.0
                                </motion.div>
                                <h1 className="text-5xl md:text-7xl font-bold leading-[0.9] tracking-tight">
                                    KAMU DIAM,<br />TAPI AKU TAHU<br />
                                    <span className="text-primary italic">KAMU BERTERIAK</span>
                                </h1>
                                <p className="text-lg md:text-xl text-white/50 font-light tracking-wide max-w-lg mx-auto leading-relaxed">
                                    Analyze your psychological archetype—from the deepest shadows to your highest growth potential.
                                </p>
                            </div>

                            <div className="max-w-md mx-auto space-y-8">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-indigo-600 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        maxLength={20}
                                        className="relative w-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl py-6 px-8 text-2xl font-bold text-center focus:ring-2 ring-primary/50 outline-none transition-all placeholder:text-white/5"
                                        placeholder="Siapa namamu?"
                                        autoFocus
                                    />
                                </div>
                                <Button
                                    onClick={() => name.trim() && setStep('quiz')}
                                    disabled={!name.trim()}
                                    className="text-xl py-6 rounded-2xl group shadow-2xl shadow-primary/20"
                                    fullWidth
                                >
                                    <span className="flex items-center justify-center gap-3">
                                        Mulai Perjalanan <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Button>
                            </div>
                        </motion.section>
                    )}

                    {step === 'quiz' && (
                        <motion.section
                            key="quiz"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-full space-y-12"
                        >
                            {/* Progress Header */}
                            <div className="flex items-center justify-between gap-8 mb-8">
                                <button
                                    onClick={() => currentIndex > 0 ? setCurrentIndex(prev => prev - 1) : setStep('intro')}
                                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                                    aria-label="Kembali"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <div className="flex-1 space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">Progress</span>
                                        <span className="text-xs font-mono text-primary font-bold">{currentIndex + 1} / {questions.length}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            className="h-full bg-gradient-to-r from-primary to-indigo-500"
                                        />
                                    </div>
                                </div>
                                <div className="size-11" /> {/* Placeholder for balance */}
                            </div>

                            {/* Question Card */}
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white/[0.03] backdrop-blur-lg border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl"
                            >
                                <div className="text-center mb-12 space-y-4">
                                    <span className="inline-block text-primary font-bold text-[10px] tracking-[0.4em] uppercase">Part {String(currentIndex + 1).padStart(2, '0')}</span>
                                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">{questions[currentIndex].question}</h2>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {questions[currentIndex].options.map((opt) => (
                                        <button
                                            key={opt.id}
                                            onClick={() => handleOptionSelect(questions[currentIndex].id, opt.id, opt.scores as Partial<Scores>)}
                                            className={`group p-6 md:p-8 rounded-2xl border transition-all text-left relative overflow-hidden backdrop-blur-sm
                                                ${selectedOptionIds[questions[currentIndex].id] === opt.id
                                                    ? 'bg-primary/20 border-primary shadow-[0_0_30px_rgba(124,58,237,0.2)]'
                                                    : 'bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.05] hover:scale-[1.01]'
                                                }
                                            `}
                                        >
                                            <div className="flex items-center gap-6 relative z-10">
                                                <div className={`size-6 rounded-full border-2 flex items-center justify-center transition-all
                                                    ${selectedOptionIds[questions[currentIndex].id] === opt.id ? 'border-primary bg-primary' : 'border-white/10'}
                                                `}>
                                                    {selectedOptionIds[questions[currentIndex].id] === opt.id && <div className="size-2 bg-white rounded-full" />}
                                                </div>
                                                <p className="text-lg md:text-xl font-medium leading-tight text-white/80 group-hover:text-white transition-colors">
                                                    {opt.text}
                                                </p>
                                            </div>
                                            {/* Accent Glow */}
                                            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.section>
                    )}

                    {step === 'finish' && (
                        <motion.section
                            key="finish"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center space-y-12"
                        >
                            <div className="space-y-6">
                                <div className="size-24 bg-gradient-to-br from-emerald-500 to-primary rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-primary/30">
                                    <Sparkles className="w-12 h-12 text-white" />
                                </div>
                                <h2 className="text-5xl font-bold tracking-tighter">Analisis Selesai.</h2>
                                <p className="text-white/40 uppercase tracking-[0.5em] text-xs">Semua topeng telah dibuka.</p>
                            </div>

                            <div className="max-w-md mx-auto space-y-6">
                                <div className="space-y-4">
                                    <div className="relative group">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-indigo-600 rounded-2xl blur opacity-10 group-focus-within:opacity-30 transition duration-500"></div>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="relative w-full bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl py-4 px-6 text-xl font-medium text-center focus:ring-2 ring-primary/50 outline-none transition-all placeholder:text-white/20"
                                            placeholder="Ketik email lo buat dapet pdf-nya"
                                        />
                                    </div>
                                    <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Hasil bakal dikirim lewat email juga</p>
                                </div>

                                <Button
                                    onClick={handleGenerate}
                                    disabled={!email.trim() || !email.includes('@')}
                                    className="text-xl py-8 rounded-[2rem] shadow-2xl shadow-primary/40 relative overflow-hidden group"
                                    fullWidth
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                    Buka Kartu Kepribadian
                                </Button>
                                <div className="flex items-start gap-3 bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl text-left">
                                    <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                                    <p className="text-xs text-rose-500/80 leading-relaxed font-medium">
                                        Peringatan: Hasil ini mungkin mengungkap sisi yang lo sendiri nggak sadari. Siap ngeliat kaca jujur?
                                    </p>
                                </div>
                            </div>
                        </motion.section>
                    )}
                </AnimatePresence>
            </div>
        </Layout>
    );
};

export default QuizPage;
