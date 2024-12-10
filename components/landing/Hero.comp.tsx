import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { ArrowRightIcon, Sparkles, Star } from "lucide-react";
import AnimatedShinyText from "../magicui/Animated-Shiny-Text.comp";
import { cn } from "@/lib/utils";
import ShimmerButton from "../magicui/Shimmer-Button.comp";
import HeroVideoDialog from "../ui/hero-video-dialog";
import Image from "next/image"; // Added for optimized images

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      when: "beforeChildren",
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Updated people array with new descriptions
const people = [
  {
    id: 1,
    name: "Sarah Johnson",
    designation: "LinkedIn Strategist",
    image: "/persons/person-1.jpeg",
    alt: "Sarah Johnson - LinkedIn Growth Expert using BoostFury",
  },
  {
    id: 2,
    name: "Emma Thompson",
    designation: "Personal Branding Coach",
    image: "/persons/person-2.jpeg",
    alt: "Emma Thompson - Personal Branding Expert creating LinkedIn content",
  },
  {
    id: 3,
    name: "Michael Chen",
    designation: "B2B Marketing Consultant",
    image: "/persons/person-3.jpeg",
    alt: "Michael Chen - B2B Marketing Specialist using AI for LinkedIn growth",
  },
  {
    id: 4,
    name: "David Rodriguez",
    designation: "Thought Leadership Advisor",
    image: "/persons/person-4.jpeg",
    alt: "David Rodriguez - Thought Leadership and LinkedIn Content Strategist",
  },
  {
    id: 5,
    name: "Olivia Parker",
    designation: "LinkedIn Content Creator",
    image: "/persons/person-5.jpeg",
    alt: "Olivia Parker - Professional LinkedIn Content Creator",
  },
  {
    id: 6,
    name: "Sophia Lee",
    designation: "LinkedIn Growth Hacker",
    image: "/persons/person-6.jpeg",
    alt: "Sophia Lee - LinkedIn Growth and Engagement Specialist",
  },
];

// Enhanced with more relevant professional titles based on target audience
const platforms = [
  {
    name: "LinkedIn",
    gradient: "from-[#0077B5] to-[#0A66C2]",
    description: "Professional networking carousels",
  },
  {
    name: "TikTok",
    gradient: "from-[#00F2EA] to-[#FF0050]",
    description: "Viral slide decks",
  },
  {
    name: "Instagram",
    gradient: "from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]",
    description: "Engaging carousel posts",
  },
];

const heroTextVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
};

const heroTextChildVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden text-center">
      {/* Simplified gradient effects */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="absolute top-20 -left-4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-8 -right-4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Premium badge */}
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-blue-500/10 border border-primary/20 backdrop-blur-sm shadow-lg mb-8">
          <span className="flex h-2 w-2 rounded-full bg-primary" />
          <span className="text-sm font-medium bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            AI-Powered LinkedIn Growth
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          Create{" "}
          <span className="bg-gradient-to-r from-primary via-blue-500 to-primary bg-clip-text text-transparent">
            Viral
          </span>{" "}
          LinkedIn Content in Minutes
        </h1>

        {/* Subheadline */}
        <p className="text-xl text-textColor/70 max-w-xl leading-relaxed mb-8">
          Transform your LinkedIn presence with AI-generated carousels, posts, and content strategies. Save hours of work and{" "}
          <span className="font-semibold text-primary">
            10x your engagement
          </span>
          .
        </p>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          {/* Primary CTA */}
          <Link href="/ai-writer" className="w-full sm:w-auto group relative">
            <div className="absolute -inset-[2px] bg-gradient-to-r from-primary to-blue-600 rounded-xl blur-sm opacity-70 group-hover:opacity-100 transition-opacity" />
            <div className="relative h-14 px-8 flex items-center justify-center rounded-lg bg-primary font-semibold text-white text-lg">
              Start Free Trial
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </div>
          </Link>

          {/* Watch Demo Button */}
          <HeroVideoDialog
            className="w-full sm:w-auto"
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/4pgUovPcVBM"
            thumbnailSrc="/demo.png"
            thumbnailAlt="Watch demo"
            buttonClassName="group relative h-14"
            buttonContent={
              <>
                <div className="absolute -inset-[2px] bg-gradient-to-r from-gray-400/20 to-gray-600/20 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity" />
                <div className="relative h-full px-8 flex items-center justify-center gap-3 rounded-lg bg-background/80 backdrop-blur-sm border border-white/10">
                  <div className="flex items-center justify-center size-8 rounded-full bg-white/10">
                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
                  </div>
                  <span className="font-medium">Watch Demo (2 min)</span>
                </div>
              </>
            }
          />
        </div>

        {/* Social Proof */}
        <div className="space-y-6 mb-12">
          <div className="flex items-center gap-6 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="flex -space-x-3">
              {people.slice(0, 4).map((person) => (
                <div key={person.id} className="ring-2 ring-background rounded-full">
                  <Image
                    src={person.image}
                    alt={person.alt}
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-background"
                  />
                </div>
              ))}
            </div>
            <div>
              <div className="font-semibold text-gradient bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                10,000+ professionals
              </div>
              <div className="text-sm text-textColor/70">
                trust BoostFury
              </div>
            </div>
          </div>
        </div>

        {/* Image at the bottom */}
        <div className="relative w-full max-w-4xl">
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 p-3 rounded-xl border border-white/20 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src="/demo.png"
                alt="BoostFury LinkedIn Content Creator"
                width={1200}
                height={900}
                className="rounded-lg shadow-2xl"
              />
              {/* Glass overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-white/5 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
