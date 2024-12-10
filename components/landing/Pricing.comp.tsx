import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";
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
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const PricingSection = () => {
  return (
    <section className="relative py-32 overflow-hidden bg-white" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={fadeInUpVariant}
          initial="hidden"
          animate="visible" 
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm mb-8">
            <div className="size-6 rounded-full bg-gradient-to-br from-primary/10 to-blue-500/10 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="text-sm font-medium bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Simple & Transparent Pricing
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
            Choose Your Plan
          </h2>
          <p className="text-lg text-gray-600">
            Start creating viral LinkedIn content today with our flexible plans
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={fadeInUpVariant}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.2 }}
              className={cn(
                "relative group rounded-2xl overflow-hidden",
                "bg-white transition-all duration-500",
                plan.popular ? "shadow-xl border-primary/20" : "border-gray-100",
                "hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
                "border"
              )}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500 blur-md opacity-20" />
                    <div className="relative px-4 py-1 bg-gradient-to-r from-primary to-blue-500 text-white text-sm font-medium rounded-b-lg">
                      Most Popular
                    </div>
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      ${plan.price}
                    </span>
                    <span className="ml-2 text-gray-500">/month</span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-600">
                      <div className="relative mt-1">
                        <div className="absolute inset-0 bg-primary/40 rounded-full blur-[2px]" />
                        <Check className="w-4 h-4 text-primary relative" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link 
                  href="/signup" 
                  className={cn(
                    "group relative block",
                    "w-full py-4 px-6 rounded-xl text-center",
                    "transition-all duration-300",
                    plan.popular
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "bg-gray-50 text-gray-900 hover:bg-gray-100"
                  )}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="font-medium">
                      Get Started
                    </span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>

              {/* Bottom Gradient Line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent translate-x-[-50%] group-hover:translate-x-[50%] transition-transform duration-1000" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
