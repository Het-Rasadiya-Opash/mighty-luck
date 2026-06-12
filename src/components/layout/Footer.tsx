import React from 'react';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="flex flex-col items-start p-0 gap-[48px] w-[1136px] h-[357px] shrink-0 mx-auto mt-20 mb-10">
            
            {/* Top Frame */}
            <div className="flex flex-row justify-between items-start p-0 gap-[49px] w-[1136px] h-[205px]">
                
                {/* Left Side: Logo & Copyright */}
                <div className="flex flex-col items-start p-0 gap-[16px] w-[213px] h-[81px]">
                    {/* Logo Frame */}
                    <div className="w-[132px] h-[50px] relative">
                        <Image 
                            src="/Horizontal logo.png" 
                            alt="Mighty Luck" 
                            fill 
                            className="object-contain object-left" 
                        />
                    </div>
                    {/* Copyright */}
                    <div className="w-[213px] h-[15px] font-['Manrope'] font-semibold text-[11px] leading-[15px] tracking-[0.01em] text-[#D2DCF7]">
                        @ 2026 Mighty Luck. All rights reserved.
                    </div>
                </div>

                {/* Right Side: Navigation Columns */}
                <div className="flex flex-row items-start p-0 gap-[32px] w-[728px] h-[205px]">
                    
                    {/* Column 1: SLOT GAMES */}
                    <div className="flex flex-col items-start p-0 gap-[12px] w-[120px] h-[136px]">
                        <div className="w-[120px] h-[17px] font-['Jost'] font-bold text-[12px] leading-[17px] tracking-[0.02em] uppercase text-[#FFFFFF]">
                            SLOT GAMES
                        </div>
                        <div className="flex flex-col items-start p-0 gap-[8px] w-[120px] h-[107px]">
                            {['Slots', 'Skill Games', 'Jackpot', 'Bonus Buy', 'Crash Games'].map(item => (
                                <div key={item} className="w-[120px] h-[15px] font-['Manrope'] font-semibold text-[11px] leading-[15px] tracking-[0.01em] text-[#D2DCF7] hover:text-[#FFBF1F] cursor-pointer transition-colors">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: LIVE CASINO */}
                    <div className="flex flex-col items-start p-0 gap-[12px] w-[120px] h-[136px]">
                        <div className="w-[120px] h-[17px] font-['Jost'] font-bold text-[12px] leading-[17px] tracking-[0.02em] uppercase text-[#FFFFFF]">
                            LIVE CASINO
                        </div>
                        <div className="flex flex-col items-start p-0 gap-[8px] w-[120px] h-[107px]">
                            {['Roulette', 'Blackjack', 'Live Casino', 'Table Games', 'Video Poker'].map(item => (
                                <div key={item} className="w-[120px] h-[15px] font-['Manrope'] font-semibold text-[11px] leading-[15px] tracking-[0.01em] text-[#D2DCF7] hover:text-[#FFBF1F] cursor-pointer transition-colors">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column 3: CASINO */}
                    <div className="flex flex-col items-start p-0 gap-[12px] w-[120px] h-[205px]">
                        <div className="w-[120px] h-[17px] font-['Jost'] font-bold text-[12px] leading-[17px] tracking-[0.02em] uppercase text-[#FFFFFF]">
                            CASINO
                        </div>
                        <div className="flex flex-col items-start p-0 gap-[8px] w-[120px] h-[176px]">
                            {['About Us', 'Promotions', 'Tournaments', 'Affiliate Program', 'Vip Club', 'Refer a Friend', 'Blog', 'Bonus Shop'].map(item => (
                                <div key={item} className="w-[120px] h-[15px] font-['Manrope'] font-semibold text-[11px] leading-[15px] tracking-[0.01em] text-[#D2DCF7] hover:text-[#FFBF1F] cursor-pointer transition-colors">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column 4: LEGAL */}
                    <div className="flex flex-col items-start p-0 gap-[12px] w-[120px] h-[159px]">
                        <div className="w-[120px] h-[17px] font-['Jost'] font-bold text-[12px] leading-[17px] tracking-[0.02em] uppercase text-[#FFFFFF]">
                            LEGAL
                        </div>
                        <div className="flex flex-col items-start p-0 gap-[8px] w-[120px] h-[130px]">
                            {['Privacy Policy', 'Terms & Conditions', 'Bonus Terms', 'Responsible Gambling', 'Payment Methods', 'Sportsbook Rules'].map(item => (
                                <div key={item} className="w-[120px] h-[15px] font-['Manrope'] font-semibold text-[11px] leading-[15px] tracking-[0.01em] text-[#D2DCF7] hover:text-[#FFBF1F] cursor-pointer transition-colors">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column 5: SUPPORT */}
                    <div className="flex flex-col items-start p-0 gap-[12px] w-[120px] h-[44px]">
                        <div className="w-[120px] h-[17px] font-['Jost'] font-bold text-[12px] leading-[17px] tracking-[0.02em] uppercase text-[#FFFFFF]">
                            SUPPORT
                        </div>
                        <div className="flex flex-col items-start p-0 gap-[8px] w-[120px] h-[15px]">
                            <div className="w-[120px] h-[15px] font-['Manrope'] font-semibold text-[11px] leading-[15px] tracking-[0.01em] text-[#D2DCF7] hover:text-[#FFBF1F] cursor-pointer transition-colors">
                                Live Support
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Frame */}
            <div className="box-border flex flex-row justify-between items-start pt-[48px] px-0 pb-0 gap-[10px] w-[1136px] h-[104px] border-t border-[#112F82]">
                
                {/* Disclaimer */}
                <div className="w-[445px] h-[56px] font-['Manrope'] font-semibold text-[10px] leading-[14px] text-justify tracking-[0.01em] text-[#D2DCF7]">
                    MightyLuck.com is owned and operated by Company Name B.V. a company that is incorporated under the laws of Curacao with company registration number XXXXXX, having its registered address at Street 3XX9, City, Curaçao. MightyLuck.com is licensed and holds a valid Certificate of Operation (ABC/XXXX/XXX/XXXX).
                </div>

                {/* Badges Frame */}
                <div className="flex flex-row justify-end items-center p-0 gap-[32px] w-[288.5px] h-[38px]">
                    
                    {/* 18+ */}
                    <div className="w-[38px] h-[38px] flex items-center justify-center shrink-0">
                        <div className="w-[32px] h-[32px] rounded-full border-2 border-[#D2DCF7] flex items-center justify-center opacity-80">
                            <span className="font-['Manrope'] font-bold text-[13px] text-[#D2DCF7] leading-none tracking-tighter ml-[1px]">18+</span>
                        </div>
                    </div>

                    {/* GambleAware */}
                    <div className="w-[120px] h-[24px] flex items-center justify-center shrink-0 opacity-80">
                        <span className="font-['Manrope'] font-semibold text-[20px] tracking-tight text-[#D2DCF7]">GambleAware</span>
                    </div>

                    {/* GCB */}
                    <div className="relative w-[66.5px] h-[38px] shrink-0">
                        <Image 
                            src="/gcb.png" 
                            alt="GCB" 
                            fill 
                            className="object-contain" 
                        />
                    </div>

                </div>
            </div>

        </footer>
    );
}
