
import ArriVal from "@/app/ui/Arrival/Arrival";
import Brand from "@/app/ui/Brand/Brand";
import BannerSliderWrapper from "@/app/ui/Banner/BannerSliderWrapper";
import CategoryWrapper from "@/app/ui/Category/CategoryWrapper";
import FeaturedCollection from "@/app/ui/FeaturedCollection/FeaturedCollection";
import Tranding from "@/app/ui/Tranding/Tranding";
import EverydayEssential from "@/app/ui/EverydayEssential/EverydayEssential";
import PopularRightNow from "../ui/PopularRightNow/PopularRightNow";
import GetInGame from "@/app/ui/GetInGame/GetInGame";
import About from "@/app/ui/About/About";
import BestSeller from "@/app/ui/BestSeller/BestSeller";
import MarqueeCom from "@/app/ui/Marquee/Marquee";



export default function Page() {

  return (
    <main className="">
      <BannerSliderWrapper />
      <MarqueeCom />
      <CategoryWrapper />
      <GetInGame />
      <ArriVal />
      <Brand />
      <BestSeller />
      <FeaturedCollection />
      <Tranding />
      <PopularRightNow />
      <EverydayEssential />

      <About />


    </main>
  );
}
