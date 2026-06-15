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
    <div className="flex flex-col items-start gap-[20px] w-[1136px] mx-auto flex-none">
      
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
      <div className="flex flex-col items-start gap-[16px] w-[1136px] flex-none">
        {faqData.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index}
              className={`flex flex-col justify-center items-start p-[32px_40px] w-[1136px] bg-[#0C1F56] rounded-[8px] flex-none cursor-pointer transition-all duration-300 ${isOpen ? 'gap-[16px]' : ''}`}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <div className="flex flex-row justify-between items-center w-full flex-none">
                <div className="font-['Jost'] font-extrabold text-[20px] leading-[29px] tracking-[0.01em] text-white">
                  {faq.question}
                </div>
                <div className="flex items-center justify-center w-[20px] h-[20px] text-white">
                  {isOpen ? <Minus size={20} strokeWidth={2.5} /> : <Plus size={20} strokeWidth={2.5} />}
                </div>
              </div>
              
              {isOpen && (
                <div className="font-['Manrope'] font-medium text-[16px] leading-[160%] text-[#A5B8EF] max-w-[1020px] animate-in slide-in-from-top-2 fade-in duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
