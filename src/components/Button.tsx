import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost';
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    className,
    variant = 'primary',
    fullWidth = false,
    ...props
}) => {
    const baseStyles = "py-4 px-6 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-transparent border-[6px] border-primary text-white neon-glow-pink hover:bg-primary hover:text-white",
        outline: "bg-white/5 border border-white/10 text-white hover:bg-white/10",
        ghost: "bg-transparent hover:bg-white/5 text-white/60 hover:text-white"
    };

    return (
        <button
            className={cn(
                baseStyles,
                variants[variant],
                fullWidth ? "w-full" : "",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
