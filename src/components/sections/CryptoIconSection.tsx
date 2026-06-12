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

const icons = [Bitcoin, Gem, CircleDollarSign, Triangle, X, Hexagon, Dog, Zap, Cat, Coins, Aperture];

export default function CryptoIconSection() {
    return (
        <section className="relative w-full border-b border-[#112F82] px-4 md:px-[40px] py-4 md:py-0 md:h-[100px] flex items-center justify-center overflow-hidden isolate">
            <div
                className="absolute w-[390px] h-[390px] bg-[#1463FF] pointer-events-none rounded-full"
                style={{
                    left: 'calc(50% - 195px)',
                    top: '77px',
                    filter: 'blur(50px)',
                    zIndex: 0
                }}
            />
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-[28px] relative z-[1]">
                {icons.map((Icon, i) => (
                    <div key={i} className="flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0">
                        <Icon size={19} strokeWidth={2} />
                    </div>
                ))}
            </div>
        </section>
    );
}
