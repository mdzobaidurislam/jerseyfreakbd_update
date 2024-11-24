import { cn } from '@/lib/utils';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={cn(
        'flex  items-center justify-center rounded-[30px]  px-4 py-[10px] text-sm font-medium text-white  transition-all  duration-300 ease-in-out   gap-[10px]',
        className,
      )}
    >
      {children}
    </button>
  );
}
