"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronUp, ChevronDown, X } from 'lucide-react';
import { SearchModal } from '@/components/modals/SearchModal';

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleToggle = () => setIsCollapsed(prev => !prev);
        window.addEventListener('toggleDesktopSidebar', handleToggle as EventListener);
        return () => window.removeEventListener('toggleDesktopSidebar', handleToggle as EventListener);
    }, []);

    return (
        <>
            <aside className={`hidden lg:flex flex-col gap-[10px] shrink-0 transition-[width] duration-300 ${isCollapsed ? 'w-[72px]' : 'w-[232px]'}`}>
                <div className={`flex flex-none flex-col items-start rounded-[16px] bg-[#0C1F56] overflow-hidden transition-all duration-300 ${isCollapsed ? 'h-0 p-0 opacity-0 m-0 gap-0 border-0' : 'gap-[10px] h-[134px] w-[232px] p-[16px] mb-[10px]'}`}>
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
                                        className="absolute -left-[17px] -top-[4px] h-[39.33px] w-[59px] bg-contain bg-center bg-no-repeat pointer-events-none mix-blend-screen"
                                        style={{ backgroundImage: "url('/sp-1.svg')" }}
                                    />
                                </div>
                                <div className="relative z-[2] flex h-[22px] w-[52px] flex-none flex-col justify-center">
                                    <p
                                        className="text-white"
                                        style={{
                                            width: '52px',
                                            height: '22px',
                                            fontFamily: 'var(--font-jost), Jost, sans-serif',
                                            fontStyle: 'normal',
                                            fontWeight: 700,
                                            fontSize: '11px',
                                            lineHeight: '100%',
                                            flex: 'none',
                                            order: 2,
                                            flexGrow: 0,
                                            zIndex: 2
                                        }}
                                    >
                                        REFER<br />A FRIEND
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
                                        className="absolute -left-[23px] -top-[4px] h-[33.01px] w-[64px] bg-contain bg-center bg-no-repeat pointer-events-none mix-blend-screen"
                                        style={{ transform: "rotate(11.84deg)", backgroundImage: "url('/sp-2.svg')" }}
                                    />
                                </div>
                                <div className="relative z-[2] flex h-[22px] w-[57px] flex-none flex-col justify-center">
                                    <p
                                        className="text-white"
                                        style={{
                                            width: '57px',
                                            height: '22px',
                                            fontFamily: 'var(--font-jost), Jost, sans-serif',
                                            fontStyle: 'normal',
                                            fontWeight: 700,
                                            fontSize: '11px',
                                            lineHeight: '100%',
                                            flex: 'none',
                                            order: 2,
                                            flexGrow: 0,
                                            zIndex: 2
                                        }}
                                    >
                                        VIP<br />TRANSFER
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
                                    className="absolute h-[50px] w-[80px] -left-[20px] -top-[12px] bg-contain bg-center bg-no-repeat pointer-events-none"
                                    style={{ backgroundImage: "url('/sp-3.svg')" }}
                                />
                            </div>
                            <div className="relative z-[3] flex h-[30px] w-[138px] flex-none flex-col items-start gap-[2px]">
                                <h3
                                    className="whitespace-nowrap text-white"
                                    style={{
                                        width: '138px',
                                        height: '14px',
                                        fontFamily: 'var(--font-jost), Jost, sans-serif',
                                        fontStyle: 'italic',
                                        fontWeight: 900,
                                        fontSize: '18px',
                                        lineHeight: '13.9px',
                                        flex: 'none',
                                        order: 0,
                                        alignSelf: 'stretch',
                                        flexGrow: 0
                                    }}
                                >
                                    WINTER RUSH
                                </h3>
                                <p
                                    className="whitespace-nowrap text-white"
                                    style={{
                                        width: '124px',
                                        height: '14px',
                                        fontFamily: 'var(--font-jost), Jost, sans-serif',
                                        fontStyle: 'italic',
                                        fontWeight: 700,
                                        fontSize: '12px',
                                        lineHeight: '13.9px',
                                        flex: 'none',
                                        order: 1,
                                        flexGrow: 0
                                    }}
                                >
                                    $2,000,000<span style={{ fontSize: '16.22px', fontWeight: 600 }}> </span><span style={{ fontSize: '11px', fontWeight: 600 }}>IN PRIZES</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`w-full bg-[#0C1F56] rounded-[16px] flex flex-col p-[16px] transition-all duration-300 ${isCollapsed ? 'items-center' : ''}`}>
                    <SidebarNav isCollapsed={isCollapsed} />
                </div>
            </aside>

            {/* Mobile Bottom Navigation */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] flex flex-row items-center justify-between w-full h-[75px] bg-[#0C1F56] pt-[12px] pr-[20px] pb-[12px] pl-[20px] rounded-t-[16px] border-b border-transparent shadow-[0_-4px_10px_rgba(0,0,0,0.2)] gap-[2px]">
                <div 
                    className={`flex flex-col items-center justify-center gap-[2px] w-[39px] h-[51px] cursor-pointer transition-colors group mx-auto ${isMobileMenuOpen ? 'text-[#FFBF1F]' : 'text-[#D2DCF7] hover:text-white'}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <div className="flex items-center justify-center w-[30px] h-[30px] shrink-0">
                        <svg width="22" height="15" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-[22px] h-[14.67px] transition-opacity ${isMobileMenuOpen ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>
                            <path d="M4 7.66669H21.1111M4 15H16.2222M4 22.3334H21.1111M26 10.1111L24.5896 11.183C22.2722 12.9442 21.1111 13.8255 21.1111 15C21.1111 16.1746 22.271 17.0558 24.5896 18.8182L26 19.8889" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <span className="font-['Manrope'] font-bold text-[14px] leading-[19px] tracking-[0.02em]">Menu</span>
                </div>
                <div 
                    className="flex flex-col items-center justify-center gap-[2px] w-[50px] h-[51px] cursor-pointer text-[#D2DCF7] hover:text-white transition-colors group mx-auto"
                    onClick={() => setIsMobileSearchOpen(true)}
                >
                    <div className="flex items-center justify-center w-[30px] h-[30px] shrink-0">
                        <Image src="/search.svg" alt="Search" width={20} height={20} className="w-[20px] h-[19.99px] opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="font-['Manrope'] font-bold text-[14px] leading-[19px] tracking-[0.02em]">Search</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-[2px] w-[43px] h-[51px] cursor-pointer text-[#D2DCF7] hover:text-white transition-colors group mx-auto">
                    <div className="flex items-center justify-center w-[30px] h-[30px] shrink-0">
                        <Image src="/image 19 (Traced).svg" alt="Offers" width={22} height={22} className="w-[22px] h-[22px] opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="font-['Manrope'] font-bold text-[14px] leading-[19px] tracking-[0.02em]">Offers</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-[2px] w-[30px] h-[51px] cursor-pointer text-[#D2DCF7] hover:text-white transition-colors group mx-auto">
                    <div className="flex items-center justify-center w-[30px] h-[30px] shrink-0">
                        <Image src="/image 20 (Traced).svg" alt="VIP" width={24} height={23} className="w-[24px] h-[23px] opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="font-['Manrope'] font-bold text-[14px] leading-[19px] tracking-[0.02em]">VIP</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-[2px] w-[65px] h-[51px] cursor-pointer text-[#D2DCF7] hover:text-white transition-colors group mx-auto">
                    <div className="flex items-center justify-center w-[30px] h-[30px] shrink-0">
                        <Image src="/image 21 (Traced).svg" alt="Tourneys" width={22} height={22} className="w-[22px] h-[22px] opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="font-['Manrope'] font-bold text-[14px] leading-[19px] tracking-[0.02em]">Tourneys</span>
                </div>
            </nav>

            {/* Mobile Menu Drawer */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed top-0 left-0 right-0 bottom-[75px] z-[90] bg-[#091741] flex flex-col w-full overflow-y-auto animate-in slide-in-from-left duration-300">
                    <div className="flex flex-row items-center justify-between p-[20px] w-full shrink-0">
                        <Link href="/" className="flex items-center shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
                            <Image src="/king.svg" alt="Mighty Luck" width={32} height={32} className="w-[32px] h-[32px]" />
                        </Link>
                        <div className="flex flex-row items-center gap-[8px] shrink-0">
                            <Link href="?auth=login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center w-[74px] h-[30px] bg-[#1463FF] rounded-[6px] text-white font-['Manrope'] font-bold text-[10.5px]">Login</Link>
                            <Link href="?auth=register" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center w-[67px] h-[30px] bg-[#FFC83D] rounded-[6px] text-[#1A1404] font-['Manrope'] font-bold text-[10.5px]">Join</Link>
                        </div>
                    </div>
                    
                    <div className="px-[20px] pb-[20px] flex flex-col w-full flex-1">
                        <SidebarNav isCollapsed={false} />
                    </div>
                </div>
            )}

            <SearchModal
                isOpen={isMobileSearchOpen}
                onClose={() => setIsMobileSearchOpen(false)}
            />
        </>
    );
}

export function SidebarNav({ isCollapsed = false }: { isCollapsed?: boolean }) {
    const [openDropdown, setOpenDropdown] = useState<string | null>('casino');
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

    const toggleDropdown = (name: string) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    return (
        <div className={`flex flex-col gap-[16px] ${isCollapsed ? 'w-[40px]' : 'w-full'}`}>
            <NavItem icon={<Image src="/image 19 (Traced).svg" alt="Promotions" width={20} height={20} className="shrink-0" />} label="Promotions" isCollapsed={isCollapsed} />
            <NavItem icon={<Image src="/image 20 (Traced).svg" alt="VIP Program" width={20} height={20} className="shrink-0" />} label="VIP Program" isCollapsed={isCollapsed} />
            <NavItem icon={<Image src="/image 21 (Traced).svg" alt="Tournaments" width={20} height={20} className="shrink-0" />} label="Tournaments" isCollapsed={isCollapsed} />

            <div className={`flex flex-col rounded-[8px] transition-colors ${openDropdown === 'casino' ? 'bg-[#112F82]' : ''}`}>
                <div
                    onClick={() => toggleDropdown('casino')}
                    className={`group relative flex items-center ${isCollapsed ? 'justify-center w-[40px] px-0' : 'justify-between px-[10px] w-full'} h-[50px] cursor-pointer text-white transition-colors bg-[#1463FF] rounded-[8px]`}
                >
                    <div className={`flex items-center gap-[12px] ${isCollapsed ? 'justify-center' : ''}`}>
                        <div className="flex items-center justify-center w-[20px] h-[20px] shrink-0">
                            <Image src="/Frame.svg" alt="Casino" width={20} height={20} className="shrink-0" />
                        </div>
                        {!isCollapsed && <span className="font-['Manrope'] font-bold text-[16px] leading-[22px] tracking-[0.02em]">Casino</span>}
                    </div>
                    {(!isCollapsed) && (openDropdown === 'casino' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}

                    {isCollapsed && (
                        <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#1463FF] text-white text-[13px] font-bold rounded-[6px] opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-[100] shadow-xl">
                            Casino
                            <div className="absolute top-1/2 -translate-y-1/2 -left-[8px] border-[4px] border-transparent border-r-[#1463FF]" />
                        </div>
                    )}
                </div>
                {openDropdown === 'casino' && (
                    <div className="flex flex-col px-[16px] py-[20px] gap-[20px] rounded-b-[8px]">
                        <SubNavItem icon={<Image src="/all.svg" alt="All Games" width={19} height={14} className="w-[19.25px] h-[14.14px] shrink-0" />} label="All Games" onClick={() => setIsSearchModalOpen(true)} isCollapsed={isCollapsed} />
                        <SubNavItem icon={<Image src="/Frame1.svg" alt="New Games" width={19} height={17} className="w-[19.21px] h-[17.3px] shrink-0" />} label="New Games" isCollapsed={isCollapsed} />
                        <SubNavItem icon={<Image src="/Frame2.svg" alt="Popular Games" width={16} height={20} className="w-[15.86px] h-[20px] shrink-0" />} label="Popular Games" onClick={() => setIsSearchModalOpen(true)} isCollapsed={isCollapsed} />
                        <SubNavItem icon={<Image src="/Frame3.svg" alt="Original Games" width={14} height={20} className="w-[13.92px] h-[20px] shrink-0" />} label="Original Games" isCollapsed={isCollapsed} />
                        <SubNavItem icon={<Image src="/Vector1.svg" alt="Crash Games" width={20} height={20} className="w-[20px] h-[20.01px] shrink-0" />} label="Crash Games" isCollapsed={isCollapsed} />
                    </div>
                )}
            </div>

            <div className={`flex flex-col rounded-[8px] transition-colors ${openDropdown === 'live-casino' ? 'bg-[#112F82]' : ''}`}>
                <div
                    onClick={() => toggleDropdown('live-casino')}
                    className={`group relative flex items-center ${isCollapsed ? 'justify-center w-[40px] px-0' : 'justify-between px-[10px] w-full'} h-[50px] cursor-pointer text-white transition-colors bg-[#1463FF] rounded-[8px]`}
                >
                    <div className={`flex items-center gap-[12px] ${isCollapsed ? 'justify-center' : ''}`}>
                        <div className="flex items-center justify-center w-[20px] h-[20px] shrink-0">
                            <Image src="/Frame4.svg" alt="Live Casino" width={20} height={20} className="w-[20px] h-[17.62px] shrink-0" />
                        </div>
                        {!isCollapsed && <span className="font-['Manrope'] font-bold text-[16px] leading-[22px] tracking-[0.02em]">Live Casino</span>}
                    </div>
                    {(!isCollapsed) && (openDropdown === 'live-casino' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}

                    {isCollapsed && (
                        <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#1463FF] text-white text-[13px] font-bold rounded-[6px] opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-[100] shadow-xl">
                            Live Casino
                            <div className="absolute top-1/2 -translate-y-1/2 -left-[8px] border-[4px] border-transparent border-r-[#1463FF]" />
                        </div>
                    )}
                </div>
                {openDropdown === 'live-casino' && (
                    <div className="flex flex-col px-[16px] py-[20px] gap-[20px] rounded-b-[8px]">
                        <SubNavItem icon={<Image src="/Frame1.svg" alt="All Live Games" width={19} height={17} className="w-[19.21px] h-[17.3px] shrink-0" />} label="All Live Games" isCollapsed={isCollapsed} />
                    </div>
                )}
            </div>

            <div className={`mt-2 ${isCollapsed ? 'flex justify-center' : ''}`}>
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
        <div className={`group relative flex items-center h-[50px] cursor-pointer bg-[#112F82] rounded-[8px] transition-colors text-[#D2DCF7] hover:text-white ${isCollapsed ? 'justify-center w-[40px] px-0' : 'gap-[12px] w-full px-[10px]'}`}>
            <div className="flex items-center justify-center w-[20px] h-[20px] shrink-0">
                {icon}
            </div>
            {!isCollapsed && <span className="font-['Manrope'] font-semibold text-[16px] leading-[22px] tracking-[0.02em]">{label}</span>}
            {isCollapsed && (
                <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#1463FF] text-white text-[13px] font-bold rounded-[6px] opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-[100] shadow-xl">
                    {label}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-[8px] border-[4px] border-transparent border-r-[#1463FF]" />
                </div>
            )}
        </div>
    );
}

function SubNavItem({ icon, label, onClick, isCollapsed }: { icon: React.ReactNode; label: string; onClick?: () => void; isCollapsed?: boolean }) {
    return (
        <div
            onClick={onClick}
            className={`group relative flex items-center cursor-pointer transition-colors text-[#D2DCF7] hover:text-white ${isCollapsed ? 'justify-center w-[40px] h-[40px] px-0' : 'gap-[12px] w-full h-[22px]'}`}
        >
            <div className="flex items-center justify-center w-[20px] h-[20px] shrink-0">
                {icon}
            </div>
            {!isCollapsed && <span className="font-['Manrope'] font-semibold text-[16px] leading-[22px] tracking-[0.02em]">{label}</span>}
            {isCollapsed && (
                <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#1463FF] text-white text-[13px] font-bold rounded-[6px] opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-[100] shadow-xl">
                    {label}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-[8px] border-[4px] border-transparent border-r-[#1463FF]" />
                </div>
            )}
        </div>
    );
}
