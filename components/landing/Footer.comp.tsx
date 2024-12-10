import Image from "next/image";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Twitter, Linkedin, Github, ArrowUpRight } from "lucide-react";

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

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Footer = () => {
  return (
    <footer className="relative pt-24 pb-12 bg-white overflow-hidden">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          variants={fadeInUpVariant}
          initial="hidden"
          animate="visible"
          className="relative rounded-2xl bg-gray-50 p-12"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--primary-rgb),0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--primary-rgb),0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left max-w-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Stay updated with BoostFury
              </h3>
              <p className="text-gray-600">
                Get the latest updates, news and product offerings delivered
                right to your inbox.
              </p>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto">
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 px-4 py-2 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                />
                <button className="px-6 py-2 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors duration-200">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 pb-12">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo.svg"
                height={32}
                width={140}
                alt="BoostFury"
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Transform your LinkedIn presence with AI-powered tools. Create
              engaging content that drives growth and engagement.
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
                    className="group size-10 flex items-center justify-center rounded-lg border border-gray-200 hover:border-primary/20 hover:bg-primary/5 transition-colors duration-200"
                  >
                    <Icon className="size-5 text-gray-600 group-hover:text-primary transition-colors duration-200" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-primary transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-primary transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-primary transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Contact
            </h3>
            <a
              href="mailto:contact@boostfury.com"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors duration-200"
            >
              <Mail className="size-4" />
              contact@boostfury.com
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} BoostFury. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/terms"
                className="text-sm text-gray-600 hover:text-primary transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-gray-600 hover:text-primary transition-colors duration-200"
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
