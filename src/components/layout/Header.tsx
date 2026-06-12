"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Search } from '../ui/Search';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Close drawer on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
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

        <div className="flex items-center gap-3 md:gap-6 min-w-0">
          <button
            className="flex lg:hidden items-center justify-center min-h-[44px] min-w-[44px] text-white hover:opacity-80 transition-opacity shrink-0"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <Image 
              src="/men-icons.png" 
              alt="Menu" 
              width={22} 
              height={22} 
              className="object-contain"
            />          </button>

          <div className="flex items-center shrink-0">
            <Image
              src="/Horizontal logo.png"
              alt="Mighty Luck"
              width={150}
              height={28}
              className="object-contain w-[90px] min-[375px]:w-[110px] min-[425px]:w-[130px] sm:w-[150px] md:w-[170px] lg:w-[190px] h-auto"
            />
          </div>

          <div className="hidden md:flex">
            <Search />
          </div>
        </div>

        <div className="flex items-center gap-1.5 min-[375px]:gap-2 shrink-0">
          <Link href="?auth=login" className="flex items-center justify-center min-h-[32px] min-[375px]:min-h-[36px] min-[425px]:min-h-[40px] sm:min-h-[44px] h-[32px] min-[375px]:h-[36px] min-[425px]:h-[40px] sm:h-[40px] px-2.5 min-[375px]:px-3 min-[425px]:px-4 sm:px-6 md:px-[30px] rounded-[6px] sm:rounded-[8px] font-semibold text-[12px] min-[375px]:text-[13px] sm:text-sm transition-colors bg-[#1463FF] text-white whitespace-nowrap">
            Login
          </Link>
          <Link href="?auth=register" className="flex items-center justify-center min-h-[32px] min-[375px]:min-h-[36px] min-[425px]:min-h-[40px] sm:min-h-[44px] h-[32px] min-[375px]:h-[36px] min-[425px]:h-[40px] sm:h-[40px] px-2.5 min-[375px]:px-3 min-[425px]:px-4 sm:px-6 md:px-[30px] rounded-[6px] sm:rounded-[8px] font-semibold text-[12px] min-[375px]:text-[13px] sm:text-sm transition-colors bg-[#FFC83D] text-[#1A1404] whitespace-nowrap">
            Join
          </Link>
        </div>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-[280px] bg-[#0C1F56] z-50 lg:hidden flex flex-col transform transition-transform duration-300 translate-x-0 overflow-y-auto">
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
            <div className="px-4 pb-6 flex flex-col gap-3 mt-auto">
              <Link href="?auth=login" className="flex items-center justify-center min-h-[44px] w-full rounded-[8px] font-semibold text-[15px] transition-colors bg-[#1463FF] text-white">
                Login
              </Link>
              <Link href="?auth=register" className="flex items-center justify-center min-h-[44px] w-full rounded-[8px] font-semibold text-[15px] transition-colors bg-[#FFC83D] text-[#1A1404]">
                Join
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
