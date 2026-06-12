'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Sun } from 'lucide-react';

const collectionData = [
    { id: 1, title: 'MYTHOLOGY', image: '/games/c-1.png' },
    { id: 2, title: 'FRUITS', image: '/games/c-2.png' },
    { id: 3, title: 'ANIMALS', image: '/games/c-3.png' },
    { id: 4, title: 'ASIAN', image: '/games/c-4.png' },
    { id: 5, title: 'EGYPTIAN', image: '/games/c-1.png' }
];

export default function CollectionSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(3);
    const containerRef = useRef<HTMLDivElement>(null);

    const cardGap = 12;

    useEffect(() => {
        const updateVisible = () => {
            if (!containerRef.current) return;
            const w = containerRef.current.offsetWidth;
            // Cards are ~(w - gap*(n-1)) / n — use 3 on lg, 2 on md, 1 on sm
            const count = w >= 900 ? 3 : w >= 560 ? 2 : 1;
            setVisibleCount(count);
        };
        updateVisible();
        const ro = new ResizeObserver(updateVisible);
        if (containerRef.current) ro.observe(containerRef.current);
        return () => ro.disconnect();
    }, []);

    const cardWidth = containerRef.current
        ? Math.floor((containerRef.current.offsetWidth - cardGap * (visibleCount - 1)) / visibleCount)
        : 316;

    const cardStep = cardWidth + cardGap;
    const maxIndex = Math.max(0, collectionData.length - visibleCount);

    useEffect(() => {
        setCurrentIndex((prev) => Math.min(prev, maxIndex));
    }, [maxIndex]);

    const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
    const handleNext = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));

    return (
        <section ref={containerRef} className="w-full flex flex-col gap-4">
            <div className="w-full h-[30px] flex items-center justify-between">
                <div className="flex items-center gap-[12px]">
                    <Sun className="text-[#FFBF1F] w-[24px] h-[24px] shrink-0" strokeWidth={2} fill="#FFBF1F" />
                    <h2 className="font-['Jost'] font-extrabold text-[16px] md:text-[18px] lg:text-[20px] leading-[100%] tracking-[0.01em] text-white m-0">
                        COLLECTIONS (170)
                    </h2>
                </div>
                <div className="flex items-center gap-3">
                    <span className="hidden sm:flex font-['Manrope'] font-semibold text-[12px] leading-[100%] tracking-[0.02em] text-[#D2DCF7] cursor-pointer hover:text-white transition-colors whitespace-nowrap">
                        View all
                    </span>
                    <div className="flex gap-[8px]">
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

            <div className="relative w-full overflow-hidden">
                <div
                    className="flex gap-[12px] h-[80px] sm:h-[90px] md:h-[100px] transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * cardStep}px)` }}
                >
                    {collectionData.map((collection) => (
                        <div
                            key={collection.id}
                            style={{ width: `${cardWidth}px` }}
                            className="h-full bg-[#0C1F56] hover:bg-[#173EAD] transition-colors rounded-[12px] flex items-center pl-[12px] pr-[16px] py-[12px] gap-[12px] shrink-0 cursor-pointer group"
                        >
                            <div className="w-[60px] md:w-[76px] h-[60px] md:h-[76px] rounded-[8px] bg-[#0E1B3D] overflow-hidden flex-none shrink-0 flex items-center justify-center relative">
                                <div className="absolute w-[50px] h-[50px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1463FF] blur-[22px] rounded-full z-0" />
                                <Image
                                    src={collection.image}
                                    alt={collection.title}
                                    fill
                                    className="object-cover absolute inset-0 z-10"
                                    sizes="76px"
                                />
                            </div>
                            <div className="flex-1 min-w-0 flex items-center justify-center">
                                <span className="font-['Jost'] font-extrabold text-[16px] md:text-[20px] lg:text-[22px] leading-tight text-white tracking-[0.01em] text-center truncate">
                                    {collection.title}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
