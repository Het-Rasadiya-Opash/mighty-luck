import React from 'react';
import { ArrowDown } from 'lucide-react';

export default function AboutSection() {
    return (
        <section className="flex flex-col items-start gap-[40px] w-full">
            <div className="flex flex-col items-center gap-[32px] w-full relative overflow-hidden isolate">

                <div className="flex flex-col items-start gap-[24px] w-full max-w-[800px] mx-auto">
                    <h2 className="w-full font-['Jost'] font-bold text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] leading-[120%] tracking-[-0.02em] text-white">
                        Play the Best Crypto Casino Games Online at Mighty Luck — Fast, Fair and Secure
                    </h2>
                    <p className="w-full font-['Manrope'] font-medium text-[14px] md:text-[15px] lg:text-[16px] leading-[160%] text-[#D2DCF7] whitespace-pre-wrap">
                        {`Step into a next-generation gaming experience where every spin, bet, and hand is powered by blockchain technology. At Mighty Luck Casino, you can explore more than 9,000 crypto casino games across slots, table games, live dealer games, and crash-style favorites. As one of the top crypto casinos online, Mighty Luckgives players instant withdrawals, enhanced privacy, and a secure gambling environment without the friction of traditional payment methods.\n\nWhether you're here to play table games, explore Bitcoin casino games, or try the latest provably fair slots, Mighty Luck delivers one of the most complete online casino experiences available today.\n\nReady to play games and win real crypto?\n\nStart playing crypto casino games at Mighty Luck Casino`}
                    </p>
                </div>

                <div className="flex flex-col items-start gap-[16px] w-full max-w-[800px] mx-auto">
                    <h3 className="w-full font-['Jost'] font-bold text-[18px] md:text-[20px] lg:text-[24px] leading-[35px] text-white">
                        Why Mighty Luck Is the Ultimate Place to Play Crypto Casino Games
                    </h3>
                    <p className="w-full font-['Manrope'] font-medium text-[14px] md:text-[15px] lg:text-[16px] leading-[160%] text-[#D2DCF7] whitespace-pre-wrap">
                        Mighty Luck Casino offers the perfect blend of crypto gambling convenience, online casino entertainment, and world-class security. Compared to traditional online casinos, Mighty Luck delivers significantly faster payouts, more generous bonuses, and an unmatched selection of various games.
                    </p>
                </div>

                <div className="flex flex-col items-start gap-[16px] w-full max-w-[800px] mx-auto pb-[60px]">
                    <h3 className="w-full font-['Jost'] font-bold text-[18px] md:text-[20px] lg:text-[24px] leading-[35px] text-white">
                        Massive Game Variety
                    </h3>
                    <p className="w-full font-['Manrope'] font-medium text-[14px] md:text-[15px] lg:text-[16px] leading-[160%] text-[#D2DCF7] whitespace-pre-wrap">
                        With more than 9,000 casino games, Wild.io outshines many crypto casinos and traditional casinos alike. You'll find:
                    </p>
                </div>

                <div className="absolute w-full max-w-[800px] h-[200px] left-1/2 -translate-x-1/2 bottom-0 bg-gradient-to-t from-[#091741] to-transparent flex flex-col justify-end items-center px-[10px] pb-[24px] gap-[10px] z-10 pointer-events-none">
                    <button className="flex items-center gap-[4px] cursor-pointer hover:opacity-80 transition-opacity pointer-events-auto">
                        <span className="font-['Manrope'] font-semibold text-[14px] leading-[19px] tracking-[0.01em] text-[#FFBF1F]">
                            Read more
                        </span>
                        <ArrowDown size={16} color="#FFBF1F" strokeWidth={2} />
                    </button>
                </div>

            </div>
        </section>
    );
}
