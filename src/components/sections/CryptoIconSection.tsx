import React from 'react';
import {
    Bitcoin,
    Gem,
    CircleDollarSign,
    Triangle,
    X,
    Hexagon,
    Dog,
    Zap,
    Cat,
    Coins,
    Aperture
} from 'lucide-react';

export default function CryptoIconSection() {
    return (
        <section className="box-border flex flex-row items-center justify-between w-[1136px] h-[100px] border-b border-[#112F82] px-[40px] gap-[79px] isolate relative shrink-0 overflow-hidden">
            <div 
                className="absolute w-[390px] h-[390px] bg-[#1463FF] pointer-events-none rounded-full"
                style={{ 
                    left: 'calc(50% - 195px)',
                    top: '77px',
                    filter: 'blur(50px)',
                    zIndex: 0
                }}
            />
            {/* Frame for Icons */}
            <div className="flex flex-row items-center p-0 gap-[28px] mx-auto w-[461.68px] h-[19.05px] relative z-[1]">

                <div className="flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer shrink-0">
                    <Bitcoin size={19} strokeWidth={2} />
                </div>

                <div className="flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer shrink-0">
                    <Gem size={19} strokeWidth={2} />
                </div>

                <div className="flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer shrink-0">
                    <CircleDollarSign size={19} strokeWidth={2} />
                </div>

                <div className="flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer shrink-0">
                    <Triangle size={19} strokeWidth={2} />
                </div>

                <div className="flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer shrink-0">
                    <X size={19} strokeWidth={2} />
                </div>

                <div className="flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer shrink-0">
                    <Hexagon size={19} strokeWidth={2} />
                </div>

                <div className="flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer shrink-0">
                    <Dog size={19} strokeWidth={2} />
                </div>

                <div className="flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer shrink-0">
                    <Zap size={19} strokeWidth={2} />
                </div>

                <div className="flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer shrink-0">
                    <Cat size={19} strokeWidth={2} />
                </div>

                <div className="flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer shrink-0">
                    <Coins size={19} strokeWidth={2} />
                </div>

                <div className="flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer shrink-0">
                    <Aperture size={19} strokeWidth={2} />
                </div>

            </div>
        </section>
    );
}
