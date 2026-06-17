"use client";

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Wallet, ChevronDown, ArrowRightLeft, Copy, QrCode, Info, Gift, Award, Coins, Ban, CreditCard, Crown } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DepositModal({ isOpen, onClose }: DepositModalProps) {
  const [isBonusOpen, setIsBonusOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const bonuses = [
    { id: 1, title: '150% Reload Bonus + 30 Free Spins', desc: '(Min. Deposit $10)', iconType: 'gift' },
    { id: 2, title: '350% Welcome Bonus', desc: '45x PT - Min. Dep. $20', iconType: 'badge' },
    { id: 3, title: '500% Crypto Bonus', desc: '45x PT - Min. Dep. $20', iconType: 'coins' },
    { id: 4, title: 'I will deposit without bonus', desc: '', iconType: 'ban' }
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

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
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
    }
    return () => {
      document.body.style.overflow = "unset";
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

  const modalHeightClass = (isBonusesTab || isWithdrawTxTab) ? 'sm:h-[518px]' : (isFiatAddress ? 'sm:h-[633px]' : (isFiatPayment ? 'sm:h-[647px]' : 'sm:h-[604px]'));
  const outerBoxHeightClass = (isBonusesTab || isWithdrawTxTab) ? 'sm:h-[462px]' : (isFiatAddress ? 'sm:h-[503px]' : (isFiatPayment ? 'sm:h-[517px]' : 'sm:h-[474px]'));
  const innerBoxHeightClass = (isBonusesTab || isWithdrawTxTab) ? 'sm:h-[409px]' : (isFiatAddress ? 'sm:h-[450px]' : (isFiatPayment ? 'sm:h-[464px]' : 'sm:h-[421px]'));

  return createPortal(
    <div className="fixed inset-0 z-[100] sm:overflow-y-auto">
      <div
        className="fixed  inset-0 bg-[#0C1733]/70 backdrop-blur-[8px]"
        onClick={onClose}
      />

      <div className="relative h-full sm:min-h-full flex items-center justify-center p-0 sm:py-[16px] pointer-events-none">
        <div className="relative w-full h-full sm:h-auto sm:w-[calc(100vw-24px)] max-w-[500px] pointer-events-auto">
          <button
            onClick={onClose}
            className="absolute -right-[44px] top-0 z-10 text-white hover:opacity-70 transition-opacity hidden sm:block"
          >
            <X size={24} />
          </button>

          <div className={`relative flex flex-col items-center w-full sm:w-[500px] h-full sm:h-auto ${modalHeightClass} pt-[48px] sm:pt-[24px] px-[20px] pb-[32px] gap-[24px]`}>
            {/* Background & Clipping for Blur */}
            <div className="absolute inset-0 bg-[#091741] rounded-none sm:rounded-[16px] overflow-hidden pointer-events-none">
              <div className="hidden min-[426px]:block absolute top-[-145px] left-1/2 -translate-x-1/2 w-[173px] h-[173px] bg-[#1463FF] blur-[40px] rounded-full" />
            </div>

            <button
              onClick={onClose}
              className="absolute top-[16px] right-[16px] w-[28px] h-[28px] rounded-full bg-[#112F82]/80 hover:bg-[#1463FF] flex items-center justify-center text-white transition-colors sm:hidden z-50"
            >
              <X size={16} />
            </button>

            {/* <div className={`flex flex-col items-start gap-[24px] w-full h-auto my-auto py-8 sm:py-0 ${outerBoxHeightClass} z-40`}> */}
            <div className={`flex flex-col items-start gap-[24px] w-full h-auto ${outerBoxHeightClass} z-40`}>
              <div className="flex flex-row justify-center items-start gap-[12px] w-full h-[29px]">
                <div className="flex flex-row items-center gap-[12px] h-[29px]">
                  <div className="relative flex items-center justify-center w-[20px] h-[20px] shrink-0">
                    <Image src="/wallet.svg" width={20} height={20} alt="Wallet" className="absolute top-0 left-0" />
                  </div>
                  <h2 className="font-['Jost'] font-extrabold text-[20px] leading-[29px] tracking-[0.01em] text-white">
                    Wallet
                  </h2>
                </div>
              </div>

              <div className={`flex flex-col items-start gap-[16px] w-full h-auto ${innerBoxHeightClass}`}>
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
                      <div className="flex flex-col items-start p-[20px_16px] gap-[16px] w-full bg-[#0C1F56] rounded-[16px] z-20 relative h-[287px]">
                        <p className="font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] text-center tracking-[0.02em] text-[#A5B8EF] w-full">
                          Your transaction in progress and pending confirmation from the blockchain.
                        </p>

                        <div className="flex flex-row justify-center items-center gap-[10px] w-full h-[120px]">
                          <div className="w-[40px] h-[40px] flex items-center justify-center relative">
                            <CrownLightningIcon className="text-[#A5B8EF] w-[29px] h-[21px]" />
                          </div>
                          <div className="w-[40px] h-[40px] flex items-center justify-center relative">
                            <CrownLightningIcon className="text-[#A5B8EF] w-[29px] h-[21px]" />
                          </div>
                          <div className="w-[40px] h-[40px] flex items-center justify-center relative">
                            <CrownLightningIcon className="text-[#112F82] w-[29px] h-[21px]" />
                          </div>
                        </div>

                        <p className="font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] text-center tracking-[0.02em] text-[#A5B8EF] w-full">
                          1 confirmation is required for deposits to be credited.<br />Want to know how many confirmations this transaction has?<br />Please <span className="text-[#FFC83D] cursor-pointer hover:underline">click here</span>.
                        </p>
                      </div>
                    ) : (
                      <div className={`flex flex-col items-start p-[16px] gap-[16px] w-full ${isFiatAddress ? 'h-auto sm:h-[404px]' : (isFiatPayment ? 'h-auto sm:h-[418px]' : 'h-auto sm:h-[375px]')} bg-[#0C1F56] rounded-[16px] z-20 relative`}>

                        <div ref={bonusRef} className="relative flex flex-col gap-[8px] w-full z-30">
                          <label className="flex items-center w-full h-[16px] font-[family-name:var(--font-manrope)] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">
                            {selectedPayment.id === 'fiat' ? 'Select a Bonus' : '1.Select a Bonus'}
                          </label>
                          <button
                            onClick={() => { setIsBonusOpen(!isBonusOpen); setIsPaymentOpen(false); }}
                            className={`flex flex-row items-center justify-between px-[16px] py-[10px] w-full h-[40px] bg-[#112F82] hover:bg-[#1A3FA6] transition-colors ${isBonusOpen ? 'rounded-t-[8px] border border-[#1463FF] border-b-0' : 'rounded-[8px]'}`}
                          >
                            <div className="flex flex-row items-center gap-[8px]">
                              <div className="w-[16px] h-[16px] flex items-center justify-center shrink-0">
                                <RenderBonusIcon type={selectedBonus.iconType} />
                              </div>
                              <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] min-[375px]:text-[13px] min-[425px]:text-[14px] leading-[19px] tracking-[0.02em] text-white">
                                {selectedBonus.title}
                              </span>
                            </div>
                            <ChevronDown size={14} className={`text-[#A5B8EF] transition-transform ${isBonusOpen ? 'rotate-180' : ''}`} />
                          </button>

                          {isBonusOpen && (
                            <div className="absolute top-[64px] left-0 w-full bg-[#112F82] border border-[#1463FF] border-t-0 rounded-b-[8px] flex flex-col overflow-hidden shadow-xl z-50">
                              <div className="px-[16px] py-[10px]">
                                <span className="font-[family-name:var(--font-manrope)] font-bold text-[12px] text-white">Choose one bonus on next deposits</span>
                              </div>

                              {bonuses.map((bonus) => {
                                const isSelected = selectedBonus.id === bonus.id;
                                return (
                                  <button
                                    key={bonus.id}
                                    className={`flex flex-row items-center gap-[12px] px-[16px] py-[10px] text-left transition-colors ${isSelected ? 'bg-[#1463FF]' : 'bg-[#112F82] hover:bg-[#1A3FA6]'}`}
                                    onClick={() => { setSelectedBonus(bonus); setIsBonusOpen(false); }}
                                  >
                                    <div className="shrink-0 flex items-center justify-center">
                                      <RenderBonusIcon
                                        type={bonus.iconType}
                                        className={`w-[16px] h-[16px] ${isSelected ? 'text-white' : 'text-[#A5B8EF]'}`}
                                      />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                      <span className={`font-[family-name:var(--font-manrope)] font-bold text-[12px] leading-[16px] tracking-[0.02em] ${isSelected ? 'text-white' : 'text-[#A5B8EF]'}`}>{bonus.title}</span>
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
                            className={`flex flex-row items-center justify-between px-[16px] py-[10px] w-full h-[40px] bg-[#112F82] hover:bg-[#1A3FA6] transition-colors ${isPaymentOpen ? 'rounded-t-[8px] border border-[#1463FF] border-b-0' : 'rounded-[8px]'}`}
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
                            <div className="absolute top-[63px] left-0 w-full bg-[#112F82] border border-[#1463FF] border-t-0 rounded-b-[8px] flex flex-col overflow-hidden shadow-xl z-50">
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
                            <div className="flex flex-row items-start gap-[8px] w-full h-[28px]">
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
                              <div className="flex flex-row items-center gap-[8px] w-full h-[40px]">
                                <div className="flex-1 flex flex-row items-center px-[16px] h-[40px] bg-[#112F82] rounded-[8px]">
                                  <Image src="/d-doller.svg" width={16} height={16} alt="USD" className="shrink-0 mr-[8px]" />
                                  <input
                                    type="text"
                                    defaultValue="100"
                                    className="bg-transparent border-none outline-none font-['Manrope'] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-white w-full"
                                  />
                                </div>

                                <div className="w-[40px] h-[40px] bg-[#1463FF] rounded-[8px] flex flex-col items-center justify-center shrink-0">
                                  <ArrowRightLeft size={16} className="text-white" />
                                </div>

                                <div className="flex-1 flex flex-row items-center px-[16px] h-[40px] bg-[#112F82] rounded-[8px]">
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
                              <div className="flex flex-row items-center justify-between px-[16px] w-full h-[40px] bg-[#112F82] rounded-[8px]">
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
                          <div className="flex flex-col gap-[12px] w-full h-auto">
                            <div className="flex flex-col gap-[8px] w-full h-auto">
                              <div className="flex flex-row items-center gap-[8px] w-full h-[16px]">
                                <label className="font-[family-name:var(--font-manrope)] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3] h-[16px]">
                                  Enter your address
                                </label>
                              </div>
                              <div className="flex flex-row items-start gap-[8px] w-full h-auto">
                                <div className="w-[12px] h-[12px] relative mt-[2px]">
                                  <div className="absolute inset-0 bg-[#7795E8] [mask-image:url('/error.svg')] [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]" />
                                </div>
                                <p className="font-[family-name:var(--font-manrope)] font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8] flex-1">
                                  Please fill up your address details before completing your deposit. This information is required for credit card deposits.
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-col gap-[12px] w-full h-[144px]">
                              <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] w-full h-[40px] bg-[#112F82] rounded-[8px]">
                                <input type="text" placeholder="Street" spellCheck="false" className="w-full bg-transparent border-none outline-none font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder:text-[#A5B8EF]" />
                              </div>

                              <div className="grid grid-cols-2 gap-[8px] w-full h-[40px]">
                                <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] w-full h-[40px] bg-[#112F82] rounded-[8px]">
                                  <input type="text" placeholder="City" spellCheck="false" className="w-full bg-transparent border-none outline-none font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder:text-[#A5B8EF] min-w-0" />
                                </div>
                                <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] w-full h-[40px] bg-[#112F82] rounded-[8px]">
                                  <input type="text" placeholder="Postal Code" spellCheck="false" className="w-full bg-transparent border-none outline-none font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder:text-[#A5B8EF] min-w-0" />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-[8px] w-full h-[40px]">
                                <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] w-full h-[40px] bg-[#112F82] rounded-[8px]">
                                  <input type="text" placeholder="State" spellCheck="false" className="w-full bg-transparent border-none outline-none font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder:text-[#A5B8EF] min-w-0" />
                                </div>
                                <div ref={countryRef} className="relative w-full h-[40px]">
                                  <div
                                    onClick={() => setIsCountryOpen(!isCountryOpen)}
                                    className={`flex flex-row items-center px-[10px] sm:px-[16px] py-[10px] gap-[8px] sm:gap-[10px] w-full h-[40px] bg-[#112F82] hover:bg-[#1A3FA6] transition-colors cursor-pointer ${isCountryOpen ? 'rounded-t-[8px] border border-[#1A3FA6] border-b-0' : 'rounded-[8px]'}`}
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
                                    <div className="absolute top-[40px] left-0 w-full sm:w-[210px] bg-[#0C1F56] border border-[#1A3FA6] rounded-b-[8px] overflow-hidden z-30 shadow-lg max-h-[150px] overflow-y-auto [&::-webkit-scrollbar]:hidden">
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
                            <div className="flex flex-col gap-[8px] w-full h-[64px]">
                              <label className="font-[family-name:var(--font-manrope)] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3] h-[16px]">
                                Select an amount
                              </label>
                              <div className="flex flex-row gap-[8px] w-full h-[40px]">
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

                            <div className="flex flex-col gap-[12px] w-full h-[146px]">
                              <label className="font-[family-name:var(--font-manrope)] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3] h-[16px]">
                                Enter your payment details
                              </label>
                              <div className="flex flex-col gap-[12px] w-full h-[92px]">
                                <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] w-full h-[40px] bg-[#112F82] rounded-[8px]">
                                  <input type="text" placeholder="Credit Card Number" spellCheck="false" className="w-full bg-transparent border-none outline-none font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder:text-[#A5B8EF]" />
                                </div>
                                <div className="flex flex-row items-start gap-[8px] w-full h-[40px]">
                                  <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] flex-1 h-[40px] bg-[#112F82] rounded-[8px]">
                                    <input type="text" placeholder="Exp." spellCheck="false" className="w-full bg-transparent border-none outline-none font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder:text-[#A5B8EF]" />
                                  </div>
                                  <div className="flex flex-row items-center px-[16px] py-[10px] gap-[12px] flex-1 h-[40px] bg-[#112F82] rounded-[8px]">
                                    <input type="text" placeholder="CCV" spellCheck="false" className="w-full bg-transparent border-none outline-none font-[family-name:var(--font-manrope)] font-semibold text-[14px] leading-[19px] tracking-[0.02em] text-white placeholder:text-[#A5B8EF]" />
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-row items-start gap-[8px] w-full h-[14px]">
                                <div className="w-[12px] h-[12px] flex items-center justify-center shrink-0">
                                  <Info size={12} className="text-[#7795E8]" />
                                </div>
                                <p className="font-[family-name:var(--font-manrope)] font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8] w-[408px]">
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
                  <div className="flex flex-col items-start p-[16px] gap-[16px] w-full bg-[#0C1F56] rounded-[16px] z-20 relative h-auto overflow-hidden">
                    <div className="flex flex-col items-start gap-[8px] w-full">
                      <label className="font-[family-name:var(--font-manrope)] font-semibold text-[12px] leading-[16px] tracking-[0.02em] text-[#BBCAF3]">If you have a Bonus Code — enter it here</label>
                      <div className="flex flex-row items-center gap-[8px] w-full h-[40px]">
                        <div className={`flex-1 h-full bg-[#112F82] rounded-[8px] px-[16px] flex flex-row items-center justify-between border transition-colors ${isPromoApplied ? 'border-transparent' : 'border-transparent focus-within:border-[#1463FF]'}`}>
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
                          className={`flex flex-row justify-center items-center h-full bg-[#FFC83D] hover:bg-[#F2B926] rounded-[8px] transition-colors shrink-0 ${isPromoApplied ? 'w-[109px]' : 'w-[100px]'}`}
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
                            <span className="font-[family-name:var(--font-jost)] font-bold text-[14px] leading-[20px] tracking-[0.02em] text-white truncate w-full">150% Reload Bonus + 30 Free Spins</span>
                            <div className="flex flex-col gap-[9px] w-full">
                              <div className="flex flex-row gap-[12px] w-full">
                                <div className="flex flex-col gap-[2px] flex-1 min-w-0">
                                  <span className="font-[family-name:var(--font-manrope)] font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#BBCAF3] truncate">Min. Deposit</span>
                                  <span className="font-[family-name:var(--font-jost)] font-bold text-[14px] leading-[20px] tracking-[0.02em] text-white truncate">$30</span>
                                </div>
                                <div className="flex flex-col gap-[2px] flex-1 min-w-0">
                                  <span className="font-[family-name:var(--font-manrope)] font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#BBCAF3] truncate">Max. Cashout</span>
                                  <span className="font-[family-name:var(--font-jost)] font-bold text-[14px] leading-[20px] tracking-[0.02em] text-white truncate">40x</span>
                                </div>
                              </div>
                              <div className="flex flex-row gap-[12px] w-full">
                                <div className="flex flex-col gap-[2px] flex-1 min-w-0">
                                  <span className="font-[family-name:var(--font-manrope)] font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#BBCAF3] truncate">Max. Amount</span>
                                  <span className="font-[family-name:var(--font-jost)] font-bold text-[14px] leading-[20px] tracking-[0.02em] text-white truncate">$30</span>
                                </div>
                                <div className="flex flex-col gap-[2px] flex-1 min-w-0">
                                  <span className="font-[family-name:var(--font-manrope)] font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#BBCAF3] truncate">Wager (dep. + bonus)</span>
                                  <span className="font-[family-name:var(--font-jost)] font-bold text-[14px] leading-[20px] tracking-[0.02em] text-white truncate">10x</span>
                                </div>
                              </div>
                            </div>
                            <button className="flex flex-row justify-center items-center py-[10px] w-full h-[40px] bg-[#FFC83D] hover:bg-[#F2B926] rounded-[6px] transition-colors mt-[4px]">
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
                  <div className="flex flex-col items-center justify-center p-[24px] sm:p-0 gap-[16px] w-full bg-[#0C1F56] sm:bg-transparent rounded-[16px] sm:rounded-none z-20 relative h-[363px] sm:h-full">
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
            </div>

            {activeTab === 'deposit' && (
              <div className="flex flex-col gap-[12px] items-center z-10 w-full justify-center">
                {isPending ? (
                  <>
                    <button
                      onClick={() => {
                        onClose();
                        router.push('/');
                      }}
                      className="flex flex-row justify-center items-center px-[30px] py-[10px] w-[300px] h-[50px] bg-[#FFC83D] hover:bg-[#F2B926] transition-colors rounded-[8px]"
                    >
                      <span className="font-[family-name:var(--font-manrope)] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-[#1A1404]">
                        Go to games
                      </span>
                    </button>

                    <div className="flex flex-row justify-center items-center gap-[8px]">
                      <Image src="/error.svg" width={20} height={20} alt="Info" className="shrink-0" />
                      <span className="font-[family-name:var(--font-manrope)] font-medium text-[10px] leading-[14px] tracking-[0.02em] text-[#7795E8]">
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
                    className="flex flex-row justify-center items-center px-[30px] py-[10px] w-[300px] h-[50px] bg-[#FFC83D] hover:bg-[#F2B926] transition-colors rounded-[8px]"
                  >
                    <span className="font-['Manrope'] font-bold text-[14px] leading-[19px] tracking-[0.02em] text-[#1A1404]">
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
    <Crown className={className} fill="currentColor" />
  );
}
