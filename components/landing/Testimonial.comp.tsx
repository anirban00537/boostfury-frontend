import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    text: "BoostFury has completely transformed my LinkedIn presence. I've seen a 300% increase in engagement and my network has grown exponentially. The AI-generated content is incredibly natural and engaging.",
    author: "Sarah Chen",
    position: "Marketing Director at TechCorp",
    image: "/testimonials/person-1.jpeg",
    rating: 5,
    stats: {
      engagement: "+300%",
      followers: "12K+",
      posts: "150+"
    }
  },
  {
    id: 2,
    text: "The carousel templates are stunning, and the AI suggestions are spot-on. I've saved countless hours on content creation while maintaining a professional and consistent brand image.",
    author: "Michael Rodriguez",
    position: "Startup Founder & LinkedIn Influencer",
    image: "/testimonials/person-2.jpeg",
    rating: 5,
    stats: {
      engagement: "+250%",
      followers: "8K+",
      posts: "90+"
    }
  },
  {
    id: 3,
    text: "As a thought leader in the tech space, quality content is crucial. BoostFury helps me maintain a strong presence without compromising on authenticity. The analytics insights are invaluable.",
    author: "Emily Watson",
    position: "Tech Innovation Consultant",
    image: "/testimonials/person-3.jpeg",
    rating: 5,
    stats: {
      engagement: "+400%",
      followers: "15K+",
      posts: "200+"
    }
  }
];

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const Testimonial = () => {
  return (
    <section
      id="testimonials"
      className="relative py-32 overflow-hidden"
      role="region"
      aria-label="Customer testimonials"
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
                  Loved by LinkedIn
                </span>
                <br />
                <span className="bg-gradient-to-b from-neutral-700 to-neutral-500 bg-clip-text text-transparent">
                  Professionals
                </span>
              </h2>
              <div className="mt-8 relative">
                <div className="absolute left-1/2 -translate-x-1/2 top-0 h-px w-12 bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
                <p className="mt-6 text-xl text-neutral-600 max-w-2xl mx-auto">
                  See how professionals are transforming their LinkedIn presence with BoostFury
                </p>
              </div>
            </motion.div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid gap-8 grid-cols-1 md:grid-cols-3 place-items-stretch">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={fadeInUpVariant}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.15 }}
                className="group relative w-full h-full"
              >
                {/* Enhanced Glowing Effects */}
                <div className="absolute -inset-[1px] bg-gradient-to-t from-neutral-200/0 via-neutral-200/10 to-neutral-200/0 rounded-2xl group-hover:via-neutral-200/20 transition-all duration-500" />
                <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-neutral-200/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                {/* Testimonial Card */}
                <div className="relative h-full p-8 rounded-2xl bg-white/50 backdrop-blur-sm border border-neutral-200/60 transition-all duration-300 flex flex-col group-hover:translate-y-[-2px]">
                  {/* Quote Icon */}
                  <div className="absolute -top-4 -left-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-neutral-200/40 to-neutral-300/40 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative w-8 h-8 bg-white rounded-full border border-neutral-200/60 shadow-sm flex items-center justify-center">
                        <Quote className="w-4 h-4 text-neutral-900" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-8">
                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-neutral-900 text-neutral-900" />
                      ))}
                    </div>
                    
                    {/* Testimonial Text */}
                    <p className="text-neutral-600 leading-relaxed mb-6">
                      "{testimonial.text}"
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 p-4 rounded-xl mb-6 bg-gradient-to-br from-neutral-50 to-white border border-neutral-200/60">
                      {Object.entries(testimonial.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-semibold text-neutral-900">
                            {value}
                          </div>
                          <div className="text-xs text-neutral-500 capitalize">
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Author Info */}
                  <div className="mt-auto flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-neutral-200/40 to-neutral-300/40 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        width={48}
                        height={48}
                        className="relative rounded-full border-2 border-white shadow-sm"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-neutral-500">
                        {testimonial.position}
                      </div>
                    </div>
                  </div>

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

export default Testimonial;
