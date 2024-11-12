import { motion } from "framer-motion";

const Testimonial = () => {
  return (
    <motion.section
      id="testimonials"
      className="py-28 bg-background relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full"></div>
        <div className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-primary/30 to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-44 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-primary/30 to-transparent rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 text-center relative z-10">
        <motion.h2
          className="text-3xl font-semibold text-textColor"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Testimonials
        </motion.h2>
        <motion.p
          className="mt-4 text-textColor/70"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          See what our users have to say about AI Carousel Maker.
        </motion.p>
        <div className="mt-12 flex flex-wrap justify-center gap-12">
          {[
            {
              text: "This tool has revolutionized the way I create content for my social media. Highly recommended!",
              author: "Alex Johnson",
            },
            {
              text: "AI Carousel Maker saves me so much time and effort. The AI-generated content is spot on.",
              author: "Maria Davis",
            },
            {
              text: "I love the customization options and the modern backgrounds. It's perfect for my business needs.",
              author: "James Smith",
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              className="max-w-sm p-6 bg-cardBackground/30 backdrop-blur-md border border-borderColor/50 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <p className="text-textColor/80">"{testimonial.text}"</p>
              <p className="mt-4 text-textColor font-bold">
                - {testimonial.author}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonial;
