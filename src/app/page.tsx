"use client";

import dynamic from "next/dynamic";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhatsappFloatingButton from "@/components/WhatsappFloatingButton";
import sketch1 from "../../public/sketches/1.png";
import sketch2 from "../../public/sketches/2.png";
import sketch3 from "../../public/sketches/3.png";
import sketch4 from "../../public/sketches/4.png";
import sketch5 from "../../public/sketches/5.png";
import image1 from "../../public/images/1.png";
import image2 from "../../public/images/2.png";
import image3 from "../../public/images/3.png";
import image4 from "../../public/images/4.png";
import image5 from "../../public/images/5.png";

const HorizontalRoadmap = dynamic(() => import("@/components/HorizontalRoadmap"), {
  loading: () => <div className="h-96" />,
});
const InfrastructureSection = dynamic(() => import("@/components/InfrastructureSection"), {
  loading: () => <div className="h-96" />,
});
const ContactSection = dynamic(() => import("@/components/ContactSection"), {
  loading: () => <div className="h-96" />,
});
const Galery = dynamic(() => import("@/components/Galery"), {
  loading: () => <div className="h-96" />,
});
const TeamSection = dynamic(() => import("@/components/TeamSection"), {
  loading: () => <div className="h-96" />,
});
const Feedback = dynamic(() => import("@/components/Feedback"), {
  loading: () => <div className="h-96" />,
});
const PostsSection = dynamic(() => import("@/components/PostsSection"), {
  loading: () => <div className="h-96" />,
});
const Footer = dynamic(() => import("@/components/Footer"));

export default function HomePage() {
  return (
    <div>
      <Header />
      <HeroSection
        name="Instituto FisioWellness Evidence"
        slogan="Saúde, Reabilitação e Performance"
        buttonText="Agende agora"
      />
      <HorizontalRoadmap />
      <ContactSection />
      <Galery />
      <InfrastructureSection
        description="Conheça os espaços modernos e equipados para sua recuperação"
        items={[
          {
            id: "sala-1",
            title: "Fachada",
            sketch: sketch1,
            image: image1,
          },
          {
            id: "sala-2",
            title: "Recepção",
            sketch: sketch2,
            image: image2,
          },
          {
            id: "sala-3",
            title: "Fisioterapia",
            sketch: sketch3,
            image: image3,
          },
          {
            id: "sala-4",
            title: "Recuperação",
            sketch: sketch4,
            image: image4,
          },
          {
            id: "sala-5",
            title: "Pilates",
            sketch: sketch5,
            image: image5,
          },
        ]}
      />
      <TeamSection />
      <Feedback />
      <PostsSection />
      <WhatsappFloatingButton />
      <Footer />
    </div>
  );
}
