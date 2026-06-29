'use client';

import { ArrowLeft } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface TabHeaderProps {
    title: string;
    count?: string | number;
}

export default function TabHeader({ title, count }: TabHeaderProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [showBlocked, setShowBlocked] = useState(true);

    const handleBack = () => {
        const params = new URLSearchParams(searchParams?.toString());
        params.delete('tab');
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-3 sm:gap-4 min-h-[40px]">
            {/* Left Side: Back Arrow + Title + Count Badge */}
            <div className="flex items-center gap-[8px] sm:gap-[12px]">
                <button 
                    onClick={handleBack}
                    className="flex items-center justify-center w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] rounded-lg hover:bg-[#112F82] transition-colors text-white shrink-0"
                >
                    <ArrowLeft className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]" />
                </button>
                <h2 className="font-['Jost'] font-extrabold text-[16px] sm:text-[18px] md:text-[20px] leading-none text-white uppercase whitespace-nowrap">
                    {title}
                </h2>
                {count !== undefined && (
                    <span className="flex items-center justify-center px-[8px] py-[2px] min-w-[20px] sm:min-w-[24px] h-[18px] sm:h-[20px] bg-[#FFC83D] rounded-full font-['Manrope'] font-extrabold text-[11px] sm:text-[12px] leading-none text-[#1A1404] whitespace-nowrap">
                        {count}
                    </span>
                )}
            </div>

            {/* Right Side: Show Blocked + Provider */}
            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-[12px] sm:gap-[16px]">
                {/* Show Blocked Toggle */}
                <div className="flex items-center gap-[6px] sm:gap-[8px]">
                    <span className="font-['Manrope'] font-semibold text-[12px] sm:text-[14px] text-white whitespace-nowrap">
                        Show Blocked
                    </span>
                    <button
                        onClick={() => setShowBlocked(!showBlocked)}
                        className={`relative inline-flex items-center p-[2px] h-[20px] sm:h-[22px] w-[36px] sm:w-[40px] shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out outline-none ${
                            showBlocked ? 'bg-[#FFC83D]' : 'bg-[#112F82]'
                        }`}
                    >
                        <span
                            className={`pointer-events-none inline-block h-[16px] sm:h-[18px] w-[16px] sm:w-[18px] transform rounded-full shadow ring-0 transition duration-200 ease-in-out ${
                                showBlocked ? 'bg-[#1A1404] translate-x-full' : 'bg-white translate-x-0'
                            }`}
                        />
                    </button>
                </div>

                {/* Provider Dropdown Button */}
                <button className="flex flex-row items-center gap-[6px] px-[10px] sm:px-[12px] py-[4px] sm:py-[6px] bg-[#112F82] border border-transparent hover:border-[#1463FF] rounded-[6px] transition-all text-white font-['Manrope'] font-bold text-[12px] sm:text-[13px] whitespace-nowrap">
                    <div className="grid grid-cols-2 gap-[2px] w-[10px] h-[10px] shrink-0">
                        <div className="w-[4px] h-[4px] bg-white rounded-[1px]" />
                        <div className="w-[4px] h-[4px] bg-white rounded-[1px]" />
                        <div className="w-[4px] h-[4px] bg-white rounded-[1px]" />
                        <div className="w-[4px] h-[4px] bg-white rounded-[1px]" />
                    </div>
                    <span>Provider: All</span>
                </button>
            </div>
        </div>
    );
}
