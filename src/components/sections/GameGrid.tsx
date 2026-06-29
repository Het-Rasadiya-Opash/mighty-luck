'use client';

import { Heart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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

    const handleGameClick = (gameId: string | number) => {
        const params = new URLSearchParams(searchParams?.toString());
        if (status === 'authenticated') {
            params.set('game', gameId.toString());
        } else {
            params.set('auth', 'login');
        }
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex flex-col gap-6 w-full">
            <TabHeader title={title} count={count} />

            {/* Grid of Game Cards */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-[8px] sm:gap-[12px] w-full">
                {games.map((game) => (
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
        </div>
    );
}
