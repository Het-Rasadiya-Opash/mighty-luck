import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import HeroBanner from "@/components/sections/HeroBanner";
import HeroSection1 from "@/components/sections/HeroSection1";
import GameSlider from "@/components/sections/GameSlider";
import { Cherry, Zap } from "lucide-react";
import slotsData from "@/data/slotsData.json";

export default function Home() {
  return (
    <Container>
      <div className="flex gap-[24px] w-full">
        <Sidebar />
        <main className="w-[1136px] h-[2644px] flex flex-col gap-[40px]">
          <HeroBanner />
          <HeroSection1 />
          
          <GameSlider 
            title="SLOTS (1,487)" 
            icon={<Cherry className="text-[#FFBF1F] w-[24px] h-[24px] shrink-0" strokeWidth={2} />} 
            games={slotsData} 
          />
          
          <GameSlider 
            title="ORIGINALS (14)" 
            icon={<Zap className="text-[#FFBF1F] w-[24px] h-[24px] shrink-0" strokeWidth={2} fill="#FFBF1F" />} 
            games={slotsData} 
          />
        </main>
      </div>
    </Container>
  );
}
