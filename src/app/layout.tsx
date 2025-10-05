import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { cn } from '@/lib/utils';
import { ServiceWorkerRegistration } from '@/components/ServiceWorkerRegistration';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Rupee Riches - A Clicker Quest',
  description: 'Click your way to riches in this thrilling Rupee-themed game!',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased', inter.variable)}>
        <ServiceWorkerRegistration />
        {children}
        <Toaster />
        <footer className="text-center text-sm text-muted-foreground p-4">
          Made with ❤️ in India — Rupee Clicker Quest
        </footer>
      </body>
    </html>
  );
}
