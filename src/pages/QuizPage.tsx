import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Button from '../components/Button';
import { questions, type Scores } from '../data/questions';
import { calculateScores, determineArchetype } from '../utils/scoring';

const QuizPage: React.FC = () => {
    const [name, setName] = useState('');
    const [answers, setAnswers] = useState<Record<number, Scores>>({}); // Store Score object per question
    const [selectedOptionIds, setSelectedOptionIds] = useState<Record<number, string>>({}); // For UI state
    const navigate = useNavigate();

    const handleOptionSelect = (questionId: number, optionId: string, scores: Partial<Scores>) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: scores as Scores
        }));
        setSelectedOptionIds(prev => ({ ...prev, [questionId]: optionId }));

        // Smooth scroll
        const nextQuestionId = questionId + 1;
        const nextElement = document.getElementById(`question-${nextQuestionId}`);
        if (nextElement) {
            nextElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const handleGenerate = () => {
        if (!name.trim()) {
            alert('Isi nama dulu dong, Bos!');
            return;
        }

        if (Object.keys(answers).length < questions.length) {
            alert('Jawab semua pertanyaan dulu ya!');
            return;
        }

        const totalScores = calculateScores(answers);
        const archetypeId = determineArchetype(totalScores);

        // Encode scores to pass via URL (stateless sharing requirement)
        // Minimizing payload: base64 encoded JSON string
        const payload = {
            name: name,
            scores: totalScores
        };
        const encodedPayload = btoa(JSON.stringify(payload));

        navigate(`/result/${archetypeId}?d=${encodedPayload}`);
    };

    return (
        <Layout>
            {/* Hero Section */}
            <section className="text-center mb-24">
                <h1 className="text-5xl md:text-7xl font-bold leading-[0.9] tracking-tight mb-6">
                    KAMU DIAM,<br />TAPI AKU TAHU<br />
                    <span className="text-primary italic">KAMU BERTERIAK</span>
                </h1>
                <p className="text-lg md:text-xl text-white/60 font-light tracking-wide max-w-lg mx-auto">
                    Analyze your psychological archetype—from the deepest shadows to your highest growth potential.
                </p>
            </section>

            {/* Input Name */}
            <section className="w-full max-w-xl mb-32 mx-auto">
                <div className="flex flex-col gap-6">
                    <label className="flex flex-col gap-4 group">
                        <span className="text-sm uppercase tracking-[0.2em] text-white/40 font-semibold px-1">Identity Check</span>
                        <div className="neon-glow-yellow transition-all duration-300 rounded-lg border border-white/20 bg-card-dark overflow-hidden focus-within:ring-2 ring-neon-yellow/50">
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                maxLength={20}
                                className="w-full bg-transparent border-none py-6 px-8 text-2xl font-medium focus:ring-0 placeholder:text-white/10 text-white outline-none"
                                placeholder="Siapa namamu?"
                                type="text"
                            />
                        </div>
                    </label>
                </div>
            </section>

            {/* Questions */}
            <div className="w-full space-y-32 mb-40">
                {questions.map((q) => (
                    <section key={q.id} id={`question-${q.id}`} className="flex flex-col items-center scroll-mt-20">
                        <div className="text-center mb-10">
                            <span className="text-primary font-bold text-xs tracking-widest uppercase mb-2 block">Part {String(q.id).padStart(2, '0')}</span>
                            <h2 className="text-3xl font-bold tracking-tight max-w-2xl">{q.question}</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
                            {q.options.map((opt) => (
                                <button
                                    key={opt.id}
                                    onClick={() => handleOptionSelect(q.id, opt.id, opt.scores as Partial<Scores>)}
                                    className={`group p-8 rounded-xl border transition-all text-left relative overflow-hidden
                    ${selectedOptionIds[q.id] === opt.id
                                            ? 'bg-white/10 border-neon-purple ring-1 ring-neon-purple/50 shadow-[0_0_20px_rgba(157,78,221,0.2)]'
                                            : 'bg-card-dark border-white/10 hover:border-white/30 hover:bg-white/5'
                                        }
                  `}
                                >
                                    <div className="relative z-10">
                                        <p className="text-lg font-bold leading-tight group-hover:text-white transition-colors">
                                            {opt.text}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>
                ))}
            </div>

            {/* CTA Section */}
            <section id="cta-section" className="w-full max-w-xl pb-32 mx-auto">
                <Button onClick={handleGenerate} fullWidth className="text-2xl py-8">
                    Generate My Card
                </Button>
                <p className="text-center mt-8 text-white/30 text-sm italic">
                    *The results may reveal things you prefer to keep hidden. Proceed with caution.
                </p>
            </section>
        </Layout>
    );
};

export default QuizPage;
