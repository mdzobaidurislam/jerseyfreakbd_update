import { cn } from '@/lib/utils';
import React from 'react'
type Props = {
    children: React.ReactNode;
    className?: string;
};

export default function Container({ children, className }: Props) {
    return <div className={cn("container mx-auto px-2 sm:px-2 md:px-4 lg:px-6 xl:px-8  ", className)}>
        {children}
    </div>
}

