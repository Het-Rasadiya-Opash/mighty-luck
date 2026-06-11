"use client";

import React, { useState } from 'react';
import { Gift, ChevronUp, ChevronDown, Snowflake, Crown, Megaphone, Trophy, Dices, LayoutGrid, Sparkles, Flame, Hexagon, TrendingUp, MonitorPlay, Headset } from 'lucide-react';

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

                    <div className="w-[98px] h-[44px] bg-gradient-to-r from-[#F51BB7] to-[#500039] rounded-[8px] flex items-center justify-start px-[6px] gap-[2px]">
                        <Crown className="w-[24px] h-[24px] text-[#FFC727] shrink-0" strokeWidth={1.5} />
                        <span className="text-[10px] font-black text-white italic uppercase leading-[1.1] text-left">
                            VIP<br />TRANSFER
                        </span>
                    </div>
                </div>
                <div className="w-[200px] h-[50px] bg-gradient-to-r from-[#3F31FF] to-[#091741] rounded-[8px] flex items-center justify-start px-[12px] gap-[8px]">
                    <Snowflake className="w-[32px] h-[32px] text-[#FFC727] shrink-0" strokeWidth={1.5} />
                    <div className="flex flex-col items-start">
                        <span className="text-[14px] font-black text-white italic tracking-wide leading-tight">WINTER RUSH</span>
                        <span className="text-[10px] font-bold text-white italic leading-tight">$2,000,000 IN PRIZES</span>
                    </div>
                </div>
            </div>

            <div className="w-[232px] h-[596px] shrink-0 bg-[#0C1F56] rounded-[16px] flex flex-col p-[16px] gap-[16px]">
                <NavItem icon={<Gift size={20} />} label="Promotions" />
                <NavItem icon={<Crown size={20} />} label="VIP Program" />
                <NavItem icon={<Trophy size={20} />} label="Tournaments" />

                <div className={`flex flex-col rounded-[8px] overflow-hidden ${openDropdown === 'casino' ? 'bg-[#112F82]' : ''}`}>
                    <div
                        onClick={() => toggleDropdown('casino')}
                        className={`flex items-center justify-between w-[200px] h-[44px] px-[10px] cursor-pointer text-white transition-colors bg-[#1463FF] ${openDropdown === 'casino' ? 'rounded-t-[8px]' : 'rounded-[8px]'}`}
                    >
                        <div className="flex items-center gap-[8px]">
                            <Dices size={20} className="shrink-0" />
                            <span className="font-medium text-[15px]">Casino</span>
                        </div>
                        {openDropdown === 'casino' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>

                    {openDropdown === 'casino' && (
                        <div className="flex flex-col py-[8px]">
                            <SubNavItem icon={<LayoutGrid size={18} />} label="All Games" />
                            <SubNavItem icon={<Sparkles size={18} />} label="New Games" />
                            <SubNavItem icon={<Flame size={18} />} label="Popular Games" />
                            <SubNavItem icon={<Hexagon size={18} />} label="Original Games" />
                            <SubNavItem icon={<TrendingUp size={18} />} label="Crash Games" />
                        </div>
                    )}
                </div>

                <div className={`flex flex-col rounded-[8px] overflow-hidden ${openDropdown === 'live-casino' ? 'bg-[#112F82]' : ''}`}>
                    <div
                        onClick={() => toggleDropdown('live-casino')}
                        className={`flex items-center justify-between w-[200px] h-[44px] px-[10px] cursor-pointer text-white transition-colors bg-[#1463FF] ${openDropdown === 'live-casino' ? 'rounded-t-[8px]' : 'rounded-[8px]'}`}
                    >
                        <div className="flex items-center gap-[8px]">
                            <MonitorPlay size={20} className="shrink-0" />
                            <span className="font-medium text-[15px]">Live Casino</span>
                        </div>
                        {openDropdown === 'live-casino' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>

                    {openDropdown === 'live-casino' && (
                        <div className="flex flex-col py-[8px]">
                            <SubNavItem icon={<LayoutGrid size={18} />} label="All Live Games" />
                        </div>
                    )}
                </div>

                <div className="mt-auto">
                    <NavItem icon={<Headset size={20} />} label="Live Support" />
                </div>
            </div>
        </aside>
    );
}

function NavItem({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <div className="flex items-center gap-[8px] w-[200px] h-[44px] px-[10px] cursor-pointer bg-[#112F82] rounded-[8px] transition-colors text-[#D2DCF7] hover:text-white">
            {icon}
            <span className="font-medium text-[15px]">{label}</span>
        </div>
    );
}

function SubNavItem({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <div className="flex items-center gap-[8px] w-[200px] h-[40px] px-[10px] pl-[32px] cursor-pointer transition-colors text-[#D2DCF7] hover:text-white">
            {icon}
            <span className="font-medium text-[15px]">{label}</span>
        </div>
    );
}
