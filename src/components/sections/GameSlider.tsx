"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export interface Game {
    id: number | string;
    title: string;
    image: string;
}

export interface GameSliderProps {
    id?: string;
    title: string;
    icon: React.ReactNode;
    games: Game[];
}

export default function GameSlider({ id, title, icon, games }: GameSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(7);
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const handleGameClick = (gameId: string | number) => {
        const params = new URLSearchParams(searchParams?.toString());
        params.set('game', gameId.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

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

    const maxIndex = Math.max(0, games.length - visibleCount);

    const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
    const handleNext = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));

    useEffect(() => {
        setCurrentIndex((prev) => Math.min(prev, maxIndex));
    }, [maxIndex]);

    return (
        <div id={id} ref={containerRef} className="flex flex-col gap-4 w-full overflow-hidden">
            <div className="flex items-center justify-between w-full h-[30px]">
                <div className="flex items-center gap-[12px]">
                    {icon}
                    <span className="font-['Jost'] text-[16px] md:text-[18px] lg:text-[20px] font-extrabold leading-[100%] tracking-[0.01em] text-white uppercase whitespace-nowrap">
                        {title}
                    </span>
                </div>
                <div className="flex items-center gap-3 md:gap-[20px]">
                    <span className="font-['Manrope'] font-semibold text-[12px] leading-[100%] tracking-[0.02em] text-[#D2DCF7] cursor-pointer hover:text-white transition-colors whitespace-nowrap hidden sm:flex">
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
                    {games.map((game) => (
                        <div
                            key={game.id}
                            onClick={() => handleGameClick(game.id)}
                            className="w-[130px] sm:w-[140px] md:w-[152px] h-[180px] md:h-[200px] bg-[#0C1F56] rounded-[16px] flex flex-col items-center justify-center overflow-hidden relative group shrink-0 cursor-pointer hover:z-10"
                        >
                            <Image
                                src={game.image}
                                alt={game.title}
                                fill
                                className="object-cover z-0"
                                sizes="(max-width: 640px) 130px, (max-width: 1024px) 140px, 152px"
                            />
                            <div className="absolute inset-0 bg-black/60 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="absolute w-[24px] h-[24px] top-[12px] right-[12px] text-white hover:text-[#FFC83D] transition-colors flex items-center justify-center">
                                    <Heart size={20} strokeWidth={2} />
                                </button>
                                <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[44px] h-[44px] bg-[#FFC83D] rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                                    <div className="w-0 h-0 border-t-[7px] border-t-transparent border-l-[11px] border-l-[#0C1F56] border-b-[7px] border-b-transparent ml-[3px]" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
