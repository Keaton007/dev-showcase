import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import dynamic from 'next/dynamic';
import ThemeToggle from '../components/ThemeToggle';
import LandingOverlay from '../components/LandingOverlay';

const Nav = dynamic(() => import('../components/Nav'), {
  loading: () => <div>Loading...</div>
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Keaton's Portfolio",
  description: "Full-stack developer portfolio showcasing projects and skills",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body>
        <ThemeToggle />
        <Nav />
        <LandingOverlay />
        {children}
      </body>
    </html>
  );
}
