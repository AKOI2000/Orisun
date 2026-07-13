import { Inter } from 'next/font/google';
import Navbar from '@/app/_components/Navbar';
import Footer from '@/app/_components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Site-wide defaults - individual pages set their own `title` (which
// slots into the template below) and `description`.
export const metadata = {
  title: {
    default: 'Orisun',
    template: '%s | Orisun',
  },
  description: 'Orisun — personal notes, thoughts, and everyday musings.',
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