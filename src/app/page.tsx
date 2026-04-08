"use client";

import ContactSection from "@/components/ContactSection";
import Feedback from "@/components/Feedback";
import Footer from "@/components/Footer";
import Galery from "@/components/Galery";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HorizontalRoadmap from "@/components/HorizontalRoadmap";
import PostsSection from "@/components/PostsSection";
import TeamSection from "@/components/TeamSection";
import WhatsappFloatingButton from "@/components/WhatsappFloatingButton";

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
