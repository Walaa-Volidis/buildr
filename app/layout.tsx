import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'VZNX Challenge - Project Management',
  description: 'Architecture studio project management platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="border-b bg-white">
          <div className="container mx-auto px-6 py-4 flex gap-6">
            <Link href="/" className="font-semibold hover:text-primary">
              Projects
            </Link>
            <Link href="/team" className="font-semibold hover:text-primary">
              Team
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
