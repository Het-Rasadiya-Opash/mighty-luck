"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  X, Search, Gamepad2, Clock, Heart, Sparkles, Zap, Cherry, 
  Dices, Rocket, Grid, MonitorPlay, Coins, Spade, Flame, LayoutGrid 
} from 'lucide-react';
import gamesData from '@/data/games.json';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [activeCategory, setActiveCategory] = useState('All Games');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const topCategories = [
    { name: 'All Games', icon: <Gamepad2 size={16} /> },
    { name: 'Recently Played', icon: <Clock size={16} /> },
    { name: 'Favorites', icon: <Heart size={16} /> },
    { name: 'New Releases', icon: <Sparkles size={16} /> },
  ];

  const bottomCategories = [
    { name: 'Original', icon: <Zap size={16} /> },
    { name: 'Slots', icon: <Cherry size={16} /> },
    { name: 'Roulette', icon: <Dices size={16} /> },
    { name: 'Crash Games', icon: <Rocket size={16} /> },
    { name: 'Table Games', icon: <Grid size={16} /> },
    { name: 'Live Casino', icon: <MonitorPlay size={16} /> },
    { name: 'Baccarat', icon: <Coins size={16} /> },
    { name: 'Blackjack', icon: <Spade size={16} /> },
  ];

  const searchResults = gamesData.filter(game => game.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const popularGames = gamesData.filter(game => game.isPopular);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto py-[16px] px-[12px]">
      <div
        className="fixed inset-0 bg-[#0C1733]/70 backdrop-blur-[8px]"
        onClick={onClose}
      />

      {/* Desktop Close Button */}
      <div className="relative w-full max-w-[1056px] my-auto pointer-events-none flex justify-center">
        <div 
          className="relative flex flex-row items-start p-[24px] gap-[20px] w-full max-w-[1056px] min-h-[636px] bg-[#091741] rounded-[20px] pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -right-[40px] top-0 z-10 text-white hover:opacity-70 transition-opacity hidden lg:block"
          >
            <X size={24} />
          </button>
          
          <button
            onClick={onClose}
            className="absolute right-[16px] top-[16px] z-10 text-white hover:opacity-70 transition-opacity lg:hidden bg-[#112F82] p-1 rounded-full"
          >
            <X size={16} />
          </button>

          {/* Left Sidebar */}
          <div className="hidden md:flex flex-col justify-center items-start gap-[12px] w-[180px] h-[588px] shrink-0">
            <div className="flex flex-row items-start p-[16px] gap-[10px] w-[180px] h-[200px] bg-[#0C1F56] rounded-[12px]">
              <div className="flex flex-col items-start gap-[8px] w-[148px] h-[168px]">
                {topCategories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`flex flex-row items-center p-[10px] gap-[8px] w-[148px] h-[36px] bg-[#112F82] rounded-[8px] transition-colors ${activeCategory === cat.name ? 'opacity-100 border border-[#1463FF]' : 'hover:opacity-80'}`}
                  >
                    <div className="flex flex-row justify-center items-center p-0 w-[16px] h-[16px]">
                      <span className="flex justify-center items-center w-full h-full text-[#A5B8EF]">
                        {cat.icon}
                      </span>
                    </div>
                    <span className="font-[family-name:var(--font-manrope)] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#A5B8EF]">
                      {cat.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-row items-start p-[16px] gap-[10px] w-[180px] h-[376px] bg-[#0C1F56] rounded-[12px]">
              <div className="flex flex-col items-start gap-[8px] w-[148px] h-[344px]">
                {bottomCategories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`flex flex-row items-center p-[10px] gap-[8px] w-[148px] h-[36px] bg-[#112F82] rounded-[8px] transition-colors ${activeCategory === cat.name ? 'opacity-100 border border-[#1463FF]' : 'hover:opacity-80'}`}
                  >
                    <div className="flex flex-row justify-center items-center p-0 w-[16px] h-[16px]">
                      <span className="flex justify-center items-center w-full h-full text-[#A5B8EF]">
                        {cat.icon}
                      </span>
                    </div>
                    <span className="font-[family-name:var(--font-manrope)] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#A5B8EF]">
                      {cat.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex flex-col gap-[40px] w-full lg:w-[808px] overflow-hidden">
            {/* Search Bar */}
            <div className="flex flex-row items-center px-[20px] py-[10px] gap-[10px] w-full h-[40px] bg-[#112F82] rounded-[8px] relative">
              <Search size={16} className="text-white shrink-0" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Start typing a game name"
                className="bg-transparent border-none outline-none font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] text-[#BBCAF3] placeholder:text-[#BBCAF3] w-full pr-[80px]"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-[6px] top-[6px] flex flex-row justify-center items-center px-[16px] py-[6px] bg-[#1463FF] rounded-[6px] hover:opacity-80 transition-opacity"
                >
                  <span className="font-[family-name:var(--font-manrope)] font-semibold text-[12px] leading-[16px] text-white">
                    Clear
                  </span>
                </button>
              )}
            </div>

            {searchQuery === '' ? (
              <div className="flex flex-col gap-[32px] w-full">
                {/* Popular Games */}
                <div className="flex flex-col gap-[20px] w-full">
                  <div className="flex flex-row items-center gap-[8px]">
                    <div className="flex items-center justify-center w-[20px] h-[20px] text-[#FFBF1F]">
                      <Flame size={16} fill="currentColor" />
                    </div>
                    <h3 className="font-[family-name:var(--font-jost)] font-extrabold text-[20px] leading-[29px] tracking-[0.01em] uppercase text-white">
                      Popular Games
                    </h3>
                  </div>

                  <div className="flex flex-row gap-[12px] overflow-x-auto w-full [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
                    {popularGames.map((game) => (
                      <div key={game.id} className="w-[152px] h-[200px] shrink-0 rounded-[12px] overflow-hidden relative bg-[#0C1F56] snap-start group cursor-pointer">
                        <Image unoptimized src={game.image} alt={game.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Game Providers */}
                <div className="flex flex-col gap-[20px] w-full">
                  <div className="flex flex-row items-center gap-[8px]">
                    <div className="flex items-center justify-center w-[20px] h-[20px] text-[#FFC83D]">
                      <LayoutGrid size={16} fill="currentColor" />
                    </div>
                    <h3 className="font-[family-name:var(--font-jost)] font-extrabold text-[20px] leading-[29px] tracking-[0.01em] uppercase text-white">
                      Game Providers
                    </h3>
                  </div>

                  <div className="flex flex-col gap-[16px] w-full relative">
                    <div className="flex flex-row gap-[12px] overflow-x-auto w-full [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
                      {['BELATRA', 'B GAMING', 'TADA GAMING', 'ENDORPHINA', 'NOLIMIT CITY'].map((provider, index) => (
                        <div key={index} className="flex flex-col justify-center items-center p-[12px_24px] gap-[8px] w-[152px] h-[100px] bg-[#0C1F56] rounded-[12px] shrink-0 snap-start">
                          <span className="font-[family-name:var(--font-jost)] font-bold text-[16px] text-white uppercase text-center w-full truncate">
                            {provider}
                          </span>
                          <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] text-[#FFC83D]">
                            226 Games
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex flex-row justify-center items-center gap-[4px] w-full mt-[4px]">
                      <div className="w-[12px] h-[6px] bg-[#BBCAF3] rounded-[150px]" />
                      <div className="w-[6px] h-[6px] bg-[#BBCAF3]/50 rounded-[150px]" />
                      <div className="w-[6px] h-[6px] bg-[#BBCAF3]/50 rounded-[150px]" />
                    </div>
                  </div>
                </div>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="flex flex-row flex-wrap gap-[12px] w-full content-start overflow-y-auto max-h-[500px] pb-4 [&::-webkit-scrollbar]:hidden">
                {searchResults.map((game) => (
                  <div key={game.id} className="w-[152px] h-[200px] shrink-0 rounded-[12px] overflow-hidden relative bg-[#0C1F56] group cursor-pointer">
                    <Image unoptimized src={game.image} alt={game.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center py-[60px] gap-[16px] w-full mt-[40px]">
                <h3 className="font-[family-name:var(--font-jost)] font-bold text-[20px] leading-[29px] text-white">
                  No Results for your Search
                </h3>
                <p className="font-[family-name:var(--font-manrope)] font-medium text-[14px] leading-[19px] text-center text-[#A5B8EF] max-w-[480px]">
                  There are no results in this category for your search term, please select a different category or try searching for something else
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
