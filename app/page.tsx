"use client";
import React from "react";
import { motion } from "framer-motion";
import { GradientButton } from "@/components/ui/gradient-button";
import Link from "next/link";
import Image from "next/image";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { LinkedInNotifications } from "@/components/landing/LinkedInNotifications";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import {
  Sparkles,
  Bot,
  Zap,
  Calendar,
  Shuffle,
  Wand2,
  Clock,
  Users,
  Trophy,
  Check,
} from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { ValueProps } from "@/components/landing/ValueProps";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { Pricing } from "@/components/landing/Pricing";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";
import { getPackagesAction } from "./actions/packages";

export default async function Page() {
  const packages = await getPackagesAction();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <ValueProps />
      <FeaturesGrid />
      <Pricing packages={packages} />
      <CTA />
      <Footer />
    </div>
  );
}
