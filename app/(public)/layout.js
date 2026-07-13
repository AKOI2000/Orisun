import { Inter } from "next/font/google";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Site-wide defaults - individual pages set their own `title` (which
// slots into the template below) and `description`.
export const metadata = {
  metadataBase: new URL("https://orisunn.vercel.app"),

  title: {
    default: "Orisun",
    template: "%s | Orisun",
  },

  applicationName: "Orisun",

  description:
    "A personal space where I document thoughts, reflections, lessons, observations, and ideas.",

  keywords: [
    "Orisun",
    "personal website",
    "writing",
    "thoughts",
    "essays",
    "reflections",
    "technology",
    "software",
    "life",
    "advice",
    "digital garden",
  ],

  authors: [
    {
      name: "Olayinka Alausa",
      url: "https://orisunn.vercel.app",
    },
  ],

  creator: "Olayinka Alausa",
  publisher: "Olayinka Alausa",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://orisunn.vercel.app",
    siteName: "Orisun",
    images: [
      {
        url: "/Orisun2.png",
        width: 1200,
        height: 630,
        alt: "Orisun",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    creator: "@codeAlausa", // Remove if you don't have Twitter/X
    images: ["/Orisun2.png"],
  },

  // icons: {
  //   icon: [
  //     { url: "/favicon.ico" },
  //     { url: "/icon.png", type: "image/png" },
  //   ],
  //   apple: "/apple-icon.png",
  // },

  alternates: {
    canonical: "https://orisunn.vercel.app",
  },

  category: "Personal Website",
};

export default function PublicLayout({ children }) {
  return (
    <div className={`${inter.variable} site-shell`}>
      <Navbar />
      <main className="site-shell__main">{children}</main>
      <Footer />
    </div>
  );
}
