"use client";

import { ArrowRightLeft, ChevronDown, Crown, Info, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import './deposit-modal.css';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DepositModal({ isOpen, onClose }: DepositModalProps) {
  const [isBonusOpen, setIsBonusOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const bonuses = [
    { id: 'reload', title: '150% Reload Bonus + 30 Free Spins', desc: '(Min. Deposit $10)', iconType: 'gift' },
    { id: 'welcome', title: '350% Welcome Bonus', desc: '45x PT - Min. Dep. $20', iconType: 'badge' },
    { id: 'crypto', title: '500% Crypto Bonus', desc: '45x PT - Min. Dep. $20', iconType: 'coins' },
    { id: 'no-bonus', title: 'I will deposit without bonus', desc: '', iconType: 'ban' }
  ];

  const payments = [
    { id: 'fiat', titleExpanded: 'Credit Card (Visa/Mastercard)', titleClosed: 'Credit Card', descClosed: '(Min. $30 - Max. $2,500)' },
    { id: 'crypto', titleExpanded: 'Bitcoin (BTC)', titleClosed: 'Bitcoin', descClosed: '(Min. $10)', symbol: '₿' }
  ];

  const router = useRouter();
  const [selectedBonus, setSelectedBonus] = useState(bonuses[0]);
  const [selectedPayment, setSelectedPayment] = useState(payments[1]);
  const [isPending, setIsPending] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  useEffect(() => {
    if (isPending) {
      setAnimationCompleted(false);
      const timer = setTimeout(() => {
        setAnimationCompleted(true);
      }, 2500); // 2.5s matches the circular progress loader animation
      return () => clearTimeout(timer);
    } else {
      setAnimationCompleted(false);
    }
  }, [isPending]);

  const [fiatStep, setFiatStep] = useState<'address' | 'payment' | 'success'>('address');
  const [activeTab, setActiveTab] = useState<'deposit' | 'bonuses' | 'withdraw' | 'transactions'>('deposit');
  const [fiatAmount, setFiatAmount] = useState<number | 'custom'>(30);
  const sliderRef = useRef<HTMLDivElement>(null);
  const bonusRef = useRef<HTMLDivElement>(null);
  const paymentRef = useRef<HTMLDivElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);

  const [activeSlide, setActiveSlide] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [verificationStep, setVerificationStep] = useState<'start' | 'process' | 'submitted'>('start');

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const slideWidth = 308; // width (300px) + gap (8px)
    const newIndex = Math.round(e.currentTarget.scrollLeft / slideWidth);
    if (newIndex !== activeSlide) setActiveSlide(newIndex);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (sliderRef.current) {
      // Optional: remove smooth scrolling during drag to make it responsive
      sliderRef.current.style.scrollBehavior = 'auto';
      sliderRef.current.style.scrollSnapType = 'none';
    }
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (sliderRef.current) {
      sliderRef.current.style.scrollBehavior = 'smooth';
      sliderRef.current.style.scrollSnapType = 'x mandatory';
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (sliderRef.current) {
      sliderRef.current.style.scrollBehavior = 'smooth';
      sliderRef.current.style.scrollSnapType = 'x mandatory';
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        // Optional: you can turn off snap during wheel scroll or leave it
        slider.scrollLeft += e.deltaY;
      }
    };

    slider.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      slider.removeEventListener('wheel', handleWheel);
    };
  }, [activeTab]);

  const scrollToSlide = (index: number) => {
    setActiveSlide(index);
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: index * 308,
        behavior: 'smooth'
      });
    }
  };

  const countries = [
    { id: 'us', name: 'United States', flag: 'https://flagcdn.com/w40/us.png' },
    { id: 'ca', name: 'Canada', flag: 'https://flagcdn.com/w40/ca.png' },
    { id: 'au', name: 'Australia', flag: 'https://flagcdn.com/w40/au.png' },
    { id: 'de', name: 'Germany', flag: 'https://flagcdn.com/w40/de.png' },
    { id: 'fr', name: 'France', flag: 'https://flagcdn.com/w40/fr.png' },
  ];
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const currentY = e.touches[0].clientY;
    const diffY = currentY - touchStartY.current;
    if (diffY > 50) {
      onClose();
      touchStartY.current = null;
    }
  };

  const handleTouchEnd = () => {
    touchStartY.current = null;
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("hide-mobile-nav");
      setIsBonusOpen(false);
      setIsPaymentOpen(false);
      setIsPending(false);
      setFiatStep('address');
      setFiatAmount(30);
      setPromoCode('');
      setIsPromoApplied(false);
      setVerificationStep('start');
      setActiveTab('deposit');
    } else {
      document.body.style.overflow = "unset";
      document.body.classList.remove("hide-mobile-nav");
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.classList.remove("hide-mobile-nav");
    };
  }, [isOpen]);
  const handleCompleteDeposit = () => {
    toast.success("Bitcoin Transection Completed!");
    setIsPending(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (bonusRef.current && !bonusRef.current.contains(event.target as Node)) {
        setIsBonusOpen(false);
      }
      if (paymentRef.current && !paymentRef.current.contains(event.target as Node)) {
        setIsPaymentOpen(false);
      }
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isOpen || !mounted) return null;

  const isFiatAddress = activeTab === 'deposit' && selectedPayment.id === 'fiat' && fiatStep === 'address';
  const isFiatPayment = activeTab === 'deposit' && selectedPayment.id === 'fiat' && fiatStep === 'payment';
  const isFiatSuccess = activeTab === 'deposit' && selectedPayment.id === 'fiat' && fiatStep === 'success';

  const isBonusesTab = activeTab === 'bonuses';
  const isWithdrawTab = activeTab === 'withdraw';
  const isTransactionsTab = activeTab === 'transactions';
  const isBonusSuccess = isBonusesTab && isPromoApplied;

  let modalHeightClass = 'h-[673px] sm:h-[604px]';
  if (isBonusSuccess) {
    modalHeightClass = 'h-[660px] sm:h-[589px]';
  } else if (isWithdrawTab) {
    if (verificationStep === 'process') {
      modalHeightClass = 'h-[760px] sm:h-[705px]';
    } else if (verificationStep === 'submitted') {
      modalHeightClass = 'h-[647px] sm:h-[566px]';
    } else {
      modalHeightClass = 'h-[647px] sm:h-[576px]';
    }
  } else if (isBonusesTab || isTransactionsTab) {
    modalHeightClass = 'h-[573px] sm:h-[518px]';
  } else if (isFiatAddress) {
    modalHeightClass = 'h-[715px] sm:h-[633px]';
  } else if (isFiatPayment) {
    modalHeightClass = 'h-[743px] sm:h-[647px]';
  } else if (isFiatSuccess) {
    modalHeightClass = 'h-[725px] sm:h-[655px]';
  } else if (isPending) {
    modalHeightClass = 'h-[652px] sm:h-[604px]';
  }

  let outerBoxHeightClass = 'h-[595px] sm:h-[474px]';
  if (isBonusSuccess) {
    outerBoxHeightClass = 'h-[580px] sm:h-[480px]';
  } else if (isWithdrawTab) {
    if (verificationStep === 'process') {
      outerBoxHeightClass = 'h-[670px] sm:h-[596px]';
    } else if (verificationStep === 'submitted') {
      outerBoxHeightClass = 'h-[547px] sm:h-[510px]';
    } else {
      outerBoxHeightClass = 'h-[547px] sm:h-[467px]';
    }
  } else if (isBonusesTab || isTransactionsTab) {
    outerBoxHeightClass = 'h-[495px] sm:h-[462px]';
  } else if (isFiatAddress) {
    outerBoxHeightClass = 'h-[637px] sm:h-[503px]';
  } else if (isFiatPayment) {
    outerBoxHeightClass = 'h-[665px] sm:h-[517px]';
  } else if (isFiatSuccess) {
    outerBoxHeightClass = 'h-[645px] sm:h-[472px]';
  } else if (isPending) {
    outerBoxHeightClass = 'h-[574px] sm:h-[474px]';
  }

  let innerBoxHeightClass = 'h-[458px] sm:h-[421px]';
  if (isBonusSuccess) {
    innerBoxHeightClass = 'h-[560px] sm:h-[480px]';
  } else if (isWithdrawTab) {
    if (verificationStep === 'process') {
      innerBoxHeightClass = 'h-[670px] sm:h-[596px]';
    } else if (verificationStep === 'submitted') {
      innerBoxHeightClass = 'h-[547px] sm:h-[457px]';
    } else {
      innerBoxHeightClass = 'h-[547px] sm:h-[467px]';
    }
  } else if (isBonusesTab || isTransactionsTab) {
    innerBoxHeightClass = 'h-[442px] sm:h-[409px]';
  } else if (isFiatAddress) {
    innerBoxHeightClass = 'h-[500px] sm:h-[450px]';
  } else if (isFiatPayment) {
    innerBoxHeightClass = 'h-[528px] sm:h-[464px]';
  } else if (isFiatSuccess) {
    innerBoxHeightClass = 'h-[505px] sm:h-[472px]';
  } else if (isPending) {
    innerBoxHeightClass = 'h-[411px] sm:h-[421px]';
  }

  return createPortal(
    <div className="fixed inset-0 z-40 sm:z-[120] overflow-y-auto top-[50px] sm:top-0">
      <div
        className="fixed inset-0 top-[50px] sm:top-0 bg-[#091741] sm:bg-[#0C1733]/70 sm:backdrop-blur-[8px]"
        onClick={onClose}
      />
      <div className="relative min-h-full flex flex-col justify-end sm:justify-center items-center p-0 pt-[30px] sm:py-[16px] pointer-events-none">
        <div className="deposit-modal-container relative w-full max-w-[414px] sm:max-w-[500px] h-fit sm:h-auto pointer-events-auto flex flex-col justify-end">
          <button
            onClick={onClose}
            className="absolute -right-[44px] top-0 z-10 text-white hover:opacity-70 transition-opacity hidden sm:block"
          >
            <X size={24} />
          </button>

          <div className={`relative flex flex-col items-center w-full ${modalHeightClass} pt-[16px] sm:pt-[24px] px-[20px] pb-[40px] sm:pb-[32px] gap-[16px] sm:gap-[24px]`}>
            <div className="absolute inset-0 bg-[#091741] rounded-t-[30px] sm:rounded-[16px] overflow-hidden pointer-events-none">
              <div className="absolute top-[-125px] sm:top-[-145px] left-[calc(50%-165px)] sm:left-1/2 -translate-x-1/2 w-[174px] sm:w-[173px] h-[176px] sm:h-[173px] bg-[#1463FF] blur-[40px] rounded-full" />
            </div>

            <button
              onClick={onClose}
              className="absolute top-[16px] right-[16px] w-[28px] h-[28px] rounded-full bg-[#112F82]/80 hover:bg-[#1463FF] hidden items-center justify-center text-white transition-colors sm:hidden z-50"
            >
              <X size={16} />
            </button>

            <button
              onClick={onClose}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="w-[70px] h-[6px] bg-[#112F82] rounded-[100px] sm:hidden shrink-0 z-40 cursor-pointer hover:bg-[#1463FF] transition-colors"
              aria-label="Close wallet"
            />

            {/* <div className={`flex flex-col items-start gap-[24px] w-full h-auto my-auto py-8 sm:py-0 ${outerBoxHeightClass} z-40`}> */}
            <div className={`flex flex-col items-start gap-[24px] w-full ${outerBoxHeightClass} max-[639px]:h-0 max-[639px]:flex-1 max-[639px]:overflow-y-auto ${isCountryOpen ? 'max-[639px]:pb-[240px] max-[639px]:relative max-[639px]:z-[60] z-40' : 'max-[639px]:pb-[100px] z-40'} [&::-webkit-scrollbar]:hidden`}>
              <div className="flex flex-row justify-start md:justify-center items-start md:items-center gap-[12px] w-full h-[29px]">
                <div className="flex flex-row items-center gap-[12px] h-[29px]">
                  <div className="relative flex items-center justify-center w-[20px] h-[20px] shrink-0">
                    <Image src="/wallet.svg" width={20} height={20} alt="Wallet" className="absolute top-0 left-0" />
                  </div>
                  <h2 className="font-['Jost'] font-extrabold text-[20px] leading-[29px] tracking-[0.01em] text-white">
                    Wallet
                  </h2>
                </div>
              </div>

              <div className={`flex flex-col items-start gap-[16px] w-full ${innerBoxHeightClass}`}>
                {/* <div className={`flex flex-col items-start gap-[16px] w-full h-auto ${innerBoxHeightClass}`}> */}
                <div className="flex flex-row items-center gap-[8px] w-full h-[30px] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  <button
                    onClick={() => setActiveTab('deposit')}
                    className={`flex-1 min-w-[80px] min-[375px]:min-w-[85px] min-[425px]:min-w-0 h-full flex items-center justify-center rounded-[6px] transition-colors ${activeTab === 'deposit' ? 'bg-[#1463FF]' : 'bg-[#112F82] hover:bg-[#1A3FA6]'}`}>
                    <span className={`font-[family-name:var(--font-manrope)] text-[12px] leading-[16px] tracking-[0.02em] ${activeTab === 'deposit' ? 'font-bold text-white' : 'font-semibold text-[#A5B8EF]'}`}>Deposit</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('bonuses')}
                    className={`flex-1 min-w-[80px] min-[375px]:min-w-[85px] min-[425px]:min-w-0 h-full flex items-center justify-center rounded-[6px] transition-colors ${activeTab === 'bonuses' ? 'bg-[#1463FF]' : 'bg-[#112F82] hover:bg-[#1A3FA6]'}`}>
                    <span className={`font-[family-name:var(--font-manrope)] text-[12px] leading-[16px] tracking-[0.02em] ${activeTab === 'bonuses' ? 'font-bold text-white' : 'font-semibold text-[#A5B8EF]'}`}>Bonuses</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('withdraw')}
                    className={`flex-1 min-w-[80px] min-[375px]:min-w-[85px] min-[425px]:min-w-0 h-full flex items-center justify-center rounded-[6px] transition-colors ${activeTab === 'withdraw' ? 'bg-[#1463FF]' : 'bg-[#112F82] hover:bg-[#1A3FA6]'}`}>
                    <span className={`font-[family-name:var(--font-manrope)] text-[12px] leading-[16px] tracking-[0.02em] ${activeTab === 'withdraw' ? 'font-bold text-white' : 'font-semibold text-[#A5B8EF]'}`}>Withdraw</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('transactions')}
                    className={`flex-1 min-w-[80px] min-[375px]:min-w-[85px] min-[425px]:min-w-0 h-full flex items-center justify-center rounded-[6px] transition-colors ${activeTab === 'transactions' ? 'bg-[#1463FF]' : 'bg-[#112F82] hover:bg-[#1A3FA6]'}`}>
                    <span className={`font-[family-name:var(--font-manrope)] text-[12px] leading-[16px] tracking-[0.02em] ${activeTab === 'transactions' ? 'font-bold text-white' : 'font-semibold text-[#A5B8EF]'}`}>Transactions</span>
                  </button>
                </div>

                {activeTab === 'deposit' && (
                  <>
                    {isPending ? (
                      <div className="flex flex-col items-start p-[20px_16px] gap-[16px] w-full bg-[#0C1F56] rounded-[16px] z-20 relative h-[365px] sm:h-[325px]">
                        <p className="font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] text-center tracking-[0.02em] text-[#A5B8EF] w-full h-[38px] flex items-center justify-center">
                          Your transaction in progress and pending confirmation from the blockchain.
                        </p>

                        {/* Mobile Screen Loader */}
                        <div className="flex sm:hidden flex-row justify-center items-center p-0 gap-[10px] w-full max-w-[342px] h-[160.16px] self-stretch flex-grow-0 mx-auto">
                          <div className="relative w-[160px] h-[160.16px] flex-none flex-grow-0 flex items-center justify-center">
                            {/* Circular track and spinner */}
                            <div key="loader-rotating-wrapper" className="absolute inset-0 w-full h-full animate-circular-rotate">
                              <svg className="w-full h-full" viewBox="0 0 160 160">
                                {/* Background Track */}
                                <circle
                                  cx="80"
                                  cy="80"
                                  r="72"
                                  className="stroke-[#112F82]"
                                  strokeWidth="4.5"
                                  fill="transparent"
                                />
                                {/* Animated Foreground Arc */}
                                <circle
                                  cx="80"
                                  cy="80"
                                  r="72"
                                  className="stroke-[#FFC83D] animate-circular-fill"
                                  strokeWidth="4.5"
                                  strokeDasharray="452.39"
                                  strokeDashoffset="452.39"
                                  strokeLinecap="round"
                                  fill="transparent"
                                />
                              </svg>
                            </div>

                            {/* Gold Crown Logo in the center */}
                            <div className="relative z-10 w-[73px] h-[53px] flex items-center justify-center">
                              <Image
                                src="/king.svg"
                                alt="Crown"
                                width={73}
                                height={53}
                                className="object-contain"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Desktop Screen Loader */}
                        <div className="hidden sm:flex flex-row justify-center items-center gap-[10px] w-full h-[120px]">
                          <div className="w-[50px] h-[50px] flex items-center justify-center relative">
                            <CrownLightningIcon className="text-[#A5B8EF] w-[35.83px] h-[26.13px]" />
                          </div>
                          <div className="w-[50px] h-[50px] flex items-center justify-center relative">
                            <CrownLightningIcon className="text-[#A5B8EF] w-[35.83px] h-[26.13px]" />
                          </div>
                          <div className="w-[50px] h-[50px] flex items-center justify-center relative">
                            <CrownLightningIcon className="text-[#112F82] w-[35.83px] h-[26.13px]" />
                          </div>
                        </div>

                        <div className="flex flex-row items-center p-0 gap-[8px] w-full h-[95px] shrink-0 z-[2]">
                          <p className="font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] text-center tracking-[0.02em] text-[#A5B8EF] w-full">
                            1 confirmation is required for deposits to be credited.<br />Want to know how many confirmations this transaction has?<br />Please <span className="text-[#FFC83D] cursor-pointer hover:underline ml-[4.5px]">click here</span>.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className={`flex flex-col items-start p-[16px] gap-[16px] w-full ${isFiatAddress ? 'h-[454px] sm:h-[404px]' : (isFiatPayment ? 'h-[482px] sm:h-[418px]' : (isFiatSuccess ? 'h-[464px] sm:h-[426px]' : 'h-[412px] sm:h-[375px]'))} bg-[#0C1F56] rounded-[16px] z-20 relative`}>
                        {isFiatSuccess ? (
                          <div className="flex flex-col items-start gap-[16px] w-full h-[394px] sm:h-[394px]">
                            {/* Circle Checkmark Icon with Stroke from Figma Specs (Height 120px) */}
                            <div className="flex flex-row justify-center items-center w-full h-[120px] shrink-0">
                              <div className="relative w-[120px] h-[120px] flex items-center justify-center shrink-0">
                                <div className="absolute inset-0 rounded-full border-[3px] border-[#1463FF] bg-[#112F82]/30 flex items-center justify-center">
                                  <div className="w-[70px] h-[70px] rounded-full bg-[#1463FF] flex items-center justify-center shadow-lg">
                                    <Image src="/tick.svg" width={24} height={24} alt="Success" className="w-[24px] h-[24px] object-contain" />
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Headline and Description (Height 67px in Figma) */}
                            <div className="flex flex-col items-start gap-[8px] w-full text-center h-[67px] shrink-0">
                              <h3 className="font-[family-name:var(--font-manrope)] font-bold text-[20px] leading-[27px] tracking-[0.02em] text-white w-full text-center">
                                Deposit successful
                              </h3>
                              <p className="font-[family-name:var(--font-manrope)] font-medium text-[12px] leading-[16px] tracking-[0.02em] text-[#A5B8EF] w-full text-center">
                                Your credit card deposit was approved and your balance has been updated.
                              </p>
                            </div>

                            {/* Info Cards Wrapper (Height 175px in Figma) */}
                            <div className="flex flex-col items-start gap-[12px] w-full h-[175px] shrink-0">
                              {/* Details Box (Height 100px in Figma) */}
                              <div className="flex flex-col justify-center items-start p-[10px_16px] gap-[8px] w-full h-[100px] bg-[#112F82] rounded-[8px] shrink-0">
                                <div className="flex flex-row justify-between items-center w-full h-[16px]">
                                  <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em] text-[#A5B8EF]">
                                    Amount
                                  </span>
                                  <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] text-right tracking-[0.02em] text-white">
                                    ${typeof fiatAmount === 'number' ? fiatAmount.toFixed(2) : '30.00'}
                                  </span>
                                </div>
                                <div className="w-full border-t border-dashed border-[#193EA5]" />
                                <div className="flex flex-row justify-between items-center w-full h-[16px]">
                                  <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em] text-[#A5B8EF]">
                                    Payment Method
                                  </span>
                                  <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] text-right tracking-[0.02em] text-white">
                                    Credit Card
                                  </span>
                                </div>
                                <div className="w-full border-t border-dashed border-[#193EA5]" />
                                <div className="flex flex-row justify-between items-center w-full h-[16px]">
                                  <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em] text-[#A5B8EF]">
                                    Status
                                  </span>
                                  <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] text-right tracking-[0.02em] text-white">
                                    Completed
                                  </span>
                                </div>
                              </div>

                              {/* Active Bonus Box (Height 63px in Figma) */}
                              <div className="flex flex-col justify-center items-start p-[10px_16px] gap-[8px] w-full h-[63px] bg-[#112F82] rounded-[8px] shrink-0">
                                <span className="font-[family-name:var(--font-manrope)] font-medium text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">
                                  Active Bonus
                                </span>
                                <div className="flex flex-row items-center gap-[8px] w-full h-[19px]">
                                  <div className="w-[16px] h-[16px] flex items-center justify-center shrink-0">
                                    <RenderBonusIcon type={selectedBonus.iconType} className="w-[16px] h-[16px]" color="bg-[#FFC83D]" />
                                  </div>
                                  <span className="font-[family-name:var(--font-manrope)] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white truncate">
                                    {selectedBonus.title}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div ref={bonusRef} className="relative flex flex-col gap-[8px] w-full z-30">
                          <label className="flex items-center w-full h-[16px] font-[family-name:var(--font-manrope)] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">
                            {selectedPayment.id === 'fiat' ? 'Select a Bonus' : '1.Select a Bonus'}
                          </label>
                          <button
                            onClick={() => { setIsBonusOpen(!isBonusOpen); setIsPaymentOpen(false); }}
                            className="flex flex-row items-center justify-between px-[16px] py-[10px] w-full h-[50px] sm:h-[40px] bg-[#112F82] hover:bg-[#1A3FA6] transition-colors border border-[#1463FF] rounded-[8px]"
                          >
                            <div className="flex flex-row items-center gap-[12px]">
                              <div className="w-[16px] h-[16px] flex items-center justify-center shrink-0">
                                <RenderBonusIcon type={selectedBonus.iconType} className="w-[16px] h-[16px]" color="bg-[#FFC83D]" />
                              </div>
                              <span className="font-[family-name:var(--font-manrope)] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">
                                {selectedBonus.title}
                              </span>
                            </div>
                            <ChevronDown size={14} className={`text-[#A5B8EF] transition-transform ${isBonusOpen ? 'rotate-180' : ''}`} />
                          </button>

                          {isBonusOpen && (
                            <div className="absolute top-[80px] sm:top-[66px] left-0 w-full bg-[#112F82] border border-[#1463FF] rounded-[8px] flex flex-col overflow-hidden shadow-xl z-50 h-[244px]">
                              <div className="px-[16px] py-[10px] h-[40px] flex items-center bg-[#112F82] border-b border-[#1463FF]/30 rounded-t-[8px]">
                                <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] tracking-[0.02em] text-white">Choose one bonus on next deposits</span>
                              </div>

                              {bonuses.map((bonus) => {
                                const isSelected = selectedBonus.id === bonus.id;
                                const isNoBonus = bonus.id === 'no-bonus';
                                const optionHeight = isNoBonus ? 'h-[39px]' : 'h-[55px]';
                                return (
                                  <button
                                    key={bonus.id}
                                    className={`flex flex-row items-center gap-[12px] px-[16px] py-[10px] text-left transition-colors ${optionHeight} ${isSelected ? 'bg-[#1463FF]' : 'bg-[#112F82] hover:bg-[#1A3FA6]'}`}
                                    onClick={() => { setSelectedBonus(bonus); setIsBonusOpen(false); }}
                                  >
                                    <div className="shrink-0 flex items-center justify-center">
                                      <RenderBonusIcon
                                        type={bonus.iconType}
                                        className="w-[16px] h-[16px] transition-colors"
                                        color={isSelected ? 'bg-[#FFC83D]' : 'bg-[#A5B8EF]'}
                                      />
                                    </div>
                                    <div className="flex flex-col justify-center gap-[2px]">
                                      <span className={`font-[family-name:var(--font-manrope)] font-bold text-[14px] leading-[19px] tracking-[0.02em] ${isSelected ? 'text-white' : 'text-[#A5B8EF]'}`}>{bonus.title}</span>
                                      {bonus.desc && (
                                        <span className={`font-[family-name:var(--font-manrope)] font-medium text-[10px] leading-[14px] tracking-[0.02em] ${isSelected ? 'text-white' : 'text-[#A5B8EF]'}`}>{bonus.desc}</span>
                                      )}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        <div ref={paymentRef} className="relative flex flex-col gap-[8px] w-full z-20">
                          <label className="flex items-center w-full h-[16px] font-[family-name:var(--font-manrope)] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">
                            {selectedPayment.id === 'fiat' ? 'Select a payment method' : '2.Select a payment method'}
                          </label>
                          <button
                            onClick={() => { setIsPaymentOpen(!isPaymentOpen); setIsBonusOpen(false); }}
                            className={`flex flex-row items-center justify-between px-[16px] py-[10px] w-full h-[50px] sm:h-[40px] bg-[#112F82] hover:bg-[#1A3FA6] transition-colors ${isPaymentOpen ? 'rounded-t-[8px] border border-[#1463FF] border-b-0' : 'rounded-[8px]'}`}
                          >
                            <div className="flex flex-row items-center gap-[8px] min-w-0">
                              {selectedPayment.id === 'crypto' ? (
                                <Image src="/d-bit.svg" width={16} height={16} alt={selectedPayment.symbol || 'BTC'} className="shrink-0" />
                              ) : (
                                <FiatIcons isSelected={true} />
                              )}
                              <span className="font-[family-name:var(--font-manrope)] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white shrink-0">
                                {selectedPayment.titleClosed}
                              </span>
                              <span className="font-[family-name:var(--font-manrope)] font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8] truncate">
                                {selectedPayment.descClosed}
                              </span>
                            </div>
                            <ChevronDown size={14} strokeWidth={2.5} className={`text-[#A5B8EF] transition-transform ${isPaymentOpen ? 'rotate-180' : ''}`} />
                          </button>

                          {isPaymentOpen && (
                            <div className="absolute top-[74px] sm:top-[63px] left-0 w-full bg-[#112F82] border border-[#1463FF] border-t-0 rounded-b-[8px] flex flex-col overflow-hidden shadow-xl z-50">
                              {payments.map((payment) => {
                                const isSelected = selectedPayment.id === payment.id;
                                return (
                                  <button
                                    key={payment.id}
                                    className={`flex flex-row items-center gap-[12px] px-[16px] py-[12px] text-left transition-colors ${isSelected ? 'bg-[#1463FF]' : 'hover:bg-[#1A3FA6]'}`}
                                    onClick={() => { setSelectedPayment(payment); setIsPaymentOpen(false); }}
                                  >
                                    {payment.id === 'crypto' ? (
                                      <div className={`flex items-center justify-center shrink-0 ${isSelected ? 'border-[1.5px] border-white rounded-full' : ''}`}>
                                        <Image src="/d-bit.svg" width={20} height={20} alt={payment.symbol || 'BTC'} className={`shrink-0 transition-all ${isSelected ? '' : 'grayscale opacity-60'}`} />
                                      </div>
                                    ) : (
                                      <FiatIcons className={isSelected ? 'opacity-100' : 'opacity-80'} isSelected={isSelected} />
                                    )}
                                    <span className={`font-[family-name:var(--font-manrope)] font-bold text-[14px] ${isSelected ? 'text-white' : 'text-[#A5B8EF]'}`}>
                                      {payment.titleExpanded}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          )}

                          {selectedPayment.id === 'crypto' && (
                            <div className="deposit-warning-message flex flex-row items-start gap-[8px] w-full h-[28px]">
                              <div className="flex items-center justify-center w-[12px] h-[12px] shrink-0 mt-[1px]">
                                <Image src="/error.svg" width={12} height={12} alt="Info" className="w-[12px] h-[12px]" />
                              </div>
                              <p className="font-['Manrope'] font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8]">
                                Only deposit BC via the Bitcoin network. Deposit of other assets or from other networks will be lost.
                              </p>
                            </div>
                          )}
                        </div>

                        {selectedPayment.id === 'crypto' ? (
                          <>
                            <div className="flex flex-col gap-[8px] w-full">
                              <label className="flex items-center w-full h-[16px] font-['Manrope'] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">
                                3.Calculate the amount you want to deposit
                              </label>
                              <div className="flex flex-row items-center gap-[8px] w-full h-[50px] sm:h-[40px]">
                                <div className="flex-1 flex flex-row items-center px-[16px] h-[50px] sm:h-[40px] bg-[#112F82] rounded-[8px]">
                                  <Image src="/d-doller.svg" width={16} height={16} alt="USD" className="shrink-0 mr-[8px]" />
                                  <input
                                    type="text"
                                    defaultValue="100"
                                    className="bg-transparent border-none outline-none font-['Manrope'] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white w-full"
                                  />
                                </div>

                                <div className="w-[50px] sm:w-[40px] h-[50px] sm:h-[40px] bg-[#1463FF] rounded-[8px] flex flex-col items-center justify-center shrink-0">
                                  <ArrowRightLeft size={16} className="text-white" />
                                </div>

                                <div className="flex-1 flex flex-row items-center px-[16px] h-[50px] sm:h-[40px] bg-[#112F82] rounded-[8px]">
                                  <Image src="/d-bit.svg" width={16} height={16} alt="BTC" className="shrink-0 mr-[8px]" />
                                  <input
                                    type="text"
                                    defaultValue="0.00954"
                                    className="bg-transparent border-none outline-none font-['Manrope'] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white w-full"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col gap-[8px] w-full">
                              <label className="flex items-center w-full h-[16px] font-['Manrope'] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">
                                4.BTC Deposit Address
                              </label>
                              <div className="flex flex-row items-center justify-between px-[16px] w-full h-[50px] sm:h-[40px] bg-[#112F82] rounded-[8px]">
                                <span className="font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-[#7795E8] truncate mr-[12px]">
                                  bc1q7ndh47hf93rdhuhef873hheufhe447...
                                </span>
                                <div className="flex flex-row items-center gap-[12px] shrink-0">
                                  <button className="text-[#BBCAF3] hover:opacity-80 transition-opacity flex items-center justify-center">
                                    <Image src="/copy.svg" width={16} height={16} alt="Copy" />
                                  </button>
                                  <button className="text-[#BBCAF3] hover:opacity-80 transition-opacity flex items-center justify-center">
                                    <Image src="/qr.svg" width={16} height={16} alt="QR Code" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        ) : fiatStep === 'address' ? (
                          <div className="flex flex-col gap-[12px] w-full h-[242px] sm:h-auto">
                            <div className="deposit-address-warning-container flex flex-col gap-[8px] w-full h-[52px] sm:h-auto">
                              <div className="flex flex-row items-center gap-[8px] w-full h-[16px]">
                                <label className="font-[family-name:var(--font-manrope)] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3] h-[16px]">
                                  Enter your address
                                </label>
                              </div>
                              <div className="deposit-warning-message flex flex-row items-start gap-[8px] w-full h-[28px] sm:h-auto">
                                <div className="w-[12px] h-[12px] relative mt-[2px]">
                                  <div className="absolute inset-0 bg-[#7795E8] [mask-image:url('/error.svg')] [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]" />
                                </div>
                                <p className="font-[family-name:var(--font-manrope)] font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8] flex-1">
                                  Please fill up your address details before completing your deposit. This information is required for credit card deposits.
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-col gap-[12px] w-full h-[174px] sm:h-[144px]">
                              <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] w-full h-[50px] sm:h-[40px] bg-[#112F82] rounded-[8px]">
                                <input type="text" placeholder="Street" spellCheck="false" className="w-full bg-transparent border-none outline-none font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder:text-[#A5B8EF]" />
                              </div>

                              <div className="grid grid-cols-2 gap-[8px] w-full h-[50px] sm:h-[40px]">
                                <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] w-full h-[50px] sm:h-[40px] bg-[#112F82] rounded-[8px]">
                                  <input type="text" placeholder="City" spellCheck="false" className="w-full bg-transparent border-none outline-none font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder:text-[#A5B8EF] min-w-0" />
                                </div>
                                <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] w-full h-[50px] sm:h-[40px] bg-[#112F82] rounded-[8px]">
                                  <input type="text" placeholder="Postal Code" spellCheck="false" className="w-full bg-transparent border-none outline-none font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder:text-[#A5B8EF] min-w-0" />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-[8px] w-full h-[50px] sm:h-[40px]">
                                <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] w-full h-[50px] sm:h-[40px] bg-[#112F82] rounded-[8px]">
                                  <input type="text" placeholder="State" spellCheck="false" className="w-full bg-transparent border-none outline-none font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder:text-[#A5B8EF] min-w-0" />
                                </div>
                                <div ref={countryRef} className="relative w-full h-[50px] sm:h-[40px]">
                                  <div
                                    onClick={() => setIsCountryOpen(!isCountryOpen)}
                                    className={`flex flex-row items-center px-[10px] sm:px-[16px] py-[10px] gap-[8px] sm:gap-[10px] w-full h-[50px] sm:h-[40px] bg-[#112F82] hover:bg-[#1A3FA6] transition-colors cursor-pointer ${isCountryOpen ? 'rounded-t-[8px] border border-[#1A3FA6] border-b-0' : 'rounded-[8px]'}`}
                                  >
                                    <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0">
                                      <div className="w-[20px] h-[20px] rounded-full overflow-hidden flex items-center justify-center">
                                        <img src={selectedCountry.flag} alt={selectedCountry.name} className="w-[20px] h-[20px] object-cover" />
                                      </div>
                                    </div>
                                    <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] tracking-[0.02em] text-white flex-1 truncate min-w-0">{selectedCountry.name}</span>
                                    <div className="flex flex-col justify-center items-center w-[14px] h-[14px] shrink-0">
                                      <ChevronDown size={14} className={`text-[#A5B8EF] transition-transform ${isCountryOpen ? 'rotate-180' : ''}`} />
                                    </div>
                                  </div>

                                  {isCountryOpen && (
                                    <div className="absolute top-[50px] sm:top-[40px] left-0 w-full sm:w-[210px] bg-[#0C1F56] border border-[#1A3FA6] rounded-b-[8px] overflow-hidden z-[60] shadow-lg max-h-[88px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                      {countries.map(country => (
                                        <button
                                          key={country.id}
                                          onClick={() => { setSelectedCountry(country); setIsCountryOpen(false); }}
                                          className="w-full px-[16px] py-[10px] flex flex-row items-center gap-[10px] hover:bg-[#112F82] transition-colors text-left"
                                        >
                                          <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0">
                                            <div className="w-[20px] h-[20px] rounded-full overflow-hidden flex items-center justify-center">
                                              <img src={country.flag} alt={country.name} className="w-[20px] h-[20px] object-cover" />
                                            </div>
                                          </div>
                                          <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] tracking-[0.02em] text-white flex-1 truncate">{country.name}</span>
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-[16px] w-full">
                            <div className="flex flex-col gap-[8px] w-full h-[74px] sm:h-[64px]">
                              <label className="font-[family-name:var(--font-manrope)] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3] h-[16px]">
                                Select an amount
                              </label>
                              <div className="flex flex-row gap-[8px] w-full h-[50px] sm:h-[40px]">
                                {[20, 30, 100].map((amt) => (
                                  <button
                                    key={amt}
                                    onClick={() => setFiatAmount(amt)}
                                    className={`flex-1 flex items-center justify-center font-[family-name:var(--font-manrope)] text-[14px] leading-[19px] tracking-[0.02em] transition-colors rounded-[8px] ${fiatAmount === amt ? 'bg-[#173EAD] border-[2px] border-[#1463FF] text-white font-bold' : 'bg-[#112F82] text-[#A5B8EF] font-semibold hover:text-white'}`}
                                  >
                                    ${amt}
                                  </button>
                                ))}
                                <button
                                  onClick={() => setFiatAmount('custom')}
                                  className={`flex-1 flex items-center justify-center font-[family-name:var(--font-manrope)] text-[14px] leading-[19px] tracking-[0.02em] transition-colors rounded-[8px] ${fiatAmount === 'custom' ? 'bg-[#173EAD] border-[2px] border-[#1463FF] text-white font-bold' : 'bg-[#112F82] text-[#A5B8EF] font-semibold hover:text-white'}`}
                                >
                                  Custom...
                                </button>
                              </div>
                            </div>
                            <div className="flex flex-col gap-[12px] w-full h-[180px] sm:h-[146px]">
                              <label className="font-[family-name:var(--font-manrope)] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3] h-[16px]">
                                Enter your payment details
                              </label>
                              <div className="flex flex-col gap-[12px] w-full h-[112px] sm:h-[92px]">
                                <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] w-full h-[50px] sm:h-[40px] bg-[#112F82] rounded-[8px]">
                                  <input type="text" placeholder="Credit Card Number" spellCheck="false" className="w-full bg-transparent border-none outline-none font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder:text-[#A5B8EF]" />
                                </div>
                                <div className="flex flex-row items-start gap-[8px] w-full h-[50px] sm:h-[40px]">
                                  <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] flex-1 h-[50px] sm:h-[40px] bg-[#112F82] rounded-[8px]">
                                    <input type="text" placeholder="Exp." spellCheck="false" className="w-full bg-transparent border-none outline-none font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder:text-[#A5B8EF]" />
                                  </div>
                                  <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] flex-1 h-[50px] sm:h-[40px] bg-[#112F82] rounded-[8px]">
                                    <input type="text" placeholder="CCV" spellCheck="false" className="w-full bg-transparent border-none outline-none font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder:text-[#A5B8EF]" />
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-row items-start gap-[8px] w-full h-[28px] sm:h-[14px]">
                                <div className="w-[12px] h-[12px] flex items-center justify-center shrink-0 mt-[1px]">
                                  <Info size={12} className="text-[#7795E8]" />
                                </div>
                                <p className="font-[family-name:var(--font-manrope)] font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8] w-[322px] sm:w-[408px]">
                                  Warning message about fees or anything else relevant at this stage.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </>
            )}

                {activeTab === 'bonuses' && (
                  <div className="flex flex-col items-center p-[20px_16px] gap-[16px] w-full bg-[#0C1F56] rounded-[16px] z-20 relative h-auto sm:h-[434px] overflow-hidden">
                    {isPromoApplied ? (
                      <>
                        {/* Inner Form Card (428x328 in Figma) */}
                        <div className="flex flex-col justify-center items-center p-[16px] gap-[20px] w-full sm:w-[428px] h-auto sm:h-[328px] bg-[#112F82] rounded-[12px] shrink-0">
                          {/* Top Row: Coupon applied header */}
                          <div className="flex flex-row items-center gap-[12px] w-full h-[40px] shrink-0">
                            <div className="w-[40px] h-[40px] bg-[#1463FF] rounded-[8px] flex items-center justify-center shrink-0">
                              <Image src="/tick.svg" width={20} height={20} alt="Coupon Applied" className="w-[20px] h-[20px] object-contain" />
                            </div>
                            <div className="flex flex-col items-start gap-[4px] flex-1 min-w-0">
                              <span className="font-[family-name:var(--font-manrope)] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">
                                Coupon applied
                              </span>
                              <span className="font-[family-name:var(--font-manrope)] font-medium text-[12px] leading-[16px] tracking-[0.02em] text-[#A5B8EF] truncate w-full">
                                Your bonus is now attached to your next deposit
                              </span>
                            </div>
                          </div>

                          {/* Active Bonus Summary */}
                          <div className="flex flex-col items-start gap-[8px] w-full shrink-0">
                            <span className="font-[family-name:var(--font-manrope)] font-medium text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">
                              Active Bonus
                            </span>
                            <div className="flex flex-col items-start gap-[4px] w-full">
                              <div className="flex flex-row justify-between items-center w-full">
                                <span className="font-[family-name:var(--font-manrope)] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">
                                  150% Reload Bonus + 30 Free Spins
                                </span>
                                <Info size={16} className="text-[#A5B8EF] shrink-0 cursor-pointer" />
                              </div>
                              <span className="font-[family-name:var(--font-manrope)] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-[#FFC83D]">
                                {promoCode.trim() ? promoCode : 'PROMO2026'}
                              </span>
                            </div>
                          </div>

                          {/* Details Box with Dashed Lines */}
                          <div className="flex flex-col items-start gap-[8px] w-full shrink-0">
                            <div className="flex flex-row justify-between items-center w-full h-[16px]">
                              <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em] text-[#A5B8EF]">
                                Min. Deposit
                              </span>
                              <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] tracking-[0.02em] text-white text-right">
                                $30
                              </span>
                            </div>
                            <div className="w-full border-t border-dashed border-[#193EA5]" />
                            <div className="flex flex-row justify-between items-center w-full h-[16px]">
                              <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em] text-[#A5B8EF]">
                                Max. Cashout
                              </span>
                              <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] tracking-[0.02em] text-white text-right">
                                40x
                              </span>
                            </div>
                            <div className="w-full border-t border-dashed border-[#193EA5]" />
                            <div className="flex flex-row justify-between items-center w-full h-[16px]">
                              <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em] text-[#A5B8EF]">
                                Wager
                              </span>
                              <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] tracking-[0.02em] text-white text-right">
                                10x
                              </span>
                            </div>
                          </div>

                          {/* Yellow Button (396x50 in Figma inside 428 Card) */}
                          <button
                            onClick={() => {
                              setActiveTab('deposit');
                              if (selectedPayment.id === 'fiat') setFiatStep('payment');
                            }}
                            className="flex flex-row justify-center items-center px-[30px] py-[10px] w-full sm:w-[396px] h-[50px] bg-[#FFC83D] hover:bg-[#F2B926] transition-colors rounded-[8px] shrink-0"
                          >
                            <span className="font-[family-name:var(--font-manrope)] font-bold text-[16px] leading-[22px] tracking-[0.02em] text-[#1A1404]">
                              Continue to deposit
                            </span>
                          </button>
                        </div>

                        {/* Dark Blue Button (428x50 in Figma directly under inner card) */}
                        <button
                          onClick={() => {
                            setIsPromoApplied(false);
                            setPromoCode('');
                          }}
                          className="flex flex-row justify-center items-center px-[30px] py-[10px] w-full sm:w-[428px] h-[50px] bg-[#112F82] hover:bg-[#1A3FA6] transition-colors rounded-[8px] shrink-0"
                        >
                          <span className="font-[family-name:var(--font-manrope)] font-bold text-[16px] leading-[22px] tracking-[0.02em] text-[#D2DCF7]">
                            Change coupon
                          </span>
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col items-start gap-[8px] w-full">
                          <label className="font-[family-name:var(--font-manrope)] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">If you have a Bonus Code — enter it here</label>
                          <div className="flex flex-row items-center gap-[8px] w-full h-[40px]">
                            <div className="flex-1 h-[40px] bg-[#112F82] rounded-[8px] px-[16px] flex flex-row items-center justify-between border border-transparent focus-within:border-[#1463FF] transition-colors">
                              <input
                                type="text"
                                placeholder="Promo Code"
                                spellCheck="false"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                className="w-full h-full bg-transparent font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder:text-[#7795E8] outline-none"
                              />
                            </div>
                            <button
                              onClick={() => {
                                if (promoCode.trim()) {
                                  setIsPromoApplied(true);
                                  toast.success('Coupon applied');
                                } else {
                                  toast.error('Please enter a valid promo code');
                                }
                              }}
                              className="flex flex-row justify-center items-center h-[40px] bg-[#FFC83D] hover:bg-[#F2B926] rounded-[8px] transition-colors shrink-0 px-[30px] py-[10px] gap-[10px] w-[100px]"
                            >
                              <span className="font-[family-name:var(--font-manrope)] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-[#1A1404]">
                                Apply
                              </span>
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-col items-start gap-[12px] w-full">
                          <span className="font-[family-name:var(--font-manrope)] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">Available bonuses for you</span>

                          <div
                            ref={sliderRef}
                            onScroll={handleScroll}
                            onMouseDown={handleMouseDown}
                            onMouseLeave={handleMouseLeave}
                            onMouseUp={handleMouseUp}
                            onMouseMove={handleMouseMove}
                            className={`flex flex-row items-start gap-[8px] w-full overflow-x-auto [&::-webkit-scrollbar]:hidden snap-x snap-mandatory scroll-smooth ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                          >
                            {[0, 1, 2].map((item, idx) => (
                              <div key={item} className="flex flex-col justify-center items-start p-[20px] gap-[12px] w-[calc(100vw-90px)] min-[425px]:w-[300px] max-w-[300px] h-[205px] bg-[#112F82] rounded-[12px] shrink-0 snap-center">
                                <div className="flex flex-row justify-center items-center p-0 gap-[10px] w-full h-[20px] shrink-0">
                                  <span className="font-[family-name:var(--font-jost)] font-bold text-[14px] leading-[20px] tracking-[0.02em] text-white truncate w-full">150% Reload Bonus + 30 Free Spins</span>
                                </div>
                                <div className="flex flex-col gap-[9px] w-full h-[81px] shrink-0">
                                  <div className="flex flex-row gap-[12px] w-full h-[36px]">
                                    <div className="flex flex-col gap-[2px] w-[124px] h-[36px] flex-1 min-w-0">
                                      <div className="flex flex-row justify-center items-center p-0 gap-[10px] w-full h-[14px]">
                                        <span className="font-[family-name:var(--font-manrope)] font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#BBCAF3] truncate w-full">Min. Deposit</span>
                                      </div>
                                      <div className="flex flex-row justify-center items-center p-0 gap-[10px] w-full h-[20px]">
                                        <span className="font-[family-name:var(--font-jost)] font-bold text-[14px] leading-[20px] tracking-[0.02em] text-white truncate w-full">$30</span>
                                      </div>
                                    </div>
                                    <div className="flex flex-col gap-[2px] w-[124px] h-[36px] flex-1 min-w-0">
                                      <div className="flex flex-row justify-center items-center p-0 gap-[10px] w-full h-[14px]">
                                        <span className="font-[family-name:var(--font-manrope)] font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#BBCAF3] truncate w-full">Max. Cashout</span>
                                      </div>
                                      <div className="flex flex-row justify-center items-center p-0 gap-[10px] w-full h-[20px]">
                                        <span className="font-[family-name:var(--font-jost)] font-bold text-[14px] leading-[20px] tracking-[0.02em] text-white truncate w-full">40x</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-row gap-[12px] w-full h-[36px]">
                                    <div className="flex flex-col gap-[2px] w-[124px] h-[36px] flex-1 min-w-0">
                                      <div className="flex flex-row justify-center items-center p-0 gap-[10px] w-full h-[14px]">
                                        <span className="font-[family-name:var(--font-manrope)] font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#BBCAF3] truncate w-full">Max. Amount</span>
                                      </div>
                                      <div className="flex flex-row justify-center items-center p-0 gap-[10px] w-full h-[20px]">
                                        <span className="font-[family-name:var(--font-jost)] font-bold text-[14px] leading-[20px] tracking-[0.02em] text-white truncate w-full">$30</span>
                                      </div>
                                    </div>
                                    <div className="flex flex-col gap-[2px] w-[124px] h-[36px] flex-1 min-w-0">
                                      <div className="flex flex-row justify-center items-center p-0 gap-[10px] w-full h-[14px]">
                                        <span className="font-[family-name:var(--font-manrope)] font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#BBCAF3] truncate w-full">Wager (dep. + bonus)</span>
                                      </div>
                                      <div className="flex flex-row justify-center items-center p-0 gap-[10px] w-full h-[20px]">
                                        <span className="font-[family-name:var(--font-jost)] font-bold text-[14px] leading-[20px] tracking-[0.02em] text-white truncate w-full">10x</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  onClick={() => {
                                    setIsPromoApplied(true);
                                    toast.success('Bonus activated!');
                                  }}
                                  className="flex flex-row justify-center items-center px-[20px] py-[10px] gap-[10px] w-full h-[40px] bg-[#FFC83D] hover:bg-[#F2B926] rounded-[6px] transition-colors shrink-0"
                                >
                                  <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] tracking-[0.02em] text-[#1A1404]">Activate</span>
                                </button>
                              </div>
                            ))}
                          </div>

                          <div className="flex flex-row justify-center items-center gap-[4px] w-full h-[6px]">
                            {[0, 1, 2].map((idx) => (
                              <button
                                key={idx}
                                onClick={() => scrollToSlide(idx)}
                                className={`h-[6px] bg-[#BBCAF3] rounded-full transition-all duration-300 ${activeSlide === idx ? 'w-[12px]' : 'w-[6px]'}`}
                              />
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {activeTab === 'withdraw' && (
                  verificationStep === 'start' ? (
                    <div className="flex flex-col items-center justify-between p-[16px] gap-[16px] w-full bg-[#0C1F56] rounded-[16px] z-20 relative h-auto sm:h-[421px] overflow-hidden">
                      {/* Title & Subtitle Frame (428x67 in Figma) */}
                      <div className="flex flex-col items-start gap-[8px] w-full text-center shrink-0">
                        <h3 className="font-[family-name:var(--font-manrope)] font-bold text-[20px] leading-[27px] tracking-[0.02em] text-white w-full text-center">
                          Verify your account
                        </h3>
                        <p className="font-[family-name:var(--font-manrope)] font-medium text-[12px] leading-[16px] tracking-[0.02em] text-[#A5B8EF] w-full text-center">
                          For security reasons, withdrawals are available only after KYC verification is completed.
                        </p>
                      </div>

                      {/* 3 Verification Steps Frame (428x174 in Figma) */}
                      <div className="flex flex-col items-start gap-[12px] w-full sm:w-[428px] shrink-0">
                        {/* Step 1 */}
                        <div className="flex flex-row items-center p-[10px] gap-[12px] w-full h-[50px] bg-[#112F82] rounded-[8px] shrink-0">
                          <div className="w-[30px] h-[30px] bg-[#1463FF] rounded-[4px] flex items-center justify-center shrink-0">
                            <span className="font-['Jost'] font-extrabold text-[14px] leading-[17px] tracking-[0.01em] text-white">
                              1
                            </span>
                          </div>
                          <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] tracking-[0.02em] text-white truncate">
                            Confirm personal details
                          </span>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-row items-center p-[10px] gap-[12px] w-full h-[50px] bg-[#112F82] rounded-[8px] shrink-0">
                          <div className="w-[30px] h-[30px] bg-[#1463FF] rounded-[4px] flex items-center justify-center shrink-0">
                            <span className="font-['Jost'] font-extrabold text-[14px] leading-[17px] tracking-[0.01em] text-white">
                              2
                            </span>
                          </div>
                          <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] tracking-[0.02em] text-white truncate">
                            Upload identity document
                          </span>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-row items-center p-[10px] gap-[12px] w-full h-[50px] bg-[#112F82] rounded-[8px] shrink-0">
                          <div className="w-[30px] h-[30px] bg-[#1463FF] rounded-[4px] flex items-center justify-center shrink-0">
                            <span className="font-['Jost'] font-extrabold text-[14px] leading-[17px] tracking-[0.01em] text-white">
                              3
                            </span>
                          </div>
                          <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] tracking-[0.02em] text-white truncate">
                            Upload proof of address
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons Stack (428x112 in Figma) */}
                      <div className="flex flex-col items-center gap-[12px] w-full sm:w-[428px] shrink-0">
                        <button
                          onClick={() => {
                            setVerificationStep('process');
                          }}
                          className="flex flex-row justify-center items-center px-[30px] py-[10px] w-full h-[50px] bg-[#FFC83D] hover:bg-[#F2B926] transition-colors rounded-[8px] shrink-0"
                        >
                          <span className="font-[family-name:var(--font-manrope)] font-bold text-[16px] leading-[22px] tracking-[0.02em] text-[#1A1404]">
                            Start verification
                          </span>
                        </button>

                        <button
                          onClick={() => {
                            setVerificationStep('submitted');
                          }}
                          className="flex flex-row justify-center items-center px-[30px] py-[10px] w-full h-[50px] bg-[#112F82] hover:bg-[#1A3FA6] transition-colors rounded-[8px] shrink-0"
                        >
                          <span className="font-[family-name:var(--font-manrope)] font-bold text-[16px] leading-[22px] tracking-[0.02em] text-[#D2DCF7]">
                            Preview verified state
                          </span>
                        </button>
                      </div>
                    </div>
                  ) : verificationStep === 'process' ? (
                    /* Verification process screen (460x550 in Figma) */
                    <div className="flex flex-col items-center p-[20px_16px] gap-[20px] w-full bg-[#0C1F56] rounded-[16px] z-20 relative h-auto sm:h-[550px] overflow-hidden shrink-0">
                      {/* Section 1: 1. Complete verification */}
                      <div className="flex flex-col items-start gap-[12px] w-full sm:w-[428px] shrink-0">
                        <div className="flex flex-col items-start gap-[4px] w-full">
                          <span className="font-[family-name:var(--font-manrope)] font-medium text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">
                            1.Complete verification
                          </span>
                          <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8]">
                            We need to verify your account before enabling withdrawals.
                          </span>
                        </div>

                        <div className="flex flex-col items-start gap-[12px] w-full">
                          <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] w-full h-[40px] bg-[#112F82] rounded-[8px]">
                            <input
                              type="text"
                              placeholder="Legal first name"
                              className="w-full bg-transparent border-none outline-none font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder-[#A5B8EF]"
                            />
                          </div>

                          <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] w-full h-[40px] bg-[#112F82] rounded-[8px]">
                            <input
                              type="text"
                              placeholder="Legal last name"
                              className="w-full bg-transparent border-none outline-none font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder-[#A5B8EF]"
                            />
                          </div>

                          <div className="flex flex-row items-center gap-[8px] w-full h-[40px]">
                            <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] flex-1 h-[40px] bg-[#112F82] rounded-[8px]">
                              <input
                                type="text"
                                placeholder="Date of birth"
                                onFocus={(e) => (e.target.type = 'date')}
                                onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
                                className="w-full bg-transparent border-none outline-none font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder-[#A5B8EF]"
                              />
                            </div>

                            <div className="relative flex-1" ref={countryRef}>
                              <button
                                onClick={() => setIsCountryOpen(!isCountryOpen)}
                                className="flex flex-row items-center justify-between px-[16px] py-[10px] gap-[10px] w-full h-[40px] bg-[#112F82] rounded-[8px]"
                              >
                                <div className="flex flex-row items-center gap-[8px] truncate">
                                  <img src={selectedCountry.flag} alt={selectedCountry.name} className="w-[20px] h-[20px] object-cover rounded-full shrink-0" />
                                  <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] tracking-[0.02em] text-white truncate">{selectedCountry.name}</span>
                                </div>
                                <ChevronDown size={14} className={`text-[#A5B8EF] shrink-0 transition-transform ${isCountryOpen ? 'rotate-180' : ''}`} />
                              </button>

                              {isCountryOpen && (
                                <div className="absolute top-[44px] left-0 right-0 bg-[#0C1F56] border border-[#112F82] rounded-[8px] shadow-lg py-1 z-50 max-h-[160px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                  {countries.map((c) => (
                                    <button
                                      key={c.id}
                                      onClick={() => {
                                        setSelectedCountry(c);
                                        setIsCountryOpen(false);
                                      }}
                                      className="flex flex-row items-center gap-[8px] w-full px-[12px] py-[8px] hover:bg-[#112F82] transition-colors text-left"
                                    >
                                      <img src={c.flag} alt={c.name} className="w-[20px] h-[20px] object-cover rounded-full shrink-0" />
                                      <span className="font-[family-name:var(--font-manrope)] font-semibold text-[12px] text-white truncate">{c.name}</span>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section 2: 2. Upload documents */}
                      <div className="flex flex-col items-start gap-[12px] w-full sm:w-[428px] shrink-0">
                        <span className="font-[family-name:var(--font-manrope)] font-medium text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">
                          2.Upload documents
                        </span>

                        <div className="flex flex-col items-start p-[10px] gap-[20px] w-full h-[60px] bg-[#112F82] rounded-[10px]">
                          <div className="flex flex-row items-center gap-[16px] w-full h-[40px]">
                            <div className="flex flex-col items-center justify-center p-[12px] gap-[10px] w-[40px] h-[40px] bg-[#0C1F56] rounded-[6px] shrink-0 cursor-pointer hover:bg-[#091741] transition-colors">
                              <img src="/upload.svg" alt="Upload" className="w-[16px] h-[16px]" />
                            </div>
                            <div className="flex flex-col items-start gap-[4px] flex-1">
                              <span className="font-[family-name:var(--font-manrope)] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">
                                Identity document
                              </span>
                              <span className="font-[family-name:var(--font-manrope)] font-medium text-[12px] leading-[16px] tracking-[0.02em] text-[#A5B8EF]">
                                Passport, ID card, or driving license
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-start p-[10px] gap-[20px] w-full h-[60px] bg-[#112F82] rounded-[10px]">
                          <div className="flex flex-row items-center gap-[16px] w-full h-[40px]">
                            <div className="flex flex-col items-center justify-center p-[12px] gap-[10px] w-[40px] h-[40px] bg-[#0C1F56] rounded-[6px] shrink-0 cursor-pointer hover:bg-[#091741] transition-colors">
                              <img src="/upload.svg" alt="Upload" className="w-[16px] h-[16px]" />
                            </div>
                            <div className="flex flex-col items-start gap-[4px] flex-1">
                              <span className="font-[family-name:var(--font-manrope)] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white">
                                Proof of address
                              </span>
                              <span className="font-[family-name:var(--font-manrope)] font-medium text-[12px] leading-[16px] tracking-[0.02em] text-[#A5B8EF]">
                                Utility bill or bank statement
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Buttons */}
                      <div className="flex flex-col items-center gap-[12px] w-full sm:w-[428px] shrink-0">
                        <button
                          onClick={() => {
                            setVerificationStep('submitted');
                          }}
                          className="flex flex-row justify-center items-center px-[30px] py-[10px] w-full h-[50px] bg-[#FFC83D] hover:bg-[#F2B926] transition-colors rounded-[8px] shrink-0"
                        >
                          <span className="font-[family-name:var(--font-manrope)] font-bold text-[16px] leading-[22px] tracking-[0.02em] text-[#1A1404]">
                            Submit verification
                          </span>
                        </button>

                        <button
                          onClick={() => {
                            setVerificationStep('start');
                          }}
                          className="flex flex-row justify-center items-center px-[30px] py-[10px] w-full h-[50px] bg-[#112F82] hover:bg-[#1A3FA6] transition-colors rounded-[8px] shrink-0"
                        >
                          <span className="font-[family-name:var(--font-manrope)] font-bold text-[16px] leading-[22px] tracking-[0.02em] text-[#D2DCF7]">
                            Back
                          </span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Verification submission screen (460x411 in Figma) */
                    <div className="flex flex-col items-center justify-between p-[20px_16px] gap-[20px] w-full bg-[#0C1F56] rounded-[16px] z-20 relative h-auto sm:h-[411px] overflow-hidden shrink-0">
                      {/* Top Graphic Frame (428x120 in Figma) */}
                      <div className="flex flex-row justify-center items-center w-full sm:w-[428px] h-[120px] shrink-0">
                        <div className="relative w-[120px] h-[120px] flex items-center justify-center shrink-0">
                          {/* Outer circular stroke ring (Vector Stroke in Figma) */}
                          <div className="absolute inset-0 rounded-full border-[2px] border-[#1463FF]" />
                          {/* Inner filled ellipse (70x70 in Figma) */}
                          <div className="w-[70px] h-[70px] bg-[#1463FF] rounded-full flex items-center justify-center z-10">
                            <img src="/tick.svg" alt="Tick" className="w-[24px] h-[24px]" />
                          </div>
                        </div>
                      </div>

                      {/* Title & Subtitle Frame (428x67 in Figma) */}
                      <div className="flex flex-col items-center gap-[8px] w-full sm:w-[428px] shrink-0 text-center">
                        <h3 className="font-[family-name:var(--font-manrope)] font-bold text-[20px] leading-[27px] tracking-[0.02em] text-white w-full text-center">
                          Verification submitted
                        </h3>
                        <p className="font-[family-name:var(--font-manrope)] font-medium text-[12px] leading-[16px] tracking-[0.02em] text-[#A5B8EF] w-full text-center">
                          Your documents were received. Withdrawals will become available once the review is complete.
                        </p>
                      </div>

                      {/* Status Info Box (428x74 in Figma) */}
                      <div className="flex flex-col justify-center items-start p-[10px_16px] gap-[8px] w-full sm:w-[428px] h-[74px] bg-[#112F82] rounded-[8px] shrink-0">
                        <div className="flex flex-row justify-between items-center w-full h-[22px]">
                          <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em] text-[#A5B8EF]">
                            Status
                          </span>
                          <div className="flex flex-row justify-center items-center px-[8px] py-[4px] bg-[#3E2A09] rounded-[6px]">
                            <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em] text-[#FFC83D]">
                              Under review
                            </span>
                          </div>
                        </div>

                        <div className="w-full border-b border-dashed border-[#193EA5]" />

                        <div className="flex flex-row justify-between items-center w-full h-[16px]">
                          <span className="font-[family-name:var(--font-manrope)] font-semibold text-[10px] leading-[14px] tracking-[0.02em] text-[#A5B8EF]">
                            Estimated review
                          </span>
                          <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] tracking-[0.02em] text-white text-right">
                            24-28 hours
                          </span>
                        </div>
                      </div>

                      {/* Preview verified state CTA (428x50 in Figma) */}
                      <button
                        onClick={onClose}
                        className="flex flex-row justify-center items-center px-[30px] py-[10px] w-full sm:w-[428px] h-[50px] bg-[#FFC83D] hover:bg-[#F2B926] transition-colors rounded-[8px] shrink-0"
                      >
                        <span className="font-[family-name:var(--font-manrope)] font-bold text-[16px] leading-[22px] tracking-[0.02em] text-[#1A1404]">
                          Preview verified state
                        </span>
                      </button>
                    </div>
                  )
                )}

                {activeTab === 'transactions' && (
                  <div className="flex flex-col items-center justify-center p-[24px] sm:p-0 gap-[16px] w-full bg-[#0C1F56] sm:bg-transparent rounded-[16px] sm:rounded-none z-20 relative h-[396px] sm:h-full">
                    <Crown size={48} className="text-[#FFC83D]" fill="currentColor" />
                    <div className="flex flex-col items-center gap-[8px]">
                      <h3 className="font-[family-name:var(--font-jost)] font-bold text-[24px] leading-[32px] tracking-[0.02em] text-white">
                        Coming Soon
                      </h3>
                      <p className="font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] text-center tracking-[0.02em] text-[#A5B8EF] max-w-[80%]">
                        This feature is currently under development. Stay tuned for updates!
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {activeTab === 'deposit' && (
                <div className={`max-[639px]:fixed max-[639px]:bottom-0 max-[639px]:left-0 max-[639px]:right-0 max-[639px]:bg-[#091741] max-[639px]:p-[16px_20px] max-[639px]:border-t max-[639px]:border-[#112F82]/80 max-[639px]:z-50 flex flex-col gap-[12px] items-center z-10 w-full justify-center ${isPending ? 'h-[88px] max-[639px]:h-auto' : ''}`}>
                  {isPending ? (
                    <>
                      <button
                        onClick={() => {
                          onClose();
                          router.push('/');
                        }}
                        disabled={!animationCompleted}
                        className="flex flex-row justify-center items-center px-[30px] py-[10px] gap-[10px] w-full sm:w-[300px] h-[60px] sm:h-[50px] bg-[#FFC83D] hover:bg-[#F2B926] disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-[8px]"
                      >
                        <span className="font-[family-name:var(--font-manrope)] font-bold text-[16px] leading-[22px] tracking-[0.02em] text-[#1A1404]">
                          Go to games
                        </span>
                      </button>

                      <div className="flex flex-row justify-center items-center gap-[8px] w-full h-[16px]">
                        <svg className="w-[12px] h-[12px] text-[#7795E8] shrink-0" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="6" cy="6" r="5.25" stroke="currentColor" strokeWidth="1.2" />
                          <path d="M6 8.5V7.5M6 6.5C6.4 6.5 6.8 6.2 6.8 5.75C6.8 5.3 6.4 5 6 5C5.6 5 5.2 5.3 5.2 5.75" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                        <span className="font-[family-name:var(--font-manrope)] font-medium text-[12px] leading-[16px] tracking-[0.02em] text-[#7795E8]">
                          Having problems? <span className="text-[#FFC83D] cursor-pointer hover:underline">Contact support</span>
                        </span>
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={selectedPayment.id === 'fiat' ? () => {
                        if (fiatStep === 'address') {
                          toast.success("Address saved, proceeding to payment...");
                          setFiatStep('payment');
                        } else if (fiatStep === 'payment') {
                          toast.success("Deposit successful!");
                          setFiatStep('success');
                        } else {
                          onClose();
                          router.push('/');
                        }
                      } : handleCompleteDeposit}
                      className={`flex flex-row justify-center items-center px-[30px] py-[10px] bg-[#FFC83D] hover:bg-[#F2B926] transition-colors rounded-[8px] shrink-0 ${
                        isFiatSuccess ? 'w-full sm:w-[460px] h-[50px]' : 'w-full sm:w-[300px] h-[60px] sm:h-[50px]'
                      }`}
                    >
                      <span className={`font-[family-name:var(--font-manrope)] font-bold text-[#1A1404] ${
                        isFiatSuccess ? 'text-[16px] leading-[22px] tracking-[0.02em]' : 'text-[16px] sm:text-[14px] leading-[22px] sm:leading-[19px] tracking-[0.02em]'
                      }`}>
                        {selectedPayment.id === 'fiat'
                          ? (fiatStep === 'address' ? 'Continue' : (fiatStep === 'payment' ? `Deposit ${fiatAmount === 'custom' ? '' : '$' + fiatAmount}` : 'Play Now'))
                          : "I've completed my deposit"}
                      </span>
                    </button>
                  )}
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
export function RenderBonusIcon({ type, className, color = 'bg-[#A5B8EF]' }: { type: string; className?: string; color?: string }) {
  let maskUrl = '';
  if (type === 'gift') maskUrl = "url('/gift.svg')";
  if (type === 'badge') maskUrl = "url('/star.svg')";
  if (type === 'coins') maskUrl = "url('/bonus.svg')";
  if (type === 'ban') maskUrl = "url('/close.svg')";

  if (!maskUrl) return null;

  return (
    <div
      className={`${color} ${className || ''}`}
      style={{
        maskImage: maskUrl,
        WebkitMaskImage: maskUrl,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
      }}
    />
  );
}

function FiatIcons({ className, isSelected }: { className?: string; isSelected?: boolean }) {
  const colorClass = isSelected ? 'bg-[#FFC83D]' : 'bg-[#A5B8EF]';
  const maskUrl = "url('/visa.svg')";
  return (
    <div
      className={`${colorClass} ${className || ''} shrink-0 transition-colors`}
      style={{
        width: '42px',
        height: '20px',
        maskImage: maskUrl,
        WebkitMaskImage: maskUrl,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
      }}
    />
  );
}

function CrownLightningIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 33 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M31.5969 7.13433L23.0786 10.6306C22.8177 10.7385 22.5202 10.6359 22.3766 10.3912L16.6743 0.281229C16.4525 -0.100229 15.8992 -0.0923369 15.6904 0.297014L9.71147 10.4175C9.57315 10.6753 9.25998 10.7858 8.99118 10.6701L0.788717 7.13433C0.345058 6.94228 -0.116868 7.36583 0.0266686 7.82885L4.87559 23.395C4.94866 23.6318 5.16789 23.7949 5.41581 23.7949L26.1738 23.8001C26.4113 23.8001 26.6227 23.6502 26.7062 23.4266L32.3433 7.85778C32.5103 7.39214 32.0536 6.94755 31.5995 7.13433H31.5969ZM19.6546 14.6819L15.5991 21.9165C15.5417 22.0191 15.3903 21.9796 15.3851 21.8639L15.2207 17.4837H13.8036V17.4679C13.767 17.4732 13.7305 17.4837 13.6913 17.4837H10.7502C10.664 17.4837 10.6092 17.389 10.6484 17.3127L15.0197 9.14948C15.1737 8.88114 15.4555 8.71804 15.7609 8.71804H18.7021C18.7882 8.71804 18.843 8.81275 18.8039 8.88904L15.7922 14.5109H19.5529C19.6416 14.5109 19.6964 14.6057 19.652 14.6846L19.6546 14.6819Z"
        fill="currentColor"
      />
    </svg>
  );
}