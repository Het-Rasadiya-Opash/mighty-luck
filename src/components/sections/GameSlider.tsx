"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import Image from 'next/image';

export interface Game {
    id: number | string;
    title: string;
    image: string;
}

export interface GameSliderProps {
    title: string;
    icon: React.ReactNode;
    games: Game[];
}

export default function GameSlider({ title, icon, games }: GameSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Width of one card (152) + gap (12)
    const cardWidth = 164;
    // Show about 7 cards in the 1136px container
    const maxIndex = Math.max(0, games.length - 7);

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    };

    return (
        <div className="flex flex-col gap-[20px] w-[1136px] overflow-hidden">
            <div className="flex items-center justify-between w-[1136px] h-[30px] shrink-0">
                <div className="flex items-center w-[186px] h-[30px] gap-[12px] shrink-0">
                    {icon}
                    <span className="font-['Jost'] text-[20px] font-extrabold leading-[100%] tracking-[0.01em] text-white uppercase whitespace-nowrap">{title}</span>
                </div>

                <div className="flex items-center justify-end gap-[20px] w-[133px] h-[30px] shrink-0">
                    <span className="flex items-center justify-center w-[45px] h-[16px] font-['Manrope'] font-semibold text-[12px] leading-[100%] tracking-[0.02em] text-[#D2DCF7] cursor-pointer hover:text-white transition-colors whitespace-nowrap shrink-0">
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

            <div className="w-[1300px] h-[200px] shrink-0 overflow-visible">
                <div
                    className="flex gap-[12px] h-[200px] transition-transform duration-300 ease-out"
                    style={{ transform: `translateX(-${currentIndex * cardWidth}px)` }}
                >
                    {games.map((game) => (
                        <div key={game.id} className="w-[152px] h-[200px] bg-[#0C1F56] rounded-[16px] flex flex-col items-center justify-center overflow-hidden relative group shrink-0 cursor-pointer hover:z-10">
                            <Image src={game.image} alt={game.title} fill className="object-cover z-0" />

                            <div className="absolute inset-0 bg-black/60 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="absolute w-[24px] h-[24px] top-[12px] left-[114px] text-white hover:text-[#FFC83D] transition-colors flex items-center justify-center">
                                    <Heart size={24} strokeWidth={2} />
                                </button>
                                <button className="absolute w-[48px] h-[48px] top-[76px] left-[52px] bg-[#FFC83D] rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-[#0C1F56] border-b-[8px] border-b-transparent ml-[4px]"></div>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
