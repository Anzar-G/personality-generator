import React from 'react';
import { Share, AtSign, Brain } from 'lucide-react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-white min-h-screen relative selection:bg-primary selection:text-white overflow-x-hidden">
            {/* Grain Overlay */}
            <div className="fixed inset-0 grain-overlay z-50 pointer-events-none"></div>

            {/* Decorative Elements */}
            <div className="fixed top-1/4 -left-20 w-64 h-64 bg-primary/5 blur-[120px] pointer-events-none"></div>
            <div className="fixed bottom-1/4 -right-20 w-80 h-80 bg-neon-purple/5 blur-[140px] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center w-full max-w-[1000px] mx-auto px-6 py-10">
                {/* Top Navigation */}
                <header className="w-full flex items-center justify-between mb-20 border-b border-white/10 pb-6">
                    <div className="flex items-center gap-3">
                        <div className="size-8 bg-primary rounded-full flex items-center justify-center">
                            <Brain className="text-white w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold tracking-tighter italic">@paham.diam</h2>
                    </div>
                    <div className="flex gap-4">
                        <button aria-label="Share" className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <Share className="w-4 h-4" />
                        </button>
                        <button aria-label="Mention" className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <AtSign className="w-4 h-4" />
                        </button>
                    </div>
                </header>

                <main className="w-full">
                    {children}
                </main>

                {/* Footer */}
                <footer className="w-full pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 opacity-50 mt-auto pb-10">
                    <div className="text-xs tracking-widest uppercase">© 2024 PAHAM DIAM LABS</div>
                    <div className="flex gap-8 text-xs tracking-widest uppercase">
                        <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms</a>
                        <a href="#" className="hover:text-primary transition-colors">TikTok</a>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Layout;
