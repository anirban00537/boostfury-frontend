import { Poppins } from "next/font/google";
import "./globals.css";
import DefaultLayout from "@/components/layout/Default.layout.comp";
import Script from "next/script";
import AuthCheckLayout from "@/components/layout/Auth-Check.layout.comp";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"], // Added more weight variants for better typography
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const defaultUrl = "https://buildsocialpost.com";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title:
    "Linkedin Growth Tool | Linkedin Personal Branding Tool | BuildSocialPost",
  description:
    "Grow your LinkedIn profile with AI-powered tools. Create professional LinkedIn posts, carousels, and more with our easy-to-use tools.",
  keywords: [
    // Primary Keywords
    "Linkedin growth tool",
    "Linkedin branding tool",
    "Linkedin AI tool",
    "Linkedin content creator",
    "Linkedin post generator",
    // Feature-based Keywords
    "AI content generator",
    "social media carousel templates",
    "professional carousel maker",
    "free LinkedIn carousel tool",
    // Long-tail Keywords
    "create LinkedIn carousels with AI",
    "convert articles to carousel posts",
    "professional LinkedIn carousel templates",
    "AI-powered social media content creator",
    "instant carousel generator",
    // Intent-based Keywords
    "how to make LinkedIn carousels with AI",
    "best carousel maker for social media",
    "free social media content creator",
  ].join(", "),
  authors: [{ name: "Anirban Roy" }],
  creator: "Anirban Roy",
  publisher: "Anirban Roy",
  alternates: {
    canonical: defaultUrl,
    languages: {
      "en-US": "/en-us",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: defaultUrl,
    title:
      "AI Carousel Maker | Create Professional Social Media Carousels Instantly",
    description:
      "Transform your content into engaging carousels for LinkedIn, TikTok & Instagram using AI. No design skills needed. Features: instant generation, professional templates, multi-platform support. Start creating for free!",
    siteName: "BuildSocialPost",
    images: [
      {
        url: `${defaultUrl}/og/hero-image.png`,
        width: 1200,
        height: 630,
        alt: "BuildSocialPost - Professional AI Carousel Generator",
      },
      {
        url: `${defaultUrl}/og/feature-showcase.png`,
        width: 1800,
        height: 1200,
        alt: "AI-Powered Carousel Creation Tools",
      },
      {
        url: `${defaultUrl}/og/templates-preview.jpg`,
        width: 800,
        height: 600,
        alt: "Professional Social Media Templates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Professional Carousels with AI | BuildSocialPost",
    description:
      "Transform your content into engaging carousels for LinkedIn, TikTok & Instagram. AI-powered, professional templates, instant generation. Start free!",
    images: [`${defaultUrl}/og/twitter-card.jpg`],
    creator: "@buildsocialpost",
    site: "@buildsocialpost",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
    nocache: true,
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    bing: process.env.BING_SITE_VERIFICATION,
  },
  applicationName: "BuildSocialPost",
  category: "Technology",
  classification: "Social Media Tools",
  // Additional metadata for rich results
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "BuildSocialPost",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    features: [
      "AI-powered content generation",
      "Professional templates",
      "Multi-platform support",
      "Instant carousel creation",
      "No design skills required",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Analytics Script */}
        <Script
          defer
          src="https://umami.buildsocialpost.com/script.js"
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          data-host-url="https://umami.buildsocialpost.com"
          strategy="afterInteractive"
        />
        {/* Preconnect to key domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* manifest.json provides metadata used when your web app is installed on a user's mobile device or desktop */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <DefaultLayout>
          <AuthCheckLayout>{children}</AuthCheckLayout>
        </DefaultLayout>
      </body>
    </html>
  );
}
