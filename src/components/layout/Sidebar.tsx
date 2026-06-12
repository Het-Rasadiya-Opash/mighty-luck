"use client";

import React, { useState } from 'react';
import { Gift, ChevronUp, ChevronDown, Snowflake, Crown, Megaphone, Trophy, Dices, LayoutGrid, Sparkles, Flame, Hexagon, TrendingUp, MonitorPlay, Headset } from 'lucide-react';
import { SearchModal } from '@/components/modals/SearchModal';

export default function Sidebar() {
    const [openDropdown, setOpenDropdown] = useState<string | null>('casino');

    const toggleDropdown = (name: string) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    return (
        <aside className="hidden lg:flex w-[232px] flex-col gap-[10px] shrink-0">
            <div className="flex h-[134px] w-[232px] flex-none flex-col items-start gap-[10px] rounded-[16px] bg-[#0C1F56] p-[16px]">

                <div className="flex w-[200px] flex-none flex-col items-start gap-[8px]">

                    {/* Top Two Cards Row */}
                    <div className="flex h-[44px] w-[200px] flex-none flex-row items-center gap-[4px]">

                        {/* Refer Friend */}
                        <div className="relative isolate overflow-hidden flex h-[44px] w-[98px] flex-none items-center gap-[2px] rounded-[8px] bg-[#3B005F] px-[8px] py-[6px]">
                            {/* Blur Effect (Contained) */}
                            <div className="absolute inset-0 z-[-1] overflow-hidden rounded-[8px]">
                                <div className="absolute -left-[43px] -top-[15px] h-[97px] w-[97px] rounded-full bg-[#A92BF5] blur-[25px]" />
                            </div>

                            <div className="relative z-[1] w-[24px] h-[24px] shrink-0 flex items-center justify-center">
                                <div
                                    className="absolute -left-[20px] -top-[4px] h-[39.33px] w-[59px] bg-contain bg-center bg-no-repeat pointer-events-none mix-blend-screen"
                                    style={{ backgroundImage: "url('/s-1.png')" }}
                                />
                            </div>

                            <div className="relative z-[2] flex h-[22px] w-[52px] flex-none flex-col justify-center">
                                <p className="font-jost text-[11px] font-bold leading-[100%] text-white">
                                    REFER
                                    A FRIEND
                                </p>
                            </div>
                        </div>

                        {/* VIP Transfer */}
                        <div className="relative isolate overflow-hidden flex h-[44px] w-[98px] flex-none items-center gap-[2px] rounded-[8px] bg-[#500039] px-[8px] py-[6px]">
                            {/* Blur Effect (Contained) */}
                            <div className="absolute inset-0 z-[-1] overflow-hidden rounded-[8px]">
                                <div className="absolute -left-[40px] -top-[5px] h-[97px] w-[97px] rounded-full bg-[#FF3981] blur-[25px]" />
                            </div>

                            <div className="relative z-[1] w-[24px] h-[24px] shrink-0 flex items-center justify-center">
                                <div
                                    className="absolute -left-[25px] -top-[4px] h-[33.01px] w-[64px] bg-contain bg-center bg-no-repeat pointer-events-none mix-blend-screen"
                                    style={{ transform: "rotate(11.84deg)", backgroundImage: "url('/s-2.png')" }}
                                />
                            </div>

                            <div className="relative z-[2] flex h-[22px] w-[57px] flex-none flex-col justify-center">
                                <p className="font-jost text-[11px] font-bold leading-[100%] text-white">
                                    VIP
                                    TRANSFER
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Winter Rush */}
                    <div className="relative isolate overflow-hidden flex h-[50px] w-[200px] flex-none items-center gap-[10px] rounded-[8px] bg-[#091741] px-[10px] py-[6px]">
                        {/* Blur Effect (Contained) */}
                        <div className="absolute inset-0 z-[-1] overflow-hidden rounded-[8px]">
                            <div className="absolute -left-[53px] -top-[22px] h-[110px] w-[110px] rounded-full bg-[#1463FF] blur-[25px]" />
                        </div>

                        <div className="relative z-[1] w-[24px] h-[24px] shrink-0 flex items-center justify-center">
                            <div
                                className="absolute -left-[50px] -top-[40px] h-[68px] w-[102px] bg-contain bg-center bg-no-repeat pointer-events-none mix-blend-screen"
                                style={{ transform: "scaleX(-1) rotate(-110deg)", backgroundImage: "url('/s-3.png')" }}
                            />
                        </div>

                        {/* Text Container */}
                        <div className="relative z-[3] flex h-[30px] w-[138px] flex-none flex-col items-start gap-[2px]">
                            <h3 className="h-[14px] w-full whitespace-nowrap font-jost text-[18px] font-black italic leading-[14px] text-white">
                                WINTER RUSH
                            </h3>
                            <p className="h-[14px] w-full whitespace-nowrap font-jost text-[12px] font-bold italic leading-[14px] text-white">
                                $2,000,000 IN PRIZES
                            </p>
                        </div>

                    </div>

                </div>
            </div>

            <div className="w-full bg-[#0C1F56] rounded-[16px] flex flex-col p-[16px]">
                <SidebarNav />
            </div>
        </aside>
    );
}

export function SidebarNav() {
    const [openDropdown, setOpenDropdown] = useState<string | null>('casino');
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

    const toggleDropdown = (name: string) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    return (
        <div className="flex flex-col gap-[16px] w-full h-full">
            <NavItem icon={<Gift size={20} />} label="Promotions" />
            <NavItem icon={<Crown size={20} />} label="VIP Program" />
            <NavItem icon={<Trophy size={20} />} label="Tournaments" />

            <div className={`flex flex-col rounded-[8px] overflow-hidden ${openDropdown === 'casino' ? 'bg-[#112F82]' : ''}`}>
                <div
                    onClick={() => toggleDropdown('casino')}
                    className={`flex items-center justify-between h-[44px] px-[10px] cursor-pointer text-white transition-colors bg-[#1463FF] ${openDropdown === 'casino' ? 'rounded-t-[8px]' : 'rounded-[8px]'}`}
                >
                    <div className="flex items-center gap-[8px]">
                        <Dices size={20} className="shrink-0" />
                        <span className="font-medium text-[15px]">Casino</span>
                    </div>
                    {openDropdown === 'casino' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {openDropdown === 'casino' && (
                    <div className="flex flex-col py-[8px]">
                        <SubNavItem icon={<LayoutGrid size={18} />} label="All Games" onClick={() => setIsSearchModalOpen(true)} />
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
                    className={`flex items-center justify-between h-[44px] px-[10px] cursor-pointer text-white transition-colors bg-[#1463FF] ${openDropdown === 'live-casino' ? 'rounded-t-[8px]' : 'rounded-[8px]'}`}
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

            <div className="mt-auto pt-4">
                <NavItem icon={<Headset size={20} />} label="Live Support" />
            </div>

            <SearchModal
                isOpen={isSearchModalOpen}
                onClose={() => setIsSearchModalOpen(false)}
            />
        </div>
    );
}

function NavItem({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="flex items-center gap-[8px] w-full h-[44px] px-[10px] cursor-pointer bg-[#112F82] rounded-[8px] transition-colors text-[#D2DCF7] hover:text-white">
            {icon}
            <span className="font-medium text-[15px]">{label}</span>
        </div>
    );
}

function SubNavItem({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
    return (
        <div
            onClick={onClick}
            className="flex items-center gap-[8px] w-full h-[40px] px-[10px] pl-[32px] cursor-pointer transition-colors text-[#D2DCF7] hover:text-white"
        >
            {icon}
            <span className="font-medium text-[15px]">{label}</span>
        </div>
    );
}
