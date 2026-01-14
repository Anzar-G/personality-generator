import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type BackgroundTheme = 'dark' | 'light' | 'neutral';

interface DynamicBackgroundProps {
    theme: BackgroundTheme;
}

const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ theme }) => {
    // Colors based on theme
    const colors = {
        dark: {
            primary: '#7c3aed', // violet-600
            secondary: '#1e1b4b', // indigo-950
            accent: '#4c1d95', // violet-900
            mesh: 'rgba(124, 58, 237, 0.15)'
        },
        light: {
            primary: '#10b981', // emerald-500
            secondary: '#064e3b', // emerald-950
            accent: '#065f46', // emerald-800
            mesh: 'rgba(16, 185, 129, 0.15)'
        },
        neutral: {
            primary: '#3b82f6', // blue-500
            secondary: '#0f172a', // slate-900
            accent: '#1e293b', // slate-800
            mesh: 'rgba(59, 130, 246, 0.1)'
        }
    };

    const current = colors[theme];

    return (
        <div className="fixed inset-0 -z-20 overflow-hidden bg-[#020617]">
            {/* Mesh Gradient Orbs */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={theme}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-0"
                >
                    {/* Orb 1 */}
                    <motion.div
                        animate={{
                            x: [0, 100, -50, 0],
                            y: [0, -50, 100, 0],
                            scale: [1, 1.2, 0.9, 1],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[80px]"
                        style={{ background: current.mesh }}
                    />

                    {/* Orb 2 */}
                    <motion.div
                        animate={{
                            x: [0, -100, 50, 0],
                            y: [0, 100, -50, 0],
                            scale: [1, 0.8, 1.1, 1],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full blur-[90px]"
                        style={{ background: `rgba(${theme === 'light' ? '16, 185, 129' : '124, 58, 237'}, 0.08)` }}
                    />

                    {/* Ambient Glow */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            background: `radial-gradient(circle at 50% 50%, ${current.primary} 0%, transparent 70%)`
                        }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Grain Overlay (moving from Layout to here for better integration) */}
            <div className="absolute inset-0 grain-overlay opacity-40 pointer-events-none"></div>

            {/* Simple Scanline Effect (Optimized) */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] opacity-20"></div>
        </div>
    );
};

export default DynamicBackground;
