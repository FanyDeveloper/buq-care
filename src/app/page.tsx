import Header from "@/components/layout/Header/Header";
import Hero from "@/components/sections/Hero/Hero";
import Trajectory from "@/components/sections/Trajectory/Trajectory";
import Categories from "@/components/sections/Categories/Categories";
import Showcase from "@/components/sections/Showcase/Showcase";
import Banners from "@/components/sections/Banners/Banners";
import BodySplash from "@/components/sections/BodySplash/BodySplash";
import Bestsellers from "@/components/sections/Bestsellers/Bestsellers";
import Founder from "@/components/sections/Founder/Founder";
import Footer from "@/components/layout/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Trajectory />
        <Categories />
        <Banners />
        <Showcase />
        <BodySplash />
        <Bestsellers />
        <Founder />
      </main>
      <Footer />
    </>
  );
}
