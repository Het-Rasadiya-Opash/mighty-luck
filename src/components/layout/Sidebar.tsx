"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { SearchModal } from '@/components/modals/SearchModal';

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        const handleToggle = () => setIsCollapsed(prev => !prev);
        window.addEventListener('toggleDesktopSidebar', handleToggle as EventListener);
        return () => window.removeEventListener('toggleDesktopSidebar', handleToggle as EventListener);
    }, []);

    return (
        <aside className={`hidden lg:flex flex-col gap-[10px] shrink-0 transition-[width] duration-300 ${isCollapsed ? 'w-[72px]' : 'w-[232px]'}`}>
            <div className={`flex flex-none flex-col items-start gap-[10px] rounded-[16px] bg-[#0C1F56] overflow-hidden transition-all duration-300 ${isCollapsed ? 'h-[72px] justify-center items-center p-0' : 'h-[134px] w-[232px] p-[16px]'}`}>
                {isCollapsed ? (
                    <div className="w-[40px] h-[40px] flex items-center justify-center bg-[#112F82] rounded-[8px]">
                        <Image src="/image 19 (Traced).svg" alt="Gift" width={20} height={20} className="shrink-0" />
                    </div>
                ) : (
                    <div className="flex w-[200px] flex-none flex-col items-start gap-[8px]">
                        {/* Top Two Cards Row */}
                        <div className="flex h-[44px] w-[200px] flex-none flex-row items-center gap-[4px]">
                            {/* Refer Friend */}
                            <div className="relative isolate overflow-hidden flex h-[44px] w-[98px] flex-none items-center gap-[2px] rounded-[8px] bg-[#3B005F] px-[8px] py-[6px]">
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
                                        REFER<br/>A FRIEND
                                    </p>
                                </div>
                            </div>

                            {/* VIP Transfer */}
                            <div className="relative isolate overflow-hidden flex h-[44px] w-[98px] flex-none items-center gap-[2px] rounded-[8px] bg-[#500039] px-[8px] py-[6px]">
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
                                        VIP<br/>TRANSFER
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Winter Rush */}
                        <div className="relative isolate overflow-hidden flex h-[50px] w-[200px] flex-none items-center gap-[10px] rounded-[8px] bg-[#091741] px-[10px] py-[6px]">
                            <div className="absolute inset-0 z-[-1] overflow-hidden rounded-[8px]">
                                <div className="absolute -left-[53px] -top-[22px] h-[110px] w-[110px] rounded-full bg-[#1463FF] blur-[25px]" />
                            </div>
                            <div className="relative z-[1] w-[24px] h-[24px] shrink-0 flex items-center justify-center">
                                <div
                                    className="absolute -left-[50px] -top-[40px] h-[68px] w-[102px] bg-contain bg-center bg-no-repeat pointer-events-none mix-blend-screen"
                                    style={{ transform: "scaleX(-1) rotate(-110deg)", backgroundImage: "url('/s-3.png')" }}
                                />
                            </div>
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
                )}
            </div>

            <div className={`w-full bg-[#0C1F56] rounded-[16px] flex flex-col p-[16px] ${isCollapsed ? 'items-center' : ''}`}>
                <SidebarNav isCollapsed={isCollapsed} />
            </div>
        </aside>
    );
}

export function SidebarNav({ isCollapsed = false }: { isCollapsed?: boolean }) {
    const [openDropdown, setOpenDropdown] = useState<string | null>('casino');
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

    const toggleDropdown = (name: string) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    return (
        <div className={`flex flex-col gap-[16px] h-full ${isCollapsed ? 'w-[40px]' : 'w-full'}`}>
            <NavItem icon={<Image src="/image 19 (Traced).svg" alt="Promotions" width={20} height={20} className="shrink-0" />} label="Promotions" isCollapsed={isCollapsed} />
            <NavItem icon={<Image src="/image 20 (Traced).svg" alt="VIP Program" width={20} height={20} className="shrink-0" />} label="VIP Program" isCollapsed={isCollapsed} />
            <NavItem icon={<Image src="/image 21 (Traced).svg" alt="Tournaments" width={20} height={20} className="shrink-0" />} label="Tournaments" isCollapsed={isCollapsed} />

            <div className={`flex flex-col rounded-[8px] overflow-hidden ${openDropdown === 'casino' ? 'bg-[#112F82]' : ''}`}>
                <div
                    onClick={() => toggleDropdown('casino')}
                    className={`flex items-center ${isCollapsed ? 'justify-center w-[40px] px-0' : 'justify-between px-[10px] w-full'} h-[44px] cursor-pointer text-white transition-colors bg-[#1463FF] ${(!isCollapsed && openDropdown === 'casino') ? 'rounded-t-[8px]' : 'rounded-[8px]'}`}
                >
                    <div className={`flex items-center gap-[8px] ${isCollapsed ? 'justify-center' : ''}`}>
                        <Image src="/Frame.svg" alt="Casino" width={20} height={20} className="shrink-0" />
                        {!isCollapsed && <span className="font-['Manrope'] font-bold text-[14px] leading-[19px] tracking-[0.02em]">Casino</span>}
                    </div>
                    {(!isCollapsed) && (openDropdown === 'casino' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                </div>
                {!isCollapsed && openDropdown === 'casino' && (
                    <div className="flex flex-col py-[8px]">
                        <SubNavItem icon={<Image src="/all.svg" alt="All Games" width={18} height={18} className="shrink-0" />} label="All Games" onClick={() => setIsSearchModalOpen(true)} isCollapsed={isCollapsed} />
                        <SubNavItem icon={<Image src="/Frame1.svg" alt="New Games" width={18} height={18} className="shrink-0" />} label="New Games" isCollapsed={isCollapsed} />
                        <SubNavItem icon={<Image src="/Frame2.svg" alt="Popular Games" width={18} height={18} className="shrink-0" />} label="Popular Games" isCollapsed={isCollapsed} />
                        <SubNavItem icon={<Image src="/Frame3.svg" alt="Original Games" width={18} height={18} className="shrink-0" />} label="Original Games" isCollapsed={isCollapsed} />
                        <SubNavItem icon={<Image src="/Vector1.svg" alt="Crash Games" width={18} height={18} className="shrink-0" />} label="Crash Games" isCollapsed={isCollapsed} />
                    </div>
                )}
            </div>

            <div className={`flex flex-col rounded-[8px] overflow-hidden ${openDropdown === 'live-casino' ? 'bg-[#112F82]' : ''}`}>
                <div
                    onClick={() => toggleDropdown('live-casino')}
                    className={`flex items-center ${isCollapsed ? 'justify-center w-[40px] px-0' : 'justify-between px-[10px] w-full'} h-[44px] cursor-pointer text-white transition-colors bg-[#1463FF] ${(!isCollapsed && openDropdown === 'live-casino') ? 'rounded-t-[8px]' : 'rounded-[8px]'}`}
                >
                    <div className={`flex items-center gap-[8px] ${isCollapsed ? 'justify-center' : ''}`}>
                        <Image src="/Frame4.svg" alt="Live Casino" width={20} height={20} className="shrink-0" />
                        {!isCollapsed && <span className="font-['Manrope'] font-bold text-[14px] leading-[19px] tracking-[0.02em]">Live Casino</span>}
                    </div>
                    {(!isCollapsed) && (openDropdown === 'live-casino' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                </div>
                {!isCollapsed && openDropdown === 'live-casino' && (
                    <div className="flex flex-col py-[8px]">
                        <SubNavItem icon={<Image src="/Frame1.svg" alt="All Live Games" width={18} height={18} className="shrink-0" />} label="All Live Games" isCollapsed={isCollapsed} />
                    </div>
                )}
            </div>

            <div className={`mt-auto pt-4 ${isCollapsed ? 'flex justify-center' : ''}`}>
                <NavItem icon={<Image src="/Vector3.svg" alt="Live Support" width={20} height={20} className="shrink-0" />} label="Live Support" isCollapsed={isCollapsed} />
            </div>

            <SearchModal
                isOpen={isSearchModalOpen}
                onClose={() => setIsSearchModalOpen(false)}
            />
        </div>
    );
}

function NavItem({ icon, label, isCollapsed }: { icon: React.ReactNode; label: string; isCollapsed?: boolean }) {
    return (
        <div className={`flex items-center h-[44px] cursor-pointer bg-[#112F82] rounded-[8px] transition-colors text-[#D2DCF7] hover:text-white ${isCollapsed ? 'justify-center w-[40px] px-0' : 'gap-[8px] w-full px-[10px]'}`}>
            {icon}
            {!isCollapsed && <span className="font-medium text-[15px]">{label}</span>}
        </div>
    );
}

function SubNavItem({ icon, label, onClick, isCollapsed }: { icon: React.ReactNode; label: string; onClick?: () => void; isCollapsed?: boolean }) {
    return (
        <div
            onClick={onClick}
            className={`flex items-center cursor-pointer transition-colors text-[#D2DCF7] hover:text-white ${isCollapsed ? 'justify-center w-[40px] h-[40px] px-0' : 'gap-[8px] w-full h-[40px] px-[10px] pl-[32px]'}`}
        >
            {icon}
            {!isCollapsed && <span className="font-medium text-[15px]">{label}</span>}
        </div>
    );
}
