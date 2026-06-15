import React from 'react';
import Image from 'next/image';


const recentWinners = [
    { id: 1, game: "Sweet Bonanza Super Scatter", user: "Alb****", time: "14:16 PM", payout: "$126.1", payoutColor: "text-[#00DD29]", image: "/winner-1.png" },
    { id: 2, game: "Honey Money Multiplier", user: "Tra****", time: "14:16 PM", payout: "$15.2", payoutColor: "text-[#00DD29]", image: "/winner-2.png" },
    { id: 3, game: "Dragon Tiger", user: "Hid******", time: "14:15 PM", payout: "$77.08", payoutColor: "text-[#00DD29]", image: "/winner-3.png" },
    { id: 4, game: "Eleven Fortune", user: "Gin***", time: "14:15 PM", payout: "$0.00", payoutColor: "text-[#7795E8]", image: "/winner-4.png" },
    { id: 5, game: "Honey Money Multiplier", user: "Tra****", time: "14:15 PM", payout: "$11.23", payoutColor: "text-[#00DD29]", image: "/winner-5.png" },
    { id: 6, game: "XO Paradise", user: "Amr******", time: "14:15 PM", payout: "$67.88", payoutColor: "text-[#00DD29]", image: "/winner-6.png" },
];

export default function RecentWinnerSection() {
    return (
        <section className="w-full flex flex-col gap-4 md:gap-[20px]">
            <div className="w-full flex items-center gap-[12px] h-[30px]">
                <Image src="/winners.svg" alt="Winners" width={30} height={30} className="w-[30px] h-[30px] shrink-0 object-contain" />
                <h2 className="font-['Jost'] font-extrabold text-[16px] md:text-[18px] lg:text-[20px] leading-[29px] tracking-[0.01em] text-white m-0">
                    RECENT WINNERS
                </h2>
            </div>

            <div className="hidden md:flex items-center px-[24px] w-full h-[20px] font-['Jost'] font-bold text-[14px] leading-[20px] tracking-[0.02em] uppercase text-white/50 mb-[4px]">
                <div className="flex-1">GAME</div>
                <div className="flex gap-[12px]">
                    <div className="w-[180px] lg:w-[300px]">USERNAME</div>
                    <div className="w-[100px] lg:w-[150px]">TIME</div>
                    <div className="w-[80px] lg:w-[150px] text-right">PAYOUT</div>
                </div>
            </div>

            <div className="w-full flex flex-col gap-[8px]">
                {recentWinners.map((winner) => (
                    <div
                        key={winner.id}
                        className="w-full bg-[#0C1F56] rounded-[8px] px-4 md:px-[24px] py-3 md:py-0 md:h-[60px] flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0"
                    >
                        <div className="flex items-center gap-[12px] min-w-0">
                            <div className="w-[22px] h-[30px] rounded-[1.8px] shrink-0 relative overflow-hidden bg-[#CDCDCD]">
                                <Image src={winner.image} alt={winner.game} fill className="object-cover" sizes="22px" />
                            </div>
                            <span className="font-['Manrope'] font-semibold text-[13px] md:text-[14px] leading-[19px] tracking-[0.02em] text-white truncate">
                                {winner.game}
                            </span>
                        </div>

                        <div className="flex md:hidden items-center justify-between text-[12px] font-['Manrope'] font-semibold tracking-[0.02em] pl-[34px]">
                            <span className="text-white/70">{winner.user}</span>
                            <span className="text-white/50">{winner.time}</span>
                            <span className={winner.payoutColor}>{winner.payout}</span>
                        </div>

                        <div className="hidden md:flex items-center gap-[12px] shrink-0">
                            <span className="w-[180px] lg:w-[300px] font-['Manrope'] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white truncate">
                                {winner.user}
                            </span>
                            <span className="w-[100px] lg:w-[150px] font-['Manrope'] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white">
                                {winner.time}
                            </span>
                            <span className={`w-[80px] lg:w-[150px] font-['Manrope'] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-right ${winner.payoutColor}`}>
                                {winner.payout}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
