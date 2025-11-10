import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import { FolderKanban, Users } from 'lucide-react';

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 min-h-screen`}
      >
        <nav className="sticky top-0 z-50 border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <Link href="/" className="flex items-center gap-2 group">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    <FolderKanban className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    VZNX
                  </span>
                </Link>

                <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                  <Link
                    href="/"
                    className="px-4 py-2 rounded-md font-medium text-sm transition-all hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm flex items-center gap-2"
                  >
                    <FolderKanban className="h-4 w-4" />
                    Projects
                  </Link>
                  <Link
                    href="/team"
                    className="px-4 py-2 rounded-md font-medium text-sm transition-all hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm flex items-center gap-2"
                  >
                    <Users className="h-4 w-4" />
                    Team
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  All Systems Operational
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="animate-fade-in">{children}</main>
      </body>
    </html>
  );
}
