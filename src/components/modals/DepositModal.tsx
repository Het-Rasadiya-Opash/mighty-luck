"use client";

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Wallet, ChevronDown, ArrowRightLeft, Copy, QrCode, Info, Gift, Award, Coins, Ban, CreditCard, Crown } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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
  const [fiatStep, setFiatStep] = useState<'address' | 'payment'>('address');
  const [activeTab, setActiveTab] = useState<'deposit' | 'bonuses' | 'withdraw' | 'transactions'>('deposit');
  const [fiatAmount, setFiatAmount] = useState<number | 'custom'>(30);
  const sliderRef = useRef<HTMLDivElement>(null);
  const bonusRef = useRef<HTMLDivElement>(null);
  const paymentRef = useRef<HTMLDivElement>(null);
  const countryRef = useRef<HTMLDivElement>(null);

  const [activeSlide, setActiveSlide] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);

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

  const isBonusesTab = activeTab === 'bonuses';
  const isWithdrawTxTab = activeTab === 'withdraw' || activeTab === 'transactions';

  const modalHeightClass = (isBonusesTab || isWithdrawTxTab)
    ? 'h-[573px] sm:h-[518px]'
    : (isFiatAddress
        ? 'h-[715px] sm:h-[633px]'
        : (isFiatPayment
            ? 'h-[743px] sm:h-[647px]'
            : (isPending
                ? 'h-[612px] sm:h-[604px]'
                : 'h-[673px] sm:h-[604px]')));

  const outerBoxHeightClass = (isBonusesTab || isWithdrawTxTab)
    ? 'h-[495px] sm:h-[462px]'
    : (isFiatAddress
        ? 'h-[637px] sm:h-[503px]'
        : (isFiatPayment
            ? 'h-[665px] sm:h-[517px]'
            : (isPending
                ? 'h-[534px] sm:h-[474px]'
                : 'h-[595px] sm:h-[474px]')));

  const innerBoxHeightClass = (isBonusesTab || isWithdrawTxTab)
    ? 'h-[442px] sm:h-[409px]'
    : (isFiatAddress
        ? 'h-[500px] sm:h-[450px]'
        : (isFiatPayment
            ? 'h-[528px] sm:h-[464px]'
            : (isPending
                ? 'h-[371px] sm:h-[421px]'
                : 'h-[458px] sm:h-[421px]')));

  return createPortal(
    <div className="fixed inset-0 z-40 sm:z-[100] overflow-y-auto top-[50px] sm:top-0">
   <div
        className="fixed inset-0 top-[50px] min-[426px]:top-0 bg-[#091741] min-[426px]:bg-[#0C1733]/70 min-[426px]:backdrop-blur-[8px]"
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
            {/* Background & Clipping for Blur */}
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
            <div className={`flex flex-col items-start gap-[24px] w-full ${outerBoxHeightClass} z-40`}>
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
                      <div className="flex flex-col items-start p-[20px_16px] gap-[16px] w-full bg-[#0C1F56] rounded-[16px] z-20 relative h-[325px]">
                        <p className="font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] text-center tracking-[0.02em] text-[#A5B8EF] w-full h-[38px] flex items-center justify-center">
                          Your transaction in progress and pending confirmation from the blockchain.
                        </p>

                        <div className="flex flex-row justify-center items-center gap-[10px] w-full h-[120px]">
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
                      <div className={`flex flex-col items-start p-[16px] gap-[16px] w-full ${isFiatAddress ? 'h-[454px] sm:h-[404px]' : (isFiatPayment ? 'h-[482px] sm:h-[418px]' : 'h-[412px] sm:h-[375px]')} bg-[#0C1F56] rounded-[16px] z-20 relative`}>

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
                                <RenderBonusIcon type={selectedBonus.iconType} className="w-[16px] h-[16px] text-[#FFC83D]" />
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
                                        className={`w-[16px] h-[16px] ${isSelected ? 'text-white' : 'text-[#A5B8EF]'}`}
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
                                <FiatIcons />
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
                                        <Image src="/d-bit.svg" width={20} height={20} alt={payment.symbol || 'BTC'} className="shrink-0" />
                                      </div>
                                    ) : (
                                      <FiatIcons className={isSelected ? 'opacity-100' : 'opacity-80'} />
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
                                    <div className="absolute top-[50px] sm:top-[40px] left-0 w-full sm:w-[210px] bg-[#0C1F56] border border-[#1A3FA6] rounded-b-[8px] overflow-hidden z-30 shadow-lg max-h-[150px] overflow-y-auto [&::-webkit-scrollbar]:hidden">
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
                            </div>                             <div className="flex flex-col gap-[12px] w-full h-[180px] sm:h-[146px]">
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
                      </div>
                    )}
                  </>
                )}

                {activeTab === 'bonuses' && (
                  <div className="flex flex-col items-start p-[16px] gap-[16px] w-full bg-[#0C1F56] rounded-[16px] z-20 relative h-[396px] sm:h-auto overflow-hidden">
                    <div className="flex flex-col items-start gap-[8px] w-full">
                      <label className="font-[family-name:var(--font-manrope)] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">If you have a Bonus Code — enter it here</label>
                      <div className="flex flex-row items-center gap-[8px] w-full h-[50px]">
                        <div className={`flex-1 h-[50px] bg-[#112F82] rounded-[8px] px-[16px] flex flex-row items-center justify-between border transition-colors ${isPromoApplied ? 'border-transparent' : 'border-transparent focus-within:border-[#1463FF]'}`}>
                          <input
                            type="text"
                            placeholder="Promo Code"
                            spellCheck="false"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            disabled={isPromoApplied}
                            className={`w-full h-full bg-transparent font-[family-name:var(--font-manrope)] text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder:text-[#7795E8] outline-none disabled:opacity-100 disabled:text-white ${isPromoApplied ? 'font-bold' : 'font-semibold'}`}
                          />
                          {isPromoApplied && (
                            <Image src="/error.svg" width={20} height={20} alt="Info" className="shrink-0 ml-[8px]" />
                          )}
                        </div>
                        <button
                          onClick={() => {
                            if (isPromoApplied) {
                              setIsPromoApplied(false);
                              setPromoCode('');
                            } else {
                              if (promoCode.trim()) {
                                setIsPromoApplied(true);
                                toast.success('Coupon applied');
                              }
                            }
                          }}
                          className={`flex flex-row justify-center items-center h-[50px] bg-[#FFC83D] hover:bg-[#F2B926] rounded-[8px] transition-colors shrink-0 px-[30px] py-[10px] gap-[10px] ${isPromoApplied ? 'w-[109px]' : 'w-[100px]'}`}
                        >
                          <span className="font-[family-name:var(--font-manrope)] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-[#1A1404]">
                            {isPromoApplied ? 'Cancel' : 'Apply'}
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
                            <button className="flex flex-row justify-center items-center px-[20px] py-[10px] gap-[10px] w-full h-[40px] bg-[#FFC83D] hover:bg-[#F2B926] rounded-[6px] transition-colors shrink-0">
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
                  </div>
                )}

                {(activeTab === 'withdraw' || activeTab === 'transactions') && (
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
                <div className={`flex flex-col gap-[12px] items-center z-10 w-full justify-center ${isPending ? 'h-[88px]' : ''}`}>
                  {isPending ? (
                    <>
                      <button
                        onClick={() => {
                          onClose();
                          router.push('/');
                        }}
                        className="flex flex-row justify-center items-center px-[30px] py-[10px] gap-[10px] w-full sm:w-[300px] h-[60px] sm:h-[50px] bg-[#FFC83D] hover:bg-[#F2B926] transition-colors rounded-[8px]"
                      >
                        <span className="font-[family-name:var(--font-manrope)] font-bold text-[16px] leading-[22px] tracking-[0.02em] text-[#1A1404]">
                          Go to games
                        </span>
                      </button>

                      <div className="flex flex-row justify-center items-center gap-[8px] w-full h-[16px]">
                        <svg className="w-[12px] h-[12px] text-[#7795E8] shrink-0" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="6" cy="6" r="5.25" stroke="currentColor" strokeWidth="1.2"/>
                          <path d="M6 8.5V7.5M6 6.5C6.4 6.5 6.8 6.2 6.8 5.75C6.8 5.3 6.4 5 6 5C5.6 5 5.2 5.3 5.2 5.75" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
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
                        } else {
                          toast.success("Payment completed!");
                          onClose();
                          router.push('/');
                        }
                      } : handleCompleteDeposit}
                      className="flex flex-row justify-center items-center px-[30px] py-[10px] w-full sm:w-[300px] h-[60px] sm:h-[50px] bg-[#FFC83D] hover:bg-[#F2B926] transition-colors rounded-[8px]"
                    >
                      <span className="font-['Manrope'] font-bold text-[16px] sm:text-[14px] leading-[22px] sm:leading-[19px] tracking-[0.02em] text-[#1A1404]">
                        {selectedPayment.id === 'fiat'
                          ? (fiatStep === 'address' ? 'Continue' : `Deposit ${fiatAmount === 'custom' ? '' : '$' + fiatAmount}`)
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
export function RenderBonusIcon({ type, className }: { type: string, className?: string }) {
  if (type === 'gift') return <Image src="/gift.svg" width={16} height={16} alt="Gift" className={className} />;
  if (type === 'badge') return <Image src="/star.svg" width={16} height={16} alt="Badge" className={className} />;
  if (type === 'coins') return <Image src="/bonus.svg" width={16} height={16} alt="Coins" className={className} />;
  if (type === 'ban') return <Image src="/close.svg" width={16} height={16} alt="Ban" className={className} />;
  return null;
}

function FiatIcons({ className }: { className?: string }) {
  return (
    <div className={`flex flex-row items-center gap-[4px] shrink-0 ${className || ''}`}>
      <div className="flex items-center justify-center w-[22px] h-[14px] bg-[#A5B8EF] rounded-[2px]">
        <span className="text-[#112F82] font-[family-name:var(--font-manrope)] font-extrabold text-[6px] italic tracking-tighter">VISA</span>
      </div>
      <div className="relative flex items-center justify-center">
        <CreditCard size={18} className="text-[#A5B8EF]" />
      </div>
    </div>
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
