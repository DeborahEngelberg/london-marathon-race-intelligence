import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'London Marathon Guide',
  description: 'Runner and Spectator Strategy Guide for the 2026 TCS London Marathon (26 April 2026). Crossing map, viewing routes, transit strategy, finish blueprint, and common mistakes.',
  keywords: ['London Marathon', 'TCS London Marathon', 'marathon spectator guide', 'marathon strategy', 'London running', 'marathon race intelligence'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='16' fill='%23E41E31'/><text x='50' y='68' text-anchor='middle' fill='white' font-family='system-ui' font-weight='bold' font-size='48'>LM</text></svg>" />
      </head>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--text)] antialiased">
        {children}
      </body>
    </html>
  );
}
