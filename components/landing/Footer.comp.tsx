import Image from "next/image";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="pt-16 pb-8 relative overflow-hidden bg-gradient-to-b from-background to-background/80">
      {/* Gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-64 right-0 w-1/3 h-[50px] bg-gradient-to-bl from-primary/20 to-transparent rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-1/3 h-[50px] bg-gradient-to-tr from-primary/20 to-transparent rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 text-textColor md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Logo and description */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="/single-logo.svg"
              height={50}
              width={50}
              alt="boostfury.com"
              className="mb-3"
            />
            <p className="text-textColor/80 text-sm text-center md:text-left">
              Grow your LinkedIn profile with AI-powered tools. Create
              professional LinkedIn posts, carousels, and more with our easy-to-use
              tools.
            </p>
          </div>

          {/* Partners list */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-center md:text-left">
              Our Partners
            </h3>
            <ul className="flex flex-col flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 text-xs">
              <li>
                <Link
                  href="https://fluxai.pro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-textColor/70 hover:text-primary transition-colors duration-200"
                >
                  Flux AI Pro
                </Link>
              </li>
              <li>
                <a
                  href="https://www.aitoolnet.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block hover:opacity-80 transition-opacity duration-200"
                >
                  <Image
                    src="http://www.aitoolnet.com/static/assets/images/logo.svg"
                    alt="aitoolnet.com"
                    width={150}
                    height={52}
                  />
                </a>
              </li>
              {/* Add more partners here */}
            </ul>
          </div>

          {/* Quick links and Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-center md:text-left">
              Quick Links
            </h3>
            <ul className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 text-xs">
              <li>
                <Link
                  href="/"
                  className="text-textColor/70 hover:text-primary transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/about"
                  className="text-textColor/70 hover:text-primary transition-colors duration-200"
                >
                  About
                </Link>
              </li> */}
            </ul>
            <div className="mt-4 text-center md:text-left">
              <h3 className="text-sm font-semibold mb-2">Contact</h3>
              <a
                href="mailto:anirbansaas@gmail.com"
                className="text-xs text-textColor/70 hover:text-primary transition-colors duration-200"
              >
                anirban00537@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-borderColor/30 pt-6 text-center">
          <p className="text-textColor/70 text-xs">
            © {new Date().getFullYear()} boostfury.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
