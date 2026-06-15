import Container from "@/components/layout/Container";
import Sidebar from "@/components/layout/Sidebar";
import HeroBanner from "@/components/sections/HeroBanner";
import HeroSection1 from "@/components/sections/HeroSection1";
import TabSection from "@/components/sections/TabSection";
import GameSlider from "@/components/sections/GameSlider";
import Image from "next/image";
import { Cherry, Zap, Rocket, Dices, CircleDollarSign } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
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
import Footer from "@/components/layout/Footer";
import PromotionSection from "@/components/sections/PromotionSection";
import GameOpen from "@/components/sections/GameOpen";
import ReferFriend from "@/components/sections/ReferFriend";

export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const session = await getServerSession(authOptions);
  
  // Await the searchParams Promise in Next.js 15
  const resolvedParams = await searchParams;
  const gameId = resolvedParams?.game as string | undefined;
  const view = resolvedParams?.view as string | undefined;

  return (
    <Container>
      <div className="flex gap-4 lg:gap-6 w-full">
        <Sidebar />
        <main className="flex-1 min-w-0 flex flex-col gap-6 md:gap-8 lg:gap-10 overflow-hidden">
          {view === 'refer' ? (
            <ReferFriend />
          ) : gameId ? (
            <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
              <GameOpen gameId={gameId} />
              
              <div id="other-games">
                <GameSlider
                  title="OTHER GAMES YOU MIGHT LIKE"
                  icon={<img src="/other.svg" alt="Other" className="w-[30px] h-[30px] shrink-0" />}
                  games={slotsData.slice(0, 10)}
                />
              </div>
            </div>
          ) : (
            <>
              <HeroBanner />
              {session ? <TabSection /> : <HeroSection1 />}

          <div id="tab-content-container" className="flex flex-col gap-6 md:gap-8 lg:gap-10">
            <div id="slots" className="tab-content">
              <GameSlider
                title="SLOTS (1,487)"
                icon={<Image src="/slots.svg" alt="Slots" width={30} height={30} className="w-[30px] h-[30px] shrink-0 object-contain" />}
                games={slotsData}
              />
            </div>

            <div id="originals" className="tab-content">
              <GameSlider
                title="ORIGINALS (14)"
                icon={<Image src="/orignals.svg" alt="Originals" width={30} height={30} className="w-[30px] h-[30px] shrink-0 object-contain" />}
                games={originalsData}
              />
            </div>

            {
              session ? <PromotionSection /> : <WhyJoin />
            }

            <div id="crash-games" className="tab-content">
              <GameSlider
                title="CRASH GAMES (723)"
                icon={<Image src="/crashgame.svg" alt="Crash Games" width={30} height={30} className="w-[30px] h-[30px] shrink-0 object-contain" />}
                games={crashGamesData}
              />
            </div>

            <div id="providers" className="tab-content">
              <ProviderSection />
            </div>

            <div id="table-games" className="tab-content">
              <GameSlider
                title="TABLE GAMES (51)"
                icon={<Image src="/tg.svg" alt="Table Games" width={30} height={30} className="w-[30px] h-[30px] shrink-0 object-contain" />}
                games={tableGamesData}
              />
            </div>

            <div id="bonus-buys" className="tab-content">
              <GameSlider
                title="BONUS BUYS (145)"
                icon={<Image src="/bb.svg" alt="Bonus Buys" width={30} height={30} className="w-[30px] h-[30px] shrink-0 object-contain" />}
                games={bonusBuysData}
              />
            </div>

            <div id="collection" className="tab-content">
              <CollectionSection />
            </div>
            <div id="recent-winners" className="tab-content">
              <RecentWinnerSection />
            </div>
            </div>
            </>
          )}
          <AboutSection />
          <CryptoIconSection />
          <Footer />
        </main>
      </div>
    </Container>
  );
}
