import React from 'react';
import Image from 'next/image';
import { Trophy } from 'lucide-react';

const recentWinners = [
    {
        id: 1,
        game: "Sweet Bonanza Super Scatter",
        user: "Alb****",
        time: "14:16 PM",
        payout: "$126.1",
        payoutColor: "text-[#00DD29]",
        image: "/winner-1.png"
    },
    {
        id: 2,
        game: "Honey Money Multiplier",
        user: "Tra****",
        time: "14:16 PM",
        payout: "$15.2",
        payoutColor: "text-[#00DD29]",
        image: "/winner-2.png"
    },
    {
        id: 3,
        game: "Dragon Tiger",
        user: "Hid******",
        time: "14:15 PM",
        payout: "$77.08",
        payoutColor: "text-[#00DD29]",
        image: "/winner-3.png"
    },
    {
        id: 4,
        game: "Eleven Fortune",
        user: "Gin***",
        time: "14:15 PM",
        payout: "$0.00",
        payoutColor: "text-[#7795E8]",
        image: "/winner-4.png"
    },
    {
        id: 5,
        game: "Honey Money Multiplier",
        user: "Tra****",
        time: "14:15 PM",
        payout: "$11.23",
        payoutColor: "text-[#00DD29]",
        image: "/winner-5.png"
    },
    {
        id: 6,
        game: "XO Paradise",
        user: "Amr******",
        time: "14:15 PM",
        payout: "$67.88",
        payoutColor: "text-[#00DD29]",
        image: "/winner-6.png"
    }
];

export default function RecentWinnerSection() {
    return (
        <section className="w-[1136px] flex flex-col gap-[20px]">
            {/* Header */}
            <div className="w-[1136px] h-[30px] flex items-center justify-between">
                <div className="flex items-center gap-[12px] h-[30px]">
                    <div className="w-[30px] h-[30px] flex items-center justify-center">
                        <Trophy className="text-[#FFC83D] w-[24px] h-[24px]" strokeWidth={2.5} />
                    </div>
                    <h2 className="font-['Jost'] font-extrabold text-[20px] leading-[29px] tracking-[0.01em] text-white m-0">
                        RECENT WINNERS
                    </h2>
                </div>
            </div>

            {/* List Container */}
            <div className="w-[1136px] flex flex-col gap-[8px]">
                
                {/* Table Header */}
                <div className="flex items-center px-[24px] w-full h-[20px] font-['Jost'] font-bold text-[14px] leading-[20px] tracking-[0.02em] uppercase text-white/50 mb-[4px]">
                    <div className="flex-1">GAME</div>
                    <div className="w-[624px] flex gap-[12px]">
                        <div className="w-[300px]">USERNAME</div>
                        <div className="w-[150px]">TIME</div>
                        <div className="w-[150px] text-right">PAYOUT</div>
                    </div>
                </div>

                {/* List Rows */}
                {recentWinners.map((winner) => (
                    <div 
                        key={winner.id}
                        className="w-[1136px] h-[60px] bg-[#0C1F56] rounded-[8px] px-[24px] flex items-center justify-between shrink-0"
                    >
                        {/* Game Column */}
                        <div className="flex items-center gap-[12px]">
                            {/* Game Thumbnail */}
                            <div className="w-[22px] h-[30px] rounded-[1.8px] shrink-0 relative overflow-hidden bg-[#CDCDCD]">
                                <Image
                                    src={winner.image}
                                    alt={winner.game}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <span className="font-['Manrope'] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white">
                                {winner.game}
                            </span>
                        </div>

                        {/* User / Time / Payout Columns */}
                        <div className="w-[624px] flex items-center gap-[12px]">
                            <span className="w-[300px] font-['Manrope'] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white">
                                {winner.user}
                            </span>
                            <span className="w-[150px] font-['Manrope'] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white">
                                {winner.time}
                            </span>
                            <span className={`w-[150px] font-['Manrope'] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-right ${winner.payoutColor}`}>
                                {winner.payout}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
