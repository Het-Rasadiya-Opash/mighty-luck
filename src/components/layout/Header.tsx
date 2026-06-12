"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Search } from '../ui/Search';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Close drawer on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0C1F56] h-[60px]">
      <div className="relative mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-6">

        {/* Left: hamburger (mobile) + logo + search (desktop) */}
        <div className="flex items-center gap-3 md:gap-6 min-w-0">
          {/* Mobile hamburger */}
          <button
            className="flex md:hidden items-center justify-center min-h-[44px] min-w-[44px] text-white hover:opacity-80 transition-opacity shrink-0"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Image
              src="/Horizontal logo.png"
              alt="Mighty Luck"
              width={150}
              height={28}
              className="object-contain w-[120px] sm:w-[150px] md:w-[170px] lg:w-[190px] h-auto"
            />
          </div>

          {/* Search — hidden on mobile, shown md+ */}
          <div className="hidden md:flex">
            <Search />
          </div>
        </div>

        {/* Right: auth buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button className="flex items-center justify-center min-h-[44px] h-[40px] px-4 sm:px-6 md:px-[30px] rounded-[8px] font-semibold text-sm transition-colors bg-[#1463FF] text-white whitespace-nowrap">
            Login
          </button>
          <button className="flex items-center justify-center min-h-[44px] h-[40px] px-4 sm:px-6 md:px-[30px] rounded-[8px] font-semibold text-sm transition-colors bg-[#FFC83D] text-[#1A1404] whitespace-nowrap">
            Join
          </button>
        </div>
      </div>

      {/* Mobile drawer overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-[280px] bg-[#0C1F56] z-50 md:hidden flex flex-col transform transition-transform duration-300 translate-x-0 overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-[#112F82]">
              <Image
                src="/Horizontal logo.png"
                alt="Mighty Luck"
                width={140}
                height={26}
                className="object-contain h-auto"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center min-h-[44px] min-w-[44px] text-white hover:opacity-80"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>
            <div className="p-4">
              <Search className="w-full" />
            </div>
            <nav className="flex flex-col gap-1 px-4 pb-6">
              {['Promotions', 'VIP Program', 'Tournaments', 'Casino', 'Live Casino', 'Live Support'].map((item) => (
                <div
                  key={item}
                  className="flex items-center h-[44px] px-3 rounded-[8px] text-[#D2DCF7] hover:text-white hover:bg-[#112F82] cursor-pointer transition-colors font-medium text-[15px]"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </div>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
