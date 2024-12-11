import Image from "next/image";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Twitter, Linkedin, Github } from "lucide-react";

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "Testimonials", href: "#testimonials" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
  resources: [
    { name: "Documentation", href: "/docs" },
    { name: "Help Center", href: "/help" },
    { name: "API Reference", href: "/api" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
  social: [
    { name: "Twitter", href: "https://twitter.com", icon: Twitter },
    { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { name: "GitHub", href: "https://github.com", icon: Github },
  ],
};

const Footer = () => {
  return (
    <footer className="relative pt-32 pb-12 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]" />

      {/* Newsletter Section */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl"
        >
          {/* Enhanced Glowing Effects */}
          <div className="absolute -inset-[1px] bg-gradient-to-t from-neutral-200/0 via-neutral-200/10 to-neutral-200/0 rounded-2xl" />
          <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-neutral-200/20 to-transparent rounded-2xl blur-sm" />

          {/* Newsletter Card */}
          <div className="relative p-12 rounded-2xl bg-white/50 backdrop-blur-sm border border-neutral-200/60">
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left max-w-xl">
                <h3 className="text-2xl font-bold bg-gradient-to-b from-black to-neutral-800 bg-clip-text text-transparent mb-3">
                  Stay updated with BoostFury
                </h3>
                <p className="text-neutral-600">
                  Get the latest updates, news and product offerings delivered right to your inbox.
                </p>
              </div>
              <div className="flex-shrink-0 w-full md:w-auto">
                <form className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 min-w-0 px-4 py-2 text-neutral-900 placeholder-neutral-500 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-neutral-200 focus:border-neutral-300 focus:outline-none"
                  />
                  <button className="px-6 py-2 text-white bg-neutral-900 rounded-xl hover:bg-neutral-800 transition-colors duration-200">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 pb-12">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-4">
            <Link href="/" className="inline-block mb-6 relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-neutral-200/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
              <Image
                src="/logo.svg"
                height={32}
                width={140}
                alt="BoostFury"
                className="relative h-8 w-auto"
              />
            </Link>
            <p className="text-neutral-600 text-sm leading-relaxed mb-6">
              Transform your LinkedIn presence with AI-powered tools. Create engaging content that drives growth and engagement.
            </p>
            <div className="flex gap-4">
              {footerLinks.social.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                  >
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-neutral-200/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                    <div className="relative size-10 flex items-center justify-center rounded-lg border border-neutral-200/60 bg-white/50 backdrop-blur-sm hover:border-neutral-300 transition-colors duration-200">
                      <Icon className="size-5 text-neutral-600 group-hover:text-neutral-900 transition-colors duration-200" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries({ Product: footerLinks.product, Company: footerLinks.company, Resources: footerLinks.resources }).map(([title, links]) => (
            <div key={title} className="col-span-1 md:col-span-2">
              <h3 className="text-sm font-semibold text-neutral-900 mb-4">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-sm font-semibold text-neutral-900 mb-4">
              Contact
            </h3>
            <a
              href="mailto:contact@boostfury.com"
              className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
            >
              <Mail className="size-4" />
              contact@boostfury.com
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative border-t border-neutral-200/60 pt-8 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-600">
              © {new Date().getFullYear()} BoostFury. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/terms"
                className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
