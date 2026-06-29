'use client';

import { Heart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import TabHeader from './TabHeader';

export interface Game {
    id: number | string;
    title: string;
    image: string;
}

interface GameGridProps {
    title: string;
    count: string | number;
    games: Game[];
}

export default function GameGrid({ title, count, games }: GameGridProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { status } = useSession();

    // Parse numeric total from count prop (e.g. "1,487" -> 1487)
    const totalNum = typeof count === 'number' ? count : parseInt(count.toString().replace(/,/g, ''), 10) || games.length;

    // Default initial visible count (multiple of 9 for balanced rows)
    const initialVisible = 27;
    const [visibleCount, setVisibleCount] = useState(initialVisible);
    const [searchQuery, setSearchQuery] = useState('');

    const handleGameClick = (gameId: string | number) => {
        const params = new URLSearchParams(searchParams?.toString());
        if (status === 'authenticated') {
            params.set('game', gameId.toString());
        } else {
            params.set('auth', 'login');
        }
        router.push(`${pathname}?${params.toString()}`);
    };

    // Filter games in active tab JSON data
    const filteredGames = games.filter((g) =>
        g.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

    const handleLoadMore = () => {
        setVisibleCount((prev) => Math.min(prev + 27, filteredGames.length));
    };

    // Render filtered json items from games array
    const displayedGames = filteredGames.slice(0, visibleCount);

    // Progress percentage based on actual filtered json array length
    const progressPercent = Math.min(100, Math.max(5, (displayedGames.length / (filteredGames.length || 1)) * 100));

    return (
        <div className="flex flex-col gap-6 w-full">
            <TabHeader 
                title={title} 
                count={filteredGames.length} 
                games={games}
                onGameClick={handleGameClick}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

            {/* Grid of Game Cards: 9 cards per row on full screen */}
            {displayedGames.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-[8px] sm:gap-[12px] w-full">
                    {displayedGames.map((game) => (
                        <div
                            key={game.id}
                            onClick={() => handleGameClick(game.id)}
                            className="aspect-[121.6/160] sm:aspect-[152/200] w-full bg-[#0C1F56] rounded-[9.6px] sm:rounded-[16px] flex flex-col items-center justify-center overflow-hidden relative group cursor-pointer hover:z-10"
                        >
                            <Image
                                src={game.image}
                                alt={game.title}
                                fill
                                className="object-cover z-0"
                                sizes="(max-width: 640px) 150px, 200px"
                            />
                            <div className="absolute inset-0 bg-black/60 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="absolute w-[19.2px] h-[19.2px] sm:w-[24px] sm:h-[24px] top-[9.6px] sm:top-[12px] right-[11.2px] sm:right-[12px] text-white hover:text-[#FFC83D] transition-colors flex items-center justify-center">
                                    <Heart size={19.2} strokeWidth={2} className="w-[19.2px] h-[19.2px] sm:w-[20px] sm:h-[20px]" />
                                </button>
                                <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38.4px] h-[38.4px] sm:w-[44px] sm:h-[44px] bg-[#FFC83D] rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                                    <div className="w-0 h-0 border-t-[5.6px] sm:border-t-[7px] border-t-transparent border-l-[9.6px] sm:border-l-[11px] border-l-[#0C1F56] border-b-[5.6px] sm:border-b-[7px] border-b-transparent ml-[2.4px] sm:ml-[3px]" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-12 text-center text-[#D2DCF7] font-['Manrope'] text-[15px]">
                    No games found matching "{searchQuery}"
                </div>
            )}

            {/* Load More & Progress Section */}
            <div className="flex flex-col items-center justify-center gap-3 mt-4 mb-8 w-full">
                {/* Progress Bar Container */}
                <div className="w-[200px] sm:w-[280px] h-[3px] bg-[#0C1F56] rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-[#FFC83D] rounded-full transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>

                {/* Counter Text */}
                <p className="font-['Manrope'] font-semibold text-[13px] sm:text-[14px] text-[#D2DCF7]">
                    You viewed <span className="text-white font-bold">{displayedGames.length}</span> out of <span className="text-white font-bold">{filteredGames.length}</span> games
                </p>

                {/* Load More Button */}
                {visibleCount < filteredGames.length && (
                    <button
                        onClick={handleLoadMore}
                        className="mt-1 px-6 py-2.5 bg-[#112F82] hover:bg-[#1463FF] text-white font-['Manrope'] font-bold text-[13px] sm:text-[14px] rounded-[6px] transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-95"
                    >
                        Load More
                    </button>
                )}
            </div>
        </div>
    );
}
