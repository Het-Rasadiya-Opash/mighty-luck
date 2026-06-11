import React from 'react';
import { Search as SearchIcon } from 'lucide-react';

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Search({ className = '', ...props }: SearchProps) {
  return (
    <div
      className={`
        flex items-center gap-[10px]
        w-[280px] h-[40px]
        px-[20px] py-[10px]
        rounded-[8px]
        bg-[#112F82]
        ${className}
      `}
    >
      <SearchIcon size={18} className="text-[#FFFFFF] shrink-0" />
      <input
        type="text"
        placeholder="What are you looking for?"
        className="bg-transparent border-none outline-none text-[#BBCAF3] placeholder:text-[#BBCAF3] w-full text-sm"
        {...props}
      />
    </div>
  );
}
