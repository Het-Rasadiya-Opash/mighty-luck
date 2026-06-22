"use client";

import React, { Suspense } from 'react';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export interface Game {
    id: number | string;
    title: string;
    image: string;
}

export interface GameGridProps {
    title: string;
    icon: React.ReactNode;
    games: Game[];
}

function GameGridContent({ title, icon, games }: GameGridProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const handleGameClick = (gameId: string | number) => {
        const params = new URLSearchParams(searchParams?.toString());
        params.set('game', gameId.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex flex-col gap-[20px] w-full">
            {/* Header */}
            <div className="flex items-center gap-[7.2px] sm:gap-[12px] h-[23px] sm:h-[30px]">
                <div className="flex items-center justify-center w-[18px] h-[18px] sm:w-[30px] sm:h-[30px] shrink-0 [&>img]:w-full [&>img]:h-full [&>img]:object-contain">
                    {icon}
                </div>
                <span className="font-['Jost'] text-[13px] min-[375px]:text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-extrabold leading-[23px] sm:leading-[100%] tracking-[0.01em] text-white uppercase whitespace-nowrap">
                    {title}
                </span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-3 min-[480px]:grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-[8px] sm:gap-[12px] w-full">
                {games.map((game) => (
                    <div
                        key={game.id}
                        onClick={() => handleGameClick(game.id)}
                        className="aspect-[152/200] w-full bg-[#0C1F56] rounded-[9.6px] sm:rounded-[16px] flex flex-col items-center justify-center overflow-hidden relative group cursor-pointer hover:scale-[1.02] transition-transform duration-200"
                    >
                        <Image
                            src={game.image}
                            alt={game.title}
                            fill
                            className="object-cover z-0"
                            sizes="(max-width: 640px) 33vw, 152px"
                        />
                        <div className="absolute inset-0 bg-black/60 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="absolute w-[19.2px] h-[19.2px] sm:w-[24px] sm:h-[24px] top-[9.6px] sm:top-[12px] right-[11.2px] sm:right-[12px] text-white hover:text-[#FFC83D] transition-colors flex items-center justify-center">
                                <Heart size={19.2} strokeWidth={2} className="w-[19.2px] h-[19.2px] sm:w-[20px] sm:h-[20px]" />
                            </button>
                            <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38.4px] h-[38.4px] sm:w-[44px] sm:h-[44px] bg-[#FFC83D] rounded-full flex items-center justify-center">
                                <div className="w-0 h-0 border-t-[5.6px] sm:border-t-[7px] border-t-transparent border-l-[9.6px] sm:border-l-[11px] border-l-[#0C1F56] border-b-[5.6px] sm:border-b-[7px] border-b-transparent ml-[2.4px] sm:ml-[3px]" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function GameGrid(props: GameGridProps) {
    return (
        <Suspense fallback={null}>
            <GameGridContent {...props} />
        </Suspense>
    );
}
