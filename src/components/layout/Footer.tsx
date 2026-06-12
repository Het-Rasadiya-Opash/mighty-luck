import React from 'react';
import Image from 'next/image';

const footerLinks = {
    "SLOT GAMES": ['Slots', 'Skill Games', 'Jackpot', 'Bonus Buy', 'Crash Games'],
    "LIVE CASINO": ['Roulette', 'Blackjack', 'Live Casino', 'Table Games', 'Video Poker'],
    "CASINO": ['About Us', 'Promotions', 'Tournaments', 'Affiliate Program', 'Vip Club', 'Refer a Friend', 'Blog', 'Bonus Shop'],
    "LEGAL": ['Privacy Policy', 'Terms & Conditions', 'Bonus Terms', 'Responsible Gambling', 'Payment Methods', 'Sportsbook Rules'],
    "SUPPORT": ['Live Support'],
};

export default function Footer() {
    return (
        <footer className="flex flex-col items-start gap-8 md:gap-[48px] w-full mt-10 mb-6">

            {/* Top row: logo + nav columns */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-[49px] w-full">

                {/* Logo + copyright */}
                <div className="flex flex-col items-start gap-[16px] shrink-0">
                    <div className="w-[132px] h-[50px] relative">
                        <Image src="/Horizontal logo.png" alt="Mighty Luck" fill className="object-contain object-left" />
                    </div>
                    <div className="font-['Manrope'] font-semibold text-[11px] leading-[15px] tracking-[0.01em] text-[#D2DCF7]">
                        @ 2026 Mighty Luck. All rights reserved.
                    </div>
                </div>

                {/* Nav link columns */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-6 gap-y-8 w-full md:w-auto">
                    {Object.entries(footerLinks).map(([heading, links]) => (
                        <div key={heading} className="flex flex-col items-start gap-[12px]">
                            <div className="font-['Jost'] font-bold text-[12px] leading-[17px] tracking-[0.02em] uppercase text-white">
                                {heading}
                            </div>
                            <div className="flex flex-col items-start gap-[8px]">
                                {links.map(item => (
                                    <div key={item} className="font-['Manrope'] font-semibold text-[11px] leading-[15px] tracking-[0.01em] text-[#D2DCF7] hover:text-[#FFBF1F] cursor-pointer transition-colors">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom row: legal text + badges */}
            <div className="box-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-[10px] w-full pt-6 md:pt-[48px] border-t border-[#112F82]">

                <p className="max-w-full sm:max-w-[445px] font-['Manrope'] font-semibold text-[10px] leading-[14px] text-justify tracking-[0.01em] text-[#D2DCF7]">
                    MightyLuck.com is owned and operated by Company Name B.V. a company that is incorporated under the laws of Curacao with company registration number XXXXXX, having its registered address at Street 3XX9, City, Curaçao. MightyLuck.com is licensed and holds a valid Certificate of Operation (ABC/XXXX/XXX/XXXX).
                </p>

                <div className="flex items-center gap-6 sm:gap-[32px] shrink-0">
                    <div className="w-[38px] h-[38px] flex items-center justify-center shrink-0">
                        <div className="w-[32px] h-[32px] rounded-full border-2 border-[#D2DCF7] flex items-center justify-center opacity-80">
                            <span className="font-['Manrope'] font-bold text-[13px] text-[#D2DCF7] leading-none tracking-tighter ml-[1px]">18+</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-center opacity-80">
                        <span className="font-['Manrope'] font-semibold text-[18px] sm:text-[20px] tracking-tight text-[#D2DCF7] whitespace-nowrap">GambleAware</span>
                    </div>
                    <div className="relative w-[60px] sm:w-[66px] h-[38px] shrink-0">
                        <Image src="/gcb.png" alt="GCB" fill className="object-contain" />
                    </div>
                </div>
            </div>

        </footer>
    );
}
