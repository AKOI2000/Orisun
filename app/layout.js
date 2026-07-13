import { Google_Sans } from "next/font/google";
import "@/app/index.css";

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Orisun",
  description: "Orisun — personal notes, thoughts, and everyday musings.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${googleSans.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>{children}</body>
    </html>
  );
}
