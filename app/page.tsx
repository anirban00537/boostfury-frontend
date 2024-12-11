"use client";
import React from "react";
import LandingNavbar from "@/components/landing/Landing-Navbar.comp";
import Hero from "@/components/landing/Hero.comp";
import Testimonial from "@/components/landing/Testimonial.comp";
import Footer from "@/components/landing/Footer.comp";
import FeaturesSection from "@/components/landing/Features.comp";
import PlanSection from "@/components/landing/Pricing.comp";

import HowItWorksSection from "@/components/landing/How-It-Works.comp";
const Page = () => {
  return (
    <div className="bg-background min-h-screen">
      <LandingNavbar />
        <Hero />
        <section id="features">
          <FeaturesSection />
        </section>
        <section id="how-it-works">
          <HowItWorksSection />
        </section>
        <section id="plans">
          <PlanSection />
        </section>
        <section id="testimonials">
          <Testimonial />
        </section>
      <Footer />
    </div>
  );
};

export default Page;
