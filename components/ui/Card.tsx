import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
    children: ReactNode;
    className?: string;
    title?: string;
}

export default function Card({ children, className, title }: CardProps) {
    return (
        <div className={cn(
            'bg-amber-50 rounded-lg p-8 shadow-sm border-2 border-amber-900/20',
            className
        )}>
            {title && (
                <h3 className="text-lg font-bold text-amber-950 mb-6 pb-3 border-b-2 border-amber-900/30">
                    {title}
                </h3>
            )}
            {children}
        </div>
    );
}
