import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import HeroBanner from "@/components/sections/HeroBanner";
import HeroSection1 from "@/components/sections/HeroSection1";
import GameSlider from "@/components/sections/GameSlider";
import { Cherry, Zap, Rocket, Dices, CircleDollarSign } from "lucide-react";
import slotsData from "@/data/slotsData.json";
import originalsData from "@/data/originalsData.json";
import crashGamesData from "@/data/crashGamesData.json";
import tableGamesData from "@/data/tableGamesData.json";
import bonusBuysData from "@/data/bonusBuysData.json";
import WhyJoin from "@/components/sections/WhyJoin";
import ProviderSection from "@/components/sections/ProviderSection";
import CollectionSection from "@/components/sections/CollectionSection";
import RecentWinnerSection from "@/components/sections/RecentWinnerSection";
import AboutSection from "@/components/sections/AboutSection";
import CryptoIconSection from "@/components/sections/CryptoIconSection";

export default function Home() {
  return (
    <Container>
      <div className="flex gap-[24px] w-full">
        <Sidebar />
        <main className="w-[1136px] flex flex-col gap-[40px]">
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
            games={originalsData}
          />

          <WhyJoin />

          <GameSlider
            title="CRASH GAMES (723)"
            icon={<Rocket className="text-[#FFBF1F] w-[24px] h-[24px] shrink-0" strokeWidth={2} fill="#FFBF1F" />}
            games={crashGamesData}
          />

          <ProviderSection />

          <GameSlider
            title="TABLE GAMES (51)"
            icon={<Dices className="text-black w-[24px] h-[24px] shrink-0" strokeWidth={2} fill="#FFBF1F" />}
            games={tableGamesData}
          />

          <GameSlider
            title="BONUS BUYS (145)"
            icon={<CircleDollarSign className="text-black w-[24px] h-[24px] shrink-0" strokeWidth={2} fill="#FFBF1F" />}
            games={bonusBuysData}
          />

          <CollectionSection />
          <RecentWinnerSection />
          <AboutSection />
          <CryptoIconSection />

        </main>
      </div>
    </Container>
  );
}
