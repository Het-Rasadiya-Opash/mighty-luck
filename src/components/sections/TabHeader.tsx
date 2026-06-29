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
        <div className="flex flex-row justify-between items-center w-full min-h-[40px]">
            {/* Left Side: Back Arrow + Title + Count Badge */}
            <div className="flex items-center gap-[12px]">
                <button 
                    onClick={handleBack}
                    className="flex items-center justify-center w-[30px] h-[30px] rounded-lg hover:bg-[#112F82] transition-colors text-white"
                >
                    <ArrowLeft size={20} />
                </button>
                <h2 className="font-['Jost'] font-extrabold text-[18px] md:text-[20px] leading-none text-white uppercase">
                    {title}
                </h2>
                {count !== undefined && (
                    <span className="flex items-center justify-center px-[8px] py-[2px] min-w-[24px] h-[20px] bg-[#FFC83D] rounded-full font-['Manrope'] font-extrabold text-[12px] leading-none text-[#1A1404]">
                        {count}
                    </span>
                )}
            </div>

            {/* Right Side: Show Blocked + Provider */}
            <div className="flex items-center gap-[16px]">
                {/* Show Blocked Toggle */}
                <div className="flex items-center gap-[8px]">
                    <span className="font-['Manrope'] font-semibold text-[14px] text-white">
                        Show Blocked
                    </span>
                    <button
                        onClick={() => setShowBlocked(!showBlocked)}
                        className={`relative inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                            showBlocked ? 'bg-[#FFC83D]' : 'bg-[#112F82]'
                        }`}
                    >
                        <span
                            className={`pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full shadow ring-0 transition duration-200 ease-in-out ${
                                showBlocked ? 'bg-[#1A1404] translate-x-[16px]' : 'bg-white translate-x-0'
                            }`}
                        />
                    </button>
                </div>

                {/* Provider Dropdown Button */}
                <button className="flex flex-row items-center gap-[6px] px-[12px] py-[6px] bg-[#112F82] border border-transparent hover:border-[#1463FF] rounded-[6px] transition-all text-white font-['Manrope'] font-bold text-[13px]">
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
