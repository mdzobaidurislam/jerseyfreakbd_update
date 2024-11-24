import { cn } from '@/lib/utils';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

type CustomLinkProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
};

type CustomButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  // add any other button-specific props you need
};

const CustomLink: React.FC<CustomLinkProps> = ({ href = "/", children, className }) => {
  return (
    <Link href={href} passHref className={cn(`inline-block  py-[4px]  sm:py-[10px] px-[7px]  sm:px-[50px] border-border_c border-[1px] rounded-[35px] transition duration-300 ease-in-out hover:bg-border_c text-border_c hover:text-white font-bold capitalize text-[10px] md:text-base`, className)}>
      {children}
    </Link>
  );
};

export const CustomButton: React.FC<CustomButtonProps> = ({ children, className, onClick, disabled, ...rest }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      {...rest}
      className={cn(`inline-block py-[6px] sm:py-[10px] px-[30px] sm:px-[50px] border-primary border-[1px] rounded-[35px] transition duration-300 ease-in-out hover:bg-primary-hover hover:text-white uppercase text-[12px] group `, className)}
    >
      {children}
    </button>
  );
};

export default CustomLink;
