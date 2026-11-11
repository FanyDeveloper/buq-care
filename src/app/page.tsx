import Header from "@/components/layout/Header/Header";
import Hero from "@/components/sections/Hero/Hero";
import Trajectory from "@/components/sections/Trajectory/Trajectory";
import Categories from "@/components/sections/Categories/Categories";
import Showcase from "@/components/sections/Showcase/Showcase";
import Banners from "@/components/sections/Banners/Banners";
import BodySplash from "@/components/sections/BodySplash/BodySplash";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Trajectory />
        <Categories />
        <Showcase />
        <Banners />
        <BodySplash />
        {/* Próximas seções serão adicionadas aqui */}
      </main>
    </>
  );
}
