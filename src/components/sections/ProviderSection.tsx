"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Gamepad2 } from 'lucide-react';
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
            <div className="flex items-center justify-between w-full h-[30px]">
                <div className="flex items-center h-[30px] gap-[12px]">
                    <Gamepad2 className="text-[#FFBF1F] w-[24px] h-[24px] shrink-0" strokeWidth={2} />
                    <h2 className="font-['Jost'] text-[16px] md:text-[18px] lg:text-[20px] font-extrabold leading-[100%] tracking-[0.01em] text-white uppercase whitespace-nowrap">
                        GAME PROVIDERS (34)
                    </h2>
                </div>
                <div className="flex items-center gap-3 md:gap-[12px]">
                    <span className="hidden sm:flex font-['Manrope'] font-semibold text-[12px] leading-[100%] tracking-[0.02em] text-[#D2DCF7] cursor-pointer hover:text-white transition-colors whitespace-nowrap">
                        View all
                    </span>
                    <div className="flex items-center gap-[4px]">
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

            <div className="w-full overflow-hidden">
                <div
                    className="flex gap-[12px] transition-transform duration-300 ease-out"
                    style={{ transform: `translateX(-${currentIndex * cardStep}px)` }}
                >
                    {providerData.map((provider) => (
                        <div
                            key={provider.id}
                            className="w-[130px] sm:w-[140px] md:w-[152px] h-[100px] bg-[#0C1F56] hover:bg-[#173EAD] transition-colors rounded-[12px] flex flex-col items-center pt-[12px] pr-[16px] pb-[12px] pl-[16px] md:px-[24px] gap-[8px] shrink-0 cursor-pointer"
                        >
                            <div className="relative w-full flex-1 flex items-center justify-center">
                                <img
                                    src={provider.image}
                                    alt={provider.name}
                                    className="object-contain max-h-[40px]"
                                />
                            </div>
                            <span className="font-['Manrope'] font-semibold text-[10px] leading-[100%] text-center text-[#FFC83D] whitespace-nowrap">
                                {provider.gamesCount} Games
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
