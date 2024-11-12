import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const PricingSection = () => {
  const plan = {
    name: "Basic Plan",
    price: 9.99,
    description: "Everything you need to create stunning carousels",
    features: [
      "User-Friendly Editor",
      "Multiple Templates",
      "Cross-Platform Compatibility",
      "Data Security",
      "Unlimited manual carousel creation",
      "Access to free templates",
      "Basic analytics",
      "Community support",
      "AI-Generated Content",
      "Dynamic Color Palettes",
      "Modern Backgrounds",
      "Text Customization",
      "PDF Download",
      "Image Download",
    ],
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-primary/70 to-transparent rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-primary/70 to-transparent rounded-full filter blur-3xl"></div>
        </div>
        <div className="absolute top-1/4 left-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/30 to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/3 right-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/30 to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-1/3 h-1/6 bg-gradient-to-br from-primary/30 to-transparent rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-textColor mb-4">
            Simple Pricing for Everyone
          </h2>
          <p className="text-xl text-textColor/70 max-w-2xl mx-auto">
            One plan, all features. Start creating amazing carousels today.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-cardBackground/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="grid md:grid-cols-2">
            <div className="p-10 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-textColor mb-2">
                  {plan.name}
                </h3>
                <p className="text-textColor/70 mb-6">{plan.description}</p>
                <div className="text-5xl font-bold text-primary mb-6">
                  ${plan.price}{" "}
                  <span className="text-xl font-normal text-textColor/70">
                    /month
                  </span>
                </div>
              </div>
              <Link href="/carousel-editor">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-4 px-6 rounded-full font-semibold text-white bg-primary hover:bg-primary-dark transition-colors duration-300 text-lg flex items-center justify-center group"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </div>
            <div className="bg-cardBackground/50 backdrop-blur-sm p-10">
              <h4 className="text-lg font-semibold text-textColor mb-4">
                What's included:
              </h4>
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="flex items-center text-textColor/70"
                  >
                    <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
