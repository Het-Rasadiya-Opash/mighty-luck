"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Gamepad2 } from 'lucide-react';
import Image from 'next/image';
import providerData from '@/data/providerData.json';

export default function ProviderSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Width of one card (152) + gap (12)
    const cardWidth = 164;
    // Show about 7 cards in the 1136px container
    const maxIndex = Math.max(0, providerData.length - 7);

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    };

    return (
        <div className="flex flex-col gap-[20px] w-[1136px] overflow-hidden shrink-0">
            <div className="flex items-center justify-between w-[1136px] h-[30px] shrink-0">
                <div className="flex items-center h-[30px] gap-[12px] shrink-0">
                    <Gamepad2 className="text-[#FFBF1F] w-[24px] h-[24px] shrink-0" strokeWidth={2} />
                    <h2 className="font-['Jost'] text-[20px] font-extrabold leading-[100%] tracking-[0.01em] text-white uppercase whitespace-nowrap">
                        GAME PROVIDERS (34)
                    </h2>
                </div>

                <div className="flex items-center justify-end gap-[12px] w-[125px] h-[30px] shrink-0">
                    <span className="flex items-center justify-center font-['Manrope'] font-semibold text-[12px] leading-[100%] tracking-[0.02em] text-[#D2DCF7] cursor-pointer hover:text-white transition-colors whitespace-nowrap shrink-0">
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

            <div className="w-[1300px] h-[100px] shrink-0 overflow-visible">
                <div
                    className="flex gap-[12px] h-[100px] transition-transform duration-300 ease-out"
                    style={{ transform: `translateX(-${currentIndex * cardWidth}px)` }}
                >
                    {providerData.map((provider) => (
                        <div
                            key={provider.id}
                            className="w-[152px] h-[100px] bg-[#0C1F56] hover:bg-[#173EAD] transition-colors rounded-[12px] flex flex-col items-center pt-[12px] pr-[24px] pb-[12px] pl-[24px] gap-[8px] shrink-0 cursor-pointer"
                        >
                            <div className="relative w-full flex-1 flex items-center justify-center">
                                <img
                                    src={provider.image}
                                    alt={provider.name}
                                    className="object-contain max-h-[40px]"
                                />
                            </div>
                            <div className="flex items-center justify-center gap-[10px] w-[104px] h-[14px]">
                                <span className="w-[53px] h-[14px] font-['Manrope'] font-semibold text-[10px] leading-[100%] text-center text-[#FFC83D] whitespace-nowrap">
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
