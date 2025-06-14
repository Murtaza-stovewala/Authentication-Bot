import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import AppHeader from '@/components/layout/AppHeader';

export const metadata: Metadata = {
  title: 'Authentication Bot',
  description: 'Chat with mobile number authentication and inactivity timeout.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body 
        className="font-body antialiased flex flex-col min-h-screen"
        style={{ background: 'linear-gradient(135deg, hsl(var(--background)), #e0ffe1)' }}
      >
        <AppHeader />
        <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
