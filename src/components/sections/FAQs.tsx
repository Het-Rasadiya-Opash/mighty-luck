"use client";

import React, { useState } from 'react';
import { Trophy, Plus, Minus } from 'lucide-react';

const faqData = [
  {
    question: "How do I invite a friend?",
    answer: "In order to participate in the Refer A Friend campaign, as a referrer you need to have an active account at Wild and have at least $50 (or currency equivalent) deposited. Multiple deposits can be summed up in order to meet the minimum deposit requirement."
  },
  {
    question: "How do I invite a friend?",
    answer: "In order to participate in the Refer A Friend campaign, as a referrer you need to have an active account at Wild and have at least $50 (or currency equivalent) deposited. Multiple deposits can be summed up in order to meet the minimum deposit requirement."
  },
  {
    question: "How do I invite a friend?",
    answer: "In order to participate in the Refer A Friend campaign, as a referrer you need to have an active account at Wild and have at least $50 (or currency equivalent) deposited. Multiple deposits can be summed up in order to meet the minimum deposit requirement."
  }
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full">
      {/* Desktop/Tablet View */}
      <div className="hidden md:flex flex-col items-start gap-[20px] w-full max-w-[1136px] mx-auto flex-none">
        {/* Header */}
        <div className="flex flex-row items-center gap-[12px] flex-none">
          <div className="flex items-center justify-center w-[30px] h-[30px]">
            <Trophy className="text-[#FFC83D]" size={24} />
          </div>
          <div className="font-['Jost'] font-extrabold text-[20px] leading-[29px] tracking-[0.01em] text-white">
            FAQs
          </div>
        </div>

        {/* Accordion */}
        <div className="flex flex-col items-start gap-[16px] w-full flex-none">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={`flex flex-col justify-center items-start p-[24px_20px] md:p-[32px_40px] w-full bg-[#0C1F56] rounded-[8px] flex-none cursor-pointer transition-all duration-300 ${isOpen ? 'gap-[16px]' : ''}`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <div className="flex flex-row justify-between items-center w-full flex-none gap-4">
                  <div className="font-['Jost'] font-extrabold text-[18px] md:text-[20px] leading-[26px] md:leading-[29px] tracking-[0.01em] text-white">
                    {faq.question}
                  </div>
                  <div className="flex items-center justify-center w-[20px] h-[20px] text-white shrink-0">
                    {isOpen ? <Minus size={20} strokeWidth={2.5} /> : <Plus size={20} strokeWidth={2.5} />}
                  </div>
                </div>
                
                {isOpen && (
                  <div className="font-['Manrope'] font-medium text-[14px] md:text-[16px] leading-[160%] text-[#A5B8EF] w-full max-w-[1020px] animate-in slide-in-from-top-2 fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile View (max-width: 767px) */}
      <div className="flex md:hidden flex-col items-start p-0 gap-[14.81px] w-[374px] h-[612.81px] flex-none self-stretch grow-0">
        {/* Header */}
        <div className="flex flex-row justify-between items-center p-0 w-[374px] h-[23px] flex-none self-stretch grow-0">
          <span className="w-[42px] h-[23px] font-['Jost'] font-extrabold text-[16px] leading-[23px] tracking-[0.01em] text-white flex-none grow-0">FAQs</span>
        </div>

        {/* Accordion */}
        <div className="flex flex-col items-start p-0 gap-[16px] w-[374px] h-[575px] flex-none self-stretch grow-0">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={`flex flex-row justify-between p-[32px_40px] bg-[#0C1F56] rounded-[8px] w-[374px] flex-none cursor-pointer transition-all duration-300 ${isOpen ? 'h-[343px] items-start gap-[16px]' : 'h-[100px] items-center'}`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <div className={`flex flex-col items-start p-0 flex-none w-[258px] ${isOpen ? 'h-[279px] gap-[16px]' : 'h-[29px]'}`}>
                  <div className="flex flex-row items-center p-0 w-[245px] h-[29px] flex-none grow-0">
                    <span className="w-[245px] h-[29px] font-['Jost'] font-extrabold text-[20px] leading-[29px] tracking-[0.01em] text-white">{faq.question}</span>
                  </div>
                  {isOpen && (
                    <div className="flex flex-row items-start p-0 w-[258px] h-[234px] flex-none self-stretch grow-0">
                      <span className="w-[258px] h-[234px] font-['Manrope'] font-medium text-[16px] leading-[160%] text-[#A5B8EF]">{faq.answer}</span>
                    </div>
                  )}
                </div>
                <div className="w-[20px] h-[20px] flex items-center justify-center flex-none grow-0 relative">
                  {isOpen ? (
                    <div className="relative w-[16px] h-[16px] flex items-center justify-center">
                      <div className="absolute w-[16px] h-0 border-t-2 border-white" />
                    </div>
                  ) : (
                    <div className="relative w-[16px] h-[16px] flex items-center justify-center">
                      <div className="absolute w-[16px] h-0 border-t-2 border-white" />
                      <div className="absolute w-0 h-[16px] border-l-2 border-white" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
