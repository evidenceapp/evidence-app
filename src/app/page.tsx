"use client";

import ContactSection from '@/components/ContactSection';
import Feedback from '@/components/Feedback';
import Footer from '@/components/Footer';
import Galery from '@/components/Galery';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import HorizontalRoadmap from '@/components/HorizontalRoadmap';
import PostsSection from '@/components/PostsSection';
import ScrollDownHint from '@/components/ScrollDownHint';
import TeamSection from '@/components/TeamSection';
import WhatsappFloatingButton from '@/components/WhatsappFloatingButton';

export default function HomePage() {
  return (
    <div>
      <Header />
      <ScrollDownHint />
      <ContactSection />
      <HeroSection
        name="Evidence Instituto Clínico"
        slogan="Saúde, Reabilitação e Performance"
        buttonText="Agende agora"
      />
      <HorizontalRoadmap />
      <PostsSection />
      <Galery />
      <TeamSection />
      <Feedback />
      <WhatsappFloatingButton />
      <Footer />
    </div>
  );
}
