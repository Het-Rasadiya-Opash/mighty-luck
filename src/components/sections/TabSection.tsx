"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const tabs = [
    { name: 'Lobby', icon: '/home.svg' },
    { name: 'Slots', icon: '/slots.svg' },
    { name: 'Originals', icon: '/orignals.svg' },
    { name: 'Crash Games', icon: '/crashgame.svg' },
    { name: 'Providers', icon: '/gameprovider.svg' },
    { name: 'Table Games', icon: '/tg.svg' },
    { name: 'Bonus Buys', icon: '/bb.svg' },
    { name: 'Collection', icon: '/collections.svg' },
];

export default function TabSection() {
    const [activeTab, setActiveTab] = useState('Lobby');

    return (
        <div className="w-full relative overflow-hidden">
            <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="flex flex-row items-center gap-[8px] w-max min-w-full">
                    {tabs.map((tab, index) => {
                        const isActive = activeTab === tab.name;
                        return (
                            <button
                                key={index}
                                onClick={() => {
                                    setActiveTab(tab.name);

                                    // Get all tab content sections
                                    const allSections = document.querySelectorAll('.tab-content');

                                    if (tab.name === 'Lobby') {
                                        // Reset order for all sections
                                        allSections.forEach((el) => {
                                            (el as HTMLElement).style.order = '0';
                                        });
                                    } else {
                                        // Reset order for all sections
                                        allSections.forEach((el) => {
                                            (el as HTMLElement).style.order = '0';
                                        });

                                        // Move the requested section to the top
                                        const id = tab.name.toLowerCase().replace(' ', '-');
                                        const targetEl = document.getElementById(id);
                                        if (targetEl) {
                                            targetEl.style.order = '-1';
                                        }
                                    }
                                }}
                                className={`flex flex-row justify-center items-center px-[16px] py-[10px] gap-[8px] w-[135px] h-[50px] rounded-[6px] shrink-0 transition-colors ${isActive
                                    ? 'bg-[#1463FF]'
                                    : 'bg-[#0C1F56] hover:bg-[#112F82]'
                                    }`}
                            >
                                <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0">
                                    <Image 
                                        src={tab.icon} 
                                        alt={tab.name} 
                                        width={20} 
                                        height={20} 
                                        className={`w-[20px] h-[20px] shrink-0 object-contain transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-100 group-hover:opacity-100'}`} 
                                        style={{ filter: isActive ? 'none' : 'brightness(0) saturate(100%) invert(86%) sepia(21%) saturate(301%) hue-rotate(188deg) brightness(105%) contrast(96%)' }}
                                    />
                                </div>
                                <span
                                    className={`font-['Manrope'] leading-[19px] tracking-[0.02em] whitespace-nowrap ${isActive
                                        ? 'font-bold text-[14px] text-white'
                                        : 'font-semibold text-[14px] text-[#D2DCF7]'
                                        }`}
                                >
                                    {tab.name}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
