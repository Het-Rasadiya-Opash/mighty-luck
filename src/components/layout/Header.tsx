"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { X, Wallet, Bell, Gift, Users, LogOut } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { Search } from '../ui/Search';
import { SidebarNav } from '@/components/layout/Sidebar';
import { DepositModal } from '@/components/modals/DepositModal';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { data: session, status } = useSession();
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);



  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0C1F56] h-[60px]">
      <div className="relative mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-2 min-[375px]:px-3 sm:px-6 md:px-8 lg:px-12 xl:px-6">

        <div className="flex items-center gap-2 min-[375px]:gap-2 md:gap-6 min-w-0">
          <button
            className="flex items-center justify-center min-h-[36px] min-w-[36px] min-[375px]:min-h-[44px] min-[375px]:min-w-[44px] text-white hover:opacity-80 transition-opacity shrink-0"
            onClick={() => {
              if (window.innerWidth < 1024) {
                setIsOpen(true);
              } else {
                window.dispatchEvent(new Event('toggleDesktopSidebar'));
              }
            }}
            aria-label="Open menu"
          >
            <Image
              src="/men-icons.png"
              alt="Menu"
              width={22}
              height={22}
              className="object-contain"
            />
          </button>

          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/Horizontal logo.png"
              alt="Mighty Luck"
              width={150}
              height={28}
              className="object-contain w-[105px] min-[375px]:w-[100px] min-[425px]:w-[130px] sm:w-[150px] md:w-[170px] lg:w-[190px] h-auto"
            />
          </Link>

          <div className="hidden lg:flex">
            <Search />
          </div>
        </div>

        {status === 'authenticated' ? (
          <div className="flex flex-row justify-end items-center gap-1.5 min-[375px]:gap-2 sm:gap-4 shrink-0 z-[2]">
            <div className="hidden min-[600px]:flex flex-row items-center gap-1">
              <div className="flex flex-row justify-center items-center px-[30px] py-[10px] gap-[10px] w-[116px] h-[40px] bg-[#112F82] rounded-[8px]">
                <span className="font-manrope font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">
                  $105,98
                </span>
              </div>

              <button
                className="flex flex-row justify-center items-center px-[16px] py-[10px] gap-[8px] w-[110px] h-[40px] bg-[#FFC83D] rounded-[8px] hover:bg-[#F2B926] transition-colors"
                onClick={() => setIsDepositModalOpen(true)}
              >
                <Image src="/wallet-dark.svg" width={16} height={16} alt="Wallet" />
                <span className="font-manrope font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#1A1404]">
                  Deposit
                </span>
              </button>
            </div>

            <button
              className="flex min-[600px]:hidden flex-row justify-center items-center px-[8px] min-[375px]:px-[12px] h-[32px] min-[375px]:h-[36px] bg-[#FFC83D] rounded-[6px] hover:bg-[#F2B926] transition-colors"
              onClick={() => setIsDepositModalOpen(true)}
            >
              <Image src="/wallet-dark.svg" width={16} height={16} alt="Wallet" />
            </button>

            <div className="flex flex-row items-center gap-[4px] min-[375px]:gap-[8px]">
              <button className="flex flex-row justify-center items-center w-[32px] h-[32px] min-[375px]:w-[36px] min-[375px]:h-[36px] md:w-[40px] md:h-[40px] bg-[#173EAD] rounded-[6px] relative hover:bg-[#112F82] transition-colors">
                <Image src="/noti.svg" width={16} height={16} alt="Notifications" className="scale-90 min-[375px]:scale-100" />
                <div className="absolute right-0 top-0 w-[6px] h-[6px] min-[375px]:w-[8px] min-[375px]:h-[8px] bg-[#FF0E0E] rounded-full"></div>
              </button>

              <button className="flex flex-row justify-center items-center w-[32px] h-[32px] min-[375px]:w-[36px] min-[375px]:h-[36px] md:w-[40px] md:h-[40px] bg-[#173EAD] rounded-[6px] relative hover:bg-[#112F82] transition-colors">
                <Image src="/gift-light.svg" width={16} height={16} alt="Gifts" className="scale-90 min-[375px]:scale-100" />
                <div className="absolute right-0 top-0 w-[6px] h-[6px] min-[375px]:w-[8px] min-[375px]:h-[8px] bg-[#FF0E0E] rounded-full"></div>
              </button>

              <div className="relative" ref={profileRef}>
                <button
                  className="w-[32px] h-[32px] min-[375px]:w-[36px] min-[375px]:h-[36px] md:w-[40px] md:h-[40px] rounded-full overflow-hidden shrink-0 transition-opacity hover:opacity-80"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <Image src="/user.png" alt="User" width={40} height={40} className="object-cover w-full h-full" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 top-[calc(100%+12px)] w-[240px] bg-[#112F82] rounded-[16px] shadow-lg border border-[#173EAD] overflow-hidden flex flex-col z-50">
                    <div className="flex flex-col gap-1 p-4 border-b border-[#173EAD]">
                      <span className="font-['Jost'] font-bold text-[16px] leading-[23px] text-white">Player</span>
                      <span className="font-['Manrope'] font-normal text-[14px] leading-[19px] text-[#A5B8EF] truncate">
                        {session?.user?.email || 'john@example.com'}
                      </span>
                    </div>
                    <div className="flex flex-col p-2">
                      <Link
                        href="?view=refer"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex flex-row items-center gap-3 px-3 py-2.5 rounded-[8px] hover:bg-[#173EAD] transition-colors w-full text-left"
                      >
                        <Users size={18} color="#D2DCF7" />
                        <span className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#D2DCF7] hover:text-white transition-colors">Refer a Friend</span>
                      </Link>
                      <button
                        className="flex flex-row items-center gap-3 px-3 py-2.5 rounded-[8px] hover:bg-[#173EAD] transition-colors w-full text-left mt-1"
                        onClick={() => {
                          setIsProfileOpen(false);
                          signOut({ callbackUrl: '/' });
                        }}
                      >
                        <LogOut size={18} color="#D2DCF7" />
                        <span className="font-['Manrope'] font-semibold text-[14px] leading-[19px] text-[#D2DCF7] hover:text-white transition-colors">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 min-[375px]:gap-2 shrink-0">
            <Link href="?auth=login" className="flex items-center justify-center min-h-[32px] min-[375px]:min-h-[36px] min-[425px]:min-h-[40px] sm:min-h-[40px] h-[32px] min-[375px]:h-[36px] min-[425px]:h-[40px] sm:h-[40px] px-2.5 min-[375px]:px-3 min-[425px]:px-4 sm:px-6 md:px-[30px] rounded-[6px] sm:rounded-[8px] font-semibold text-[12px] min-[375px]:text-[13px] sm:text-sm transition-colors bg-[#1463FF] text-white whitespace-nowrap">
              Login
            </Link>
            <Link href="?auth=register" className="flex items-center justify-center min-h-[32px] min-[375px]:min-h-[36px] min-[425px]:min-h-[40px] sm:min-h-[40px] h-[32px] min-[375px]:h-[36px] min-[425px]:h-[40px] sm:h-[40px] px-2.5 min-[375px]:px-3 min-[425px]:px-4 sm:px-6 md:px-[30px] rounded-[6px] sm:rounded-[8px] font-semibold text-[12px] min-[375px]:text-[13px] sm:text-sm transition-colors bg-[#FFC83D] text-[#1A1404] whitespace-nowrap">
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
          <div className="fixed top-0 left-0 h-full w-[280px] bg-[#0C1F56] z-50 flex flex-col transform transition-transform duration-300 translate-x-0 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] lg:hidden">
            <div className="flex items-center justify-between p-4 border-b border-[#112F82]">
              <Link href="/" onClick={() => setIsOpen(false)} className="shrink-0">
                <Image
                  src="/Horizontal logo.png"
                  alt="Mighty Luck"
                  width={140}
                  height={26}
                  className="object-contain h-auto"
                />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center min-h-[44px] min-w-[44px] text-white hover:opacity-80"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>
            <div className="p-4">
              <Search className="w-full md:w-full" />
            </div>
            <nav className="flex flex-col px-4 pb-6 w-full">
              <SidebarNav />
            </nav>
            {status === 'authenticated' ? (
              <div className="flex flex-col mt-auto w-full">
                <div className="flex items-center gap-4 px-4 pb-5">
                  <Image src="/user.png" alt="User" width={48} height={48} className="rounded-full object-cover shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="font-['Jost'] font-bold text-[18px] text-white truncate">Player</span>
                    <span className="font-['Manrope'] font-medium text-[14px] text-[#A5B8EF] truncate">
                      {session?.user?.email || 'hra.opash@gmail.com'}
                    </span>
                  </div>
                </div>
                
                <div className="w-full h-[1px] bg-[#112F82]" />

                <div className="flex flex-col pt-4 pb-6 px-4 gap-2">
                  <Link
                    href="?view=refer"
                    onClick={() => setIsOpen(false)}
                    className="flex flex-row items-center gap-4 px-2 py-2 rounded-[8px] hover:bg-[#173EAD] transition-colors w-full text-left"
                  >
                    <Users size={20} color="#D2DCF7" />
                    <span className="font-['Manrope'] font-medium text-[15px] text-white hover:text-white transition-colors">Refer a Friend</span>
                  </Link>
                  <button
                    className="flex flex-row items-center gap-4 px-2 py-2 rounded-[8px] hover:bg-[#173EAD] transition-colors w-full text-left"
                    onClick={() => {
                      setIsOpen(false);
                      signOut({ callbackUrl: '/' });
                    }}
                  >
                    <LogOut size={20} color="#D2DCF7" />
                    <span className="font-['Manrope'] font-medium text-[15px] text-white hover:text-white transition-colors">Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-4 pb-6 flex flex-col gap-3 mt-auto">
                <Link href="?auth=login" onClick={() => setIsOpen(false)} className="flex items-center justify-center min-h-[44px] w-full rounded-[8px] font-semibold text-[15px] transition-colors bg-[#1463FF] text-white">
                  Login
                </Link>
                <Link href="?auth=register" onClick={() => setIsOpen(false)} className="flex items-center justify-center min-h-[44px] w-full rounded-[8px] font-semibold text-[15px] transition-colors bg-[#FFC83D] text-[#1A1404]">
                  Join
                </Link>
              </div>
            )}
          </div>
        </>
      )}

      <DepositModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
      />
    </header>
  );
}
