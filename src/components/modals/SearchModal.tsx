"use client";

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import {
  X, Search, Gamepad2, Clock, Heart, Sparkles, Zap, Cherry,
  Dices, Rocket, Grid, MonitorPlay, Coins, Spade, Flame, LayoutGrid
} from 'lucide-react';
import gamesData from '@/data/games.json';
import providerData from '@/data/providerData.json';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [activeCategory, setActiveCategory] = useState('All Games');
  const [searchQuery, setSearchQuery] = useState('');
  const providersScrollRef = useRef<HTMLDivElement>(null);
  const [activeProviderPage, setActiveProviderPage] = useState(0);

  const handleProviderScroll = () => {
    if (providersScrollRef.current) {
      const scrollLeft = providersScrollRef.current.scrollLeft;
      const scrollWidth = providersScrollRef.current.scrollWidth;
      const clientWidth = providersScrollRef.current.clientWidth;
      const maxScrollLeft = scrollWidth - clientWidth;

      if (maxScrollLeft <= 0) {
        setActiveProviderPage(0);
        return;
      }

      const page = Math.round((scrollLeft / maxScrollLeft) * 2); // 3 dots = indices 0, 1, 2
      setActiveProviderPage(page);
    }
  };

  const scrollToProviderPage = (pageIndex: number) => {
    if (providersScrollRef.current) {
      const scrollWidth = providersScrollRef.current.scrollWidth;
      const clientWidth = providersScrollRef.current.clientWidth;
      const maxScrollLeft = scrollWidth - clientWidth;

      const targetScrollLeft = (pageIndex / 2) * maxScrollLeft;

      providersScrollRef.current.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
      setActiveProviderPage(pageIndex);
    }
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

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

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto py-[16px] px-[12px]">
      <div
        className="fixed inset-0 bg-[#0C1733]/70 backdrop-blur-[8px]"
        onClick={onClose}
      />

    {/* Desktop Close Button */}
      <div className="relative w-full max-w-[1056px] my-auto pointer-events-none flex justify-center px-[16px] xl:px-0">
        <div className="relative pointer-events-auto w-full">
          {/* Close Button - Responsive */}
          <button
            onClick={onClose}
            className="absolute right-0 -top-[32px] md:-top-[40px] md:right-0 xl:-right-[44px] xl:top-0 z-10 text-white hover:opacity-70 transition-opacity"
          >
            <X size={20} className="md:w-[24px] md:h-[24px]" />
          </button>

          <div
            className="relative flex flex-col md:flex-row items-start p-[16px] md:p-[24px] gap-[20px] w-full max-w-[1056px] min-h-[400px] md:min-h-[636px] max-h-[calc(100vh-80px)] bg-[#091741] rounded-[16px] md:rounded-[20px] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >

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
          <div className="flex flex-col gap-[24px] md:gap-[32px] w-full lg:w-[808px] overflow-y-auto overflow-x-hidden md:overflow-hidden pb-[16px] md:pb-0 [&::-webkit-scrollbar]:hidden">
            {/* Mobile Categories Scroll */}
            <div className="flex md:hidden flex-row gap-[8px] overflow-x-auto w-full [&::-webkit-scrollbar]:hidden snap-x shrink-0">
              {topCategories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex flex-row items-center gap-[6px] px-[12px] h-[32px] rounded-[6px] shrink-0 snap-start transition-colors ${
                    activeCategory === cat.name ? 'bg-[#1463FF]' : 'bg-[#112F82]'
                  }`}
                >
                  <span className="flex items-center text-[#FFFFFF] [&>svg]:w-[14px] [&>svg]:h-[14px]">
                    {cat.icon}
                  </span>
                  <span className="font-[family-name:var(--font-manrope)] font-semibold text-[11px] leading-[15px] text-[#FFFFFF] whitespace-nowrap">
                    {cat.name}
                  </span>
                </button>
              ))}
              <button
                className={`flex flex-row items-center gap-[6px] px-[12px] h-[32px] rounded-[6px] shrink-0 snap-start transition-colors bg-[#112F82]`}
              >
                <span className="font-[family-name:var(--font-manrope)] font-semibold text-[11px] leading-[15px] text-[#FFFFFF] whitespace-nowrap">
                  Categories ▼
                </span>
              </button>
            </div>
            {/* Search Bar */}
            <div className={`flex flex-row items-center ${searchQuery ? 'justify-between py-[10px] pl-[20px] pr-[10px] h-[50px] border border-[#1463FF] rounded-[12px]' : 'p-[10px_20px] h-[40px] rounded-[8px]'
              } gap-[10px] w-full bg-[#112F82] shrink-0 box-border transition-all duration-200`}>
              <div className="flex flex-row items-center gap-[10px] w-full">
                <div className="flex flex-col items-center justify-center w-[16px] h-[16px]">
                  <Search size={16} className="text-white" strokeWidth={2.5} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Start typing a game name"
                  className={`bg-transparent border-none outline-none font-[family-name:var(--font-manrope)] text-[14px] leading-[19px] w-full transition-colors ${searchQuery ? 'font-bold text-[#FFFFFF] placeholder:text-[#FFFFFF]' : 'font-semibold text-[#BBCAF3] placeholder:text-[#BBCAF3]'
                    }`}
                />
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="flex flex-row justify-center items-center px-[16px] gap-[8px] w-[64px] h-[30px] bg-[#1463FF] rounded-[6px] hover:opacity-80 transition-opacity shrink-0 box-border"
                >
                  <span className="font-[family-name:var(--font-manrope)] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#FFFFFF]">
                    Clear
                  </span>
                </button>
              )}
            </div>

            {searchQuery === '' ? (
              <div className="flex flex-col gap-[24px] md:gap-[32px] w-full">
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

                  <div className="flex flex-row gap-[12px] overflow-x-auto w-full [&::-webkit-scrollbar]:hidden snap-x snap-mandatory pr-[16px] md:pr-0">
                    {popularGames.map((game) => (
                      <div key={game.id} className="w-[140px] md:w-[152px] h-[184px] md:h-[200px] shrink-0 rounded-[12px] overflow-hidden relative bg-[#0C1F56] snap-start group cursor-pointer">
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
                    <div 
                      ref={providersScrollRef}
                      onScroll={handleProviderScroll}
                      className="flex flex-row gap-[12px] overflow-x-auto w-full [&::-webkit-scrollbar]:hidden snap-x snap-mandatory scroll-smooth pr-[16px] md:pr-0"
                    >
                      {providerData.map((provider) => (
                        <div key={provider.id} className="flex flex-col justify-center items-center p-[12px_16px] md:p-[12px_24px] gap-[8px] w-[140px] md:w-[152px] h-[92px] md:h-[100px] bg-[#0C1F56] rounded-[12px] shrink-0 snap-start cursor-pointer group">
                          <div className="w-[70px] md:w-[80px] h-[35px] md:h-[40px] relative transition-transform duration-300 group-hover:scale-105">
                            <Image unoptimized src={provider.image} alt={provider.name} fill className="object-contain" />
                          </div>
                          <div className="flex flex-row justify-center items-center gap-[10px] w-[104px] h-[14px]">
                            <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] text-center text-[#FFC83D]">
                              {provider.gamesCount} Games
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex flex-row justify-center items-center gap-[4px] w-full mt-[4px]">
                      {[0, 1, 2].map((dotIndex) => (
                        <button
                          key={dotIndex}
                          onClick={() => scrollToProviderPage(dotIndex)}
                          className={`${activeProviderPage === dotIndex
                              ? 'w-[12px] h-[6px] bg-[#BBCAF3]'
                              : 'w-[6px] h-[6px] bg-[#BBCAF3]/50'
                            } rounded-[150px] transition-all duration-300 hover:bg-[#BBCAF3]/80`}
                          aria-label={`Scroll to page ${dotIndex + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="flex flex-col gap-[20px] w-full">
                <div className="flex flex-row items-center w-full h-[29px]">
                  <h3 className="font-[family-name:var(--font-jost)] font-extrabold text-[20px] leading-[29px] tracking-[0.01em] uppercase text-white">
                    {activeCategory}
                  </h3>
                </div>
                <div className="flex flex-row flex-wrap gap-[12px] w-full content-start overflow-y-auto md:max-h-[500px] pb-4 [&::-webkit-scrollbar]:hidden">
                  {searchResults.map((game) => (
                    <div key={game.id} className="w-[calc(50%-6px)] md:w-[152px] h-[184px] md:h-[200px] shrink-0 rounded-[12px] overflow-hidden relative bg-[#0C1F56] group cursor-pointer">
                      <Image unoptimized src={game.image} alt={game.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center py-[40px] md:py-[60px] gap-[16px] w-full mt-[20px] md:mt-[40px]">
                <h3 className="font-[family-name:var(--font-jost)] font-bold text-[18px] md:text-[20px] leading-[29px] text-white">
                  No Results for your Search
                </h3>
                <p className="font-[family-name:var(--font-manrope)] font-medium text-[12px] md:text-[14px] leading-[19px] text-center text-[#A5B8EF] max-w-[480px]">
                  There are no results in this category for your search term, please select a different category or try searching for something else
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>,
    document.body
  );
}
