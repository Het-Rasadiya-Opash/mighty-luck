import React from 'react';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = "flex items-center justify-center gap-[10px] h-[40px] px-[30px] py-[10px] rounded-[8px] font-semibold text-sm transition-colors";
  
  const variants = {
    primary: "bg-[#1463FF] text-[#FFFFFF] w-[99px]", // Login button style
    secondary: "bg-[#FFC83D] text-[#1A1404]  w-[90px]", // Join button style
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
