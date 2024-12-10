import { motion } from "framer-motion";
import { Star, Quote, Sparkles } from "lucide-react";
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
      className="relative py-32 overflow-hidden bg-white"
    >
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
              Customer Success Stories
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
            Loved by LinkedIn Professionals
          </h2>
          <p className="text-lg text-gray-600">
            See how professionals are transforming their LinkedIn presence with BoostFury
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={fadeInUpVariant}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.2 }}
              className="group relative bg-white rounded-2xl p-8 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-blue-500/40 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative size-8 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center">
                    <Quote className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="mb-6">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                
                {/* Testimonial Text */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl mb-6">
                  {Object.entries(testimonial.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-lg font-semibold text-primary">
                        {value}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {key}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-blue-500/40 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                    className="relative rounded-full border-2 border-white shadow-sm"
                  />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.position}
                  </div>
                </div>
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

export default Testimonial;
