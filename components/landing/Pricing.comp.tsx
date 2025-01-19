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
    color: "#0A66C2",
    gradient: "from-[#0A66C2]/10 to-[#2C8EFF]/5",
    features: [
      "1 Linkedin account",
      "100k ai words",
      "Idea generator",
      "Ai viral post generator",
      "Unlimited posts Schedule",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: 29,
    description: "For professionals who need more power",
    color: "#845EF7",
    gradient: "from-[#845EF7]/10 to-[#9775FA]/5",
    features: [
      "3 Linkedin accounts",
      "300k ai words",
      "Idea generator",
      "Ai viral post generator",
      "Unlimited posts Schedule",
    ],
    popular: true,
  },
];

const PricingSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex mb-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#0A66C2]/10 to-[#2C8EFF]/10 border border-[#0A66C2]/20">
              <Sparkles className="w-4 h-4 text-[#0A66C2]" />
              <span className="text-sm font-medium bg-gradient-to-r from-[#0A66C2] to-[#2C8EFF] bg-clip-text text-transparent">
                Simple Pricing
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Choose the perfect plan for your
              <span className="bg-gradient-to-r from-[#0A66C2] to-[#2C8EFF] bg-clip-text text-transparent">
                {" "}
                content needs
              </span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Start creating viral LinkedIn content today with our flexible
              pricing options
            </p>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group relative h-full">
                <div
                  className={cn(
                    "absolute inset-0 rounded-3xl bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-all duration-500",
                    plan.gradient
                  )}
                />

                <div className="relative h-full p-8 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 transition-colors duration-300">
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div
                        className="relative px-4 py-1 rounded-full"
                        style={{ backgroundColor: plan.color }}
                      >
                        <span className="relative text-sm font-medium text-white">
                          Most Popular
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <h3
                      className="text-2xl font-bold mb-2"
                      style={{ color: plan.color }}
                    >
                      {plan.name}
                    </h3>
                    <p className="text-slate-600 mb-6">{plan.description}</p>
                    <div className="flex items-end justify-center gap-2">
                      <span
                        className="text-4xl font-bold"
                        style={{ color: plan.color }}
                      >
                        ${plan.price}
                      </span>
                      <span className="text-slate-600 mb-1">/month</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div
                          className={cn(
                            "relative flex items-center justify-center w-5 h-5 rounded-full mt-0.5",
                            plan.gradient
                          )}
                        >
                          <Check
                            className="w-3 h-3"
                            style={{ color: plan.color }}
                          />
                        </div>
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    href="/signup"
                    className={cn(
                      "relative w-full inline-flex items-center justify-center px-6 py-3 rounded-xl text-white font-medium transition-all duration-200",
                      "hover:scale-[1.02]",
                      plan.popular
                        ? "bg-gradient-to-r from-[#0A66C2] to-[#2C8EFF]"
                        : "bg-slate-900"
                    )}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
