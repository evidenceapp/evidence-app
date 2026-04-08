"use client";

import dynamic from "next/dynamic";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhatsappFloatingButton from "@/components/WhatsappFloatingButton";

const HorizontalRoadmap = dynamic(() => import("@/components/HorizontalRoadmap"), {
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
      <TeamSection />
      <Feedback />
      <PostsSection />
      <WhatsappFloatingButton />
      <Footer />
    </div>
  );
}
