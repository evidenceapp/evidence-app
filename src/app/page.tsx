"use client";

import dynamic from "next/dynamic";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhatsappFloatingButton from "@/components/WhatsappFloatingButton";

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
            sketch: "/sketches/1.png",
            image: "/images/1.png",
          },
          {
            id: "sala-2",
            title: "Recepção",
            sketch: "/sketches/2.png",
            image: "/images/2.png",
          },
          {
            id: "sala-3",
            title: "Fisioterapia",
            sketch: "/sketches/3.png",
            image: "/images/3.png",
          },
          {
            id: "sala-4",
            title: "Recuperação",
            sketch: "/sketches/4.png",
            image: "/images/4.png",
          },
          {
            id: "sala-5",
            title: "Pilates",
            sketch: "/sketches/5.png",
            image: "/images/5.png",
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
