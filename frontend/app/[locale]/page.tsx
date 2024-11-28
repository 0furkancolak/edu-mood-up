import AboutHome from "@/components/home/about/AboutHome";
import WhatWeAim from "@/components/home/aim/WhatWeAim";
import ContactForHome from "@/components/home/contactHome/ContactForHome";
import HeroSection from "@/components/home/heroSection/HeroSection";
import HowWork from "@/components/home/howWork/HowWork";
import Team from "@/components/home/team/Team";

export default async function Home() {
  return (
    <div>
      <HeroSection />
      <AboutHome />
      <WhatWeAim />
      <HowWork />
      <Team />
      <ContactForHome />
    </div>
  );
}
