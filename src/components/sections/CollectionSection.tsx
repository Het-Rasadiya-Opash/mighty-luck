'use client'
import React, { useState } from 'react';
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

    // Width of one card (316) + gap (12)
    const cardWidth = 328;
    // Show about 3 full cards in the 1136px container
    const maxIndex = Math.max(0, collectionData.length - 3);

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    };
    return (
        <section className="w-[1136px] flex flex-col gap-[20px]">
            <div className="w-[1136px] h-[30px] flex items-center justify-between">
                <div className="flex items-center gap-[12px]">
                    <Sun className="text-[#FFBF1F] w-[24px] h-[24px] shrink-0" strokeWidth={2} fill="#FFBF1F" />
                    <h2 className="font-['Jost'] font-extrabold text-[20px] leading-[100%] tracking-[0.01em] text-white m-0">
                        COLLECTIONS (170)
                    </h2>
                </div>

                <div className="w-[125px] h-[30px] flex items-center gap-[12px]">
                       <span className="flex items-center justify-center w-[45px] h-[16px] font-['Manrope'] font-semibold text-[12px] leading-[100%] tracking-[0.02em] text-[#D2DCF7] cursor-pointer hover:text-white transition-colors whitespace-nowrap shrink-0">
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

            <div className="relative w-[1136px] overflow-hidden">
                <div 
                    className="flex gap-[12px] h-[100px] transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * cardWidth}px)` }}
                >
                    {collectionData.map((collection) => (
                        <div
                            key={collection.id}
                            className="w-[316px] h-[100px] bg-[#0C1F56] hover:bg-[#173EAD] transition-colors rounded-[12px] flex items-center pl-[12px] pr-[24px] py-[12px] gap-[12px] shrink-0 cursor-pointer group"
                        >
                            <div className="w-[76px] h-[76px] rounded-[8px] bg-[#0E1B3D] overflow-hidden flex-none shrink-0 flex items-center justify-center relative z-0">
                                <div className="absolute inset-0 bg-[#173EAD] opacity-0 group-hover:opacity-20 transition-opacity z-10" />
                                
                                <div className="absolute w-[70px] h-[70px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1463FF] blur-[22px] rounded-full z-0" />
                                
                                <Image
                                    src={collection.image}
                                    alt={collection.title}
                                    fill
                                    className="object-cover absolute inset-0 z-10"
                                />
                            </div>
                            <div className="flex-1 w-[192px] h-[32px] flex items-center justify-center z-10">
                                <span className="font-['Jost'] font-extrabold text-[22px] leading-[32px] text-white tracking-[0.01em] text-center">
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
