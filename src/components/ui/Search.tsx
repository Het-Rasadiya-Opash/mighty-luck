import React from 'react';
import { Search as SearchIcon } from 'lucide-react';

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Search({ className = '', ...props }: SearchProps) {
  return (
    <div
      className={`flex items-center gap-[10px] h-[40px] px-[16px] py-[10px] rounded-[8px] bg-[#112F82] w-[240px] md:w-[280px] ${className}`}
    >
      <SearchIcon size={18} className="text-[#FFFFFF] shrink-0" />
      <input
        type="text"
        placeholder="What are you looking for?"
        className="bg-transparent border-none outline-none text-[#BBCAF3] placeholder:text-[#BBCAF3] w-full text-sm min-w-0"
        {...props}
      />
    </div>
  );
}
