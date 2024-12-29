import { motion } from "framer-motion";
import { Star, Quote, Sparkles } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    text: "BoostFury has completely transformed my LinkedIn presence. I've seen a 300% increase in engagement and my network has grown exponentially. The AI-generated content is incredibly natural and engaging.",
    author: "Sarah Chen",
    position: "Marketing Director at TechCorp",
    rating: 5,
    stats: {
      engagement: "+300%",
      followers: "12K+",
      posts: "150+",
    },
    color: "#0A66C2",
    gradient: "from-[#0A66C2]/10 to-[#2C8EFF]/5",
  },
  {
    id: 2,
    text: "The carousel templates are stunning, and the AI suggestions are spot-on. I've saved countless hours on content creation while maintaining a professional and consistent brand image.",
    author: "Michael Rodriguez",
    position: "Startup Founder & LinkedIn Influencer",
    rating: 5,
    stats: {
      engagement: "+250%",
      followers: "8K+",
      posts: "90+",
    },
    color: "#845EF7",
    gradient: "from-[#845EF7]/10 to-[#9775FA]/5",
  },
  {
    id: 3,
    text: "As a thought leader in the tech space, quality content is crucial. BoostFury helps me maintain a strong presence without compromising on authenticity. The analytics insights are invaluable.",
    author: "Emily Watson",
    position: "Tech Innovation Consultant",
    rating: 5,
    stats: {
      engagement: "+400%",
      followers: "15K+",
      posts: "200+",
    },
    color: "#20C997",
    gradient: "from-[#20C997]/10 to-[#38D9A9]/5",
  },
];

const Testimonial = () => {
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
                Success Stories
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
              Loved by LinkedIn
              <span className="bg-gradient-to-r from-[#0A66C2] to-[#2C8EFF] bg-clip-text text-transparent">
                {" "}
                Professionals
              </span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              See how professionals are transforming their LinkedIn presence
              with our AI-powered platform
            </p>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group relative h-full">
                <div
                  className={cn(
                    "absolute inset-0 rounded-3xl bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-all duration-500",
                    testimonial.gradient
                  )}
                />

                <div className="relative h-full p-8 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 transition-colors duration-300">
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <div
                      className={cn(
                        "relative flex items-center justify-center w-10 h-10 rounded-xl",
                        `bg-gradient-to-b ${testimonial.gradient}`
                      )}
                    >
                      <Quote
                        className="w-5 h-5"
                        style={{ color: testimonial.color }}
                      />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4"
                        style={{ color: testimonial.color }}
                        fill={testimonial.color}
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-slate-600 leading-relaxed mb-6">
                    "{testimonial.text}"
                  </p>

                  {/* Stats Grid */}
                  <div
                    className={cn(
                      "grid grid-cols-3 gap-4 p-4 rounded-xl mb-6",
                      testimonial.gradient
                    )}
                  >
                    {Object.entries(testimonial.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div
                          className="text-lg font-semibold"
                          style={{ color: testimonial.color }}
                        >
                          {value}
                        </div>
                        <div className="text-xs text-slate-600 capitalize">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "relative flex items-center justify-center w-12 h-12 rounded-xl text-white font-medium text-lg",
                        `bg-gradient-to-br from-${testimonial.color} to-${testimonial.color}/80`
                      )}
                      style={{
                        background: `linear-gradient(to bottom right, ${testimonial.color}, ${testimonial.color}cc)`,
                      }}
                    >
                      {testimonial.author
                        .split(" ")
                        .map((name) => name[0])
                        .join("")}
                    </div>
                    <div>
                      <div
                        className="font-semibold"
                        style={{ color: testimonial.color }}
                      >
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-slate-600">
                        {testimonial.position}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
