import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: 19,
    description: "Perfect for individuals and small businesses",
    features: [
      "5 AI-generated posts per month",
      "Basic analytics dashboard",
      "Standard templates",
      "Email support",
      "Export as PDF & Images",
      "Basic customization",
      "Community access",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: 29,
    description: "For professionals who need more power",
    features: [
      "Unlimited AI-generated posts",
      "Advanced analytics & insights",
      "Premium templates",
      "Priority support 24/7",
      "Custom branding",
      "Team collaboration",
      "API access",
      "Advanced customization",
      "Viral post suggestions",
      "Content calendar",
    ],
    popular: true,
  },
];

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="relative py-32 overflow-hidden"
      role="region"
      aria-label="Pricing plans"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] leading-tight font-bold">
                <span className="bg-gradient-to-b from-black to-neutral-800 bg-clip-text text-transparent">
                  Simple pricing
                </span>
                <br />
                <span className="bg-gradient-to-b from-neutral-700 to-neutral-500 bg-clip-text text-transparent">
                  for everyone
                </span>
              </h2>
              <div className="mt-8 relative">
                <div className="absolute left-1/2 -translate-x-1/2 top-0 h-px w-12 bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
                <p className="mt-6 text-xl text-neutral-600 max-w-2xl mx-auto">
                  Choose the perfect plan for your content creation needs
                </p>
              </div>
            </motion.div>
          </div>

          {/* Pricing Cards */}
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                variants={fadeInUpVariant}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.15 }}
                className="group relative w-full h-full"
              >
                {/* Enhanced Glowing Effects */}
                <div className="absolute -inset-[1px] bg-gradient-to-t from-neutral-200/0 via-neutral-200/10 to-neutral-200/0 rounded-2xl group-hover:via-neutral-200/20 transition-all duration-500" />
                <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-neutral-200/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                {/* Pricing Card */}
                <div className="relative h-full p-8 rounded-2xl bg-white/50 backdrop-blur-sm border border-neutral-200/60 transition-all duration-300 flex flex-col group-hover:translate-y-[-2px]">
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="relative px-4 py-1 bg-neutral-900 rounded-full">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neutral-800 to-neutral-900 opacity-50 blur-sm" />
                        <span className="relative text-sm font-medium text-white">Popular</span>
                      </div>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2">{plan.name}</h3>
                    <p className="text-neutral-600 mb-6">{plan.description}</p>
                    <div className="flex items-end justify-center gap-2">
                      <span className="text-4xl font-bold text-neutral-900">${plan.price}</span>
                      <span className="text-neutral-600 mb-1">/month</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="relative mt-1">
                          <div className="absolute inset-0 bg-neutral-400/20 rounded-full blur-[2px]" />
                          <div className="relative size-4 rounded-full bg-gradient-to-br from-neutral-900 to-neutral-800 flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        </div>
                        <span className="text-neutral-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    href="/signup"
                    className={cn(
                      "relative px-6 py-3 rounded-xl font-medium text-center",
                      "transition-all duration-300",
                      plan.popular
                        ? "bg-neutral-900 text-white hover:bg-neutral-800"
                        : "bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50"
                    )}
                  >
                    Get Started
                    <ArrowRight className="inline-block ml-2 w-4 h-4" />
                  </Link>

                  {/* Bottom Glowing Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-[1px]">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-300/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-300/20 to-transparent blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
