"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Gift, ChevronUp, ChevronDown, Snowflake, Crown, Megaphone } from 'lucide-react';

export default function Sidebar() {
    const [openDropdown, setOpenDropdown] = useState<string | null>('casino');

    const toggleDropdown = (name: string) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    return (
        <aside className="w-[232px] h-[740px] flex flex-col gap-[10px] shrink-0">
            <div className="w-[232px] h-[134px] bg-[#0C1F56] rounded-[16px] p-[16px] flex flex-col gap-[10px]">
                <div className="flex gap-[10px] h-[44px]">
                    <div className="w-[98px] h-[44px] bg-gradient-to-r from-[#B42FF4] to-[#3B005F] rounded-[8px] flex items-center justify-start px-[6px] gap-[2px]">
                        <Megaphone className="w-[24px] h-[24px] text-[#FFC727] shrink-0" strokeWidth={1.5} />
                        <span className="text-[10px] font-black text-white italic uppercase leading-[1.1] text-left">
                            REFER<br />A FRIEND
                        </span>
                    </div>

                    <div className="w-[98px] h-[44px] bg-gradient-to-r from-[#F51BB7] to-[#3B005F] rounded-[8px] flex items-center justify-start px-[6px] gap-[2px]">
                        <Crown className="w-[24px] h-[24px] text-[#FFC727] shrink-0" strokeWidth={1.5} />
                        <span className="text-[10px] font-black text-white italic uppercase leading-[1.1] text-left">
                            VIP<br />TRANSFER
                        </span>
                    </div>
                </div>
                <div className="w-[200px] h-[50px] bg-gradient-to-r from-[#3F31FF] to-[#1D0072] rounded-[8px] flex items-center justify-start px-[12px] gap-[8px]">
                    <Snowflake className="w-[32px] h-[32px] text-[#FFC727] shrink-0" strokeWidth={1.5} />
                    <div className="flex flex-col items-start">
                        <span className="text-[14px] font-black text-white italic tracking-wide leading-tight">WINTER RUSH</span>
                        <span className="text-[10px] font-bold text-white italic leading-tight">$2,000,000 IN PRIZES</span>
                    </div>
                </div>
            </div>

            <div className="w-[232px] flex-1 bg-[#0C1F56] rounded-[16px] flex flex-col overflow-hidden p-[12px] gap-[8px]">

               
                <NavItem fallbackIcon={<Gift size={20} />} label="Promotions" />
                <NavItem iconSrc="/vip.png" label="VIP Program" />
                <NavItem iconSrc="/cup.png" label="Tournaments" />

                <div className={`flex flex-col rounded-[12px] overflow-hidden ${openDropdown === 'casino' ? 'bg-[#3B1257]' : ''}`}>
                    <div
                        onClick={() => toggleDropdown('casino')}
                        className={`flex items-center justify-between px-[16px] py-[14px] cursor-pointer text-white transition-colors bg-[#A92BF5] ${openDropdown === 'casino' ? 'rounded-t-[12px]' : 'rounded-[12px]'}`}
                    >
                        <div className="flex items-center gap-[12px]">
                            <Image src="/casino.png" alt="Casino" width={20} height={20} className="object-contain shrink-0" />
                            <span className="font-semibold text-[15px]">Casino</span>
                        </div>
                        {openDropdown === 'casino' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>

                    {openDropdown === 'casino' && (
                        <div className="flex flex-col py-[8px]">
                            <SubNavItem iconSrc="/allgame.png" label="All Games" />
                            <SubNavItem iconSrc="/newgame.png" label="New Games" />
                            <SubNavItem iconSrc="/populargame.png" label="Popular Games" />
                            <SubNavItem iconSrc="/originalgame.png" label="Original Games" />
                            <SubNavItem iconSrc="/crashgame.png" label="Crash Games" />
                        </div>
                    )}
                </div>

                <div className={`flex flex-col rounded-[12px] overflow-hidden ${openDropdown === 'live-casino' ? 'bg-[#3B1257]' : ''}`}>
                    <div
                        onClick={() => toggleDropdown('live-casino')}
                        className={`flex items-center justify-between px-[16px] py-[14px] cursor-pointer text-white transition-colors bg-[#A92BF5] ${openDropdown === 'live-casino' ? 'rounded-t-[12px]' : 'rounded-[12px]'}`}
                    >
                        <div className="flex items-center gap-[12px]">
                            <Image src="/livecasino.png" alt="Live Casino" width={20} height={20} className="object-contain shrink-0" />
                            <span className="font-semibold text-[15px]">Live Casino</span>
                        </div>
                        {openDropdown === 'live-casino' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>

                    {openDropdown === 'live-casino' && (
                        <div className="flex flex-col py-[8px]">
                            <SubNavItem iconSrc="/allgame.png" label="All Live Games" />
                        </div>
                    )}
                </div>

                <div className="mt-auto">
                    <NavItem iconSrc="/livesupport.png" label="Live Support" />
                </div>
            </div>
        </aside>
    );
}

function NavItem({ iconSrc, fallbackIcon, label }: { iconSrc?: string, fallbackIcon?: React.ReactNode, label: string }) {
    return (
        <div className="flex items-center gap-[12px] px-[16px] py-[14px] cursor-pointer bg-[#3B1257] hover:bg-[#4a156c] rounded-[12px] transition-colors text-[#D1B8E1] hover:text-white">
            {iconSrc ? (
                <Image src={iconSrc} alt={label} width={20} height={20} className="object-contain shrink-0" />
            ) : (
                fallbackIcon
            )}
            <span className="font-medium text-[15px]">{label}</span>
        </div>
    );
}

function SubNavItem({ iconSrc, fallbackIcon, label }: { iconSrc?: string, fallbackIcon?: React.ReactNode, label: string }) {
    return (
        <div className="flex items-center gap-[12px] px-[24px] py-[10px] cursor-pointer hover:bg-white/5 transition-colors text-[#D1B8E1] hover:text-white">
            {iconSrc ? (
                <Image src={iconSrc} alt={label} width={18} height={18} className="object-contain shrink-0" />
            ) : (
                fallbackIcon
            )}
            <span className="font-medium text-[15px]">{label}</span>
        </div>
    );
}
