import type { Metadata } from 'next';
import './globals.css';
import { SmoothScroll } from '@/components/SmoothScroll';

export const metadata: Metadata = {
  title: 'OXID STUDIO — Luxury Technical Streetwear Atelier // Drops',
  description:
    'Sovereign haute-streetwear atelier. Engineered technical outerwear, avant-garde silhouettes, and 120BPM runway motion in matte black, milk white, and acid neon.',
  openGraph: {
    title: 'OXID STUDIO — Luxury Technical Streetwear Atelier',
    description:
      'Sovereign haute-streetwear atelier. Engineered technical outerwear, avant-garde silhouettes, and 120BPM runway motion.',
    url: 'https://oxid.studio',
    siteName: 'OXID STUDIO',
    images: [
      {
        url: '/fashion/look1.jpg',
        width: 1200,
        height: 1600,
        alt: 'OXID STUDIO Streetwear Look 01',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-[#0a0a0c] text-[#f5f5f0]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0a0a0c] text-[#f5f5f0] antialiased selection:bg-[#00ff66] selection:text-black">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
