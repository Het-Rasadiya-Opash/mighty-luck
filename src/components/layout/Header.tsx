"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { X, Wallet, Bell, Gift } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Search } from '../ui/Search';
import { SidebarNav } from '@/components/layout/Sidebar';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

        {status === 'authenticated' ? (
          <div className="flex flex-row justify-end items-center gap-2 sm:gap-4 shrink-0 z-[2]">
            <div className="hidden min-[600px]:flex flex-row items-center gap-1">
              <div className="flex flex-row justify-center items-center px-[30px] py-[10px] gap-[10px] w-[116px] h-[40px] bg-[#112F82] rounded-[8px]">
                <span className="font-manrope font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">
                  $105,98
                </span>
              </div>
              
              <button className="flex flex-row justify-center items-center px-[16px] py-[10px] gap-[8px] w-[110px] h-[40px] bg-[#FFC83D] rounded-[8px] hover:bg-[#F2B926] transition-colors">
                <Wallet size={16} color="#1A1404" fill="#1A1404" />
                <span className="font-manrope font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#1A1404]">
                  Deposit
                </span>
              </button>
            </div>

            <button className="flex min-[600px]:hidden flex-row justify-center items-center px-[12px] h-[36px] bg-[#FFC83D] rounded-[6px] hover:bg-[#F2B926] transition-colors">
              <Wallet size={16} color="#1A1404" />
            </button>

            <div className="flex flex-row items-center gap-[8px]">
              <button className="flex flex-row justify-center items-center w-[36px] h-[36px] md:w-[40px] md:h-[40px] bg-[#173EAD] rounded-[6px] relative hover:bg-[#112F82] transition-colors">
                <Bell size={16} color="#D2DCF7" fill="#D2DCF7" />
                <div className="absolute right-0 top-0 w-[8px] h-[8px] bg-[#FF0E0E] rounded-full"></div>
              </button>
              
              <button className="flex flex-row justify-center items-center w-[36px] h-[36px] md:w-[40px] md:h-[40px] bg-[#173EAD] rounded-[6px] relative hover:bg-[#112F82] transition-colors">
                <Gift size={16} color="#D2DCF7" fill="#D2DCF7" />
                <div className="absolute right-0 top-0 w-[8px] h-[8px] bg-[#FF0E0E] rounded-full"></div>
              </button>

              <button className="w-[40px] h-[40px] rounded-full overflow-hidden shrink-0">
                <Image src="/user.png" alt="User" width={40} height={40} className="object-cover w-full h-full" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 min-[375px]:gap-2 shrink-0">
            <Link href="?auth=login" className="flex items-center justify-center min-h-[32px] min-[375px]:min-h-[36px] min-[425px]:min-h-[40px] sm:min-h-[44px] h-[32px] min-[375px]:h-[36px] min-[425px]:h-[40px] sm:h-[40px] px-2.5 min-[375px]:px-3 min-[425px]:px-4 sm:px-6 md:px-[30px] rounded-[6px] sm:rounded-[8px] font-semibold text-[12px] min-[375px]:text-[13px] sm:text-sm transition-colors bg-[#1463FF] text-white whitespace-nowrap">
              Login
            </Link>
            <Link href="?auth=register" className="flex items-center justify-center min-h-[32px] min-[375px]:min-h-[36px] min-[425px]:min-h-[40px] sm:min-h-[44px] h-[32px] min-[375px]:h-[36px] min-[425px]:h-[40px] sm:h-[40px] px-2.5 min-[375px]:px-3 min-[425px]:px-4 sm:px-6 md:px-[30px] rounded-[6px] sm:rounded-[8px] font-semibold text-[12px] min-[375px]:text-[13px] sm:text-sm transition-colors bg-[#FFC83D] text-[#1A1404] whitespace-nowrap">
              Join
            </Link>
          </div>
        )}
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
            <nav className="flex flex-col px-4 pb-6 w-full">
              <SidebarNav />
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
