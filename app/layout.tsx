import { Poppins } from "next/font/google";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: "Boostfury - AI-Powered LinkedIn Personal Branding",
    template: "%s | Boostfury",
  },
  description:
    "Transform your LinkedIn presence with AI-powered content creation. Generate engaging posts, schedule content, and build your personal brand effortlessly.",
  keywords: [
    "LinkedIn automation",
    "personal branding",
    "AI content generator",
    "LinkedIn posts",
    "social media automation",
    "personal brand building",
    "LinkedIn marketing",
    "content scheduling",
    "professional networking",
    "career growth",
  ],
  authors: [{ name: "Boostfury" }],
  creator: "Boostfury",
  publisher: "Boostfury",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: defaultUrl,
    title: "Boostfury - AI-Powered LinkedIn Personal Branding",
    description:
      "Transform your LinkedIn presence with AI-powered content creation. Generate engaging posts, schedule content, and build your personal brand effortlessly.",
    siteName: "Boostfury",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Boostfury - AI-Powered LinkedIn Personal Branding",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Boostfury - AI-Powered LinkedIn Personal Branding",
    description:
      "Transform your LinkedIn presence with AI-powered content creation. Generate engaging posts, schedule content, and build your personal brand effortlessly.",
    images: ["/og-image.jpg"],
    creator: "@boostfury",
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
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} font-sans`}
      suppressHydrationWarning
    >
      <body className="w-full antialiased">{children}</body>
    </html>
  );
}
