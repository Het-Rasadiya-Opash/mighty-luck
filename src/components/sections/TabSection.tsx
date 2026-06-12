"use client";

import React, { useState } from 'react';
import { Home, Cherry, Zap, Rocket, Joystick, Dices, CircleDollarSign, LifeBuoy } from 'lucide-react';

const tabs = [
    { name: 'Lobby', icon: Home },

    { name: 'Slots', icon: Cherry },
    { name: 'Originals', icon: Zap },
    { name: 'Crash Games', icon: Rocket },
    { name: 'Providers', icon: Joystick },
    { name: 'Table Games', icon: Dices },
    { name: 'Bonus Buys', icon: CircleDollarSign }, { name: 'Collection', icon: LifeBuoy },
];

export default function TabSection() {
    const [activeTab, setActiveTab] = useState('Lobby');

    return (
        <div className="w-full relative overflow-hidden">
            <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="flex flex-row items-center gap-[8px] w-max min-w-full">
                    {tabs.map((tab, index) => {
                        const Icon = tab.icon;
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
                                    <Icon
                                        size={20}
                                        strokeWidth={2.5}
                                        className={isActive ? 'text-[#FFB800]' : 'text-[#D2DCF7]'}
                                        fill={tab.name === 'Lobby' ? 'currentColor' : 'none'}
                                    />
                                </div>
                                <span
                                    className={`font-manrope leading-[19px] tracking-[0.02em] whitespace-nowrap ${isActive
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
