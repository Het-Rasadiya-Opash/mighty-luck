"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import providerData from '@/data/providerData.json';

export default function ProviderSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(7);
    const containerRef = useRef<HTMLDivElement>(null);

    const cardWidth = 152;
    const cardGap = 12;
    const cardStep = cardWidth + cardGap;

    useEffect(() => {
        const updateVisible = () => {
            if (containerRef.current) {
                const w = containerRef.current.offsetWidth;
                const count = Math.floor((w + cardGap) / cardStep);
                setVisibleCount(Math.max(2, count));
            }
        };
        updateVisible();
        const ro = new ResizeObserver(updateVisible);
        if (containerRef.current) ro.observe(containerRef.current);
        return () => ro.disconnect();
    }, [cardStep]);

    const maxIndex = Math.max(0, providerData.length - visibleCount);

    const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
    const handleNext = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));

    useEffect(() => {
        setCurrentIndex((prev) => Math.min(prev, maxIndex));
    }, [maxIndex]);

    return (
        <div ref={containerRef} className="flex flex-col gap-4 w-full overflow-hidden">
            <div className="flex flex-row justify-between items-center w-full h-[23px] md:h-[30px]">
                <div className="flex flex-row items-center gap-[7.2px] md:gap-[12px] h-[23px] md:h-[30px]">
                    <div className="flex items-center justify-center w-[18px] h-[18px] md:w-[30px] md:h-[30px] shrink-0">
                        <Image src="/gameprovider.svg" alt="Providers" width={30} height={30} className="w-full h-full object-contain" />
                    </div>
                    <h2 className="font-['Jost'] text-[16px] md:text-[20px] font-extrabold leading-[23px] md:leading-[30px] tracking-[0.01em] text-white uppercase whitespace-nowrap">
                        GAME PROVIDERS (34)
                    </h2>
                </div>
                <div className="flex items-center gap-3 md:gap-[12px]">
                    <span className="flex font-['Manrope'] font-bold text-[12px] leading-[16px] tracking-[0.02em] text-[#FFBF1F] md:text-[#D2DCF7] cursor-pointer hover:text-white transition-colors whitespace-nowrap">
                        View all
                    </span>
                    <div className="hidden md:flex items-center gap-[4px]">
                        <button
                            onClick={handlePrev}
                            disabled={currentIndex === 0}
                            className={`flex items-center justify-center w-[30px] h-[30px] rounded-[8px] transition-colors shrink-0 ${currentIndex === 0 ? 'bg-[#0C1F56] text-white/50 cursor-not-allowed' : 'bg-[#112F82] hover:bg-[#1463FF] text-white'}`}
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={currentIndex === maxIndex}
                            className={`flex items-center justify-center w-[30px] h-[30px] rounded-[8px] transition-colors shrink-0 ${currentIndex === maxIndex ? 'bg-[#0C1F56] text-white/50 cursor-not-allowed' : 'bg-[#112F82] hover:bg-[#1463FF] text-white'}`}
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full overflow-x-auto md:overflow-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory">
                <div
                    className="flex gap-[8px] md:gap-[12px] transition-transform duration-300 ease-out"
                    style={{ transform: `translateX(-${currentIndex * cardStep}px)` }}
                >
                    {providerData.map((provider) => (
                        <div
                            key={provider.id}
                            className="w-[88px] md:w-[152px] h-[60px] md:h-[100px] bg-[#0C1F56] hover:bg-[#173EAD] transition-colors rounded-[8px] md:rounded-[12px] flex flex-col items-center py-[7.2px] px-[14.4px] md:py-[12px] md:px-[24px] gap-[4.8px] md:gap-[8px] shrink-0 snap-start cursor-pointer"
                        >
                            <div className="relative w-[48px] h-[24px] md:w-full md:flex-1 flex items-center justify-center shrink-0">
                                <img
                                    src={provider.image}
                                    alt={provider.name}
                                    className="object-contain max-w-[48px] max-h-[24px] md:max-w-full md:max-h-[40px]"
                                />
                            </div>
                            <div className="flex flex-row justify-center items-center h-[11px] md:h-auto w-full">
                                <span className="font-['Manrope'] font-semibold text-[8px] md:text-[10px] leading-[11px] md:leading-[100%] text-center text-[#FFC83D] whitespace-nowrap">
                                    {provider.gamesCount} Games
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
