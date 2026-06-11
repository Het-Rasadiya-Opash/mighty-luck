"use client";

import Image from 'next/image';
import { Search } from '../ui/Search';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#0C1F56]" style={{ height: "60px" }}>
      <div className="relative mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-[24px] py-[10px]  isolation-isolate">

        <div className="flex items-center w-[596px] h-[40px] gap-[51px]">
          <div className="flex items-center gap-6">
            <button className="hover:opacity-80 transition-opacity shrink-0 flex items-center justify-center">
              <Image src="/heade-menu-icons.png" alt="Menu Icon" width={24} height={24} className="object-contain" />
            </button>
            <div className="flex items-center shrink-0">
              <Image src="/Horizontal logo.png" alt="Mighty Luck" width={160} height={32} className="object-contain" />
            </div>
          </div>
          <Search />
        </div>

        <div className="flex items-center w-[199px] h-[40px] gap-[10px]">
          <button className='flex items-center justify-center gap-[10px] h-[40px] px-[30px] py-[10px] rounded-[8px] font-semibold text-sm transition-colors bg-[#1463FF] text-[#FFFFFF] w-[99px]'>
            Login
          </button>

          <button className='flex items-center justify-center gap-[10px] h-[40px] px-[30px] py-[10px] rounded-[8px] font-semibold text-sm transition-colors bg-[#FFC83D] text-[#1A1404]  w-[90px]'>
            Join
          </button>
        </div>

      </div>
    </header>
  );
}
